---
title: "find-skills — SkillProof"
head:
  - - meta
    - property: og:title
      content: "find-skills — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for vercel-labs/skills/find-skills: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="find-skills"
  sub="vercel-labs/skills/find-skills — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [vercel-labs/skills](https://github.com/vercel-labs/skills) |
| skills.sh | [vercel-labs/skills/find-skills](https://www.skills.sh/vercel-labs/skills/find-skills) |
| Content hash | `sha256:b146008599c31057cef1c145774cea5d5afb30e8f43fa802e47a4b461419aaaf` |
| Upstream hash | `sha256:b146008599c31057cef1c145774cea5d5afb30e8f43fa802e47a4b461419aaaf` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.4` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: skills.sh |
| `exec` | shell: true<br>interpreters: bash |
| `filesystem` | — |
| `secrets` | — |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://skills.sh/, https://skills.sh/), https://skills.sh/vercel-labs/agent-skills/react-best-practices |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:b146008599c31057cef1c145774cea5d5afb30e8f43fa802e47a4b461419aaaf
```

Raw machine-readable proof: [/proof/b146008599c31057cef1c145774cea5d5afb30e8f43fa802e47a4b461419aaaf.json](/proof/b146008599c31057cef1c145774cea5d5afb30e8f43fa802e47a4b461419aaaf.json)

[![SkillProof](/badge-skillproof.svg)](/skill/vercel-labs/skills/find-skills)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-15T08:00:05.922Z |
| Socket | pass | — | 2026-09-15T08:00:19.647Z |
| Snyk | warn | MEDIUM | 2026-09-15T07:59:46.904821+00:00 |
| Runlayer | pass | NONE | 2026-03-14T07:45:27.566Z |
| ZeroLeaks | pass | NONE | 2026-04-16T07:47:59.444Z |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
