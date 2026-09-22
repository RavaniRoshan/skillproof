---
title: Roadmap
---

<script setup>
const milestones = [
  {
    icon: "terminal",
    title: "v0.1 — CLI, ledger, read API",
    body: "scan, diff, attest and verify with tests, a ledger-as-repo with PR validation, the capability-diff GitHub Action, and the OpenAPI read spec.",
    meta: "In progress",
  },
  {
    icon: "globe",
    title: "Launch — publish real diffs",
    body: "Run the tool against high-star public skills and publish the capability manifests and version diffs for anyone to argue with.",
    meta: "Next",
  },
  {
    icon: "gauge",
    title: "v0.2 — eval harness",
    body: "Baseline-versus-treated runs across pinned models, a judge distinct from the task model, caching by content hash, and a budget that hard-stops.",
    meta: "Planned",
  },
  {
    icon: "route",
    title: "v0.3 — native consumption",
    body: "Badges, a five-line fetch library for harnesses and registries, and a first conversation with a vendor about native support.",
    meta: "Conditional",
  },
];
</script>

<DocHero
  eyebrow="Explanation"
  title="What ships, and what would stop it"
  sub="The order is deliberate: the ledger and the diff come first, because a standard nobody consumes is a wiki page. Consumption and badges ship last, not first."
/>

<FeatureCards :items="milestones" />

## Where v0.1 actually stands

The command surface, the Zod schemas, the generated OpenAPI contract and these
docs are real. Inside them, the parts that matter most are still placeholders:

- the scanner reads markdown only and records placeholder values on a match;
- nothing is signed — `attest` writes a local record, `verify` always succeeds;
- `content_hash` is not a digest yet, so records are not content-addressed;
- `ledger/`, `actions/capability-diff/` and `evals/` are not in the repository.

Only `diff` plus its exit code is solid enough to gate a pull request on
today. `AGENTS.md` in the repository root tracks the same list against the
source files.

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
