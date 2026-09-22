import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ManifestSchema } from "skillproof-schemas";
import {
  SkillsShError,
  computeSkillproofHash,
  type SkillsShClient,
  type V1SkillDetail,
} from "skillproof-skills-sh";
import {
  buildProofRecord,
  formatAuthHint,
  formatInspect,
  formatProof,
  formatSync,
  inspectSkill,
  parseSkillRef,
  proofSkill,
  proofUrl,
  searchSkills,
  syncSkills,
  verifySkillsSh,
} from "../src/skills-sh.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const skillsShFixtures = path.join(
  here,
  "..",
  "..",
  "skills-sh",
  "test",
  "fixtures",
);

function fixture(name: string) {
  return JSON.parse(
    fs.readFileSync(path.join(skillsShFixtures, name), "utf-8"),
  );
}

function stubClient(detail: V1SkillDetail): SkillsShClient {
  return {
    listSkills: async () => [],
    searchSkills: async () => fixture("search.json").data,
    getCuratedSkills: async () => [],
    getSkill: async () => detail,
    getAudit: async () => fixture("audit.json"),
  };
}

test("parseSkillRef splits nested sources and rejects bare names", () => {
  expect(parseSkillRef("vercel-labs/skills/find-skills")).toEqual({
    source: "vercel-labs/skills",
    skill: "find-skills",
  });
  expect(() => parseSkillRef("lonely")).toThrow(/expected <source>\/<skill>/);
});

test("search lists fixture skills", async () => {
  const output = await searchSkills(
    stubClient(fixture("detail.json")),
    "react native",
  );
  expect(output).toContain("expo/skills/react-native");
});

test("inspect preserves upstream identity", async () => {
  const result = await inspectSkill(
    stubClient(fixture("detail.json")),
    "vercel-labs/skills/find-skills",
  );
  expect(result.observation.external_id).toBe("vercel-labs/skills/find-skills");
  expect(result.observation.source_hash).toBe(
    "sha256:a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6",
  );
  expect(formatInspect(result)).toContain("installs     24531");
});

test("proof reconciles MATCH and validates against the schema", async () => {
  const detail = fixture("detail.json") as V1SkillDetail;
  const matching: V1SkillDetail = {
    ...detail,
    hash: computeSkillproofHash(detail.files ?? []),
  };
  const result = await proofSkill(
    stubClient(matching),
    "vercel-labs/skills/find-skills",
  );
  expect(result.reconciliation?.hash_match).toBe(true);
  expect(() => ManifestSchema.parse(result.manifest)).not.toThrow();
  expect(formatProof(result)).toContain("✓ Hash matches upstream");
});

test("proof records MISMATCH instead of choosing a hash", async () => {
  const result = await proofSkill(
    stubClient(fixture("detail.json")),
    "vercel-labs/skills/find-skills",
  );
  expect(result.reconciliation?.hash_match).toBe(false);
  expect(result.reconciliation?.source_hash.source).toBe("skills.sh");
  expect(result.reconciliation?.skillproof_hash.source).toBe("skillproof");
  expect(formatProof(result)).toContain("Hash MISMATCH");
});

test("proof refuses skills without a snapshot", async () => {
  const detail = { ...fixture("detail.json"), files: null };
  await expect(
    proofSkill(stubClient(detail), "vercel-labs/skills/find-skills"),
  ).rejects.toThrow(/no file snapshot/);
});

test("auth errors hint at the token", () => {
  expect(formatAuthHint(new SkillsShError("unauthorized", "nope"))).toContain(
    "SKILLS_SH_TOKEN",
  );
  expect(formatAuthHint(new Error("boom"))).toBe("boom");
});

test("proof-url builds the shareable page URL", () => {
  expect(proofUrl("vercel-labs/skills/find-skills")).toBe(
    "https://ravaniroshan.github.io/skillproof/skill/vercel-labs/skills/find-skills",
  );
  expect(() => proofUrl("lonely")).toThrow(/expected <source>\/<skill>/);
});

test("verify skills-sh fails closed without an attestation", async () => {
  const workdir = fs.mkdtempSync(path.join(os.tmpdir(), "skillproof-shv-"));
  vi.spyOn(process, "cwd").mockReturnValue(workdir);
  try {
    const result = await verifySkillsSh(
      stubClient(fixture("detail.json")),
      "vercel-labs/skills/find-skills",
    );
    expect(result.verified).toBe(false);
    expect(result.hash).toMatch(/^sha256:[0-9a-f]{64}$/);
  } finally {
    vi.restoreAllMocks();
    fs.rmSync(workdir, { recursive: true, force: true });
  }
});

test("sync bounds selection and reports per-skill status", async () => {
  const detail = fixture("detail.json") as V1SkillDetail;
  const listed = [
    {
      id: "a/b/c",
      slug: "c",
      name: "c",
      source: "a/b",
      installs: 50,
      sourceType: "github",
      installUrl: "https://github.com/a/b",
      url: "https://skills.sh/a/b/c",
    },
    {
      id: "a/b/c",
      slug: "c",
      name: "c",
      source: "a/b",
      installs: 50,
      sourceType: "github",
      installUrl: "https://github.com/a/b",
      url: "https://skills.sh/a/b/c",
    },
    {
      id: "x/y/z",
      slug: "z",
      name: "z",
      source: "x/y",
      installs: 99,
      sourceType: "github",
      installUrl: "https://github.com/x/y",
      url: "https://skills.sh/x/y/z",
      isDuplicate: true,
    },
    {
      id: "p/q/r",
      slug: "r",
      name: "r",
      source: "p/q",
      installs: 5,
      sourceType: "github",
      installUrl: "https://github.com/p/q",
      url: "https://skills.sh/p/q/r",
    },
  ];
  const client: SkillsShClient = {
    listSkills: async () => listed,
    searchSkills: async () => [],
    getCuratedSkills: async () => [],
    getSkill: async (source: string, skill: string) => {
      if (source === "a/b") return { ...detail, id: "a/b/c", files: null };
      if (source === "p/q") throw new Error("upstream exploded");
      throw new Error(`unexpected ${source}/${skill}`);
    },
    getAudit: async () => fixture("audit.json"),
  };
  const entries = await syncSkills(client, "trending", 10);
  expect(entries.map((entry) => entry.id).sort()).toEqual(["a/b/c", "p/q/r"]);
  expect(entries.find((entry) => entry.id === "a/b/c")?.status).toBe(
    "no-snapshot",
  );
  expect(entries.find((entry) => entry.id === "p/q/r")?.status).toBe("error");
  const text = formatSync(entries);
  expect(text).toContain("no-snapshot  a/b/c");
  expect(formatSync([])).toBe("No skills selected.");
});

test("proof record carries evidence and tolerates missing audits", async () => {
  const detail = fixture("detail.json") as V1SkillDetail;
  const matching: V1SkillDetail = {
    ...detail,
    hash: computeSkillproofHash(detail.files ?? []),
  };
  const withAudit = await proofSkill(stubClient(matching), matching.id);
  expect(withAudit.externalEvidence.map((entry) => entry.provider)).toContain(
    "Snyk",
  );
  const record = buildProofRecord(matching, withAudit, "2026-09-22");
  expect(record.schema).toBe("skillproof-source/1");
  expect(record.external_id).toBe(matching.id);
  expect(record.observed_at).toBe("2026-09-22");
  expect(() => ManifestSchema.parse(record.manifest)).not.toThrow();

  const noAuditClient: SkillsShClient = {
    ...stubClient(matching),
    getAudit: async () => {
      throw new SkillsShError("not_found", "no audits yet");
    },
  };
  const bare = await proofSkill(noAuditClient, matching.id);
  expect(bare.externalEvidence).toEqual([]);
});
