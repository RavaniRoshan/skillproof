import { normalizeSkill } from "../src/normalize.js";
import type { V1SkillDetail } from "../src/types.js";

const detail: V1SkillDetail = {
  id: "vercel-labs/skills/find-skills",
  source: "vercel-labs/skills",
  slug: "find-skills",
  installs: 24531,
  hash: "a1b2c3",
  files: [],
};

test("normalize preserves upstream identity and prefixes hash", () => {
  const observed = normalizeSkill(detail, "2026-09-22T10:00:00.000Z");
  expect(observed).toMatchObject({
    schema: "skillproof-source/1",
    source_registry: "skills.sh",
    external_id: "vercel-labs/skills/find-skills",
    source_repository: "vercel-labs/skills",
    skill_slug: "find-skills",
    source_url: "https://www.skills.sh/vercel-labs/skills/find-skills",
    source_hash: "sha256:a1b2c3",
    install_count: 24531,
    observed_at: "2026-09-22T10:00:00.000Z",
  });
});

test("normalize keeps already-prefixed hashes and null snapshots", () => {
  expect(normalizeSkill({ ...detail, hash: "sha256:abc" }).source_hash).toBe(
    "sha256:abc",
  );
  expect(normalizeSkill({ ...detail, hash: null }).source_hash).toBeNull();
});
