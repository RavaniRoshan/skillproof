# Roadmap

## v0.1 — CLI, ledger, read API

- `scan` / `diff` / `attest` / `verify` with tests
- Ledger-as-repo with PR validation
- Capability-diff GitHub Action
- OpenAPI read spec generated from Zod

## Launch

Run the tool against high-star public skills and publish the capability
manifests and version diffs. One human-confirmed undeclared change is worth
more than any adoption count.

## v0.2 — eval harness

Baseline-vs-treated runs across pinned models, judge model distinct from task
model, caching by content hash, `--budget-usd` hard-stop, signed delta
records with per-model pass-rate pages.

## v0.3 — native consumption

Badges, a five-line fetch library for harnesses and registries, and a first
conversation with a vendor about native support. A standard nobody consumes is
a wiki page — so this ships last, not first.

## Kill criteria

Decided in advance, not rationalised later. We stop if Tessl or the harness
vendors ship open model-bump regression for third-party skills, if ten teams
running 20+ skills report no drift pain, or if nobody consumes the records
within ~60 days of launch. The honest retrospective gets published either way.
