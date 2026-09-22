// Verifier module for SkillProof CLI
import fs from "fs";
import path from "path";

export class Verifier {
  static async verifyGitHubAttestation(
    owner: string,
    repo: string,
    sha256: string,
  ): Promise<any> {
    return {
      verified: false,
      source: `github:${owner}/${repo}`,
      sha256: sha256,
      error:
        "Remote fetch and Rekor verification are not implemented yet (M2 work)",
    };
  }

  static async verifyLocalAttestation(sha256: string): Promise<any> {
    const hash = sha256.replace(/^sha256:/, "");
    const ledgerRoot = path.join(process.cwd(), "ledger", "attestations");
    if (!fs.existsSync(ledgerRoot)) {
      return { verified: false, error: "Local ledger not found" };
    }
    const years = fs.readdirSync(ledgerRoot);
    for (const year of years) {
      const yearDir = path.join(ledgerRoot, year);
      if (!fs.statSync(yearDir).isDirectory()) continue;
      for (const month of fs.readdirSync(yearDir)) {
        const candidate = path.join(yearDir, month, `${hash}.jsonl`);
        if (fs.existsSync(candidate)) {
          const attestation = JSON.parse(fs.readFileSync(candidate, "utf-8"));
          const recorded: string =
            attestation.manifest?.skill?.content_hash ?? "";
          if (recorded === sha256 || recorded === `sha256:${hash}`) {
            return {
              verified: true,
              source: "local",
              sha256: sha256,
              attestation: attestation,
            };
          }
          return {
            verified: false,
            error: "Attestation content hash does not match reference",
          };
        }
      }
    }

    return {
      verified: false,
      error: "Attestation not found in local ledger",
    };
  }

  static async verify(reference: string): Promise<any> {
    const atIndex = reference.lastIndexOf("@");
    if (atIndex < 0) {
      throw new Error("Invalid reference format");
    }

    const source = reference.slice(0, atIndex);
    const sha256 = reference.slice(atIndex + 1);

    if (source.startsWith("github:")) {
      const repoPath = source.slice("github:".length);
      const [owner, repo] = repoPath.split("/");
      return Verifier.verifyGitHubAttestation(owner ?? "", repo ?? "", sha256);
    }

    return Verifier.verifyLocalAttestation(sha256);
  }
}

export default Verifier;
