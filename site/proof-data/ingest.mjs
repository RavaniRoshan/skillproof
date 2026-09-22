// Writes one proof record into the checked-in M2 surface:
//   site/proof-data/<source>/<slug>.json   full proof record
//   site/public/proof/<hex>.json            raw machine-readable manifest
//   site/skill/<source>/<slug>.md           human proof page
// plus a refreshed site/skill/index.md.
// Usage: node site/proof-data/ingest.mjs <record.json>
// where record.json comes from `skills-sh proof --record`.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");

function capabilityRows(capabilities) {
  const rows = [];
  for (const [group, value] of Object.entries(capabilities)) {
    const flat = Object.entries(value)
      .map(([key, items]) =>
        Array.isArray(items)
          ? items.length > 0
            ? `${key}: ${items.join(", ")}`
            : null
          : items
            ? `${key}: ${items}`
            : null,
      )
      .filter(Boolean);
    rows.push(`| \`${group}\` | ${flat.length > 0 ? flat.join("<br>") : "—"} |`);
  }
  return rows.join("\n");
}

export function ingestRecord(record) {
  const manifest = record.manifest;
  const hex = manifest.skill.content_hash.replace(/^sha256:/, "");

  const dataDir = join(here, record.source_repository);
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(
    join(dataDir, `${record.skill_slug}.json`),
    `${JSON.stringify(record, null, 2)}\n`,
  );

  const publicDir = join(repoRoot, "site", "public", "proof");
  mkdirSync(publicDir, { recursive: true });
  writeFileSync(
    join(publicDir, `${hex}.json`),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  const id = record.external_id;
  const page = `---
title: "${record.skill_slug} — SkillProof"
head:
  - - meta
    - property: og:title
      content: "${record.skill_slug} — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for ${id}: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof ${record.hash_match ? "· hash match" : "· hash mismatch"}"
  title="${record.skill_slug}"
  sub="${id} — capability proof generated ${record.observed_at}."
/>

| Field | Value |
| --- | --- |
| Repository | [${record.source_repository}](https://github.com/${record.source_repository}) |
| skills.sh | [${id}](${record.source_url}) |
| Content hash | \`${manifest.skill.content_hash}\` |
| Upstream hash | \`${record.source_hash?.value ?? "none"}\` |
| Hash match | ${record.hash_match ? "yes" : "**no — the snapshot differs from upstream; investigate before trusting this proof**"} |
| Scanner | \`${record.scanner_version}\` |
| Observed | ${record.observed_at} |

## Capabilities

| Group | Detected |
| --- | --- |
${capabilityRows(manifest.capabilities)}

## Verify it yourself

\`\`\`bash
node packages/cli/dist/index.js verify local@${manifest.skill.content_hash}
\`\`\`

Raw machine-readable proof: [/proof/${hex}.json](/proof/${hex}.json)

[![SkillProof](/badge-skillproof.svg)](/skill/${id})

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
${record.external_evidence.map((entry) => `| ${entry.provider} | ${entry.status} | ${entry.riskLevel ?? "—"} | ${entry.observed_at ?? "—"} |`).join("\n")}

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
`;

  const pageDir = join(repoRoot, "site", "skill", record.source_repository);
  mkdirSync(pageDir, { recursive: true });
  writeFileSync(join(pageDir, `${record.skill_slug}.md`), page);

  const indexRows = [];
  const mismatches = [];
  const byHash = new Map();
  (function collectProofs(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        collectProofs(full);
      } else if (entry.name.endsWith(".json")) {
        const proof = JSON.parse(readFileSync(full, "utf-8"));
        indexRows.push(
          `| [${proof.external_id}](/skill/${proof.external_id}) | ${proof.hash_match ? "yes" : "no"} | ${proof.observed_at} |`,
        );
        if (!proof.hash_match) mismatches.push(proof.external_id);
        const hex = proof.skillproof_hash.value;
        if (!byHash.has(hex)) byHash.set(hex, []);
        byHash.get(hex).push(proof.external_id);
      }
    }
  })(here);
  const duplicateGroups = [...byHash.values()].filter(
    (group) => group.length > 1,
  );
  writeFileSync(
    join(repoRoot, "site", "skill", "index.md"),
    `---
title: Skill proofs
---

<DocHero
  eyebrow="Evidence"
  title="Skill proofs"
  sub="Content-addressed capability proofs for skills discovered on skills.sh. One page per skill, each independently verifiable."
/>

| Skill | Hash match | Observed |
| --- | --- | --- |
${indexRows.sort().join("\n")}

## Findings

- ${indexRows.length} proofs indexed, ${mismatches.length} upstream hash mismatches (both hashes recorded on each page; mismatches are investigated, never normalized away).
${mismatches.map((id) => `  - ${id}`).join("\n")}
- ${duplicateGroups.length} byte-identical content groups under different names (content addressing beats names):
${duplicateGroups.map((group) => `  - ${group.map((id) => `\`${id}\``).join(" = ")}`).join("\n")}

New proofs are added by running \`site/proof-data/generate.mjs\` against a
skill snapshot and checking in the result. See the
[CLI reference](/guide/cli#skills-sh-read-only-needs-a-token) for the
read-only commands behind each page.
`,
  );
  return { id, hash: manifest.skill.content_hash, hash_match: record.hash_match };
}

const recordPath = process.argv[2];
if (recordPath) {
  const record = JSON.parse(readFileSync(recordPath, "utf-8"));
  const done = ingestRecord(record);
  console.log(`ingested ${done.id} hash_match=${done.hash_match}`);
}
