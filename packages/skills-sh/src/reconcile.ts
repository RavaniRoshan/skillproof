// Hash reconciliation: do skills.sh and SkillProof describe the same content?
// Never silently normalize away a mismatch — record both hashes and their
// sources, and let the caller decide (re-scan, investigate, link proof).
//
// Deterministic normalization (frozen M0):
// - sort file paths byte-wise (stable across filesystems)
// - normalize line endings CRLF/CR -> LF
// - encode UTF-8, hash with sha256
// - exclude: `.git/` (vcs metadata), `node_modules/` (generated deps)
// Every exclusion is deliberate: neither directory is skill content, and both
// would make the hash machine-specific. Document new exclusions here.
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import type { V1SkillFile } from "./types.js";

export const HASH_ALGORITHM = "sha256" as const;

export interface FileSnapshot {
  path: string;
  contents: string;
}

export interface Reconciliation {
  source_hash: { algorithm: "sha256"; value: string; source: "skills.sh" };
  skillproof_hash: { algorithm: "sha256"; value: string; source: "skillproof" };
  hash_match: boolean;
}

const EXCLUDED_PREFIXES = [".git/", "node_modules/"];

export function isHashedPath(path: string): boolean {
  const normalized = path.replace(/\\/g, "/").replace(/^\.\//, "");
  return !EXCLUDED_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

export function normalizeLineEndings(contents: string): string {
  return contents.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

export function computeSkillproofHash(files: FileSnapshot[]): string {
  const hashed = files.filter((file) => isHashedPath(file.path));
  const sorted = [...hashed].sort((a, b) =>
    a.path < b.path ? -1 : a.path > b.path ? 1 : 0,
  );
  const digest = createHash(HASH_ALGORITHM);
  for (const file of sorted) {
    const normalizedPath = file.path.replace(/\\/g, "/").replace(/^\.\//, "");
    digest.update(`${normalizedPath}\0`, "utf8");
    digest.update(`${normalizeLineEndings(file.contents)}\0`, "utf8");
  }
  return `sha256:${digest.digest("hex")}`;
}

function canonical(value: string): string {
  return value.startsWith("sha256:") ? value : `sha256:${value}`;
}

// Disk twin of computeSkillproofHash: same normalization, same exclusions,
// paths relative to dir. The CLI delegates here so one rule defines identity.
export function hashDirectory(dir: string): string {
  const root = path.resolve(dir);
  const files: FileSnapshot[] = [];
  const walk = (current: string): void => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile()) {
        files.push({
          path: path.relative(root, full).replace(/\\/g, "/"),
          contents: fs.readFileSync(full, "utf-8"),
        });
      }
    }
  };
  walk(root);
  return computeSkillproofHash(files);
}

export function reconcile(
  upstreamHash: string | null,
  files: V1SkillFile[] | null,
): Reconciliation | null {
  if (!upstreamHash || !files) return null;
  const skillproofHash = computeSkillproofHash(files);
  const sourceHash = canonical(upstreamHash);
  return {
    source_hash: {
      algorithm: HASH_ALGORITHM,
      value: sourceHash,
      source: "skills.sh",
    },
    skillproof_hash: {
      algorithm: HASH_ALGORITHM,
      value: skillproofHash,
      source: "skillproof",
    },
    hash_match: sourceHash === skillproofHash,
  };
}
