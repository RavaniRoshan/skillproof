import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { EvalSchema, ManifestSchema, OpenAPIv1Schema } from "../src/index";

type JsonRecord = Record<string, any>;

function collectRefs(node: unknown, refs: string[] = []): string[] {
  if (Array.isArray(node)) {
    for (const item of node) collectRefs(item, refs);
    return refs;
  }
  if (node !== null && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (key === "$ref" && typeof value === "string") refs.push(value);
      else collectRefs(value, refs);
    }
  }
  return refs;
}

function resolvePointer(root: unknown, ref: string): unknown {
  expect(ref.startsWith("#/")).toBe(true);
  let current: any = root;
  for (const part of ref.slice(2).split("/")) {
    expect(current).toBeDefined();
    current = current[part];
  }
  return current;
}

test("every $ref in the OpenAPI document resolves to a concrete schema", () => {
  const refs = collectRefs(OpenAPIv1Schema);
  expect(refs.length).toBeGreaterThan(0);
  for (const ref of refs) {
    const target = resolvePointer(OpenAPIv1Schema, ref) as JsonRecord;
    expect(target).toBeDefined();
    expect(target.$ref).toBeUndefined();
  }
});

test("component schemas are concrete Zod-derived definitions", () => {
  const schemas = OpenAPIv1Schema.components.schemas as JsonRecord;
  for (const name of ["Manifest", "Eval"]) {
    expect(schemas[name].type).toBe("object");
    expect(schemas[name].properties).toBeDefined();
  }
  expect(Object.keys(schemas.Manifest.properties)).toEqual(
    expect.arrayContaining(["schema", "skill", "capabilities", "signer"]),
  );
  expect(Object.keys(schemas.Eval.properties)).toEqual(
    expect.arrayContaining(["schema", "matrix", "verdict", "cache_key"]),
  );
});

test("openapi/v1.yaml is in sync with the Zod source of truth", () => {
  const yamlPath = join(process.cwd(), "openapi", "v1.yaml");
  const onDisk = parse(readFileSync(yamlPath, "utf8"));
  expect(onDisk).toEqual(JSON.parse(JSON.stringify(OpenAPIv1Schema)));
});

test("minimal records satisfy the Zod schemas behind the components", () => {
  expect(() =>
    ManifestSchema.parse({
      schema: "skillproof/1",
      skill: {
        name: "demo",
        version: "0.0.1",
        source: "test",
        content_hash: "sha256:abc",
      },
      capabilities: {
        network: { outbound_domains: [], via: [] },
        exec: { shell: false, interpreters: [] },
        filesystem: { reads: [], writes: [] },
        secrets: { env_vars: [] },
        agents: { spawns_subagents: false, subagent_types: [] },
        mcp: { servers: [] },
        hygiene: { unicode_issues: 0, external_urls: [], prompt_injection: [] },
      },
      declared: { frontmatter: {} },
      scan_version: "test",
      signer: { iss: "", sub: "", workflow: "", commit: "" },
      undeclared_findings: [],
    }),
  ).not.toThrow();
  expect(EvalSchema.shape.verdict.options).toContain(
    "SKILL_DEGRADED_ON_NEWER_MODEL",
  );
});
