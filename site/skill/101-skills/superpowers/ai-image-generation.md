---
title: "ai-image-generation — SkillProof"
head:
  - - meta
    - property: og:title
      content: "ai-image-generation — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for 101-skills/superpowers/ai-image-generation: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="ai-image-generation"
  sub="101-skills/superpowers/ai-image-generation — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [101-skills/superpowers](https://github.com/101-skills/superpowers) |
| skills.sh | [101-skills/superpowers/ai-image-generation](https://www.skills.sh/101-skills/superpowers/ai-image-generation) |
| Content hash | `sha256:cdbf923c0fb092bfde671fdda32c8752fe7819965cbc9c1e719e25e573a5f13d` |
| Upstream hash | `sha256:cdbf923c0fb092bfde671fdda32c8752fe7819965cbc9c1e719e25e573a5f13d` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.4` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: cloud.inference.sh, img1.jpg, img2.jpg, inference.sh, inference.sh), raw.githubusercontent.com, your-image.jpg |
| `exec` | shell: true<br>interpreters: bash |
| `filesystem` | — |
| `secrets` | — |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://cloud.inference.sh/app/files/u/4mg21r6ta37mpaz6ktzwtt8krr/01kg0v0nz7wv0qwqjtq1cam52z.jpeg), https://img1.jpg, https://img2.jpg, https://inference.sh), https://inference.sh/docs/apps/overview), https://inference.sh/docs/apps/running), https://inference.sh/docs/examples/image-generation), https://raw.githubusercontent.com/inference-sh/skills/refs/heads/main/cli-install.md), https://your-image.jpg |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:cdbf923c0fb092bfde671fdda32c8752fe7819965cbc9c1e719e25e573a5f13d
```

Raw machine-readable proof: [/proof/cdbf923c0fb092bfde671fdda32c8752fe7819965cbc9c1e719e25e573a5f13d.json](/proof/cdbf923c0fb092bfde671fdda32c8752fe7819965cbc9c1e719e25e573a5f13d.json)

[![SkillProof](/badge-skillproof.svg)](/skill/101-skills/superpowers/ai-image-generation)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-08-31T22:59:56.971Z |
| Socket | warn | — | 2026-08-31T22:59:55.006Z |
| Snyk | pass | LOW | 2026-08-31T22:59:22.419407+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
