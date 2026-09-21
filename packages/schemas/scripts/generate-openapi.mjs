// Regenerates committed contract artifacts from the Zod source of truth.
// Run: npm run generate -w skillproof-schemas
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stringify } from 'yaml';
import {
  EvalJsonSchema,
  ManifestJsonSchema,
  OpenAPIv1Schema,
} from '../dist/index.js';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..', '..');

mkdirSync(join(repoRoot, 'openapi'), { recursive: true });
writeFileSync(join(repoRoot, 'openapi', 'v1.yaml'), stringify(OpenAPIv1Schema));
writeFileSync(
  join(repoRoot, 'packages', 'schemas', 'manifest.schema.json'),
  `${JSON.stringify(ManifestJsonSchema, null, 2)}\n`,
);
writeFileSync(
  join(repoRoot, 'packages', 'schemas', 'eval.schema.json'),
  `${JSON.stringify(EvalJsonSchema, null, 2)}\n`,
);

console.log('wrote openapi/v1.yaml, manifest.schema.json, eval.schema.json');
