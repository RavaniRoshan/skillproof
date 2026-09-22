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
    body: "Look a reference up in the local ledger and check the hash it covers.",
    meta: "Local lookup · fails closed",
  },
  {
    icon: "globe",
    title: "skills-sh <search|inspect|proof>",
    body: "Search skills.sh, inspect upstream metadata, or scan a skill snapshot.",
    meta: "Needs network + token",
  },
  {
    icon: "route",
    title: "proof-url <ref>",
    body: "Print the shareable proof page URL for a skills.sh skill.",
    meta: "Offline · prints a URL",
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
  sub="Six commands. Everything is offline except attest, verify of remote sources, and skills-sh, which needs a skills.sh API token. Run the binary as node packages/cli/dist/index.js until the package is published."
/>

<FeatureCards :items="commands" />

## Which command do I need?

| Command | Reads | Exit code | Use when |
| --- | --- | --- | --- |
| `scan` | a skill directory | `0`, or `1` on error | You want a manifest for a skill at a known state |
| `diff` | two manifests | `0` unchanged, `2` new capability | You are reviewing an update and want new privileges to fail loudly |
| `attest` | a manifest | `0`, or `1` on error | You want the record to be findable by content hash |
| `verify` | a reference | `0` on success, `1` otherwise | You are about to install something attested by someone else |
| `skills-sh search` | a query | `0`, or `1` on error | You want to find a skill on skills.sh |
| `skills-sh inspect` | a `<source>/<skill>` ref | `0`, or `1` on error | You want upstream metadata and the file list |
| `skills-sh proof` | a `<source>/<skill>` ref | `0` match, `2` hash mismatch, `1` on error | You want a local capability proof for a skill snapshot |
| `skills-sh sync` | a leaderboard view | `0`, `2` on any mismatch, `1` on error | You want to check a bounded set of skills for changes |
| `proof-url` | a `<source>/<skill>` ref | `0`, or `1` on error | You want the shareable proof page URL |
| `eval` | tasks, models, budget | prints and exits | Not yet — the harness is v0.2 |

`scan`, `diff` and local `verify` are usable today. `attest` writes an
unsigned record, and `eval` is planned.

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
and a `signer` object. Every reported value is extracted from the scanned
content: domains from URLs, interpreters from matched tooling, paths from
matched filesystem signals. `skill.name` and `skill.version` come from the
skill's frontmatter, and `content_hash` is a real sha256 over the normalized
skill directory. The declared-vs-derived cross-check only reports
capabilities missing from an explicitly declared group set — absent
declarations mean unknown, never undeclared.

> [!NOTE] Status: heuristics, not a verdict
> Markdown and common script files are read with substring and regex signals.
> Detection is incomplete by design; the product promise is the diff between
> two scans, not the completeness of one.

## `diff <base> <head>`

Print the capability delta between two manifests.

```bash
node packages/cli/dist/index.js diff base.json head.json
```

Exit `0` when nothing changed, exit `2` when a capability was added or a
capability value changed. Added capabilities print in red, removed ones in
green, and unchanged ones are listed for completeness. The exit code is the
contract: it is what lets a CI gate fail a skill update that grows its
privileges.

The reference implementation also replaces the whole `capabilities` object
when a class differs at all, so a single changed domain is reported as a
wholesale change rather than a field-level delta.

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
node packages/cli/dist/index.js verify skills-sh:vercel-labs/skills/find-skills
```

The reference splits on the last `@` into a source and a hash. A `local@`
reference is looked up under `ledger/attestations/`, and the stored
`content_hash` must match the reference — unknown hashes fail closed with
exit `1`. A `skills-sh:` reference fetches the current upstream snapshot,
hashes it, and checks the local ledger for that hash. Remote `github:`
references are not fetched yet.

> [!WARNING] Status: local only, no signatures
> `verify` checks presence and hash equality in the local ledger. It does not
> fetch from GitHub or check a Sigstore bundle yet.

## `skills-sh` (read-only, needs a token)

Search skills.sh, inspect a skill's upstream metadata, or scan its snapshot
into a local capability proof. All three are read-only and never write to
the ledger. Authentication uses a Vercel OIDC token from `--token` or the
`SKILLS_SH_TOKEN` environment variable, as documented in the
[skills.sh API reference](https://www.skills.sh/docs/api).

```bash
node packages/cli/dist/index.js skills-sh search "react native" --limit 5
node packages/cli/dist/index.js skills-sh inspect vercel-labs/skills/find-skills
node packages/cli/dist/index.js skills-sh proof vercel-labs/skills/find-skills
```

`inspect` prints the upstream identity, install count, upstream hash and file
list, or the same record as JSON with `--json`. `proof` scans the snapshot,
reconciles the upstream hash with the locally computed one, and prints the
result: exit `0` on a match, exit `2` on a hash mismatch, exit `1` on error.
`--json` prints the capability manifest; `--record` prints the full proof
record (observation, reconciliation, external evidence, manifest) that
`site/proof-data/ingest.mjs` turns into a proof page.
Without a token the commands fail with exit `1` and tell you where the
token comes from.

`proof-url` prints the shareable page for a skill without touching the
network:

```bash
node packages/cli/dist/index.js proof-url vercel-labs/skills/find-skills
```

`sync` checks one leaderboard page and at most `--limit` snapshots,
reporting `match`, `mismatch`, `no-snapshot` or `error` per skill. It never
indexes the whole ecosystem in one run. A scheduled workflow
(`.github/workflows/skills-sh-sync.yml`) runs it every 6 hours and uploads
the JSON report as an artifact.

```bash
node packages/cli/dist/index.js skills-sh sync --view trending --limit 10
```

Skill authors can run the same scan-and-diff in their own repositories with
the [SkillProof Action](https://github.com/RavaniRoshan/skillproof/blob/main/actions/skillproof/action.yml):

```yaml
- uses: RavaniRoshan/skillproof/actions/skillproof@main
  with:
    skill-path: skills/my-skill
    fail-on-new-capability: true
    base-ref: ${{ github.base_ref }}
```

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
