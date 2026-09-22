// Single source of truth for changelog entries, newest first.
// The landing page renders the first three; /changelog renders all.
// Every entry must describe shipped, verified work — see AGENTS.md.

export interface ChangelogEntry {
  date: string;
  title: string;
  body: string;
  to?: string;
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-09-22",
    title: "skills.sh proof pages, sync, and author Action",
    body: "Checked-in capability proofs at /skill/ with raw JSON, OG metadata and a badge; bounded trending/hot sync every 6 hours; a GitHub Action skill authors can run; verify skills-sh: and proof-url commands.",
    to: "/skill/",
  },
  {
    date: "2026-09-22",
    title: "Read-only skills.sh commands",
    body: "skills-sh search, inspect and proof: fetch a skill snapshot, scan it, reconcile the upstream hash, and print the local proof. Exit 2 on hash mismatch, fail-closed errors without a token.",
    to: "/guide/cli",
  },
  {
    date: "2026-09-22",
    title: "Scanner reports real values, real hashes",
    body: "Placeholders are gone: domains, interpreters, paths and env names are extracted from content; content_hash is a real sha256; frontmatter supplies name and version; diff exits 2 on changed values; verify fails closed on unknown hashes.",
    to: "/guide/cli",
  },
  {
    date: "2026-09-21",
    title: "Read API contract generated from Zod",
    body: "openapi/v1.yaml plus manifest and eval JSON schemas, all generated from the schema source of truth with a sync test.",
    to: "/api/",
  },
  {
    date: "2026-09-21",
    title: "CLI scan, diff, attest, and tests",
    body: "The Commander CLI with capability diffing (exit 2 on new privileges), local JSONL attestations, and a green Vitest suite.",
    to: "/guide/getting-started",
  },
  {
    date: "2026-09-21",
    title: "Marketing and docs site",
    body: "VitePress site with a shared design system, Pages deploy workflow, and agent-readable llms.txt index.",
    to: "/guide/",
  },
];
