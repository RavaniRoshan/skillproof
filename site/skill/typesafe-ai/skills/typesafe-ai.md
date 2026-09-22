---
title: "typesafe-ai — SkillProof"
head:
  - - meta
    - property: og:title
      content: "typesafe-ai — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for typesafe-ai/skills/typesafe-ai: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="typesafe-ai"
  sub="typesafe-ai/skills/typesafe-ai — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [typesafe-ai/skills](https://github.com/typesafe-ai/skills) |
| skills.sh | [typesafe-ai/skills/typesafe-ai](https://www.skills.sh/typesafe-ai/skills/typesafe-ai) |
| Content hash | `sha256:07d76735eed4b7e88e1d32c592ae6642f165bb9c004f337f3f90edc70ac7fbb9` |
| Upstream hash | `sha256:07d76735eed4b7e88e1d32c592ae6642f165bb9c004f337f3f90edc70ac7fbb9` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.4` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: docs.typesafe.ai |
| `exec` | interpreters: python3 |
| `filesystem` | — |
| `secrets` | — |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://docs.typesafe.ai, https://docs.typesafe.ai/api.md), https://docs.typesafe.ai/concepts/how-to-build-with-system-one.md), https://docs.typesafe.ai/concepts/how-to-build-with-system-one.md)., https://docs.typesafe.ai/concepts/state.md), https://docs.typesafe.ai/concepts/system-one.md), https://docs.typesafe.ai/concepts/use-case-map.md), https://docs.typesafe.ai/confidence.md), https://docs.typesafe.ai/cookbooks/autoformat.md)., https://docs.typesafe.ai/cookbooks/autoresearch_feature_discovery.md)., https://docs.typesafe.ai/cookbooks/citation_check.md), https://docs.typesafe.ai/cookbooks/function_calling.md), https://docs.typesafe.ai/cookbooks/hierarchical_classification.md)., https://docs.typesafe.ai/cookbooks/pre_parsed_value_extraction_cookbook.md), https://docs.typesafe.ai/cookbooks/rerank_typesafe.md), https://docs.typesafe.ai/cookbooks/sde_cascade.md)., https://docs.typesafe.ai/llms.txt), https://docs.typesafe.ai/migrating-to-v1.md), https://docs.typesafe.ai/patterns/composite-scoring.md), https://docs.typesafe.ai/patterns/fan-out.md)., https://docs.typesafe.ai/primitives.md), https://docs.typesafe.ai/primitives/choice.md), https://docs.typesafe.ai/primitives/noul.md), https://docs.typesafe.ai/primitives/score.md), https://docs.typesafe.ai/sdk/javascript.md), https://docs.typesafe.ai/sdk/python.md) |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:07d76735eed4b7e88e1d32c592ae6642f165bb9c004f337f3f90edc70ac7fbb9
```

Raw machine-readable proof: [/proof/07d76735eed4b7e88e1d32c592ae6642f165bb9c004f337f3f90edc70ac7fbb9.json](/proof/07d76735eed4b7e88e1d32c592ae6642f165bb9c004f337f3f90edc70ac7fbb9.json)

[![SkillProof](/badge-skillproof.svg)](/skill/typesafe-ai/skills/typesafe-ai)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-12T15:51:06.859Z |
| Socket | pass | — | 2026-09-12T15:51:17.285Z |
| Snyk | pass | LOW | 2026-09-12T15:50:45.511916+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
