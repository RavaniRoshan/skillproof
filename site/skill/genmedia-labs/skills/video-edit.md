---
title: "video-edit — SkillProof"
head:
  - - meta
    - property: og:title
      content: "video-edit — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for genmedia-labs/skills/video-edit: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="video-edit"
  sub="genmedia-labs/skills/video-edit — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [genmedia-labs/skills](https://github.com/genmedia-labs/skills) |
| skills.sh | [genmedia-labs/skills/video-edit](https://www.skills.sh/genmedia-labs/skills/video-edit) |
| Content hash | `sha256:5d10803cf6b49f1b1a55e832eeb5181c825bdcd10c9d31ec72031d6b6f0f334c` |
| Upstream hash | `sha256:5d10803cf6b49f1b1a55e832eeb5181c825bdcd10c9d31ec72031d6b6f0f334c` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.4` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: docs.runcomfy.com, github.com, www.runcomfy.com |
| `exec` | shell: true<br>interpreters: bash |
| `filesystem` | reads: ~/.config/runcomfy/token.json |
| `secrets` | env_vars: RUNCOMFY_TOKEN |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://docs.runcomfy.com/cli/troubleshooting?utm_source=skills.sh&utm_medium=skill&utm_campaign=video-edit)., https://github.com/agentspace-so/runcomfy-skills/tree/main/video-edit), https://www.runcomfy.com, https://www.runcomfy.com/?utm_source=skills.sh&utm_medium=skill&utm_campaign=video-edit), https://www.runcomfy.com/models/decart/lucy-edit/restyle?utm_source=skills.sh&utm_medium=skill&utm_campaign=video-edit), https://www.runcomfy.com/models/kling/kling-2-6/motion-control-pro?utm_source=skills.sh&utm_medium=skill&utm_campaign=video-edit), https://www.runcomfy.com/models/wan-ai/wan-2-7/edit-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=video-edit) |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:5d10803cf6b49f1b1a55e832eeb5181c825bdcd10c9d31ec72031d6b6f0f334c
```

Raw machine-readable proof: [/proof/5d10803cf6b49f1b1a55e832eeb5181c825bdcd10c9d31ec72031d6b6f0f334c.json](/proof/5d10803cf6b49f1b1a55e832eeb5181c825bdcd10c9d31ec72031d6b6f0f334c.json)

[![SkillProof](/badge-skillproof.svg)](/skill/genmedia-labs/skills/video-edit)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-08-13T02:09:25.930Z |
| Socket | pass | — | 2026-08-13T02:11:09.849Z |
| Snyk | warn | MEDIUM | 2026-08-13T02:09:31.316309+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
