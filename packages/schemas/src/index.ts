import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const ManifestSchema = z.object({
  schema: z.literal("skillproof/1"),
  skill: z.object({
    name: z.string(),
    version: z.string(),
    source: z.string(),
    content_hash: z.string(),
  }),
  capabilities: z.object({
    network: z.object({
      outbound_domains: z.array(z.string()),
      via: z.array(z.string()),
    }),
    exec: z.object({
      shell: z.boolean(),
      interpreters: z.array(z.string()),
    }),
    filesystem: z.object({
      reads: z.array(z.string()),
      writes: z.array(z.string()),
    }),
    secrets: z.object({
      env_vars: z.array(z.string()),
    }),
    agents: z.object({
      spawns_subagents: z.boolean(),
      subagent_types: z.array(z.string()),
    }),
    mcp: z.object({
      servers: z.array(z.string()),
    }),
    hygiene: z.object({
      unicode_issues: z.number(),
      external_urls: z.array(z.string()),
    }),
  }),
  declared: z.object({
    frontmatter: z.record(z.unknown()),
  }),
  scan_version: z.string(),
  signer: z.object({
    iss: z.string(),
    sub: z.string(),
    workflow: z.string(),
    commit: z.string(),
  }),
  undeclared_findings: z.array(z.unknown()),
});

export type Manifest = z.infer<typeof ManifestSchema>;

export const EvalSchema = z.object({
  schema: z.literal("skillproof-eval/1"),
  skill_hash: z.string(),
  skill_version: z.string(),
  matrix: z.array(
    z.object({
      model: z.string(),
      baseline: z.object({
        output: z.string(),
        cost: z.number(),
        time: z.number(),
      }),
      with_skill: z.object({
        output: z.string(),
        cost: z.number(),
        time: z.number(),
      }),
      uplift: z.number(),
    }),
  ),
  verdict: z.enum([
    "OK",
    "SKILL_DEGRADED_ON_NEWER_MODEL",
    "IMPROVED",
    "INCONCLUSIVE",
  ]),
  cost_usd: z.number(),
  runs: z.number(),
  tasks: z.number(),
  cache_key: z.object({
    hash: z.string(),
    task: z.string(),
    model: z.string(),
    judge: z.string(),
    n: z.number(),
  }),
  task_provenance: z.enum(["author", "generated"]),
  judge_agreement_rate: z.number(),
  trace_ref: z.string(),
});

export type Eval = z.infer<typeof EvalSchema>;

// skills.sh integration (M0): source-observation record. Transient upstream
// metadata only — never mixed into the signed Manifest above. install_count
// drives discovery priority, observed_at drives freshness, the hash pair
// drives re-scan decisions, scanner_version drives re-scan on scanner bumps.
export const HashRefSchema = z.object({
  algorithm: z.literal("sha256"),
  value: z.string(),
  source: z.string(),
});

export const SkillproofSourceSchema = z.object({
  schema: z.literal("skillproof-source/1"),
  source_registry: z.literal("skills.sh"),
  external_id: z.string(),
  source_repository: z.string(),
  skill_slug: z.string(),
  source_url: z.string(),
  source_hash: HashRefSchema,
  skillproof_hash: HashRefSchema,
  hash_match: z.boolean(),
  install_count: z.number(),
  observed_at: z.string(),
  scanner_version: z.string(),
});

export type SkillproofSource = z.infer<typeof SkillproofSourceSchema>;

// skills.sh partner audits as external evidence. Kept separate from
// SkillProof's own capability manifest; never collapsed into one score.
export const ExternalEvidenceSchema = z.object({
  provider: z.string(),
  slug: z.string().optional(),
  status: z.enum(["pass", "warn", "fail"]),
  summary: z.string().optional(),
  riskLevel: z.enum(["NONE", "LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  auditedAt: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export type ExternalEvidence = z.infer<typeof ExternalEvidenceSchema>;

// Pinned to a non-generic signature: the library's generic overloads exceed
// this repo's TypeScript instantiation depth on large schemas.
type JsonSchema = Record<string, unknown>;

const toOpenApiSchema = zodToJsonSchema as unknown as (
  schema: z.ZodTypeAny,
  options: { name: string; target: "openApi3" },
) => JsonSchema;

// zod-to-json-schema wraps named schemas as
// { $ref: '#/definitions/X', definitions: { X: {...} } }.
// OpenAPI components must be concrete definitions, so inline that wrapper.
// Any remaining $ref after this is a bug the openapi.test.ts suite catches.
function inlineTopLevelRef(schema: JsonSchema): JsonSchema {
  const ref = schema.$ref;
  const definitions = schema.definitions as
    Record<string, JsonSchema> | undefined;
  if (
    typeof ref === "string" &&
    ref.startsWith("#/definitions/") &&
    definitions
  ) {
    const name = ref.slice("#/definitions/".length);
    if (definitions[name]) return definitions[name];
  }
  return schema;
}

// JSON Schema derivations are the single source of truth for every
// committed contract artifact (openapi/v1.yaml, *.schema.json).
// Regenerate with: npm run generate -w skillproof-schemas
export const ManifestJsonSchema = inlineTopLevelRef(
  toOpenApiSchema(ManifestSchema, {
    name: "Manifest",
    target: "openApi3",
  }),
);

export const EvalJsonSchema = inlineTopLevelRef(
  toOpenApiSchema(EvalSchema, {
    name: "Eval",
    target: "openApi3",
  }),
);

export const OpenAPIv1Schema = {
  openapi: "3.0.0",
  info: {
    title: "SkillProof Read API",
    version: "1.0.0",
    description: "API for reading attestations and evaluations",
  },
  paths: {
    "/v1/attest/{sha256}": {
      get: {
        summary: "Get attestation by SHA256 hash",
        parameters: [
          {
            name: "sha256",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Attestation found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Manifest" },
              },
            },
          },
          "404": {
            description: "Attestation not found",
          },
        },
      },
    },
    "/v1/eval/{sha256}": {
      get: {
        summary: "Get evaluations by SHA256 hash",
        parameters: [
          {
            name: "sha256",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "model",
            in: "query",
            required: false,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Evaluations found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Eval" },
              },
            },
          },
          "404": {
            description: "Evaluations not found",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Manifest: ManifestJsonSchema,
      Eval: EvalJsonSchema,
    },
  },
};
