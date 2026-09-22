---
title: "google-agents-cli-deploy — SkillProof"
head:
  - - meta
    - property: og:title
      content: "google-agents-cli-deploy — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for google/agents-cli/google-agents-cli-deploy: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash mismatch"
  title="google-agents-cli-deploy"
  sub="google/agents-cli/google-agents-cli-deploy — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [google/agents-cli](https://github.com/google/agents-cli) |
| skills.sh | [google/agents-cli/google-agents-cli-deploy](https://www.skills.sh/google/agents-cli/google-agents-cli-deploy) |
| Content hash | `sha256:e827e9481e15c1941a5d32e67e628d466dfd615a0a1527c0cad8392123bc9264` |
| Upstream hash | `sha256:4ff03ec41c03c8c635e18c823a2c5e3012f525a315401ed1f3bb118ec9e1ba02` |
| Hash match | **no — the snapshot differs from upstream; investigate before trusting this proof** |
| Scanner | `skillproof-scan/0.1.5` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: 127.0.0.1, adk.dev, cloud.google.com, docs.astral.sh, docs.cloud.google.com, github.com, location-aiplatform.googleapis.com, my-agent-abc123.run.app, my-agent.run.app, registry.terraform.io, service_name-project_number.region.run.app<br>via: curl |
| `exec` | shell: true<br>interpreters: bash, node, python3 |
| `filesystem` | — |
| `secrets` | env_vars: API_KEY, KEY, MY_SECRET_NAME, NEW_API_KEY, SECRET, SECRET_ID, SECRET_NAME, YOUR_API_KEY |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: http://127.0.0.1:8080, http://127.0.0.1:8080/, http://127.0.0.1:8080/apps/app/users/test-user/sessions, http://127.0.0.1:8080/run_sse, https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT/locations/LOCATION/reasoningEngines/ID, https://SERVICE_NAME-PROJECT_NUMBER.REGION.run.app, https://adk.dev/deploy/agent-runtime/index.md, https://adk.dev/deploy/cloud-run/index.md, https://adk.dev/deploy/gke/index.md, https://cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/private-service-connect-interface), https://cloud.google.com/run/docs/securing/identity-aware-proxy-cloud-run#manage_user_or_group_access)., https://cloud.google.com/vpc/docs/create-manage-network-attachments), https://docs.astral.sh/uv/getting-started/installation/index.md), https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview), https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview)., https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway), https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-semantic-governance, https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/semantic-governance-overview, https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-gateway-runtime-deploy)., https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity), https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/optimize-and-scale#underutilized-workers)., https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/private-service-connect-interface), https://github.com/google/adk-go/tree/main/examples/rest), https://github.com/google/adk-samples/tree/main/core/python/ambient-expense-agent), https://github.com/google/adk-samples/tree/main/core/python/cross-session-memory), https://my-agent-abc123.run.app, https://my-agent.run.app, https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/network_services_agent_gateway) |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:e827e9481e15c1941a5d32e67e628d466dfd615a0a1527c0cad8392123bc9264
```

Raw machine-readable proof: [/proof/e827e9481e15c1941a5d32e67e628d466dfd615a0a1527c0cad8392123bc9264.json](/proof/e827e9481e15c1941a5d32e67e628d466dfd615a0a1527c0cad8392123bc9264.json)

[![SkillProof](/badge-skillproof.svg)](/skill/google/agents-cli/google-agents-cli-deploy)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-17T07:33:04.766Z |
| Socket | warn | — | 2026-09-17T07:33:29.745Z |
| Snyk | pass | LOW | 2026-09-17T07:32:26.030406+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
