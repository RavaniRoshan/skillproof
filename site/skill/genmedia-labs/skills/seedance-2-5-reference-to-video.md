---
title: "seedance-2-5-reference-to-video — SkillProof"
head:
  - - meta
    - property: og:title
      content: "seedance-2-5-reference-to-video — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for genmedia-labs/skills/seedance-2-5-reference-to-video: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="seedance-2-5-reference-to-video"
  sub="genmedia-labs/skills/seedance-2-5-reference-to-video — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [genmedia-labs/skills](https://github.com/genmedia-labs/skills) |
| skills.sh | [genmedia-labs/skills/seedance-2-5-reference-to-video](https://www.skills.sh/genmedia-labs/skills/seedance-2-5-reference-to-video) |
| Content hash | `sha256:1b65266794aeb8b387429b9cf76e1fb5ffea2f1073ef18018e71b6b4a30f52f4` |
| Upstream hash | `sha256:1b65266794aeb8b387429b9cf76e1fb5ffea2f1073ef18018e71b6b4a30f52f4` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.4` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: docs.runcomfy.com, model-api.runcomfy.net, www.runcomfy.com, www.skills.sh |
| `exec` | shell: true<br>interpreters: bash |
| `filesystem` | reads: ~/.config/runcomfy/token.json |
| `secrets` | env_vars: RUNCOMFY_TOKEN |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://docs.runcomfy.com/cli/introduction?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-reference-to-video&utm_content=cli-docs-introduction), https://docs.runcomfy.com/cli/troubleshooting?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-reference-to-video&utm_content=cli-docs-troubleshooting)., https://model-api.runcomfy.net/v1/models/bytedance/seedance-2.5/reference-to-video/1080p, https://www.runcomfy.com, https://www.runcomfy.com/?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-reference-to-video&utm_content=home), https://www.runcomfy.com/models/bytedance/seedance-2.5/image-to-video/1080p?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-reference-to-video&utm_content=bytedance-seedance-2.5-image-to-video-1080p), https://www.runcomfy.com/models/bytedance/seedance-2.5/reference-to-video/1080p?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-reference-to-video&utm_content=bytedance-seedance-2.5-reference-to-video-1080p), https://www.runcomfy.com/models/bytedance/seedance-2.5/reference-to-video/480p?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-reference-to-video&utm_content=bytedance-seedance-2.5-reference-to-video-480p), https://www.runcomfy.com/models/bytedance/seedance-2.5/text-to-video/1080p?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-reference-to-video&utm_content=bytedance-seedance-2.5-text-to-video-1080p), https://www.runcomfy.com/models/bytedance/seedance-v2/pro?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-reference-to-video&utm_content=bytedance-seedance-v2-pro), https://www.runcomfy.com/models/minimax/minimax-h3/reference-to-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-reference-to-video&utm_content=minimax-minimax-h3-reference-to-video)., https://www.runcomfy.com/models/wan-ai/wan-3.0-prime/reference-to-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-reference-to-video&utm_content=wan-ai-wan-3.0-prime-reference-to-video), https://www.skills.sh/genmedia-labs/skills/ai-avatar-video)., https://www.skills.sh/genmedia-labs/skills/ai-video-generation), https://www.skills.sh/genmedia-labs/skills/image-to-video), https://www.skills.sh/genmedia-labs/skills/runcomfy-cli), https://www.skills.sh/genmedia-labs/skills/seedance-v2), https://www.skills.sh/genmedia-labs/skills/video-extend), https://www.skills.sh/genmedia-labs/skills/video-extend). |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:1b65266794aeb8b387429b9cf76e1fb5ffea2f1073ef18018e71b6b4a30f52f4
```

Raw machine-readable proof: [/proof/1b65266794aeb8b387429b9cf76e1fb5ffea2f1073ef18018e71b6b4a30f52f4.json](/proof/1b65266794aeb8b387429b9cf76e1fb5ffea2f1073ef18018e71b6b4a30f52f4.json)

[![SkillProof](/badge-skillproof.svg)](/skill/genmedia-labs/skills/seedance-2-5-reference-to-video)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-04T15:30:26.856Z |
| Socket | pass | — | 2026-09-04T15:30:53.339Z |
| Snyk | pass | LOW | 2026-09-04T15:29:20.264226+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
