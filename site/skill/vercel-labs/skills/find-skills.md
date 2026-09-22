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
| Content hash | `sha256:468d9e87a5d26d9637dd6f013b25fa9563fbcebaae87ffee6f0f43719eaa03b4` |
| Upstream hash | `sha256:468d9e87a5d26d9637dd6f013b25fa9563fbcebaae87ffee6f0f43719eaa03b4` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.5` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | — |
| `exec` | — |
| `filesystem` | — |
| `secrets` | — |
| `agents` | — |
| `mcp` | — |
| `hygiene` | — |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:468d9e87a5d26d9637dd6f013b25fa9563fbcebaae87ffee6f0f43719eaa03b4
```

Raw machine-readable proof: [/proof/468d9e87a5d26d9637dd6f013b25fa9563fbcebaae87ffee6f0f43719eaa03b4.json](/proof/468d9e87a5d26d9637dd6f013b25fa9563fbcebaae87ffee6f0f43719eaa03b4.json)

[![SkillProof](/badge-skillproof.svg)](/skill/vercel-labs/skills/find-skills)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | LOW | 2026-04-15T12:00:00.000Z |
| Socket | pass | — | 2026-04-15T12:05:00.000Z |
| Snyk | pass | LOW | 2026-04-15T12:03:00.000Z |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
