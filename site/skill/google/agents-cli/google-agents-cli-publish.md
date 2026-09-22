---
title: "google-agents-cli-publish — SkillProof"
head:
  - - meta
    - property: og:title
      content: "google-agents-cli-publish — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for google/agents-cli/google-agents-cli-publish: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="google-agents-cli-publish"
  sub="google/agents-cli/google-agents-cli-publish — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [google/agents-cli](https://github.com/google/agents-cli) |
| skills.sh | [google/agents-cli/google-agents-cli-publish](https://www.skills.sh/google/agents-cli/google-agents-cli-publish) |
| Content hash | `sha256:daf78c84db34690263be451c1858dfdc540e2aa520594f39830497e3fc8b758d` |
| Upstream hash | `sha256:daf78c84db34690263be451c1858dfdc540e2aa520594f39830497e3fc8b758d` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.5` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: docs.cloud.google.com, my-service-abc123.us-east1.run.app |
| `exec` | shell: true<br>interpreters: bash, python3 |
| `filesystem` | — |
| `secrets` | — |
| `agents` | — |
| `mcp` | servers: mcp, mcp-server-spec-content, mcp-server-spec-type, mcp-servers, mcp_server_spec |
| `hygiene` | external_urls: https://docs.cloud.google.com/agent-registry/manage-agents, https://docs.cloud.google.com/agent-registry/register-mcp-servers, https://my-service-abc123.us-east1.run.app/a2a/app/.well-known/agent-card.json |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:daf78c84db34690263be451c1858dfdc540e2aa520594f39830497e3fc8b758d
```

Raw machine-readable proof: [/proof/daf78c84db34690263be451c1858dfdc540e2aa520594f39830497e3fc8b758d.json](/proof/daf78c84db34690263be451c1858dfdc540e2aa520594f39830497e3fc8b758d.json)

[![SkillProof](/badge-skillproof.svg)](/skill/google/agents-cli/google-agents-cli-publish)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-17T07:32:47.575Z |
| Socket | pass | — | 2026-09-17T07:33:30.397Z |
| Snyk | pass | LOW | 2026-09-17T07:32:26.254571+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
