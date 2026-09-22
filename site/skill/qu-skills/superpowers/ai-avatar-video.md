---
title: "ai-avatar-video — SkillProof"
head:
  - - meta
    - property: og:title
      content: "ai-avatar-video — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for qu-skills/superpowers/ai-avatar-video: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="ai-avatar-video"
  sub="qu-skills/superpowers/ai-avatar-video — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [qu-skills/superpowers](https://github.com/qu-skills/superpowers) |
| skills.sh | [qu-skills/superpowers/ai-avatar-video](https://www.skills.sh/qu-skills/superpowers/ai-avatar-video) |
| Content hash | `sha256:a623d475ddb5b055d3ea0f2d0c821cbe2e6c5d75816663241eb68f4c4fa9e777` |
| Upstream hash | `sha256:a623d475ddb5b055d3ea0f2d0c821cbe2e6c5d75816663241eb68f4c4fa9e777` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.4` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: audio.mp3, cloud.inference.sh, face.jpg, inference.sh, inference.sh), original-video.mp4, portrait.jpg, presenter-photo.jpg, raw.githubusercontent.com, speech.mp3, video.mp4 |
| `exec` | shell: true<br>interpreters: bash |
| `filesystem` | — |
| `secrets` | — |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://audio.mp3, https://cloud.inference.sh/app/files/u/4mg21r6ta37mpaz6ktzwtt8krr/01kg0tszs96s0n8z5gy8y5mbg7.jpeg), https://face.jpg, https://inference.sh), https://inference.sh/docs/api/sdk/streaming), https://inference.sh/docs/apps/running), https://inference.sh/docs/examples/content-pipeline), https://original-video.mp4, https://portrait.jpg, https://presenter-photo.jpg, https://raw.githubusercontent.com/inference-sh/skills/refs/heads/main/cli-install.md), https://speech.mp3, https://video.mp4 |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:a623d475ddb5b055d3ea0f2d0c821cbe2e6c5d75816663241eb68f4c4fa9e777
```

Raw machine-readable proof: [/proof/a623d475ddb5b055d3ea0f2d0c821cbe2e6c5d75816663241eb68f4c4fa9e777.json](/proof/a623d475ddb5b055d3ea0f2d0c821cbe2e6c5d75816663241eb68f4c4fa9e777.json)

[![SkillProof](/badge-skillproof.svg)](/skill/qu-skills/superpowers/ai-avatar-video)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-02T14:19:41.284Z |
| Socket | warn | — | 2026-09-02T14:18:49.487Z |
| Snyk | pass | LOW | 2026-09-02T14:18:17.162239+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
