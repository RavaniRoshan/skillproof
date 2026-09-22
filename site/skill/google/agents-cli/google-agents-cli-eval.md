---
title: "google-agents-cli-eval — SkillProof"
head:
  - - meta
    - property: og:title
      content: "google-agents-cli-eval — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for google/agents-cli/google-agents-cli-eval: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash mismatch"
  title="google-agents-cli-eval"
  sub="google/agents-cli/google-agents-cli-eval — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [google/agents-cli](https://github.com/google/agents-cli) |
| skills.sh | [google/agents-cli/google-agents-cli-eval](https://www.skills.sh/google/agents-cli/google-agents-cli-eval) |
| Content hash | `sha256:1383f14978c217676113064fb39cb9dc87ecd932915f6ae5297ab27d845c2e7b` |
| Upstream hash | `sha256:2462241bbf1d6b392a38ca3e6727150387f406ffb8594584578cc5205762c1f8` |
| Hash match | **no — the snapshot differs from upstream; investigate before trusting this proof** |
| Scanner | `skillproof-scan/0.1.5` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: cloud.google.com, docs.astral.sh, github.com, my-agent.run.app |
| `exec` | shell: true<br>interpreters: bash, python3 |
| `filesystem` | reads: .env |
| `secrets` | env_vars: EXTERNAL_API_KEY, GEMINI_API_KEY |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/manage-metrics), https://docs.astral.sh/uv/getting-started/installation/index.md), https://github.com/googleapis/python-aiplatform/blob/main/agentplatform/_genai/types/common.py)., https://github.com/googleapis/python-aiplatform/blob/main/agentplatform/_genai/types/evals.py), https://my-agent.run.app |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:1383f14978c217676113064fb39cb9dc87ecd932915f6ae5297ab27d845c2e7b
```

Raw machine-readable proof: [/proof/1383f14978c217676113064fb39cb9dc87ecd932915f6ae5297ab27d845c2e7b.json](/proof/1383f14978c217676113064fb39cb9dc87ecd932915f6ae5297ab27d845c2e7b.json)

[![SkillProof](/badge-skillproof.svg)](/skill/google/agents-cli/google-agents-cli-eval)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-17T07:32:58.294Z |
| Socket | pass | — | 2026-09-17T07:34:00.988Z |
| Snyk | pass | LOW | 2026-09-17T07:32:26.152032+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
