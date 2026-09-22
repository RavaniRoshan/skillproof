---
title: "image-to-video — SkillProof"
head:
  - - meta
    - property: og:title
      content: "image-to-video — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for genmedia-labs/skills/image-to-video: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="image-to-video"
  sub="genmedia-labs/skills/image-to-video — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [genmedia-labs/skills](https://github.com/genmedia-labs/skills) |
| skills.sh | [genmedia-labs/skills/image-to-video](https://www.skills.sh/genmedia-labs/skills/image-to-video) |
| Content hash | `sha256:cfb10dff9204f8e631a74ec8414cfcaa60ae8ffe01f83e70850b66f079ee40cc` |
| Upstream hash | `sha256:cfb10dff9204f8e631a74ec8414cfcaa60ae8ffe01f83e70850b66f079ee40cc` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.5` |
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
| `hygiene` | external_urls: https://docs.runcomfy.com/cli/troubleshooting?utm_source=skills.sh&utm_medium=skill&utm_campaign=image-to-video)., https://github.com/agentspace-so/runcomfy-skills/tree/main/image-to-video), https://www.runcomfy.com, https://www.runcomfy.com/?utm_source=skills.sh&utm_medium=skill&utm_campaign=image-to-video), https://www.runcomfy.com/models/bytedance/seedance-v2/pro?utm_source=skills.sh&utm_medium=skill&utm_campaign=image-to-video), https://www.runcomfy.com/models/happyhorse/happyhorse-1-0/image-to-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=image-to-video), https://www.runcomfy.com/models/wan-ai/wan-2-7/text-to-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=image-to-video) |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:cfb10dff9204f8e631a74ec8414cfcaa60ae8ffe01f83e70850b66f079ee40cc
```

Raw machine-readable proof: [/proof/cfb10dff9204f8e631a74ec8414cfcaa60ae8ffe01f83e70850b66f079ee40cc.json](/proof/cfb10dff9204f8e631a74ec8414cfcaa60ae8ffe01f83e70850b66f079ee40cc.json)

[![SkillProof](/badge-skillproof.svg)](/skill/genmedia-labs/skills/image-to-video)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-08-13T02:09:25.102Z |
| Socket | pass | — | 2026-08-13T02:11:08.269Z |
| Snyk | fail | CRITICAL | 2026-08-13T02:09:22.167187+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
