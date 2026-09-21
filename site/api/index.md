# Read API

Read-only access to attestations and evaluations. The full machine-readable
contract is [`openapi/v1.yaml`](https://github.com/RavaniRoshan/skillproof/blob/main/openapi/v1.yaml),
generated from the Zod schemas in `packages/schemas`.

## Endpoints

| Endpoint | Returns |
| --- | --- |
| `GET /v1/attest/{sha256}` | Capability manifest + signature bundle + Rekor reference |
| `GET /v1/eval/{sha256}` | Eval matrix + verdict; `?model=` filters to one model |

Responses: `200` with the record, `404` when no attestation exists for the hash.

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

- Keyed by content hash, never by name.
- Read-only in v0.1 — no write API. Attestations enter through signed ledger PRs.
- Every field in the schema must earn its place by appearing in a check or a report.
