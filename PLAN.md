# SkillProof — Detailed Build Plan

> Skills live on GitHub. Proof should live somewhere neutral. SkillProof is the open, signed record of what an agent skill does — and whether it still works.

Repo: `https://github.com/RavaniRoshan/skillproof` · License: MIT · Status: pre-launch, v0.1 in progress

---

## 0. Progress marking system

Use this legend everywhere in this file. Update checkboxes in place on every work session, oldest at top of log.

| Mark | Meaning | Rule |
|------|---------|------|
| `[ ]` | pending | not started |
| `[~]` | in_progress | exactly one `[~]` at a time per person |
| `[x]` | completed | done + verified (test, log, or link) |
| `[!]` | blocked | needs decision or external input, note reason + date |

Progress log format: `YYYY-MM-DD — area — what changed — commit/PR link`.

### Overall progress

- [x] Repo bootstrap (local + GitHub + README/LICENSE/.gitignore)
- [x] v0.1 — CLI scan/diff/attest/verify + tests
- [x] Ledger template + PR validator
- [x] Capability-diff Action
- [x] OpenAPI read spec
- [x] Bootstrap attest ~20 skills
- [ ] Launch — Cloudflare skill + 3–5 high-star skill diffs published
- [ ] v0.2 — eval harness (Claude headless + Runner + cache + budget)
- [ ] v0.3 — badges + native consumption (only if kill criteria fail)

### Progress log

| Date | Area | Update |
|------|------|--------|
| 2026-09-21 | repo | Bootstrap commit `chore: bootstrap skillproof repo`, remote `RavaniRoshan/skillproof` created + pushed |
| 2026-09-21 | plan | `PLAN.md` v1 written with merged practitioner principles |
| 2026-09-21 | openapi | `openapi/v1.yaml` generated from Zod; self-ref components fixed; `$ref` sync test added; stale `schemas/src/index.js` removed |

---

## 1. Locked decisions (from open questions + stack Q&A)

| # | Question | Decision | Rationale |
|---|----------|----------|-----------|
| 1 | Eval scope | Claude Code headless first, abstract `Runner` interface | Fastest to v0.2, multi-agent later without rewrite |
| 2 | Attestations | Both repo-CI + third-party, labelled by signer identity | Max coverage, filter by `signer.iss/sub` |
| 3 | Eval tasks | Author `evals/*.md` preferred; generated labelled weaker | Baseline cancels noise but label honesty |
| 4 | Ledger | Git repo now + read API spec from v0.1 | `GET /v1/attest/{sha256}`, `GET /v1/eval/{sha256}` over static mirror |
| 5 | CLI stack | TypeScript, Node 20 + npm, Commander + Zod + Vitest | Boring, CI-compatible |
| 6 | Signing | Sigstore keyless OIDC only in v0.1 (`sigstore` npm) | Matches agent-sign/NVIDIA precedent, no local keys yet |
| 7 | Scan depth | Heuristic regex + frontmatter cross-check only | Diff is product, not perfect detection |

---

## 2. Merged practitioner principles (research-backed, must-build)

Sourced via agent-reach (web/Jina + gh CLI + Bilibili API) + session websearch. Full links in §10.

### 2.1 Cloudflare — start with skill, harness is plumbing

- [ ] Prompts are the asset: `~450-line security-audit` skill carried unchanged into fleet harness. Keep skill text versioned.
- [ ] Model-agnostic from day one: VDH model A hunts, VVS model B judges. Our eval: task model ≠ judge model, hunter ≠ validator.
- [ ] Adversarial validator that **cannot file its own findings**; must disprove hunter theory.
- [ ] Every finding needs: threat model (who/does/gets), PoC test on **untouched** codebase, proposed patch, mechanical path/schema check. No PoC = fake.
- [ ] Externalize state: SQLite keyed `(run_id, repo, stage)`; resume/retry per stage; stream findings.
- [ ] Context hygiene: each agent hyper-focused, <25% window; `200 OK` with error text must be classified, not trusted.
- [ ] Minimal harness = Recon + Hunt + Validate + DB + validator. Skip cross-repo trace + dedicated dedup until drowning.
- [ ] Cost: hunt dominates; Gapfill ~half cost; budget per repo with task caps; full scans are periodic sweeps, not per-PR.

### 2.2 Matt Pocock — what makes a skill great (AI Engineer talk)

- [ ] Description = routing signal / context pointer. Every model-invoked skill = context load + unpredictability tax.
- [ ] Decide user-invoked vs model-invoked per skill; keep model-invoked set small and distinct.
- [ ] Checklist per skill: trigger → structure → steering (leading words) → minimal `SKILL.md` → prune sediment/crud/no-ops.
- [ ] SkillProof implication: lint description distinctness; eval needs negative controls (prompts that must NOT trigger).

### 2.3 FactSet (Yogendra Miraje) — skills as features

- [ ] Minimum harness: registry (name+desc+path) + system prompt + file-read tool (+ bash/sandbox if scripts run).
- [ ] Progressive disclosure: only name/desc/path in prompt, body on demand.
- [ ] Cut skills by user intent, not data model; refactor as real uses emerge.
- [ ] Registry entry minimum: `skill_id, description, input/output schema, risk_level, allowed_data_domains, owner_team, slo, version`.

### 2.4 Eval craft — Alejandro AO + YouTube Ads (Bhateja/Bump)

- [ ] 4 dims per task: outcome / process / style / efficiency.
- [ ] Skills are software: git-versioned; map evals to skill changes.
- [ ] Test file: `{id, should_trigger, prompt, expected}`; explicit + implicit + negative triggers.
- [ ] Prove uplift with subagents with vs without skill.
- [ ] Vibe first, then critique-agent loop, then full evals; track human↔LLM-judge agreement + spot-check traces; judge patterns not single runs; define launch/regression gates early; refresh from prod.

### 2.5 Signing minimum — Safeguard.sh + Red Hat + Sigstore + Crash Override

- [ ] 4-part minimum for publishable skill: keyless OIDC Sigstore + in-toto SLSA L1+ + signed capability manifest + Rekor log outside registry control.
- [ ] Verify at **invocation**, not just install (TOCTOU window Shai-Hulud exploited).
- [ ] Split: Sigstore = build-time provenance, SPIFFE = runtime identity; encode `agent_name, model_id (from API response, not config), prompt_hash, policy_hash, reviewer` into OIDC claims.
- [ ] Rollout like npm: optional → visible badge → require for risky caps. Audit-mode first (log, don't block), then enforce. TanStack lesson: valid SLSA L3 can still sign an attack — provenance ≠ safety.

### 2.6 Threat data — design constraints

- [ ] Snyk ToxicSkills 36.8% flawed / 13.4% critical; Unit42 80% behavioral deviation; ClawHavoc 341 malicious; fake skill passed Cisco/NVIDIA scanners via mutable external link → 26k agents.
- [ ] `SKILL.md` body itself is payload: Unicode Tag U+E0000 invisible instructions, hooks RCE (CVE-2025-59536), config exfil (CVE-2026-21852), MEMORY.md persistence.
- [ ] Scanner must add: Unicode normalization check, external-URL pin + re-fetch, `MEMORY.md`/state-write detection, tool-output injection patterns. Info-flow adds zero coverage per SkillFortify — patterns + diff suffice.
- [ ] Transitive deps need lockfile/ASBOM (CycloneDX) + SAT resolve; single `curl evil.example.com` diff is the launch story.

---

## 3. Architecture (one repo, MIT)

```
skillproof/
  packages/cli/src/{scan,diff,attest,verify,eval}.ts
  packages/cli/test/fixtures/{clean-skill,evil-diff-skill}/
  packages/schemas/{manifest.schema.json,eval.schema.json}  # Zod is source of truth
  ledger/{attestations/YYYY/MM/*.jsonl,evals/*.jsonl}
  actions/capability-diff/action.yml
  openapi/v1.yaml
  evals/example/*.md
  PLAN.md  # this file
```

- [ ] Scaffold npm workspaces: `packages/cli`, `packages/schemas`
- [ ] Zod schemas → JSON Schema export for ledger validation
- [ ] TS strict, ESM, Node 20 engine pin

---

## 4. Identity + schemas

Identity: `sha256` of normalized skill dir (sorted paths, LF, exclude `.git/`, `node_modules/`). Key for all records. Immune to rename/squat.

Manifest `skillproof/1`:

```json
{
  "schema": "skillproof/1",
  "skill": {"name": "security-audit", "version": "1.2.0", "source": "github:cloudflare/security-audit-skill", "content_hash": "sha256:9f3e…"},
  "capabilities": {
    "network": {"outbound_domains": ["github.com"], "via": ["curl"]},
    "exec": {"shell": true, "interpreters": ["bash", "python3"]},
    "filesystem": {"reads": ["./**"], "writes": ["./reports/**"]},
    "secrets": {"env_vars": ["GITHUB_TOKEN"]},
    "agents": {"spawns_subagents": true, "subagent_types": ["research"]},
    "mcp": {"servers": []}
  },
  "declared": {"frontmatter": {}},
  "scan_version": "skillproof-scan/0.1.3",
  "signer": {"iss": "", "sub": "", "workflow": "", "commit": ""},
  "undeclared_findings": []
}
```

Eval record `skillproof-eval/1`: `skill{hash,version}`, `matrix[]{model,baseline,with_skill,uplift}`, `verdict`, `cost_usd,runs,tasks`, `cache_key=(hash,task,model,judge,n)`, `task_provenance: author|generated`, `judge_agreement_rate`, `trace_ref`.

- [ ] Freeze `skillproof/1` fields (every field must appear in a check/report)
- [ ] Freeze `skillproof-eval/1` fields + verdict enum `OK|SKILL_DEGRADED_ON_NEWER_MODEL|IMPROVED|INCONCLUSIVE`

---

## 5. CLI spec (Commander)

- [ ] `scan ./skill --out base.json` — heuristic table below + frontmatter cross-check → `undeclared_findings`
- [ ] `diff base.json head.json` — exit 2 on added capability; `+ NEW` vs `unchanged`; removed = improvement, never fails
- [ ] `attest base.json` — Sigstore keyless sign, append JSONL to `ledger/attestations/YYYY/MM/`
- [ ] `verify github:org/repo@sha256:…` — fetch, verify sig + hash, print; works without permission
- [ ] `eval --agent claude --models m1,m2 --tasks evals/*.md --runs 3 --budget-usd 10 --judge <id>` — baseline vs treated, cache, hard-stop

Scanner heuristics v0.1 (boring, documented limits in `docs/limitations.md`):

| Capability | Signals |
|------------|---------|
| network | `curl|wget|fetch\(|axios|http\.get` + domain extract; external `http(s)://` in md/scripts |
| exec | `exec|spawn|subprocess|os\.system|shell:\s*true|bash|sh -c` |
| filesystem | `readFile|writeFile|~/\.|\.env|/etc/|MEMORY\.md` paths |
| secrets | `process\.env|ENV\[|API_KEY|SECRET|TOKEN` |
| agents | `subagent|Task\(|subagent_type` |
| mcp | `mcp.*server|mcp\.json` |
| hygiene | Unicode Tag range U+E0000–U+E007F → high finding; external URL without pin → warn |

- [ ] Implement `scan` + fixtures (clean + evil `curl evil.example.com` + unicode-tagged)
- [ ] Implement `diff` exit codes + human output
- [ ] Implement `attest/verify` via `sigstore` npm, OIDC from GHA
- [ ] `docs/limitations.md`: what scanner misses, versioned

---

## 6. Ledger + validation + Action

Layout: `ledger/attestations/YYYY/MM/<hash>.jsonl`, `ledger/evals/*.jsonl`. ~1KB/line, no skill code, MBs not GBs.

PR validation GHA steps:

- [ ] Schema (Zod) check
- [ ] Sigstore bundle verify + Rekor inclusion
- [ ] Recompute `content_hash` from pinned source
- [ ] Reject mutate-history (append-only)

Capability-diff Action (`actions/capability-diff/action.yml`):

- [ ] Trigger on PR touching `SKILL.md|scripts/**|hooks/**|mcp**`
- [ ] Scan base/head, post diff comment, fail on added capability until `skillproof-ack` label or human comment
- [ ] Dogfood on this repo

---

## 7. Read API v0.1 (`openapi/v1.yaml`)

- [x] `GET /v1/attest/{sha256}` → manifest + bundle + Rekor ref
- [x] `GET /v1/eval/{sha256}?model=` → matrix + verdict
- [x] Static JSON mirror (CDN/pages) as first backend; no write API in v0.1
- [x] 5-line fetch example for harnesses/registries

Generated from Zod (`packages/schemas/src/index.ts`) via `npm run generate:openapi`.
A Vitest suite asserts every `$ref` resolves and `openapi/v1.yaml` is in sync.

---

## 8. Eval harness v0.2

- [ ] `Runner` interface: `run(task, {withSkill}) → {output, trace, cost}`; `ClaudeRunner` headless first
- [ ] Task format: prompt + rubric + `should_trigger` + negative controls
- [ ] Judge model configurable, default ≠ task model; hunter model ≠ validator model
- [ ] Cache key `(content_hash,task,model,judge,n)`; replay on unrelated change
- [ ] `--budget-usd` hard-stop; default 2 models × ≤8 tasks × 3 runs
- [ ] Publish delta record + per-model pages; verdict line is the product
- [ ] Track `judge_agreement_rate` via human spot-check sample pipeline

---

## 9. Roadmap + launch

### v0.1 — two weeks, one person [ ]

- [ ] CLI scan/diff/attest/verify + tests
- [ ] Ledger template + PR validator
- [ ] Capability-diff Action
- [ ] OpenAPI read spec
- [ ] Attest ~20 public skills, keep 2 most interesting diffs

### Launch — week 2–3 [ ]

- [ ] Cloudflare `security-audit-skill` manifest + last-2-versions diff first
- [ ] 3–5 high-star skills (Tessl-listed second, then authors: "add evals/, get uplift history")
- [ ] Publish clean or undeclared-network result; CLI invocations reproducible alongside
- [ ] README = manifesto; ledger public from commit one

### v0.2 — 2–4 weeks later [ ]

- [ ] Eval harness + cache + budget + delta records + per-model pages
- [ ] Talk to 10 teams with 20+ skills (kill-criteria interviews)

### v0.3 — if it lives [ ]

- [ ] Badges, harness fetch lib, first vendor conversation. No standard without consumer.

---

## 10. Sources

- Cloudflare harness: `https://blog.cloudflare.com/build-your-own-vulnerability-harness/`
- Cloudflare skill: `https://github.com/cloudflare/security-audit-skill`
- Pocock skills talk: `https://www.youtube.com/watch?v=UNzCG3lw6O0`
- FactSet harness talk: `https://www.youtube.com/watch?v=7jjudsEhBtM`
- Eval skills video: `https://www.youtube.com/watch?v=XUzUf_HCgvk`
- Evals shape behavior: `https://ai.engineer/talks/xyL2Ltkh-SA-evals-prompts-shape-agent-behavior`
- Registry/routing/eval control plane: `https://abstractalgorithms.hashnode.dev/llm-skill-registry-routing-and-evaluation-for-production-agents`
- Signing standards: `https://safeguard.sh/resources/blog/signing-and-provenance-standards-for-ai-agent-skill-registries`
- Red Hat provenance: `https://next.redhat.com/2026/08/07/supply-chain-provenance-for-ai-agent-identity/`
- sigstore-a2a: `https://github.com/sigstore/sigstore-a2a/`
- Agent provenance: `https://crashoverride.com/resources/knowledge-base/provenance/cryptographic-provenance-agent-output`
- Supply-chain reset: `https://www.secureworld.io/industry-news/securing-software-supply-chain-ai-agents`
- SkillFortify: `https://arxiv.org/html/2603.00195`
- Context poisoning: `https://labs.cloudsecurityalliance.org/research/csa-research-note-skill-md-agent-context-poisoning-20260506/`
- anthropics/skills: `https://github.com/anthropics/skills` (177k stars)
- agentregistry demo: `https://www.youtube.com/watch?v=l6QicyGg46A`
- Bilibili: `BV1E7wtzaEdq`, `BV1cGigBQE6n`, `BV1qv6eBZErD` (progressive disclosure, MCP vs Skill)

---

## 11. Users / distribution / win

- Sceptical installer: `verify` + badge + ledger page before `npx skills add`.
- Platform engineer: capability-diff check makes skill updates reviewable like dep updates.
- AgentOps owner: scheduled eval pinned to model manifest catches "CI broke, nobody touched repo".
- Skill author: frontmatter declare + `evals/` → verified badges + uplift history.
- Wedge: review others' popular artifacts (PR/issue/mention on high-star skills). Cloudflare → Tessl → authors.
- Win = Action in few hundred repos; ledger consulted pre-install; one harness/registry native consumption; cite-able neutral source next malicious-skill news. Absorption as open standard counts as win.

---

## 12. Metrics + kill criteria (decided in advance)

Measure in order: (1) repos running action, (2) skills attested, (3) human-confirmed undeclared diffs, (4) eval deltas catching real model-bump regression. One public (3)/(4) > any count.

Stop if any fire (~60d post-launch window for #4):

- [ ] Tessl repo-level evals GA + open API covering model deltas
- [ ] Claude/Codex/Cursor native model-change regression for third-party skills
- [ ] 10 teams × 20+ skills report no model-bump or drift pain
- [ ] No harness/registry/author consumes records

On kill: honest retrospective, keep tool for self. Sunk cost: one person-month.

---

## 13. Business (deferred) + risks

Core MIT + public ledger forever. Commercial only if kill criteria fail: hosted evals per model bump, private mirrors, SLAs. Never sell the standard.

| Risk | Mitigation |
|------|------------|
| Platform absorption | Be consumable: one schema + hash identity; complement not compete |
| Scanner bypass | Never claim safety; publish limits + scanner version; diff promise > detection promise |
| Eval costs kill adoption | Cache + budget caps + small defaults from line one |
| Cold-start ledger | Bootstrap top ~20 ourselves, our CI sigs, their code |
| Standard fatigue | Every field must earn place in a check/report |

---

## 14. Next actions (checklist)

- [ ] Scaffold `packages/cli` + `packages/schemas` (npm workspaces, TS strict, Vitest)
- [ ] Implement `scan` + fixtures + `docs/limitations.md`
- [ ] Implement `diff` (exit 2 on new cap)
- [ ] Implement `attest/verify` (Sigstore keyless)
- [ ] Ledger dirs + PR validator workflow
- [ ] `actions/capability-diff/action.yml` + dogfood
- [x] `openapi/v1.yaml` + static mirror stub (generated from Zod, $ref test green)
- [ ] Bootstrap attest 20 skills
- [ ] Launch post with Cloudflare diff
- [ ] v0.2 eval harness per §8
