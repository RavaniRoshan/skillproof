---
title: Read API
---

<script setup>
const endpoints = [
  {
    icon: "file",
    title: "GET /v1/attest/{sha256}",
    body: "The capability manifest recorded for a content hash, returned as the Manifest component of the schema.",
    meta: "200 · 404",
  },
  {
    icon: "gauge",
    title: "GET /v1/eval/{sha256}",
    body: "The eval matrix and verdict for a content hash, optionally filtered to a single model.",
    meta: "200 · 404 · ?model=",
  },
];
</script>

<DocHero
  eyebrow="Reference"
  title="Read API"
  sub="Two read-only endpoints over the ledger. The machine-readable contract is openapi/v1.yaml, generated from the Zod schemas, so the schema is the source of truth and the API description is a build artifact."
/>

<FeatureCards :items="endpoints" />

## Endpoints

| Endpoint | Returns |
| --- | --- |
| `GET /v1/attest/{sha256}` | Capability manifest — the `Manifest` schema component |
| `GET /v1/eval/{sha256}` | Eval matrix + verdict — the `Eval` schema component; `?model=` filters to one model |

Responses are `200` with the record, or `404` when nothing is recorded for
that hash. The full contract, including every field, lives in
[`openapi/v1.yaml`](https://github.com/RavaniRoshan/skillproof/blob/main/openapi/v1.yaml).

## Example

```bash
curl https://<ledger-mirror>/v1/attest/sha256:9f3e…
```

```json
{
  "schema": "skillproof/1",
  "skill": { "name": "security-audit", "content_hash": "sha256:9f3e…" },
  "capabilities": { "network": { "outbound_domains": ["github.com"] } }
}
```

## Design rules

- Keyed by content hash, never by name — so a fork resolves to the same record.
- Read-only. There is no write API: attestations are meant to enter through
  signed ledger pull requests, which is a flow that does not exist yet.
- Every field in the schema must earn its place by appearing in a check or a report.
- Regeneration is a build step. Change the Zod schema, run
  `npm run generate -w skillproof-schemas`, and never hand-edit `v1.yaml`.

> [!NOTE] Status: specified and tested, not hosted
> The spec is generated and a test asserts every `$ref` resolves
> (`packages/schemas/test/openapi.test.ts`). No service serves these endpoints
> yet, so the example above is a contract rather than a live call.
