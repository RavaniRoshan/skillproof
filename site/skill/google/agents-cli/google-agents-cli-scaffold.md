---
title: "google-agents-cli-scaffold — SkillProof"
head:
  - - meta
    - property: og:title
      content: "google-agents-cli-scaffold — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for google/agents-cli/google-agents-cli-scaffold: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash mismatch"
  title="google-agents-cli-scaffold"
  sub="google/agents-cli/google-agents-cli-scaffold — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [google/agents-cli](https://github.com/google/agents-cli) |
| skills.sh | [google/agents-cli/google-agents-cli-scaffold](https://www.skills.sh/google/agents-cli/google-agents-cli-scaffold) |
| Content hash | `sha256:6f2a442fb2d29fb311fc3eaf8b2345d0efe4ae5a33f22ca31dda086f2b6cf4b4` |
| Upstream hash | `sha256:62e75f14b49d9b342b7f862d4aea2566180debf274ef06b185c28851a9812d4b` |
| Hash match | **no — the snapshot differs from upstream; investigate before trusting this proof** |
| Scanner | `skillproof-scan/0.1.5` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: docs.astral.sh |
| `exec` | shell: true<br>interpreters: bash, python3 |
| `filesystem` | reads: .env |
| `secrets` | env_vars: GEMINI_API_KEY |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://docs.astral.sh/uv/getting-started/installation/index.md) |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:6f2a442fb2d29fb311fc3eaf8b2345d0efe4ae5a33f22ca31dda086f2b6cf4b4
```

Raw machine-readable proof: [/proof/6f2a442fb2d29fb311fc3eaf8b2345d0efe4ae5a33f22ca31dda086f2b6cf4b4.json](/proof/6f2a442fb2d29fb311fc3eaf8b2345d0efe4ae5a33f22ca31dda086f2b6cf4b4.json)

[![SkillProof](/badge-skillproof.svg)](/skill/google/agents-cli/google-agents-cli-scaffold)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-17T07:32:50.687Z |
| Socket | pass | — | 2026-09-17T07:34:00.775Z |
| Snyk | pass | LOW | 2026-09-17T07:32:25.888659+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
