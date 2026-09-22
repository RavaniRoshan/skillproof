---
title: "twitter-automation — SkillProof"
head:
  - - meta
    - property: og:title
      content: "twitter-automation — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for qu-skills/superpowers/twitter-automation: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="twitter-automation"
  sub="qu-skills/superpowers/twitter-automation — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [qu-skills/superpowers](https://github.com/qu-skills/superpowers) |
| skills.sh | [qu-skills/superpowers/twitter-automation](https://www.skills.sh/qu-skills/superpowers/twitter-automation) |
| Content hash | `sha256:730ab5370b839e0e339d5e7894fd8c414380529be3c42f63983e0fa6f0789061` |
| Upstream hash | `sha256:730ab5370b839e0e339d5e7894fd8c414380529be3c42f63983e0fa6f0789061` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.5` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: cloud.inference.sh, inference.sh, inference.sh), raw.githubusercontent.com, your-image-url.jpg |
| `exec` | shell: true<br>interpreters: bash |
| `filesystem` | — |
| `secrets` | — |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://cloud.inference.sh/app/files/u/4mg21r6ta37mpaz6ktzwtt8krr/01kgad3pxsh3z3hnfpjyjpx4x4.jpeg), https://inference.sh), https://inference.sh/docs/apps/overview), https://inference.sh/docs/examples/x-integration), https://inference.sh/docs/integrations/x), https://raw.githubusercontent.com/inference-sh/skills/refs/heads/main/cli-install.md), https://your-image-url.jpg |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:730ab5370b839e0e339d5e7894fd8c414380529be3c42f63983e0fa6f0789061
```

Raw machine-readable proof: [/proof/730ab5370b839e0e339d5e7894fd8c414380529be3c42f63983e0fa6f0789061.json](/proof/730ab5370b839e0e339d5e7894fd8c414380529be3c42f63983e0fa6f0789061.json)

[![SkillProof](/badge-skillproof.svg)](/skill/qu-skills/superpowers/twitter-automation)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-02T14:20:05.547Z |
| Socket | warn | — | 2026-09-02T14:18:48.566Z |
| Snyk | pass | LOW | 2026-09-02T14:18:15.650696+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
