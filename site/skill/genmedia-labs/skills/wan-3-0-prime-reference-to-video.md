---
title: "wan-3-0-prime-reference-to-video — SkillProof"
head:
  - - meta
    - property: og:title
      content: "wan-3-0-prime-reference-to-video — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for genmedia-labs/skills/wan-3-0-prime-reference-to-video: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="wan-3-0-prime-reference-to-video"
  sub="genmedia-labs/skills/wan-3-0-prime-reference-to-video — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [genmedia-labs/skills](https://github.com/genmedia-labs/skills) |
| skills.sh | [genmedia-labs/skills/wan-3-0-prime-reference-to-video](https://www.skills.sh/genmedia-labs/skills/wan-3-0-prime-reference-to-video) |
| Content hash | `sha256:02723436c5985b53ed36066ea46108edbbce3c8903516775d051089133833e8a` |
| Upstream hash | `sha256:02723436c5985b53ed36066ea46108edbbce3c8903516775d051089133833e8a` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.5` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: docs.runcomfy.com, www.runcomfy.com, www.skills.sh |
| `exec` | shell: true<br>interpreters: bash |
| `filesystem` | reads: ~/.config/runcomfy/token.json |
| `secrets` | env_vars: RUNCOMFY_TOKEN |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://docs.runcomfy.com/cli/introduction?utm_source=skills.sh&utm_medium=skill&utm_campaign=wan-3-0-prime-reference-to-video&utm_content=cli-docs-introduction), https://docs.runcomfy.com/cli/troubleshooting?utm_source=skills.sh&utm_medium=skill&utm_campaign=wan-3-0-prime-reference-to-video&utm_content=cli-docs-troubleshooting)., https://www.runcomfy.com, https://www.runcomfy.com/?utm_source=skills.sh&utm_medium=skill&utm_campaign=wan-3-0-prime-reference-to-video&utm_content=home), https://www.runcomfy.com/models/bytedance/seedance-v2/pro?utm_source=skills.sh&utm_medium=skill&utm_campaign=wan-3-0-prime-reference-to-video&utm_content=bytedance-seedance-v2-pro), https://www.runcomfy.com/models/minimax/minimax-h3/reference-to-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=wan-3-0-prime-reference-to-video&utm_content=minimax-minimax-h3-reference-to-video), https://www.runcomfy.com/models/wan-ai/wan-2-7?utm_source=skills.sh&utm_medium=skill&utm_campaign=wan-3-0-prime-reference-to-video&utm_content=wan-ai-wan-2-7), https://www.runcomfy.com/models/wan-ai/wan-3.0-prime/image-to-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=wan-3-0-prime-reference-to-video&utm_content=wan-ai-wan-3.0-prime-image-to-video), https://www.runcomfy.com/models/wan-ai/wan-3.0-prime/reference-to-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=wan-3-0-prime-reference-to-video&utm_content=wan-ai-wan-3.0-prime-reference-to-video), https://www.runcomfy.com/models/wan-ai/wan-3.0-prime/text-to-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=wan-3-0-prime-reference-to-video&utm_content=wan-ai-wan-3.0-prime-text-to-video), https://www.skills.sh/genmedia-labs/skills/ai-video-generation), https://www.skills.sh/genmedia-labs/skills/runcomfy-cli), https://www.skills.sh/genmedia-labs/skills/seedance-v2), https://www.skills.sh/genmedia-labs/skills/wan-2-7) |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:02723436c5985b53ed36066ea46108edbbce3c8903516775d051089133833e8a
```

Raw machine-readable proof: [/proof/02723436c5985b53ed36066ea46108edbbce3c8903516775d051089133833e8a.json](/proof/02723436c5985b53ed36066ea46108edbbce3c8903516775d051089133833e8a.json)

[![SkillProof](/badge-skillproof.svg)](/skill/genmedia-labs/skills/wan-3-0-prime-reference-to-video)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-08T03:41:52.470Z |
| Socket | pass | — | 2026-09-08T03:42:19.336Z |
| Snyk | pass | LOW | 2026-09-08T03:41:46.977988+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
