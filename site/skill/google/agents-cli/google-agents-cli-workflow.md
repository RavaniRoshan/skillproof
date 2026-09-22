---
title: "google-agents-cli-workflow — SkillProof"
head:
  - - meta
    - property: og:title
      content: "google-agents-cli-workflow — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for google/agents-cli/google-agents-cli-workflow: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash mismatch"
  title="google-agents-cli-workflow"
  sub="google/agents-cli/google-agents-cli-workflow — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [google/agents-cli](https://github.com/google/agents-cli) |
| skills.sh | [google/agents-cli/google-agents-cli-workflow](https://www.skills.sh/google/agents-cli/google-agents-cli-workflow) |
| Content hash | `sha256:a4ee7be59bff3ce6755b61b4e2db4ccd6d47ad540bd418b6fdbc5632f0a39ae0` |
| Upstream hash | `sha256:4cf591acd1c456fc2075c15c0d452207bfada8a2a9bccc010213d0628dc45e4c` |
| Hash match | **no — the snapshot differs from upstream; investigate before trusting this proof** |
| Scanner | `skillproof-scan/0.1.4` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: adk.dev, cloud.google.com, docs.astral.sh, git.example.com, github.com, raw.githubusercontent.com<br>via: curl |
| `exec` | shell: true<br>interpreters: bash, python3 |
| `filesystem` | reads: .env, ~/.config/agents-cli/ |
| `secrets` | — |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://adk.dev/), https://adk.dev/agents/models/google-gemini/index.md, https://adk.dev/llms.txt, https://cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions)., https://docs.astral.sh/uv/getting-started/installation/index.md), https://docs.astral.sh/uv/getting-started/installation/index.md)., https://git.example.com/acme/acli-extensions, https://github.com/google/adk-go/tree/main/examples), https://github.com/google/adk-go/tree/main/examples)., https://raw.githubusercontent.com/google/agents-cli/main/schemas/agents-cli-extension-v1alpha1.schema.json |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:a4ee7be59bff3ce6755b61b4e2db4ccd6d47ad540bd418b6fdbc5632f0a39ae0
```

Raw machine-readable proof: [/proof/a4ee7be59bff3ce6755b61b4e2db4ccd6d47ad540bd418b6fdbc5632f0a39ae0.json](/proof/a4ee7be59bff3ce6755b61b4e2db4ccd6d47ad540bd418b6fdbc5632f0a39ae0.json)

[![SkillProof](/badge-skillproof.svg)](/skill/google/agents-cli/google-agents-cli-workflow)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-17T07:33:28.850Z |
| Socket | warn | — | 2026-09-17T07:34:00.558Z |
| Snyk | pass | LOW | 2026-09-17T07:32:26.086379+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
