// Assembles a scan manifest. Used by the CLI and by tests asserting the
// output validates against ManifestSchema.
import path from "node:path";
import { Scanner } from "./scanner.js";

export const SCAN_VERSION = "skillproof-scan/0.1.4";

const emptyCapability: Record<string, unknown> = {
  network: { outbound_domains: [], via: [] },
  exec: { shell: false, interpreters: [] },
  filesystem: { reads: [], writes: [] },
  secrets: { env_vars: [] },
  agents: { spawns_subagents: false, subagent_types: [] },
  mcp: { servers: [] },
};

export interface ManifestParts {
  name: string;
  version: string;
  source: string;
  contentHash: string;
  capabilities: Record<string, unknown>;
  frontmatter: Record<string, string>;
}

export function assembleManifest(parts: ManifestParts): any {
  const declaredGroups = new Set(
    Object.keys(emptyCapability).filter(
      (group) => parts.frontmatter[group] !== undefined,
    ),
  );
  return {
    schema: "skillproof/1",
    skill: {
      name: parts.name,
      version: parts.version,
      source: parts.source,
      content_hash: parts.contentHash,
    },
    capabilities: parts.capabilities,
    declared: { frontmatter: parts.frontmatter },
    scan_version: SCAN_VERSION,
    signer: { iss: "", sub: "", workflow: "", commit: "" },
    // Absent declarations mean "unknown", never "undeclared".
    undeclared_findings:
      declaredGroups.size === 0
        ? []
        : Object.entries(parts.capabilities)
            .filter(
              ([group, value]) =>
                !declaredGroups.has(group) &&
                JSON.stringify(value) !==
                  JSON.stringify(emptyCapability[group]),
            )
            .map(([group]) => group),
  };
}

export async function buildManifest(skillPath: string): Promise<any> {
  const capabilities = await Scanner.scan(skillPath);
  const frontmatter = Scanner.readFrontmatter(skillPath);
  return assembleManifest({
    name: frontmatter.name ?? path.basename(path.resolve(skillPath)),
    version: frontmatter.version ?? "0.0.0",
    source: skillPath,
    contentHash: Scanner.computeHash(skillPath),
    capabilities: capabilities as unknown as Record<string, unknown>,
    frontmatter,
  });
}
