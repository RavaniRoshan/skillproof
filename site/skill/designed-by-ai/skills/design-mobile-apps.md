---
title: "design-mobile-apps — SkillProof"
head:
  - - meta
    - property: og:title
      content: "design-mobile-apps — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for designed-by-ai/skills/design-mobile-apps: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="design-mobile-apps"
  sub="designed-by-ai/skills/design-mobile-apps — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [designed-by-ai/skills](https://github.com/designed-by-ai/skills) |
| skills.sh | [designed-by-ai/skills/design-mobile-apps](https://www.skills.sh/designed-by-ai/skills/design-mobile-apps) |
| Content hash | `sha256:5e1937c85c3bbf6694f1c3f4002a395fe0d0e7fc2af874b616baa3bbbc1f9633` |
| Upstream hash | `sha256:5e1937c85c3bbf6694f1c3f4002a395fe0d0e7fc2af874b616baa3bbbc1f9633` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.4` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: api.iconify.design, example.com, iconify.design), raw.githubusercontent.com, sleek.design, sleek.design)<br>via: curl |
| `exec` | — |
| `filesystem` | — |
| `secrets` | env_vars: SLEEK_API_KEY |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://api.iconify.design/, https://api.iconify.design/solar/heart-bold.svg, https://example.com/ref.png, https://iconify.design), https://raw.githubusercontent.com/sleekdotdesign/agent-skills/main/assets/hero.png), https://sleek.design, https://sleek.design), https://sleek.design/agents/setup, https://sleek.design/api/v1/device/poll, https://sleek.design/api/v1/device/start, https://sleek.design/api/v1/docs, https://sleek.design/api/v1/spec.json, https://sleek.design/dashboard/api-keys, https://sleek.design/project/:projectId |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:5e1937c85c3bbf6694f1c3f4002a395fe0d0e7fc2af874b616baa3bbbc1f9633
```

Raw machine-readable proof: [/proof/5e1937c85c3bbf6694f1c3f4002a395fe0d0e7fc2af874b616baa3bbbc1f9633.json](/proof/5e1937c85c3bbf6694f1c3f4002a395fe0d0e7fc2af874b616baa3bbbc1f9633.json)

[![SkillProof](/badge-skillproof.svg)](/skill/designed-by-ai/skills/design-mobile-apps)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-06T10:14:20.890Z |
| Socket | pass | — | 2026-09-06T10:14:46.658Z |
| Snyk | pass | LOW | 2026-09-06T10:14:13.936594+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
