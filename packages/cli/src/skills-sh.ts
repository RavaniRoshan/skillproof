// Read-only skills.sh integration (M1). Pure operations over an injected
// client so tests run fixture-backed; the commander wiring in index.ts
// constructs the live client from --token / SKILLS_SH_TOKEN.
import {
  SkillsShError,
  computeSkillproofHash,
  createClient,
  normalizeSkill,
  reconcile,
  selectIndexSet,
  type SkillsShClient,
  type SkillView,
  type V1Skill,
  type V1SkillDetail,
} from "skillproof-skills-sh";
import { assembleManifest } from "./manifest.js";
import { Scanner } from "./scanner.js";
import { Verifier } from "./verifier.js";

export interface SkillsShOptions {
  token?: string;
  baseUrl?: string;
}

export function resolveClient(options: SkillsShOptions = {}): SkillsShClient {
  const token = options.token ?? process.env.SKILLS_SH_TOKEN;
  return createClient({
    token,
    baseUrl: options.baseUrl,
    userAgent: "skillproof/0.1.0",
  });
}

export function parseSkillRef(ref: string): { source: string; skill: string } {
  const parts = ref.split("/").filter((part) => part.length > 0);
  if (parts.length < 2) {
    throw new Error(
      `Invalid skill reference "${ref}": expected <source>/<skill> (e.g. vercel-labs/skills/find-skills)`,
    );
  }
  return {
    source: parts.slice(0, -1).join("/"),
    skill: parts[parts.length - 1],
  };
}

export function formatAuthHint(error: unknown): string {
  if (
    error instanceof SkillsShError &&
    (error.code === "unauthorized" || error.code === "rate_limited")
  ) {
    return "Set SKILLS_SH_TOKEN or pass --token with a Vercel OIDC token. See https://www.skills.sh/docs/api.";
  }
  return error instanceof Error ? error.message : String(error);
}

export function formatSearch(skills: V1Skill[]): string {
  if (skills.length === 0) return "No skills found.";
  return skills
    .map((skill) => `${skill.id}  installs=${skill.installs}  ${skill.url}`)
    .join("\n");
}

export async function searchSkills(
  client: SkillsShClient,
  query: string,
  limit = 50,
): Promise<string> {
  return formatSearch(await client.searchSkills(query, limit));
}

export interface InspectResult {
  detail: V1SkillDetail;
  observation: ReturnType<typeof normalizeSkill>;
}

export async function inspectSkill(
  client: SkillsShClient,
  ref: string,
): Promise<InspectResult> {
  const { source, skill } = parseSkillRef(ref);
  const detail = await client.getSkill(source, skill);
  return { detail, observation: normalizeSkill(detail) };
}

export function formatInspect(result: InspectResult): string {
  const { detail, observation } = result;
  const files = detail.files ?? [];
  const lines = [
    `SkillProof inspect  ${observation.external_id}`,
    `repository   ${observation.source_repository}`,
    `source_url   ${observation.source_url}`,
    `installs     ${observation.install_count}`,
    `source_hash  ${observation.source_hash ?? "none (no snapshot)"}`,
    `observed_at  ${observation.observed_at}`,
    `files        ${files.length}`,
    ...files.map((file) => `  ${file.path}`),
  ];
  return lines.join("\n");
}

export interface ProofResult {
  observation: ReturnType<typeof normalizeSkill>;
  reconciliation: ReturnType<typeof reconcile>;
  capabilities: Record<string, unknown>;
  manifest: unknown;
  externalEvidence: ExternalEvidence[];
}

export interface ExternalEvidence {
  provider: string;
  status: string;
  riskLevel?: string;
  observed_at?: string;
}

export async function proofSkill(
  client: SkillsShClient,
  ref: string,
): Promise<ProofResult> {
  const { source, skill } = parseSkillRef(ref);
  const detail = await client.getSkill(source, skill);
  if (!detail.files) {
    throw new Error(`Skill ${detail.id} has no file snapshot to scan.`);
  }
  const observation = normalizeSkill(detail);
  const reconciliation = reconcile(detail.hash, detail.files);
  const frontmatter = Scanner.readFrontmatterFiles(detail.files);
  const capabilities = (await Scanner.scanFiles(
    detail.files,
  )) as unknown as Record<string, unknown>;
  const manifest = assembleManifest({
    name: frontmatter.name ?? detail.slug,
    version: frontmatter.version ?? "0.0.0",
    source: observation.source_url,
    contentHash: reconciliation
      ? reconciliation.skillproof_hash.value
      : "sha256:unknown",
    capabilities,
    frontmatter,
  });
  let externalEvidence: ExternalEvidence[] = [];
  try {
    const audit = await client.getAudit(source, skill);
    externalEvidence = (audit.audits ?? []).map((entry) => ({
      provider: entry.provider,
      status: entry.status,
      riskLevel: entry.riskLevel,
      observed_at: entry.auditedAt,
    }));
  } catch {
    externalEvidence = [];
  }
  return {
    observation,
    reconciliation,
    capabilities,
    manifest,
    externalEvidence,
  };
}

export interface ProofRecord {
  schema: "skillproof-source/1";
  source_registry: "skills.sh";
  external_id: string;
  source_repository: string;
  skill_slug: string;
  source_url: string;
  source_hash: unknown;
  skillproof_hash: unknown;
  hash_match: boolean;
  install_count: number;
  observed_at: string;
  scanner_version: string;
  external_evidence: ExternalEvidence[];
  manifest: unknown;
}

export function buildProofRecord(
  detail: V1SkillDetail,
  result: ProofResult,
  observedAt: string = new Date().toISOString().slice(0, 10),
): ProofRecord {
  const manifest = result.manifest as {
    scan_version: string;
    skill: { content_hash: string };
  };
  return {
    schema: "skillproof-source/1",
    source_registry: "skills.sh",
    external_id: detail.id,
    source_repository: detail.source,
    skill_slug: detail.slug,
    source_url: `https://www.skills.sh/${detail.id}`,
    source_hash: result.reconciliation?.source_hash ?? null,
    skillproof_hash: result.reconciliation?.skillproof_hash ?? null,
    hash_match: result.reconciliation?.hash_match ?? false,
    install_count: detail.installs,
    observed_at: observedAt,
    scanner_version: manifest.scan_version,
    external_evidence: result.externalEvidence,
    manifest,
  };
}

export function formatProof(result: ProofResult): string {
  const { observation, reconciliation } = result;
  const lines = [
    "SkillProof",
    `skill        ${observation.external_id}`,
    "✓ Skill found",
    "✓ Source snapshot retrieved",
    `✓ Content hash calculated  ${reconciliation ? reconciliation.skillproof_hash.value : "unknown"}`,
  ];
  if (!reconciliation) {
    lines.push("! No upstream hash to compare against");
  } else if (reconciliation.hash_match) {
    lines.push("✓ Hash matches upstream");
  } else {
    lines.push(
      `! Hash MISMATCH  upstream=${reconciliation.source_hash.value} skillproof=${reconciliation.skillproof_hash.value}`,
    );
  }
  const nonEmpty = Object.entries(
    result.capabilities as Record<string, Record<string, unknown>>,
  )
    .filter(([, group]) =>
      Object.values(group).some((value) =>
        Array.isArray(value) ? value.length > 0 : value,
      ),
    )
    .map(([group]) => group);
  lines.push(
    `✓ Capability manifest generated  (${nonEmpty.length > 0 ? nonEmpty.join(", ") : "no capabilities detected"})`,
  );
  return lines.join("\n");
}

export const PROOF_URL_BASE = "https://ravaniroshan.github.io/skillproof";

export function proofUrl(ref: string, base: string = PROOF_URL_BASE): string {
  const { source, skill } = parseSkillRef(ref);
  return `${base.replace(/\/$/, "")}/skill/${source}/${skill}`;
}

// Verifies the *current upstream snapshot* against the local ledger: fetch,
// hash, look up. Fails closed when nothing was attested for that hash.
export async function verifySkillsSh(
  client: SkillsShClient,
  ref: string,
): Promise<{ verified: boolean; hash: string; error?: string }> {
  const { source, skill } = parseSkillRef(ref);
  const detail = await client.getSkill(source, skill);
  if (!detail.files) {
    throw new Error(`Skill ${detail.id} has no file snapshot to verify.`);
  }
  const hash = computeSkillproofHash(detail.files);
  const result = await Verifier.verifyLocalAttestation(hash);
  return {
    verified: result.verified === true,
    hash,
    error: result.verified === true ? undefined : result.error,
  };
}

export type SyncStatus = "match" | "mismatch" | "no-snapshot" | "error";

export interface SyncEntry {
  id: string;
  installs: number;
  status: SyncStatus;
  hash: string | null;
  error?: string;
}

// Bounded discovery: one leaderboard page in, at most `limit` snapshots
// checked. Never indexes the whole ecosystem in one run.
export async function syncSkills(
  client: SkillsShClient,
  view: SkillView,
  limit: number,
): Promise<SyncEntry[]> {
  const candidates = await client.listSkills({ view, page: 0, perPage: 100 });
  const selected = selectIndexSet(candidates, limit);
  const entries: SyncEntry[] = [];
  for (const skill of selected) {
    try {
      const detail = await client.getSkill(skill.source, skill.slug);
      if (!detail.files) {
        entries.push({
          id: skill.id,
          installs: skill.installs,
          status: "no-snapshot",
          hash: null,
        });
        continue;
      }
      const reconciliation = reconcile(detail.hash, detail.files);
      entries.push({
        id: skill.id,
        installs: skill.installs,
        status: reconciliation
          ? reconciliation.hash_match
            ? "match"
            : "mismatch"
          : "no-snapshot",
        hash: reconciliation ? reconciliation.skillproof_hash.value : null,
      });
    } catch (error) {
      entries.push({
        id: skill.id,
        installs: skill.installs,
        status: "error",
        hash: null,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return entries;
}

export function formatSync(entries: SyncEntry[]): string {
  if (entries.length === 0) return "No skills selected.";
  return entries
    .map((entry) => {
      const suffix =
        entry.status === "error" || entry.status === "no-snapshot"
          ? ` (${entry.error ?? "no snapshot"})`
          : ` ${entry.hash ?? ""}`;
      return `${entry.status}  ${entry.id}  installs=${entry.installs}${suffix}`;
    })
    .join("\n");
}
