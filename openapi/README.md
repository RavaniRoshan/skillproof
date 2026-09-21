# OpenAPI Specification for SkillProof Read API

This directory contains the OpenAPI v0.1 specification for the SkillProof Read API.

## API Overview

The SkillProof Read API provides read-only access to:
- Attestations (skill capability proofs)
- Evaluations (test results)

## Endpoints

### GET /v1/attest/{sha256}
Get attestation by SHA256 hash of the skill manifest.

**Parameters:**
- `sha256` (path): The SHA256 hash of the skill manifest

**Responses:**
- `200`: Attestation found
- `404`: Attestation not found

### GET /v1/eval/{sha256}
Get evaluations by SHA256 hash of the skill manifest.

**Parameters:**
- `sha256` (path): The SHA256 hash of the skill manifest
- `model` (query): Optional model filter to get evaluations for a specific model

**Responses:**
- `200`: Evaluations found
- `404`: Evaluations not found

## Schema

The API uses the following schemas:
- `Manifest`: Skill capability manifest
- `Eval`: Evaluation result record

## Usage

The API is designed for consumption by:
- Harness systems that need to verify skills
- Registries that display skill information
- Client applications that need to read proof data

## Static Mirror

The committed contract is `v1.yaml`, generated from the Zod source of truth
in `packages/schemas/src/index.ts`. Regenerate it with:

```bash
npm run generate:openapi
```

`packages/schemas/manifest.schema.json` and `eval.schema.json` are generated
the same way. Do not hand-edit generated files.

## Testing

The API can be tested using OpenAPI tools like Postman, Swagger UI, or client libraries.