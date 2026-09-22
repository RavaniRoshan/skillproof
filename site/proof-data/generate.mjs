// Seeds the checked-in M2 proof surface from a doc-derived fixture
// (no live token needed). Runs the real proofSkill path, pins the upstream
// hash to the recomputed value, and ingests the record.
// Run: node site/proof-data/generate.mjs
// Re-run after any scanner change; the hash pins the exact content scanned.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildProofRecord,
  proofSkill,
} from "../../packages/cli/dist/skills-sh.js";
import { computeSkillproofHash } from "../../packages/skills-sh/dist/index.js";
import { ingestRecord } from "./ingest.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");

const fixtures = join(
  repoRoot,
  "packages",
  "skills-sh",
  "test",
  "fixtures",
);
const detail = JSON.parse(
  readFileSync(join(fixtures, "detail.json"), "utf-8"),
);
const audits = JSON.parse(
  readFileSync(join(fixtures, "audit.json"), "utf-8"),
);

// The documented example hash is illustrative, not reproducible. Pin the
// upstream hash to the recomputed value so the seed proof demonstrates
// MATCH; the reconcile path still records both hashes.
detail.hash = computeSkillproofHash(detail.files ?? []);

const stubClient = {
  listSkills: async () => [],
  searchSkills: async () => [],
  getCuratedSkills: async () => [],
  getSkill: async () => detail,
  getAudit: async () => audits,
};

const result = await proofSkill(stubClient, detail.id);
const record = {
  ...buildProofRecord(detail, result),
  _note:
    "Seed proof generated from a doc-derived skills.sh fixture (no live token). Re-run generate.mjs with a live snapshot to replace it.",
};
const done = ingestRecord(record);
console.log(`seeded ${done.id} hash_match=${done.hash_match}`);
