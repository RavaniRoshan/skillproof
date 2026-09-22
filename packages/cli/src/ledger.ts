// Ledger module for SkillProof CLI
import fs from "fs";
import path from "path";
import { Verifier } from "./verifier.js";

export class Ledger {
  static async attest(manifestPath: string, signerInfo: any): Promise<string> {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

    const attestation = {
      schema: "skillproof/1",
      manifest: manifest,
      signer: signerInfo,
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    };

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const attestationDir = path.join(
      process.cwd(),
      "ledger",
      "attestations",
      year.toString(),
      month,
    );
    if (!fs.existsSync(attestationDir)) {
      fs.mkdirSync(attestationDir, { recursive: true });
    }

    const manifestHash = manifest.skill.content_hash.split(":")[1];
    const filename = `${manifestHash}.jsonl`;

    fs.writeFileSync(
      path.join(attestationDir, filename),
      JSON.stringify(attestation) + "\n",
    );

    return path.join(attestationDir, filename);
  }

  static async verify(reference: string): Promise<any> {
    return Verifier.verify(reference);
  }
}

export default Ledger;
