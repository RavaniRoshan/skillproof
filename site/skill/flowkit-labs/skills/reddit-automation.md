---
title: "reddit-automation — SkillProof"
head:
  - - meta
    - property: og:title
      content: "reddit-automation — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for flowkit-labs/skills/reddit-automation: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="reddit-automation"
  sub="flowkit-labs/skills/reddit-automation — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [flowkit-labs/skills](https://github.com/flowkit-labs/skills) |
| skills.sh | [flowkit-labs/skills/reddit-automation](https://www.skills.sh/flowkit-labs/skills/reddit-automation) |
| Content hash | `sha256:278abced163b5721c6fec6996f73d521c8901b905b4b2fca45757d1ff0ebbfc6` |
| Upstream hash | `sha256:278abced163b5721c6fec6996f73d521c8901b905b4b2fca45757d1ff0ebbfc6` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.5` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: doany.ai, github.com |
| `exec` | — |
| `filesystem` | — |
| `secrets` | — |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://doany.ai, https://doany.ai/?utm_source=skills.sh&utm_medium=skill&utm_campaign=reddit-automation), https://doany.ai/?utm_source=skills.sh&utm_medium=skill&utm_campaign=reddit-automation)., https://github.com/doany-skills/skills) |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:278abced163b5721c6fec6996f73d521c8901b905b4b2fca45757d1ff0ebbfc6
```

Raw machine-readable proof: [/proof/278abced163b5721c6fec6996f73d521c8901b905b4b2fca45757d1ff0ebbfc6.json](/proof/278abced163b5721c6fec6996f73d521c8901b905b4b2fca45757d1ff0ebbfc6.json)

[![SkillProof](/badge-skillproof.svg)](/skill/flowkit-labs/skills/reddit-automation)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-08-12T06:35:51.806Z |
| Socket | pass | — | 2026-08-13T10:17:49.335Z |
| Snyk | warn | MEDIUM | 2026-08-12T06:35:32.113688+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
