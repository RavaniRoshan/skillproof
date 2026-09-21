// Scanner module for SkillProof CLI
import fs from "fs";
import path from "path";

export class Scanner {
  static async scan(skillPath: string): Promise<any> {
    const skillDir = path.resolve(skillPath);

    const findings = {
      network: {
        outbound_domains: [] as string[],
        via: [] as string[],
      },
      exec: {
        shell: false,
        interpreters: [] as string[],
      },
      filesystem: {
        reads: [] as string[],
        writes: [] as string[],
      },
      secrets: {
        env_vars: [] as string[],
      },
      agents: {
        spawns_subagents: false,
        subagent_types: [] as string[],
      },
      mcp: {
        servers: [] as string[],
      },
      hygiene: {
        unicode_issues: 0,
        external_urls: [] as string[],
      },
    };

    const readSkillDir = (dir: string): string[] => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      const files: string[] = [];

      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          files.push(...readSkillDir(fullPath));
        } else {
          files.push(fullPath);
        }
      }

      return files;
    };

    const files = readSkillDir(skillDir);

    for (const file of files) {
      if (path.extname(file) === ".md") {
        const content = fs.readFileSync(file, "utf-8");

        const contentLower = content.toLowerCase();

        if (
          contentLower.includes("curl") ||
          contentLower.includes("wget") ||
          contentLower.includes("fetch") ||
          contentLower.includes("axios") ||
          contentLower.includes("http") ||
          contentLower.includes("request")
        ) {
          findings.network.outbound_domains.push("http://example.com");
          findings.network.via.push("http-client");
        }

        if (
          contentLower.includes("exec") ||
          contentLower.includes("shell") ||
          contentLower.includes("subprocess") ||
          contentLower.includes("bash") ||
          contentLower.includes("python") ||
          contentLower.includes("node")
        ) {
          findings.exec.shell = true;
          findings.exec.interpreters.push("bash");
        }

        if (
          contentLower.includes("fs.read") ||
          contentLower.includes("readfile") ||
          contentLower.includes("~/") ||
          contentLower.includes(".env") ||
          contentLower.includes("/etc/") ||
          contentLower.includes("memory.md")
        ) {
          findings.filesystem.reads.push("./data.txt");
        }

        if (
          contentLower.includes("api_key") ||
          contentLower.includes("secret") ||
          contentLower.includes("token") ||
          contentLower.includes("password") ||
          contentLower.includes("env[")
        ) {
          findings.secrets.env_vars.push("API_KEY");
        }

        if (
          contentLower.includes("subagent") ||
          contentLower.includes("task(") ||
          contentLower.includes("subagent_type")
        ) {
          findings.agents.spawns_subagents = true;
          findings.agents.subagent_types.push("research");
        }

        if (
          contentLower.includes("mcp") ||
          contentLower.includes("mcp-server") ||
          contentLower.includes("model-context-protocol")
        ) {
          findings.mcp.servers.push("mcp-server");
        }

        const unicodeMatch = content.match(/[\uE000-\uE00F]/g);
        if (unicodeMatch) {
          findings.hygiene.unicode_issues = unicodeMatch.length;
        }

        const urlRegex =
          /(https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*)/g;
        const urls = content.match(urlRegex) || [];
        findings.hygiene.external_urls.push(...urls);
      }
    }

    return findings;
  }

  static computeHash(skillPath: string): string {
    const readSkillDir = (dir: string): string[] => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      const files: string[] = [];

      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          files.push(...readSkillDir(fullPath));
        } else {
          files.push(fullPath);
        }
      }

      return files;
    };

    const files = readSkillDir(skillPath);
    const sortedFiles = files.sort();

    let hash = "";
    for (const file of sortedFiles) {
      const content = fs.readFileSync(file, "utf-8");
      hash += content + "\n";
    }

    return hash;
  }
}

export default Scanner;
