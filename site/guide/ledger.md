# Ledger

The ledger is a public, append-only, content-addressed log of attestations.
In v0.1 it is deliberately unglamorous: a git repository of JSONL files.

## Layout

```text
ledger/
├── attestations/YYYY/MM/<content_hash>.jsonl
└── evals/<content_hash>.jsonl
```

One line per attestation, ~1 KB each. No skill code is stored — the ledger
stays measured in megabytes. GitHub provides hosting, history and
immutability-by-convention for free.

## Validation

Every ledger PR is checked by CI:

1. Schema validation against the Zod source of truth.
2. Sigstore bundle verification, including Rekor inclusion.
3. Recomputed `content_hash` matches the pinned skill source.
4. Append-only history (no rewrites).

## Capability-diff Action

`actions/capability-diff` runs on every PR touching `SKILL.md`, skill scripts,
hooks or MCP configs. It scans base and head, posts the capability delta as a
PR comment, and fails on added capabilities until a human acknowledges them
with the `skillproof-ack` label. Skill updates become reviewable like
dependency updates.

## Consuming the ledger

Any registry, harness or CI can fetch records without permission — see the
[read API](/api/). Later, the git backend is mirrored to a CDN with a query
API; the content-hash identity means consumers never depend on names.
