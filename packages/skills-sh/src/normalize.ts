// Maps a skills.sh skill detail into a SkillProof source-observation record.
// Upstream metadata is preserved as observation only: install_count and
// source_url never overwrite signed proof fields.
import type { V1SkillDetail } from "./types.js";

export interface SourceObservation {
  schema: "skillproof-source/1";
  source_registry: "skills.sh";
  external_id: string;
  source_repository: string;
  skill_slug: string;
  source_url: string;
  source_hash: string | null;
  install_count: number;
  observed_at: string;
}

export function normalizeSkill(
  detail: V1SkillDetail,
  observedAt: string = new Date().toISOString(),
): SourceObservation {
  const parts = detail.id.split("/");
  const skillSlug = detail.slug || parts[parts.length - 1] || "";
  return {
    schema: "skillproof-source/1",
    source_registry: "skills.sh",
    external_id: detail.id,
    source_repository: detail.source,
    skill_slug: skillSlug,
    source_url: `https://www.skills.sh/${detail.id}`,
    source_hash: detail.hash ? withPrefix(detail.hash) : null,
    install_count: detail.installs,
    observed_at: observedAt,
  };
}

function withPrefix(hash: string): string {
  return hash.startsWith("sha256:") ? hash : `sha256:${hash}`;
}
