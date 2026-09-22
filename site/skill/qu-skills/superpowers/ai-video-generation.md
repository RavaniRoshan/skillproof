---
title: "ai-video-generation — SkillProof"
head:
  - - meta
    - property: og:title
      content: "ai-video-generation — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for qu-skills/superpowers/ai-video-generation: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="ai-video-generation"
  sub="qu-skills/superpowers/ai-video-generation — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [qu-skills/superpowers](https://github.com/qu-skills/superpowers) |
| skills.sh | [qu-skills/superpowers/ai-video-generation](https://www.skills.sh/qu-skills/superpowers/ai-video-generation) |
| Content hash | `sha256:bfd37efbc89490cdf387f375de741394e94f945b08ffac71450b7d13d9e67e4c` |
| Upstream hash | `sha256:bfd37efbc89490cdf387f375de741394e94f945b08ffac71450b7d13d9e67e4c` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.4` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: audio.mp3, clip1.mp4, clip2.mp4, cloud.inference.sh, face.jpg, inference.sh, inference.sh), portrait.jpg, raw.githubusercontent.com, silent-video.mp4, speech.mp3, your-image.jpg, your-video.mp4 |
| `exec` | shell: true<br>interpreters: bash |
| `filesystem` | — |
| `secrets` | — |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://audio.mp3, https://clip1.mp4, https://clip2.mp4, https://cloud.inference.sh/app/files/u/4mg21r6ta37mpaz6ktzwtt8krr/01kg2c0egyg243mnyth4y6g51q.jpeg), https://face.jpg, https://inference.sh), https://inference.sh/docs/api/sdk/streaming), https://inference.sh/docs/apps/running), https://inference.sh/docs/examples/content-pipeline), https://portrait.jpg, https://raw.githubusercontent.com/inference-sh/skills/refs/heads/main/cli-install.md), https://silent-video.mp4, https://speech.mp3, https://your-image.jpg, https://your-video.mp4 |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:bfd37efbc89490cdf387f375de741394e94f945b08ffac71450b7d13d9e67e4c
```

Raw machine-readable proof: [/proof/bfd37efbc89490cdf387f375de741394e94f945b08ffac71450b7d13d9e67e4c.json](/proof/bfd37efbc89490cdf387f375de741394e94f945b08ffac71450b7d13d9e67e4c.json)

[![SkillProof](/badge-skillproof.svg)](/skill/qu-skills/superpowers/ai-video-generation)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-02T14:20:15.557Z |
| Socket | warn | — | 2026-09-02T14:18:49.734Z |
| Snyk | pass | LOW | 2026-09-02T14:18:17.229828+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
