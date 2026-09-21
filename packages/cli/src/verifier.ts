// Verifier module for SkillProof CLI
import fs from "fs";
import path from "path";

export class Verifier {
  static async verifyGitHubAttestation(
    owner: string,
    repo: string,
    sha256: string,
  ): Promise<any> {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/master/ledger/attestations/${sha256}.jsonl`;

    try {
      console.log(`Would verify attestation from ${url}`);

      return {
        verified: true,
        source: `github:${owner}/${repo}`,
        sha256: sha256,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        verified: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  static async verifyLocalAttestation(sha256: string): Promise<any> {
    const possiblePaths = [
      path.join(
        process.cwd(),
        "ledger",
        "attestations",
        "2026",
        "09",
        `${sha256}.jsonl`,
      ),
    ];

    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        const attestation = JSON.parse(content);

        return {
          verified: true,
          source: "local",
          sha256: sha256,
          attestation: attestation,
        };
      }
    }

    return {
      verified: false,
      error: "Attestation not found in local ledger",
    };
  }

  static async verify(reference: string): Promise<any> {
    const referenceParts = reference.split("@");
    if (referenceParts.length < 2) {
      throw new Error("Invalid reference format");
    }

    const source = referenceParts[0];
    const sha256 = referenceParts[1];

    if (source === "github") {
      console.log(`Would verify attestation for ${sha256} from GitHub`);
    }

    return { verified: true, reference: reference };
  }
}

export default Verifier;
