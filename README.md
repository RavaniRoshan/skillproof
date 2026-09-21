# SkillProof

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node-%3E%3D20-green.svg)](package.json)
[![Status](https://img.shields.io/badge/Status-v0.1%20pre--launch-orange.svg)](PLAN.md)

An open registry of **proof** for agent skills — not another place to host them.

> Skills live on GitHub. Proof should live somewhere neutral. SkillProof is the
> open, signed record of what an agent skill does — and whether it still works.

Agent skills became a software supply chain in 2026: packaged, versioned,
installed from third parties, running inside your agent's privileged context.
A supply chain needs three answers before anyone trusts it:

| Question                            | SkillProof's answer                                  |
| ----------------------------------- | ---------------------------------------------------- |
| Who signed this skill?              | Keyless Sigstore attestation, keyed by content hash  |
| What is it allowed to do?           | Machine-readable capability manifest + diff          |
| Does it still work after a model bump? | Signed eval delta records per model version       |

---

## Quickstart

Prerequisites: Node.js 20+ and npm.

```bash
git clone https://github.com/RavaniRoshan/skillproof.git
cd skillproof
npm install
```

### 1. Scan a skill

Statically analyse a skill directory and emit a capability manifest:

```bash
npx skillproof scan ./my-skill --out base.json
```

```json
{
  "schema": "skillproof/1",
  "skill": {
    "name": "security-audit",
    "version": "1.2.0",
    "source": "github:cloudflare/security-audit-skill",
    "content_hash": "sha256:9f3e…"
  },
  "capabilities": {
    "network": { "outbound_domains": ["github.com"], "via": ["curl"] },
    "exec": { "shell": true, "interpreters": ["bash", "python3"] },
    "filesystem": { "reads": ["./**"], "writes": ["./reports/**"] },
    "secrets": { "env_vars": ["GITHUB_TOKEN"] },
    "agents": { "spawns_subagents": true, "subagent_types": ["research"] },
    "mcp": { "servers": [] }
  }
}
```

### 2. Diff two versions

A removed capability is an improvement. An added one is a privilege
escalation — the command exits non-zero until a human acknowledges it:

```bash
npx skillproof diff base.json head.json
```

```text
+ network.outbound_domains: ["evil.example.com"]   (NEW)
+ secrets.env_vars: ["AWS_SECRET_ACCESS_KEY"]       (NEW)
  exec.shell: true                                   (unchanged)
```

### 3. Attest and verify

Sign the manifest with keyless Sigstore (OIDC identity from CI) and append it
to the public ledger. Anyone can verify any skill without permission:

```bash
npx skillproof attest base.json
npx skillproof verify github:org/repo@sha256:9f3e…
```

### 4. Eval across model versions (v0.2)

```bash
npx skillproof eval --agent claude \
  --models sonnet-4.5,sonnet-4.6 \
  --tasks evals/*.md --runs 3 --budget-usd 10
```

```text
sonnet-4.5  baseline 0.40 → with_skill 0.88  (uplift +0.48)
sonnet-4.6  baseline 0.52 → with_skill 0.55  (uplift +0.03)
verdict: SKILL_DEGRADED_ON_NEWER_MODEL
```

---

## What SkillProof is not

- **Not a package host.** Skills live in git. The ledger stores ~1 KB signed
  JSON per attestation — manifests and eval results only, never skill code.
- **Not new signing infrastructure.** We build on keyless Sigstore signing
  from CI, the same approach npm, PyPI, agent-sign and NVIDIA use.
- **Not an enforcement engine.** Sandboxes and harnesses enforce; we produce
  the machine-consumable evidence they gate on.
- **Not a safety certificate.** Attestations are evidence of what was analysed,
  by which scanner version — never a guarantee. See `docs/limitations.md`.

The load-bearing design choice is **content addressing**: records are keyed by
`sha256` of the skill directory, not by name. Forks, copies and vendored
skills share one identity — name-squatting and registry-hopping evaporate.

---

## Repository layout

```text
skillproof/
├── packages/
│   ├── cli/                  # skillproof CLI (scan, diff, attest, verify, eval)
│   └── schemas/              # Zod source of truth + generated contract files
│       ├── manifest.schema.json
│       └── eval.schema.json
├── ledger/                   # public, append-only attestation log (JSONL)
├── actions/
│   └── capability-diff/      # GitHub Action: fail PRs that add capabilities
├── openapi/
│   └── v1.yaml               # read API (generated — do not hand-edit)
├── evals/example/            # example eval tasks (prompt + rubric)
├── docs/
├── PLAN.md                   # detailed build plan with progress tracking
└── README.md
```

---

## Read API

Generated from the Zod schemas — the single source of truth:

| Endpoint                  | Returns                        |
| ------------------------- | ------------------------------ |
| `GET /v1/attest/{sha256}` | Capability manifest + signature |
| `GET /v1/eval/{sha256}`   | Eval matrix + verdict (`?model=` filters) |

Regenerate after any schema change:

```bash
npm run generate:openapi
```

---

## Development

```bash
npm run build       # compile all workspaces
npm run typecheck   # strict tsc, no emit
npm run lint        # eslint + prettier
npx vitest run      # test suite (must stay green)
```

`PLAN.md` is the source of truth for scope, roadmap, kill criteria and
per-session progress. Update its checkboxes and log in place as you work.

---

## Status and roadmap

- **v0.1** — CLI scan/diff/attest/verify, ledger-as-repo, capability-diff
  Action, read API spec. In progress.
- **Launch** — publish capability diffs for high-star public skills.
- **v0.2** — eval harness with caching and budget caps.
- **v0.3** — badges and native harness/registry consumption, only if the
  kill criteria in `PLAN.md` fail to fire.

Core is MIT, forever. The ledger is public, forever.

---

## License

[MIT](LICENSE) — SkillProof contributors.
