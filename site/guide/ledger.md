---
title: Ledger
---

<script setup>
const properties = [
  {
    icon: "book",
    title: "Append-only",
    body: "Records are added, never rewritten. History is the point, so the log is a git repository of JSONL files rather than a database with an update path.",
  },
  {
    icon: "hash",
    title: "Content-addressed",
    body: "Every file is named after the hash of the skill directory it describes. Forks and vendored copies collapse onto one identity, so nothing can be squatted.",
  },
  {
    icon: "file",
    title: "Small by design",
    body: "About a kilobyte of JSON per attestation — manifest and eval result. No skill code is ever stored, which keeps the ledger measured in megabytes.",
  },
  {
    icon: "globe",
    title: "Permissionless",
    body: "Any registry, harness or CI can read a record without an account, a key or a conversation with us.",
  },
];
</script>

<DocHero
  eyebrow="Reference"
  title="The public record"
  sub="The ledger is a public, append-only, content-addressed log of attestations. In v0.1 it is deliberately unglamorous: a git repository of JSONL files, with no service to run."
/>

<FeatureCards :items="properties" />

## Layout

```text
ledger/
├── attestations/YYYY/MM/<content_hash>.jsonl
└── evals/<content_hash>.jsonl
```

One line per attestation, roughly a kilobyte each. GitHub provides hosting,
history and immutability-by-convention for free, which is why the first
version is a repository instead of a service.

> [!WARNING] Status: the directory does not exist yet
> `ledger/` is not part of this repository. `attest` writes to
> `ledger/attestations/YYYY/MM/` relative to your working directory, creating
> it on demand, so today the layout above describes the plan rather than
> something you can clone.

## Validation

Every ledger pull request is meant to be checked by CI:

1. Schema validation against the Zod source of truth.
2. Sigstore bundle verification, including Rekor inclusion.
3. Recomputed `content_hash` matches the pinned skill source.
4. Append-only history, meaning no rewrites.

> [!NOTE] Status: validation is specified, not implemented
> There is no PR validator workflow and no signing yet, so rules 2 and 3 have
> nothing to check against. Rule 1 is the only one backed by code today,
> through the JSON schemas in `packages/schemas`.

## Capability-diff Action

`actions/capability-diff` is planned to run on every PR touching `SKILL.md`,
skill scripts, hooks or MCP configs. It would scan base and head, post the
capability delta as a PR comment, and fail on added capabilities until a human
acknowledges them with the `skillproof-ack` label — so skill updates become
reviewable like dependency updates.

The `actions/` directory is not in the repository yet. Until it ships, the
same gate can be assembled from `diff` plus its exit code.

## Consuming the ledger

Any registry, harness or CI can fetch records without permission — see the
[read API](/api/). The content-hash identity means consumers never depend on a
skill's name, so a rename or a fork does not break a reference.

The longer-term plan is to mirror the git backend to a CDN with a query API.
The git repository stays the source of truth either way.
