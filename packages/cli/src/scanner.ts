// Heuristic capability scanner (v0.1). Substring/regex signals only —
// documented limits, never a safety verdict. Every reported value is
// extracted from the scanned content; nothing is a placeholder.
import fs from "node:fs";
import path from "node:path";
import { hashDirectory } from "skillproof-skills-sh";

const SCANNED_EXTENSIONS = new Set([
  ".md",
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".py",
  ".sh",
  ".json",
]);

const URL_PATTERN =
  /https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*/g;

// Invisible Unicode Tag block U+E0000–U+E007F (UTF-16 surrogate range).
const UNICODE_TAG_PATTERN = /[\uDB40][\uDC00-\uDC7F]/g;

// Prompt-injection phrases: evidence to read in context, never a verdict.
// Security documentation can legitimately contain these strings.
const PROMPT_INJECTION_PHRASES = [
  "ignore previous instructions",
  "ignore all previous instructions",
  "disregard previous instructions",
  "disregard all previous instructions",
  "forget previous instructions",
  "ignore the above",
  "new system prompt",
  "reveal your system prompt",
  "print your system prompt",
  "disclose your system prompt",
];

interface Findings {
  network: { outbound_domains: string[]; via: string[] };
  exec: { shell: boolean; interpreters: string[] };
  filesystem: { reads: string[]; writes: string[] };
  secrets: { env_vars: string[] };
  agents: { spawns_subagents: boolean; subagent_types: string[] };
  mcp: { servers: string[] };
  hygiene: {
    unicode_issues: number;
    external_urls: string[];
    prompt_injection: string[];
  };
}

function emptyFindings(): Findings {
  return {
    network: { outbound_domains: [], via: [] },
    exec: { shell: false, interpreters: [] },
    filesystem: { reads: [], writes: [] },
    secrets: { env_vars: [] },
    agents: { spawns_subagents: false, subagent_types: [] },
    mcp: { servers: [] },
    hygiene: { unicode_issues: 0, external_urls: [], prompt_injection: [] },
  };
}

function collectFiles(dir: string): string[] {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === ".git" || item.name === "node_modules") continue;
      files.push(...collectFiles(fullPath));
    } else if (item.isFile()) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

function hostnames(content: string): string[] {
  const urls = content.match(URL_PATTERN) ?? [];
  const hosts = new Set<string>();
  for (const url of urls) {
    try {
      hosts.add(new URL(url).hostname.toLowerCase());
    } catch {
      // Ignore malformed URLs; the raw string stays in hygiene.external_urls.
    }
  }
  return [...hosts];
}

function pushUnique(list: string[], value: string): void {
  if (!list.includes(value)) list.push(value);
}

function scanContent(content: string, findings: Findings): void {
  const urls = content.match(URL_PATTERN) ?? [];
  if (content.match(/\bcurl\b/i)) pushUnique(findings.network.via, "curl");
  if (content.match(/\bwget\b/i)) pushUnique(findings.network.via, "wget");
  if (content.match(/\bfetch\s*\(/i)) pushUnique(findings.network.via, "fetch");
  if (content.match(/\baxios\b/i)) pushUnique(findings.network.via, "axios");
  if (content.match(/\bhttp\.get\b/i))
    pushUnique(findings.network.via, "http.get");
  if (findings.network.via.length > 0 || urls.length > 0) {
    for (const host of hostnames(content)) {
      pushUnique(findings.network.outbound_domains, host);
    }
  }

  if (
    content.match(
      /\bexec\b|\bspawn\b|\bsubprocess\b|\bos\.system\b|shell\s*:\s*true|\bbash\b|\bsh\s+-c\b/i,
    )
  ) {
    findings.exec.shell = true;
  }
  if (content.match(/\bbash\b|\bsh\s+-c\b/i))
    pushUnique(findings.exec.interpreters, "bash");
  if (content.match(/\bpython3?\b/i))
    pushUnique(findings.exec.interpreters, "python3");
  if (content.match(/\bnode\b/i))
    pushUnique(findings.exec.interpreters, "node");

  if (
    content.match(/\bfs\.read\w*|\breadFile\b|~\/|\.env\b|\/etc\/|MEMORY\.md/)
  ) {
    const paths =
      content.match(/\/etc\/[^\s"'`]+|~\/[^\s"'`]+|\.env\b|\S*MEMORY\.md/g) ??
      [];
    for (const match of paths) pushUnique(findings.filesystem.reads, match);
    const readArgs =
      content.matchAll(/(?:readFile|fs\.read\w*)\(\s*['"`]([^'"`]+)['"`]/g) ??
      [];
    for (const match of readArgs)
      pushUnique(findings.filesystem.reads, match[1]);
  }
  if (content.match(/\bfs\.write\w*|\bwriteFile\b/)) {
    const writeArgs =
      content.matchAll(/(?:writeFile|fs\.write\w*)\(\s*['"`]([^'"`]+)['"`]/g) ??
      [];
    for (const match of writeArgs)
      pushUnique(findings.filesystem.writes, match[1]);
  }

  if (content.match(/process\.env|ENV\[|API_KEY|SECRET|TOKEN/)) {
    const envAccess =
      content.matchAll(/process\.env\.([A-Za-z_][A-Za-z0-9_]*)/g) ?? [];
    for (const match of envAccess)
      pushUnique(findings.secrets.env_vars, match[1]);
    const constants = content.match(/\b[A-Z][A-Z0-9_]{2,}\b/g) ?? [];
    for (const name of constants) {
      if (/KEY|SECRET|TOKEN|PASSWORD/.test(name)) {
        pushUnique(findings.secrets.env_vars, name);
      }
    }
  }

  if (content.match(/subagent|Task\s*\(|subagent_type/)) {
    findings.agents.spawns_subagents = true;
    const typed =
      content.matchAll(/subagent_type\s*[:=]\s*['"`]([^'"`]+)['"`]/g) ?? [];
    for (const match of typed)
      pushUnique(findings.agents.subagent_types, match[1]);
  }

  if (content.match(/mcp[\s_-]*server|mcp\.json/i)) {
    const servers = content.match(/mcp[\w.-]*/gi) ?? [];
    for (const server of servers)
      pushUnique(findings.mcp.servers, server.toLowerCase());
  }

  const tags = content.match(UNICODE_TAG_PATTERN);
  if (tags) findings.hygiene.unicode_issues += tags.length;
  for (const url of urls) pushUnique(findings.hygiene.external_urls, url);
  const lowered = content.toLowerCase();
  for (const phrase of PROMPT_INJECTION_PHRASES) {
    if (lowered.includes(phrase)) {
      pushUnique(findings.hygiene.prompt_injection, phrase);
    }
  }
}

function parseFrontmatter(content: string): Record<string, string> {
  const block = content.match(/^---\r?\n([\s\S]*?)\r?\n---/m);
  if (!block) return {};
  const frontmatter: Record<string, string> = {};
  for (const line of block[1].split("\n")) {
    const match = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.+?)\s*$/);
    if (match) frontmatter[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
  return frontmatter;
}

function sortFindings(findings: Findings): Findings {
  for (const group of Object.values(findings)) {
    for (const [key, value] of Object.entries(group)) {
      if (Array.isArray(value)) {
        (group as Record<string, unknown>)[key] = [...value].sort();
      }
    }
  }
  return findings;
}

export interface SnapshotFile {
  path: string;
  contents: string;
}

export class Scanner {
  static async scanFiles(files: SnapshotFile[]): Promise<Findings> {
    const findings = emptyFindings();
    const sorted = [...files].sort((a, b) =>
      a.path < b.path ? -1 : a.path > b.path ? 1 : 0,
    );
    for (const file of sorted) {
      if (!SCANNED_EXTENSIONS.has(path.extname(file.path).toLowerCase()))
        continue;
      scanContent(file.contents, findings);
    }
    return sortFindings(findings);
  }

  static async scan(skillPath: string): Promise<Findings> {
    const skillDir = path.resolve(skillPath);
    const files: SnapshotFile[] = collectFiles(skillDir).map((file) => ({
      path: path.relative(skillDir, file).replace(/\\/g, "/"),
      contents: fs.readFileSync(file, "utf-8"),
    }));
    return Scanner.scanFiles(files);
  }

  static computeHash(skillPath: string): string {
    return hashDirectory(skillPath);
  }

  static readFrontmatter(skillPath: string): Record<string, string> {
    const skillDir = path.resolve(skillPath);
    const candidates = collectFiles(skillDir).filter(
      (file) => path.extname(file).toLowerCase() === ".md",
    );
    const preferred =
      candidates.find(
        (file) => path.basename(file).toLowerCase() === "skill.md",
      ) ?? candidates[0];
    if (!preferred) return {};
    return parseFrontmatter(fs.readFileSync(preferred, "utf-8"));
  }

  static readFrontmatterFiles(files: SnapshotFile[]): Record<string, string> {
    const candidates = files.filter(
      (file) => path.extname(file.path).toLowerCase() === ".md",
    );
    const preferred =
      candidates.find(
        (file) => path.basename(file.path).toLowerCase() === "skill.md",
      ) ?? candidates[0];
    if (!preferred) return {};
    return parseFrontmatter(preferred.contents);
  }
}

export default Scanner;
