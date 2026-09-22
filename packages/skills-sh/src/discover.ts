// Bounded discovery over skills.sh views. Start small (25), then 100 —
// never index the whole ecosystem at once. Pure helpers so the sync
// scheduler (M3) can decide policy without reimplementing selection.
import type { V1Skill } from "./types.js";

export interface SyncState {
  external_id: string;
  source_hash: string | null;
  skillproof_hash: string | null;
  last_seen: string;
  last_scanned: string | null;
  last_attested: string | null;
  last_changed: string | null;
  install_count: number;
  scanner_version: string;
  proof_version: string;
}

export function dedupeById(skills: V1Skill[]): V1Skill[] {
  const seen = new Map<string, V1Skill>();
  for (const skill of skills) {
    if (!seen.has(skill.id)) seen.set(skill.id, skill);
  }
  return [...seen.values()];
}

export function excludeDuplicates(skills: V1Skill[]): V1Skill[] {
  return skills.filter((skill) => !skill.isDuplicate);
}

export function topByInstalls(skills: V1Skill[], limit: number): V1Skill[] {
  return [...skills].sort((a, b) => b.installs - a.installs).slice(0, limit);
}

export function selectIndexSet(
  candidates: V1Skill[],
  limit: number,
): V1Skill[] {
  return topByInstalls(excludeDuplicates(dedupeById(candidates)), limit);
}

export function needsRescan(
  state: SyncState,
  observedSourceHash: string | null,
  scannerVersion: string,
): boolean {
  if (observedSourceHash !== state.source_hash) return true;
  if (scannerVersion !== state.scanner_version) return true;
  return false;
}
