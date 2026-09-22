---
title: Skill proofs
---

<DocHero
  eyebrow="Evidence"
  title="Skill proofs"
  sub="Content-addressed capability proofs for skills discovered on skills.sh. One page per skill, each independently verifiable."
/>

| Skill | Hash match | Observed |
| --- | --- | --- |
| [101-skills/superpowers/ai-avatar-video](/skill/101-skills/superpowers/ai-avatar-video) | yes | 2026-09-22 |
| [101-skills/superpowers/ai-image-generation](/skill/101-skills/superpowers/ai-image-generation) | yes | 2026-09-22 |
| [101-skills/superpowers/ai-video-generation](/skill/101-skills/superpowers/ai-video-generation) | yes | 2026-09-22 |
| [101-skills/superpowers/twitter-automation](/skill/101-skills/superpowers/twitter-automation) | yes | 2026-09-22 |
| [designed-by-ai/skills/design-mobile-apps](/skill/designed-by-ai/skills/design-mobile-apps) | yes | 2026-09-22 |
| [flowkit-labs/skills/reddit-automation](/skill/flowkit-labs/skills/reddit-automation) | yes | 2026-09-22 |
| [genmedia-labs/skills/ai-image-generation](/skill/genmedia-labs/skills/ai-image-generation) | yes | 2026-09-22 |
| [genmedia-labs/skills/ai-music](/skill/genmedia-labs/skills/ai-music) | yes | 2026-09-22 |
| [genmedia-labs/skills/ai-video-generation](/skill/genmedia-labs/skills/ai-video-generation) | yes | 2026-09-22 |
| [genmedia-labs/skills/image-to-video](/skill/genmedia-labs/skills/image-to-video) | yes | 2026-09-22 |
| [genmedia-labs/skills/seedance-2-5-image-to-video](/skill/genmedia-labs/skills/seedance-2-5-image-to-video) | yes | 2026-09-22 |
| [genmedia-labs/skills/seedance-2-5-reference-to-video](/skill/genmedia-labs/skills/seedance-2-5-reference-to-video) | yes | 2026-09-22 |
| [genmedia-labs/skills/video-edit](/skill/genmedia-labs/skills/video-edit) | yes | 2026-09-22 |
| [genmedia-labs/skills/wan-3-0-prime-reference-to-video](/skill/genmedia-labs/skills/wan-3-0-prime-reference-to-video) | yes | 2026-09-22 |
| [google/agents-cli/google-agents-cli-adk-code](/skill/google/agents-cli/google-agents-cli-adk-code) | no | 2026-09-22 |
| [google/agents-cli/google-agents-cli-deploy](/skill/google/agents-cli/google-agents-cli-deploy) | no | 2026-09-22 |
| [google/agents-cli/google-agents-cli-eval](/skill/google/agents-cli/google-agents-cli-eval) | no | 2026-09-22 |
| [google/agents-cli/google-agents-cli-scaffold](/skill/google/agents-cli/google-agents-cli-scaffold) | no | 2026-09-22 |
| [google/agents-cli/google-agents-cli-workflow](/skill/google/agents-cli/google-agents-cli-workflow) | no | 2026-09-22 |
| [qu-skills/superpowers/ai-avatar-video](/skill/qu-skills/superpowers/ai-avatar-video) | yes | 2026-09-22 |
| [qu-skills/superpowers/ai-image-generation](/skill/qu-skills/superpowers/ai-image-generation) | yes | 2026-09-22 |
| [qu-skills/superpowers/ai-video-generation](/skill/qu-skills/superpowers/ai-video-generation) | yes | 2026-09-22 |
| [qu-skills/superpowers/twitter-automation](/skill/qu-skills/superpowers/twitter-automation) | yes | 2026-09-22 |
| [typesafe-ai/skills/typesafe-ai](/skill/typesafe-ai/skills/typesafe-ai) | yes | 2026-09-22 |
| [vercel-labs/skills/find-skills](/skill/vercel-labs/skills/find-skills) | yes | 2026-09-22 |

## Findings

- 25 proofs indexed, 5 upstream hash mismatches (both hashes recorded on each page; mismatches are investigated, never normalized away).
  - google/agents-cli/google-agents-cli-adk-code
  - google/agents-cli/google-agents-cli-deploy
  - google/agents-cli/google-agents-cli-eval
  - google/agents-cli/google-agents-cli-scaffold
  - google/agents-cli/google-agents-cli-workflow
- 4 byte-identical content groups under different names (content addressing beats names):
  - `101-skills/superpowers/ai-avatar-video` = `qu-skills/superpowers/ai-avatar-video`
  - `101-skills/superpowers/ai-image-generation` = `qu-skills/superpowers/ai-image-generation`
  - `101-skills/superpowers/ai-video-generation` = `qu-skills/superpowers/ai-video-generation`
  - `101-skills/superpowers/twitter-automation` = `qu-skills/superpowers/twitter-automation`

New proofs are added by running `site/proof-data/generate.mjs` against a
skill snapshot and checking in the result. See the
[CLI reference](/guide/cli#skills-sh-read-only-needs-a-token) for the
read-only commands behind each page.
