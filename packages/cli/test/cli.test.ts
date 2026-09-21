import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DiffProcessor } from "../src/diff-processor";
import { Ledger } from "../src/ledger";
import { Scanner } from "../src/scanner";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(here, "fixtures");

test("scanner finds no capabilities in a clean skill", async () => {
  const findings = await Scanner.scan(path.join(fixturesDir, "clean-skill"));

  expect(findings.network.outbound_domains).toEqual([]);
  expect(findings.exec.shell).toBe(false);
  expect(findings.filesystem.reads).toEqual([]);
});

test("diff processor exits 2 on a newly added capability", async () => {
  expect(
    fs.existsSync(path.join(fixturesDir, "clean-skill", "README.md")),
  ).toBe(true);
  expect(
    fs.existsSync(path.join(fixturesDir, "evil-diff-skill", "README.md")),
  ).toBe(true);

  const dir = path.join(here, "test-diff");
  fs.mkdirSync(dir, { recursive: true });
  const basePath = path.join(dir, "base.json");
  const headPath = path.join(dir, "head.json");
  fs.writeFileSync(
    basePath,
    JSON.stringify({ capabilities: { exec: { shell: false } } }),
  );
  fs.writeFileSync(
    headPath,
    JSON.stringify({
      capabilities: {
        exec: { shell: false },
        network: { outbound_domains: ["evil.example.com"] },
      },
    }),
  );

  try {
    const result = await DiffProcessor.process(basePath, headPath);
    expect(result.exitCode).toBe(2);
    expect(
      result.capabilities.added.map(
        (entry: { capability: string }) => entry.capability,
      ),
    ).toContain("network");
    expect(
      result.capabilities.unchanged.map(
        (entry: { capability: string }) => entry.capability,
      ),
    ).toContain("exec");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("ledger creates attestation", async () => {
  const testManifest = {
    schema: "skillproof/1",
    skill: {
      name: "test-skill",
      version: "1.0.0",
      source: "./test",
      content_hash: "sha256:testhash",
    },
    capabilities: {},
    declared: { frontmatter: {} },
    scan_version: "test",
    signer: { iss: "", sub: "", workflow: "", commit: "" },
    undeclared_findings: [],
  };

  const dir = path.join(here, "test-manifest");
  fs.mkdirSync(dir, { recursive: true });
  const manifestPath = path.join(dir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(testManifest, null, 2));

  try {
    const result = await Ledger.attest(manifestPath, {
      iss: "test",
      sub: "test",
      workflow: "test",
      commit: "test",
    });
    expect(result).toContain(".jsonl");
    expect(fs.existsSync(result)).toBe(true);

    fs.unlinkSync(result);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
