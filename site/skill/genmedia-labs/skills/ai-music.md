---
title: "ai-music — SkillProof"
head:
  - - meta
    - property: og:title
      content: "ai-music — SkillProof"
  - - meta
    - property: og:description
      content: "Capability proof for genmedia-labs/skills/ai-music: content hash, capabilities, and verification."
  - - meta
    - property: og:type
      content: article
---

<DocHero
  eyebrow="Proof · hash match"
  title="ai-music"
  sub="genmedia-labs/skills/ai-music — capability proof generated 2026-09-22."
/>

| Field | Value |
| --- | --- |
| Repository | [genmedia-labs/skills](https://github.com/genmedia-labs/skills) |
| skills.sh | [genmedia-labs/skills/ai-music](https://www.skills.sh/genmedia-labs/skills/ai-music) |
| Content hash | `sha256:44585b0aa5fbbfb0ed7868c3703565ac903999ab89ddcd9d543affd4e46b7561` |
| Upstream hash | `sha256:44585b0aa5fbbfb0ed7868c3703565ac903999ab89ddcd9d543affd4e46b7561` |
| Hash match | yes |
| Scanner | `skillproof-scan/0.1.5` |
| Observed | 2026-09-22 |

## Capabilities

| Group | Detected |
| --- | --- |
| `network` | outbound_domains: docs.runcomfy.com, www.runcomfy.com, www.skills.sh<br>via: curl |
| `exec` | shell: true<br>interpreters: bash |
| `filesystem` | reads: ~/.config/runcomfy/token.json |
| `secrets` | env_vars: RUNCOMFY_TOKEN |
| `agents` | — |
| `mcp` | — |
| `hygiene` | external_urls: https://docs.runcomfy.com/cli/introduction?utm_source=skills.sh&utm_medium=skill&utm_campaign=ai-music), https://docs.runcomfy.com/cli/troubleshooting?utm_source=skills.sh&utm_medium=skill&utm_campaign=ai-music)., https://www.runcomfy.com, https://www.runcomfy.com/?utm_source=skills.sh&utm_medium=skill&utm_campaign=ai-music), https://www.runcomfy.com/models/acestep-ai/ace-step-1.5/text-to-audio?utm_source=skills.sh&utm_medium=skill&utm_campaign=ai-music), https://www.runcomfy.com/models/acestep-ai/ace-step/audio-inpaint?utm_source=skills.sh&utm_medium=skill&utm_campaign=ai-music), https://www.runcomfy.com/models/acestep-ai/ace-step/audio-outpaint?utm_source=skills.sh&utm_medium=skill&utm_campaign=ai-music), https://www.runcomfy.com/models/acestep-ai/ace-step/text-to-audio?utm_source=skills.sh&utm_medium=skill&utm_campaign=ai-music), https://www.runcomfy.com/models/elevenlabs/elevenlabs/music-generation?utm_source=skills.sh&utm_medium=skill&utm_campaign=ai-music), https://www.runcomfy.com/models?utm_source=skills.sh&utm_medium=skill&utm_campaign=ai-music), https://www.skills.sh/agentspace-so/runcomfy-agent-skills/ace-step), https://www.skills.sh/agentspace-so/runcomfy-agent-skills/ai-avatar-video), https://www.skills.sh/agentspace-so/runcomfy-agent-skills/ai-video-generation), https://www.skills.sh/agentspace-so/runcomfy-agent-skills/elevenlabs-music-generation), https://www.skills.sh/agentspace-so/runcomfy-agent-skills/runcomfy-cli) |

## Verify it yourself

```bash
node packages/cli/dist/index.js verify local@sha256:44585b0aa5fbbfb0ed7868c3703565ac903999ab89ddcd9d543affd4e46b7561
```

Raw machine-readable proof: [/proof/44585b0aa5fbbfb0ed7868c3703565ac903999ab89ddcd9d543affd4e46b7561.json](/proof/44585b0aa5fbbfb0ed7868c3703565ac903999ab89ddcd9d543affd4e46b7561.json)

[![SkillProof](/badge-skillproof.svg)](/skill/genmedia-labs/skills/ai-music)

## External evidence

| Provider | Status | Risk | Observed |
| --- | --- | --- | --- |
| Gen Agent Trust Hub | pass | SAFE | 2026-08-13T02:09:18.357Z |
| Socket | pass | — | 2026-08-13T02:10:29.718Z |
| Snyk | warn | MEDIUM | 2026-08-13T02:09:17.457334+00:00 |

SkillProof's own capability analysis above stays separate from these
third-party findings; they are never collapsed into one score.

## Limitations

Heuristic substring and regex signals only — never a safety verdict. See
the [CLI reference](/guide/cli) for what the scanner can and cannot see.
