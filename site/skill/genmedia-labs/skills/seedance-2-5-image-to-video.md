---
title: "seedance-2-5-image-to-video — SkillProof"
head:
  - - meta
    - property: og:title
      content: "seedance-2-5-image-to-video — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for genmedia-labs/skills/seedance-2-5-image-to-video: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="seedance-2-5-image-to-video"
  sub="genmedia-labs/skills/seedance-2-5-image-to-video — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [genmedia-labs/skills](https://github.com/genmedia-labs/skills) |
| skills.sh | [genmedia-labs/skills/seedance-2-5-image-to-video](https://www.skills.sh/genmedia-labs/skills/seedance-2-5-image-to-video) |
| Content hash | `sha256:7686d1048a4dc678c679d27203314fdd53ad7030c77649c715bf217d4032ab0a` |
| Upstream hash | `sha256:7686d1048a4dc678c679d27203314fdd53ad7030c77649c715bf217d4032ab0a` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.5` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: docs.runcomfy.com, github.com, model-api.runcomfy.net, www.runcomfy.com |
| `exec` | shell: true<br>interpreters: bash |
| `filesystem` | reads: ~/.config/runcomfy/token.json |
| `secrets` | env_vars: RUNCOMFY_TOKEN |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://docs.runcomfy.com/cli/troubleshooting?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-image-to-video&utm_content=cli-docs-troubleshooting)., https://github.com/genmedia-labs/skills/tree/main/seedance-2-5-image-to-video), https://model-api.runcomfy.net/v1/models/bytedance/seedance-2.5/image-to-video/720p, https://www.runcomfy.com, https://www.runcomfy.com/?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-image-to-video&utm_content=home), https://www.runcomfy.com/models/bytedance/seedance-2.5/first-last-frame?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-image-to-video&utm_content=bytedance-seedance-2.5-first-last-frame), https://www.runcomfy.com/models/bytedance/seedance-2.5/image-to-video/480p?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-image-to-video&utm_content=bytedance-seedance-2.5-image-to-video-480p), https://www.runcomfy.com/models/bytedance/seedance-2.5/image-to-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-image-to-video&utm_content=bytedance-seedance-2.5-image-to-video), https://www.runcomfy.com/models/bytedance/seedance-2.5/reference-to-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-image-to-video&utm_content=bytedance-seedance-2.5-reference-to-video), https://www.runcomfy.com/models/bytedance/seedance-2.5/text-to-video?utm_source=skills.sh&utm_medium=skill&utm_campaign=seedance-2-5-image-to-video&utm_content=bytedance-seedance-2.5-text-to-video) |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:7686d1048a4dc678c679d27203314fdd53ad7030c77649c715bf217d4032ab0a
```

Raw machine-readable proof: [/proof/7686d1048a4dc678c679d27203314fdd53ad7030c77649c715bf217d4032ab0a.json](/proof/7686d1048a4dc678c679d27203314fdd53ad7030c77649c715bf217d4032ab0a.json)

[![SkillProof](/badge-skillproof.svg)](/skill/genmedia-labs/skills/seedance-2-5-image-to-video)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-04T15:31:11.022Z |
| Socket | pass | — | 2026-09-04T15:31:42.331Z |
| Snyk | pass | LOW | 2026-09-04T15:30:09.255260+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
