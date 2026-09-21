# CLI reference

Binary: `skillproof` (`packages/cli`). All commands are offline except
`attest`/`verify`, which talk to Sigstore and the ledger.

## `scan <dir> <output>`

Analyse a skill directory and write a capability manifest.

```bash
skillproof scan ./my-skill base.json
```

Detects `network`, `exec`, `filesystem`, `secrets`, `agents`, `mcp` plus
hygiene findings (invisible Unicode tags, unpinned external URLs), and reports
anything not declared in `SKILL.md` frontmatter as `undeclared_findings`.

## `diff <base> <head>`

Print the capability delta. Exit `0` when nothing was added, exit `2` when a
new capability appears.

```bash
skillproof diff base.json head.json
```

## `attest <manifest>`

Keyless-sign the manifest with Sigstore (OIDC identity from CI) and append it
to `ledger/attestations/YYYY/MM/<hash>.jsonl`.

```bash
skillproof attest base.json
```

## `verify <reference>`

Fetch an attestation, check its signature and content hash, print the manifest.

```bash
skillproof verify github:org/repo@sha256:9f3e…
```

## `eval` (v0.2)

Run tasks with and without the skill across pinned models, judge against the
rubric, publish a delta record. Budget-capped and cached by
`(content_hash, task, model, judge, n)`.

```bash
skillproof eval --agent claude --models sonnet-4.5,sonnet-4.6 \
  --tasks evals/*.md --runs 3 --budget-usd 10
```
