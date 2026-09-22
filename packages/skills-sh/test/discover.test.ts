import {
  excludeDuplicates,
  needsRescan,
  selectIndexSet,
  topByInstalls,
  type SyncState,
} from "../src/discover.js";
import type { V1Skill } from "../src/types.js";

function skill(id: string, installs: number, duplicate = false): V1Skill {
  const [owner, repo, slug] = id.split("/");
  return {
    id,
    slug,
    name: slug,
    source: `${owner}/${repo}`,
    installs,
    sourceType: "github",
    installUrl: `https://github.com/${owner}/${repo}`,
    url: `https://skills.sh/${id}`,
    ...(duplicate ? { isDuplicate: true } : {}),
  };
}

const state: SyncState = {
  external_id: "a/b/c",
  source_hash: "sha256:one",
  skillproof_hash: "sha256:one",
  last_seen: "2026-09-22T10:00:00.000Z",
  last_scanned: "2026-09-22T10:00:00.000Z",
  last_attested: null,
  last_changed: null,
  install_count: 10,
  scanner_version: "skillproof-scan/0.1.0",
  proof_version: "skillproof-source/1",
};

test("index set dedupes, drops forks, and bounds to N by installs", () => {
  const candidates = [
    skill("a/b/c", 5),
    skill("a/b/c", 5),
    skill("x/y/z", 99, true),
    skill("p/q/r", 50),
  ];
  expect(selectIndexSet(candidates, 1)).toHaveLength(1);
  expect(selectIndexSet(candidates, 5).map((entry) => entry.id)).toEqual([
    "p/q/r",
    "a/b/c",
  ]);
  expect(excludeDuplicates(candidates)).toHaveLength(3);
  expect(topByInstalls(candidates, 2)[0].id).toBe("x/y/z");
});

test("rescan triggers on hash or scanner change only", () => {
  expect(needsRescan(state, "sha256:one", state.scanner_version)).toBe(false);
  expect(needsRescan(state, "sha256:two", state.scanner_version)).toBe(true);
  expect(needsRescan(state, "sha256:one", "skillproof-scan/0.2.0")).toBe(true);
});
