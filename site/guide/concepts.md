# Core concepts

## Skills are a supply chain

A skill is a directory: markdown instructions plus scripts, hooks and MCP
configs. It runs inside your agent's privileged context — filesystem,
credentials, network, shell. Installing a skill is trusting third-party code
that an LLM will re-invoke on every task. Treat it like a dependency.

## The manifest is not the product — the diff is

Static analysis will miss things; that is acceptable. What matters is the
**capability delta between two versions**: a one-line `curl` added to a
script is indistinguishable from a typo fix at review time, unless a tool
produces the diff. Removed capabilities never fail. Added ones always do,
until a human acknowledges them.

## Content addressing beats names

Skills are copied, forked and vendored constantly. A name is a weak identity;
`sha256` of the skill directory is a strong one. Every ledger record is keyed
by content hash, which makes the ledger immune to name-squatting,
typosquatting and registry-hopping.

## What SkillProof is not

- **Not a package host.** GitHub already hosts and versions skills. The ledger
  stores ~1 KB signed JSON per attestation.
- **Not new signing infrastructure.** Sigstore exists; we build on keyless
  signing from CI.
- **Not an enforcement engine.** Harnesses and sandboxes enforce; we supply
  the machine-consumable evidence they gate on.
- **Not liable.** Attestations are evidence, not guarantees. Signing proves
  what was analysed and by which scanner version — never safety.

## Threat model

The scanner (v0.1 heuristics) looks for network calls, subprocess sites,
filesystem paths, environment reads, subagent delegation and MCP servers, and
cross-checks them against the skill's own frontmatter declarations. Known
limits — Unicode-tag payloads, mutable external links, memory-file
persistence — are documented in `docs/limitations.md` and checked where cheap.
The diff promise ("v1.2 added capability X") is kept; a safety promise is
never made.
