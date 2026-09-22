---
title: CLI reference
---

<script setup>
const commands = [
  {
    icon: "terminal",
    title: "scan <skill> <output>",
    body: "Analyse a skill directory and write a capability manifest.",
    meta: "Offline · writes JSON",
  },
  {
    icon: "diff",
    title: "diff <base> <head>",
    body: "Print the capability delta between two manifests and set the exit code.",
    meta: "Offline · exit 0 or 2",
  },
  {
    icon: "shield",
    title: "attest <manifest>",
    body: "Append an attestation record for a manifest so others can find it.",
    meta: "Signing not wired up",
  },
  {
    icon: "check",
    title: "verify <reference>",
    body: "Resolve a reference, check it and print the manifest it covers.",
    meta: "Currently a stub",
  },
  {
    icon: "gauge",
    title: "eval",
    body: "Baseline-versus-treated runs across pinned models, judged against a rubric.",
    meta: "Planned · v0.2",
  },
];
</script>

<DocHero
  eyebrow="Reference"
  title="CLI commands"
  sub="Five commands, all offline except attest and verify. Run the binary as node packages/cli/dist/index.js until the package is published, and note that only diff is finished enough to gate on today."
/>

<FeatureCards :items="commands" />

## Which command do I need?

| Command | Reads | Exit code | Use when |
| --- | --- | --- | --- |
| `scan` | a skill directory | `0`, or `1` on error | You want a manifest for a skill at a known state |
| `diff` | two manifests | `0` unchanged, `2` new capability | You are reviewing an update and want new privileges to fail loudly |
| `attest` | a manifest | `0`, or `1` on error | You want the record to be findable by content hash |
| `verify` | a reference | `0` on success, `1` otherwise | You are about to install something attested by someone else |
| `eval` | tasks, models, budget | prints and exits | Not yet — the harness is v0.2 |

Only `diff` is finished enough to gate on today.

## `scan <skill> <output>`

Analyse a skill directory and write a capability manifest.

```bash
node packages/cli/dist/index.js scan ./my-skill base.json
```

Both arguments are positional. There is no `--out` flag, and passing one will
be treated as a third argument.

The manifest carries one object per capability class — `network`, `exec`,
`filesystem`, `secrets`, `agents`, `mcp` — alongside a `hygiene` block for
invisible Unicode tags and external URLs, the `scan_version` that produced it
and a `signer` object. The `signer` fields and `skill` metadata are hardcoded
placeholders in v0.1, and `content_hash` is not yet a digest.

> [!WARNING] Status: heuristic placeholders
> Only markdown files are read. A substring match records a placeholder value
> rather than the real domain, path or variable, and nothing is cross-checked
> against the skill's own `SKILL.md` declarations. Frontmatter parsing is not
> implemented, so `declared` is always empty.

## `diff <base> <head>`

Print the capability delta between two manifests.

```bash
node packages/cli/dist/index.js diff base.json head.json
```

Exit `0` when nothing was added, exit `2` when a new capability class appears.
Added capabilities print in red, removed ones in green, and unchanged ones are
listed for completeness. The exit code is the contract: it is what lets a CI
gate fail a skill update that grows its privileges.

The reference implementation also replaces the whole `capabilities` object
when a class differs at all, so a single changed domain is reported as a
wholesale change rather than a field-level delta.

> [!NOTE] Status: changed values do not set the exit code
> A capability whose value changed is pushed into the added list but does not
> set exit `2`, so a modified capability will not fail a gate. Only wholly new
> capability classes block.

## `attest <manifest>`

Append an attestation record for a manifest.

```bash
node packages/cli/dist/index.js attest base.json
```

The record is written as JSONL to
`ledger/attestations/YYYY/MM/<content_hash>.jsonl`, resolved relative to the
current working directory. The file is named from the hash, so re-attesting
the same content overwrites rather than appends a second line.

> [!WARNING] Status: no signature yet
> Despite the name, `attest` performs no Sigstore signing in v0.1. It stores
> the manifest verbatim plus a hardcoded signer identity and a timestamp.
> Keyless signing from CI is the next v0.1 milestone, and `ledger/` is not
> part of the repository yet.

## `verify <reference>`

Resolve a reference, check it and print the manifest it covers.

```bash
node packages/cli/dist/index.js verify github:org/repo@sha256:9f3e…
```

The reference splits on `@` into a source and a hash, so the hash must be the
last component.

> [!WARNING] Status: verifies nothing
> `verify` currently returns success without fetching, hashing or checking a
> signature. A green result is a placeholder, not a finding.

## `eval` (planned, v0.2)

Run tasks with and without the skill across pinned models, judge against the
rubric, publish a delta record. Budget-capped and cached by
`(content_hash, task, model, judge, n)`.

```bash
node packages/cli/dist/index.js eval --agent claude \
  --models sonnet-4.5,sonnet-4.6 --tasks evals/*.md --runs 3 --budget-usd 10
```

The flags are parsed and echoed; the harness itself is not built yet. See
[evaluations](/guide/evaluations) for the design it will implement.
