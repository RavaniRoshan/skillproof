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
| 2026-09-21 | cli | Removed stale TS-in-`.js` duplicates; rewrote cli tests as ESM (7/7 green); lint 0 errors; beautified root README |
| 2026-09-21 | site | VitePress marketing + docs site in `site/`; Pages deploy workflow; `npm run docs:{dev,build,preview}` |
| 2026-09-21 | site | Brand identity: custom theme (indigo→teal, Inter/JetBrains Mono), animated diff terminal, capability grid, proof-stats band, gradient seal logo, OG meta, branded 404 via `not-found` slot |

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

---

## 15. skills.sh integration strategy

### Objective

Make SkillProof the evidence and proof layer for the existing skills ecosystem rather than another competing skill marketplace.

Core positioning:

> **skills.sh = discovery and distribution. SkillProof = evidence and verification.**

skills.sh currently exposes documented API endpoints for skill listings, search, curated skills, individual skill details, and partner security audits. The skill detail response includes a stable skill ID, install count, file snapshot, and SHA-256 hash. The audit endpoint exposes normalized partner results.

Use these documented APIs instead of scraping the website.

References:
- https://www.skills.sh/docs/api
- https://www.skills.sh/docs
- https://www.skills.sh/terms

### Integration principles

- [ ] Treat skills.sh as an external source, not a dependency required to run SkillProof.
- [ ] Use the stable skills.sh skill ID, source/slug, as the external identity.
- [ ] Keep SkillProof's normalized content_hash as the authoritative proof identity.
- [ ] Reconcile the skills.sh hash with the SkillProof hash and record both when they differ.
- [ ] Never represent an automated scan or attestation as a safety guarantee.
- [ ] Store proof metadata, manifests, hashes, signatures, and references. Do not mirror entire third-party skill repositories into the ledger.
- [ ] Respect skills.sh API rate limits, caching headers, terms, and authentication requirements.
- [ ] Build the integration so it still works if skills.sh changes ranking, UI, or distribution behavior.

---

## 16. skills.sh ingestion adapter

Create a first-class adapter at packages/skills-sh/.

Suggested structure:

    packages/skills-sh/
    ├── src/
    │   ├── client.ts
    │   ├── types.ts
    │   ├── normalize.ts
    │   ├── reconcile.ts
    │   ├── discover.ts
    │   └── index.ts
    └── test/

### API client

- [ ] Implement GET /api/v1/skills.
- [ ] Implement GET /api/v1/skills/search.
- [ ] Implement GET /api/v1/skills/curated.
- [ ] Implement GET /api/v1/skills/{source}/{skill}.
- [ ] Implement GET /api/v1/skills/audit/{source}/{skill} when authentication and access are available.
- [ ] Respect Cache-Control and Retry-After.
- [ ] Add bounded retries with exponential backoff.
- [ ] Add local cache to prevent unnecessary repeated fetches.
- [ ] Add an explicit user-agent such as skillproof/<version>.
- [ ] Add contract tests from captured API fixtures.

### Normalization

Map a skills.sh skill into a SkillProof source record:

    {
      "source_registry": "skills.sh",
      "external_id": "owner/repo/skill",
      "source_repository": "owner/repo",
      "slug": "skill",
      "install_count": 0,
      "source_hash": "sha256:...",
      "files": [],
      "source_url": "https://www.skills.sh/owner/repo/skill"
    }

- [ ] Define this schema separately from the attestation schema.
- [ ] Preserve upstream metadata without allowing it to overwrite signed proof fields.
- [ ] Record first_seen, last_seen, and observed_at.
- [ ] Track duplicate/fork indicators when provided by skills.sh.

---

## 17. Proof generation pipeline

### Target flow

    skills.sh
       │
       ▼
    Discover skill
       │
       ▼
    Fetch source snapshot + upstream hash
       │
       ▼
    Normalize files
       │
       ▼
    SkillProof scan
       │
       ├── capability manifest
       ├── undeclared findings
       ├── hygiene findings
       └── content hash
       │
       ▼
    Compare previous proof
       │
       ├── unchanged
       ├── capability added
       ├── capability removed
       └── source changed
       │
       ▼
    Attest
       │
       ▼
    Public proof record

### Required behavior

- [ ] First observation creates a discovered record.
- [ ] First successful scan creates a scanned record.
- [ ] CI-backed or trusted-signing workflows create attested records.
- [ ] A changed hash automatically triggers a re-scan.
- [ ] Added capabilities create a visible diff.
- [ ] Removed capabilities are recorded as changes but do not fail verification by default.
- [ ] A proof page clearly distinguishes scanned, attested, and evaluated.
- [ ] Never imply that a skills.sh partner audit and a SkillProof attestation are the same evidence type.

### Hash reconciliation

    skills.sh hash
          │
          ├── same normalized content ──> linked proof
          │
          └── different                 ──> investigate normalization
                                              and record both hashes

- [ ] Add deterministic normalization tests.
- [ ] Verify whether the skills.sh hash can be reproduced from its documented file snapshot.
- [ ] Do not silently substitute one hash for another.
- [ ] Add a hash_source field to the integration record.

---

## 18. User-facing proof surface

Create a public proof page for every indexed skill:

https://skillproof.dev/skill/<source>/<slug>

Example layout:

    security-audit
    cloudflare/security-audit-skill

    SkillProof
    ────────────────────────────
    Proof status       ATTESTED
    Source hash        sha256:...
    Last observed      2026-09-22
    Last changed       2026-09-21

    Capabilities
      network          github.com
      exec             bash
      filesystem       workspace
      secrets          GITHUB_TOKEN

    Capability changes
      + AWS credentials
      - none

    Evidence
      ✓ content hash
      ✓ capability scan
      ✓ signed attestation
      ✓ verification

    External signals
      skills.sh installs
      skills.sh partner audits

### Work

- [ ] Add skill proof route to the documentation/marketing site.
- [ ] Add copyable verification command.
- [ ] Add raw JSON proof endpoint.
- [ ] Add source repository link.
- [ ] Add upstream skills.sh link.
- [ ] Add timestamp and scanner version.
- [ ] Add a clear limitations section.
- [ ] Add OG metadata so proof pages work as shareable links.
- [ ] Add a compact GitHub badge.
- [ ] Add machine-readable JSON-LD only after the core proof schema is stable.

---

## 19. CLI integration

The CLI should become useful to people who already install skills.

### New commands

- [ ] skillproof skills-sh search <query>
- [ ] skillproof skills-sh inspect <source>/<skill>
- [ ] skillproof skills-sh proof <source>/<skill>
- [ ] skillproof skills-sh sync --view trending
- [ ] skillproof skills-sh sync --view hot
- [ ] skillproof verify skills-sh:<source>/<skill>
- [ ] skillproof proof-url <source>/<skill>

Example:

    skillproof skills-sh proof cloudflare/security-audit-skill/security-audit

Output:

    SkillProof
    ✓ source found
    ✓ source hash matches
    ✓ capability manifest available
    ✓ attestation verified

    Proof: https://skillproof.dev/skill/...

### Optional installation guard

Do not make this the first integration.

Later:

    skillproof install skills-sh:<source>/<skill>

Behavior:
1. Resolve the skill.
2. Fetch current proof.
3. Compare the current source hash.
4. Show new capabilities.
5. Install only when the user's configured policy allows it.

- [ ] Keep this optional and audit-mode first.
- [ ] Never silently block installs.
- [ ] Support --warn, --require-attested, and later --require-policy.

---

## 20. GitHub integration and author growth loop

The first distribution mechanism should work without any skills.sh partnership.

### Automatic analysis

- [ ] Build a scheduled GitHub Action that polls skills.sh trending and hot lists.
- [ ] Select a bounded number of new or changed skills per run.
- [ ] Scan each source repository.
- [ ] Generate proof records.
- [ ] Publish proof pages.
- [ ] Open an internal queue for manual review of interesting diffs.

### Author outreach

For skills with significant usage or meaningful capability changes:

- [ ] Open a concise issue or PR suggesting a SkillProof badge.
- [ ] Provide the exact proof URL.
- [ ] Show the capability diff.
- [ ] Ask the author to run the Action in their own repository.
- [ ] Never present the automated scan as a security verdict.

### Repository integration

Create actions/skillproof/action.yml.

Use it for:
- [ ] Scan on skill changes.
- [ ] Compare PR base and head.
- [ ] Publish capability diff.
- [ ] Verify an existing attestation.
- [ ] Optionally update a proof badge.
- [ ] Optionally fail on new capabilities when explicitly configured.

The desired growth loop:

    skills.sh popular skill
            ↓
    SkillProof automatically scans it
            ↓
    Public proof page
            ↓
    Author sees proof
            ↓
    Author adds badge / Action
            ↓
    Author's users encounter SkillProof
            ↓
    More skills adopt proof

---

## 21. Distribution strategy

### Phase A — zero-permission integration

Goal: get users without needing skills.sh to change its product.

- [ ] Index the first 25 skills.
- [ ] Prioritize trending, hot, curated, and high-install skills.
- [ ] Publish one proof page per skill.
- [ ] Add proof links back to source repositories.
- [ ] Add a reusable badge.
- [ ] Publish capability-diff examples on GitHub.
- [ ] Release a skills.sh integration package or CLI.
- [ ] Publish a launch post demonstrating one real capability change.

### Phase B — author adoption

Goal: turn skill authors into distribution partners.

- [ ] Reach out to the first 20 skill authors.
- [ ] Offer a one-command GitHub Action.
- [ ] Provide badge and proof-page snippets.
- [ ] Ask for feedback on false positives and missing capabilities.
- [ ] Convert at least 5 repositories to recurring SkillProof checks before expanding scope.

### Phase C — ecosystem partnership

Only after the external integration works:

- [ ] Prepare a one-page integration proposal for skills.sh maintainers.
- [ ] Demonstrate the API client, proof schema, proof URLs, and adoption data.
- [ ] Propose an outbound link or proof badge rather than requiring a new security system.
- [ ] Ask whether skills.sh would expose a first-class external proof field.
- [ ] Propose a pilot on a bounded set of skills.
- [ ] Do not depend on partnership approval for the product roadmap.

### Partnership pitch

The pitch should be:

> skills.sh already handles discovery, installs, rankings, and ecosystem security signals. SkillProof adds a portable, content-addressed proof record that skill authors and agent harnesses can verify independently.

Avoid framing the pitch as a critique of existing security providers.

---

## 22. Cross-provider security evidence

skills.sh already exposes partner audit results from multiple providers. SkillProof should consume those results as external evidence, not replace them.

- [ ] Define external_evidence[].
- [ ] Record provider, status, risk level, audit timestamp, and source URL.
- [ ] Preserve provider identity.
- [ ] Never collapse different scanner verdicts into one SkillProof score.
- [ ] Show disagreements explicitly.
- [ ] Keep SkillProof's own capability manifest separate from third-party security findings.

Example:

    {
      "external_evidence": [
        {
          "provider": "Snyk",
          "status": "pass",
          "risk_level": "LOW",
          "observed_at": "..."
        }
      ]
    }

This keeps SkillProof useful even when a skill has already been scanned elsewhere: capability provenance, change detection, signed proof, and machine-consumable records remain distinct.

---

## 23. Automation and freshness

### Scheduled source synchronization

- [ ] Run every 6 hours at first.
- [ ] Use trending and hot views for discovery.
- [ ] Recheck indexed high-install skills daily.
- [ ] Recheck low-install skills weekly.
- [ ] Re-scan immediately when the observed source hash changes.
- [ ] Respect upstream cache headers and rate limits.

### State

Track:

    external_id
    source_hash
    skillproof_hash
    last_seen
    last_scanned
    last_attested
    last_changed
    install_count
    scan_version
    proof_version

- [ ] Store synchronization state separately from the public ledger.
- [ ] Do not make API polling itself part of the immutable attestation record.
- [ ] Record the exact observed source state used to create each proof.

---

## 24. Metrics

Track the funnel in this order:

### Discovery
- [ ] Skills indexed.
- [ ] Skills with a proof page.
- [ ] Skills with changed capability records.

### Adoption
- [ ] External repositories running the SkillProof Action.
- [ ] Skill authors adding the badge.
- [ ] First-time CLI users.
- [ ] Repeat verification users.

### Evidence quality
- [ ] Confirmed capability diffs.
- [ ] False-positive reports.
- [ ] Hash reconciliation failures.
- [ ] Percentage of proofs with successful independent verification.

### Distribution
- [ ] Proof-page visits from skills.sh.
- [ ] GitHub referral traffic.
- [ ] Proof URL shares.
- [ ] Installs of the CLI or integration package.

### Initial 30-day targets

- [ ] 100 indexed skills.
- [ ] 25 public proof pages with meaningful evidence.
- [ ] 10 external users running verification.
- [ ] 5 external repositories running the Action.
- [ ] 3 skill authors publicly linking to SkillProof.
- [ ] 1 skills.sh maintainer conversation started using a working demo.
- [ ] At least 1 capability-diff case that an external developer confirms as useful.

Do not optimize for GitHub stars as the primary product metric. Stars are a distribution signal; adoption of proof is the product signal.

---

## 25. Milestones

### M0 — Integration specification
- [ ] Freeze skills.sh adapter types.
- [ ] Freeze external evidence schema.
- [ ] Freeze hash reconciliation rules.
- [ ] Add fixtures from real skills.sh API responses.
- [ ] Document API limits and caching behavior.

### M1 — Read-only integration
- [ ] Search and fetch skills through skills.sh API.
- [ ] Import file snapshots.
- [ ] Generate SkillProof manifest.
- [ ] Compare upstream hash with SkillProof hash.
- [ ] Display proof locally.

### M2 — Public proof
- [ ] Public proof pages.
- [ ] Raw proof API.
- [ ] GitHub badges.
- [ ] Verification command.
- [ ] First 25 indexed skills.

### M3 — Distribution loop
- [ ] Scheduled hot and trending ingestion.
- [ ] Automatic change detection.
- [ ] Author outreach workflow.
- [ ] GitHub Action published.
- [ ] First external repositories onboarded.

### M4 — Partnership attempt
- [ ] Prepare demo.
- [ ] Prepare one-page integration proposal.
- [ ] Contact skills.sh maintainers.
- [ ] Request feedback before requesting native UI changes.

### M5 — Native integration, only if justified
- [ ] External proof link or badge field.
- [ ] Native proof display.
- [ ] Optional installation-time verification.
- [ ] Keep SkillProof independently verifiable.

---

## 26. Risks and guardrails for the integration

| Risk | Guardrail |
|------|-----------|
| skills.sh changes API | Adapter + fixtures + versioned contract tests |
| Rate-limit or abuse concerns | Cache, bounded polling, documented API, no scraping |
| Hash mismatch | Preserve both hashes and investigate normalization |
| False sense of security | Explicit evidence labels and limitations |
| Platform dependency | SkillProof remains fully usable without skills.sh |
| Duplicate security scanners | Treat external audits as evidence, never collapse them |
| Author distrust | Publish source, scanner version, hash, and reproducible commands |
| Legal/content concerns | Store metadata and proof rather than republishing third-party skill code |
| Partnership rejected | Continue with GitHub, CLI, and URL-based distribution |
| Star-driven vanity metrics | Optimize for verified users and recurring checks |

---

## 27. Kill criteria for the skills.sh strategy

Reassess this distribution path after 30–60 days.

Stop investing heavily in native skills.sh integration if:

- [ ] The API cannot support reliable synchronization within documented limits.
- [ ] Authors do not adopt badges or GitHub Actions after repeated outreach.
- [ ] Users view proof pages but do not run verification.
- [ ] No external repository continues using the Action after the initial trial.
- [ ] A better-established ecosystem provides the same proof-consumption surface with materially lower friction.

Keep the generic SkillProof protocol even if the skills.sh channel is abandoned.

---

## 28. Immediate next actions

Execute in this order:

- [ ] Create packages/skills-sh adapter.
- [ ] Add API fixtures for list, search, detail, and audit responses.
- [ ] Implement skills-sh inspect.
- [ ] Implement skills-sh proof.
- [ ] Prove hash reconciliation on 5 real skills.
- [ ] Build first public proof page.
- [ ] Index 25 skills from trending, hot, and curated views.
- [ ] Add SkillProof badge generator.
- [ ] Add scheduled synchronization.
- [ ] Publish the first capability-diff case study.
- [ ] Build the GitHub Action.
- [ ] Onboard the first 5 external repositories.
- [ ] Prepare the skills.sh maintainer proposal only after the above evidence exists.

### Definition of done for the integration MVP

A developer can take a skill discovered on skills.sh, run one SkillProof command, receive a deterministic proof record tied to the skill's current content hash, inspect capability changes, and independently verify the proof without trusting SkillProof's website or database.

---

## 29. Current external references

- skills.sh API: https://www.skills.sh/docs/api
- skills.sh documentation: https://www.skills.sh/docs
- skills.sh terms: https://www.skills.sh/terms
