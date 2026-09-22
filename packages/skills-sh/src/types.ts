// skills.sh API types. Field names mirror the documented responses at
// https://www.skills.sh/docs/api so contract tests catch upstream drift.
export type SkillView = "all-time" | "trending" | "hot";

export interface V1Skill {
  id: string;
  slug: string;
  name: string;
  source: string;
  installs: number;
  sourceType: string;
  installUrl: string | null;
  url: string;
  isDuplicate?: boolean;
  installsYesterday?: number;
  change?: number;
}

export interface V1SkillFile {
  path: string;
  contents: string;
}

export interface V1SkillDetail {
  id: string;
  source: string;
  slug: string;
  installs: number;
  hash: string | null;
  files: V1SkillFile[] | null;
}

export interface V1AuditEntry {
  provider: string;
  slug: string;
  status: string;
  summary: string;
  auditedAt: string;
  riskLevel?: string;
  categories?: string[];
}

export interface V1Audit {
  id: string;
  source: string;
  slug: string;
  audits: V1AuditEntry[];
}

export interface ListOptions {
  view?: SkillView;
  page?: number;
  perPage?: number;
}

export interface SkillsShClient {
  listSkills(options?: ListOptions): Promise<V1Skill[]>;
  searchSkills(query: string, limit?: number): Promise<V1Skill[]>;
  getCuratedSkills(): Promise<V1Skill[]>;
  getSkill(source: string, skill: string): Promise<V1SkillDetail>;
  getAudit(source: string, skill: string): Promise<V1Audit>;
}
