---
title: "google-agents-cli-adk-code — SkillProof"
head:
  - - meta
    - property: og:title
      content: "google-agents-cli-adk-code — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for google/agents-cli/google-agents-cli-adk-code: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash mismatch"
  title="google-agents-cli-adk-code"
  sub="google/agents-cli/google-agents-cli-adk-code — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [google/agents-cli](https://github.com/google/agents-cli) |
| skills.sh | [google/agents-cli/google-agents-cli-adk-code](https://www.skills.sh/google/agents-cli/google-agents-cli-adk-code) |
| Content hash | `sha256:c8164ab8837b7c30570fb20113dfbde3fb341fd4298411dd65d52c9be878948a` |
| Upstream hash | `sha256:d385391b7395e66983914523ea6cbef47d02c4ed3b85d9cc7b47b6a97e4d08cf` |
| Hash match | **no — the snapshot differs from upstream; investigate before trusting this proof** |
| Scanner | `skillproof-scan/0.1.4` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: adk.dev, ai.google.dev, docs.cloud.google.com, github.com, my-mcp-server.example.com, pkg.go.dev, www.googleapis.com<br>via: curl |
| `exec` | shell: true<br>interpreters: bash, node, python3 |
| `filesystem` | reads: .env |
| `secrets` | env_vars: GEMINI_API_KEY, GOOGLE_API_KEY, KEY, OPENAI_API_KEY |
| `agents` | — |
| `mcp` | servers: mcp, mcp-server.example.com, mcp., mcp_server, mcp_server_url, mcp_tool, mcp_tool.mcp_session_manager, mcpserver, mcptools, mcptoolset, mcptoolset.config, mcptoolset.new |
| `hygiene` | external_urls: https://adk.dev/agents/models/anthropic/index.md), https://adk.dev/agents/models/litellm/index.md), https://adk.dev/agents/models/ollama/index.md), https://adk.dev/agents/models/vllm/index.md), https://adk.dev/apps/index.md), https://adk.dev/graphs/data-handling/index.md), https://adk.dev/graphs/dynamic/index.md), https://adk.dev/graphs/human-input/index.md), https://adk.dev/graphs/routes/index.md), https://adk.dev/integrations/a2ui/index.md, https://adk.dev/llms.txt, https://adk.dev/llms.txt), https://adk.dev/plugins/index.md), https://adk.dev/runtime/ambient-agents/)., https://adk.dev/safety/index.md), https://adk.dev/tools-custom/authentication/), https://adk.dev/tools-custom/openapi-tools/index.md), https://adk.dev/workflows/collaboration/index.md), https://adk.dev/workflows/index.md), https://ai.google.dev/gemini-api/docs/agents), https://ai.google.dev/gemini-api/docs/custom-agents)., https://ai.google.dev/gemini-api/docs/interactions-overview), https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents), https://github.com/google/A2UI), https://github.com/google/A2UI/tree/main/docs, https://github.com/google/A2UI/tree/main/samples/agent/adk, https://github.com/google/adk-go/tree/main/examples), https://github.com/google/adk-go/tree/main/examples)., https://github.com/google/adk-go/tree/main/examples/workflow), https://github.com/google/adk-python/tree/main/contributing/samples/managed_agent/basic), https://github.com/google/adk-python/tree/main/contributing/samples/managed_agent/code_execution)., https://github.com/google/adk-samples, https://github.com/google/adk-samples), https://github.com/google/adk-samples)., https://github.com/google/adk-samples/tree/main/contrib), https://github.com/google/adk-samples/tree/main/core/python/cross-session-memory), https://github.com/google/adk-samples/tree/main/core/python/deep-search), https://my-mcp-server.example.com/mcp, https://pkg.go.dev/google.golang.org/adk/v2/workflow), https://www.googleapis.com/auth/cloud-platform |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:c8164ab8837b7c30570fb20113dfbde3fb341fd4298411dd65d52c9be878948a
```

Raw machine-readable proof: [/proof/c8164ab8837b7c30570fb20113dfbde3fb341fd4298411dd65d52c9be878948a.json](/proof/c8164ab8837b7c30570fb20113dfbde3fb341fd4298411dd65d52c9be878948a.json)

[![SkillProof](/badge-skillproof.svg)](/skill/google/agents-cli/google-agents-cli-adk-code)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-09-17T07:32:57.987Z |
| Socket | pass | — | 2026-09-17T07:33:30.345Z |
| Snyk | warn | MEDIUM | 2026-09-17T07:32:26.244586+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
