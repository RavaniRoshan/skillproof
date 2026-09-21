// CLI entry point
import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import { Scanner } from "./scanner";
import { DiffProcessor } from "./diff-processor";
import { Ledger } from "./ledger";
import { Verifier } from "./verifier";

const program = new Command();

program
  .name("skillproof")
  .description("SkillProof CLI - Open registry of proof for agent skills")
  .version("0.1.0");

program
  .command("scan")
  .description("Scan a skill directory and generate capability manifest")
  .argument("<skill>", "Path to skill directory")
  .argument("<output>", "Output file path")
  .action(async (skillPath: string, outputPath: string) => {
    try {
      console.log(chalk.blue(`Scanning skill at ${skillPath}...`));

      const manifest = await Scanner.scan(skillPath);
      manifest.schema = "skillproof/1";
      manifest.skill = {
        name: "example-skill",
        version: "1.0.0",
        source: skillPath,
        content_hash: `sha256:${Scanner.computeHash(skillPath)}`,
      };
      manifest.declared = { frontmatter: {} };
      manifest.scan_version = "skillproof-scan/0.1.3";
      manifest.signer = {
        iss: "",
        sub: "",
        workflow: "",
        commit: "",
      };
      manifest.undeclared_findings = [];

      fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

      console.log(
        chalk.green(`Scan complete. Results written to ${outputPath}`),
      );
    } catch (error) {
      console.error(
        chalk.red(
          `Error scanning skill: ${error instanceof Error ? error.message : String(error)}`,
        ),
      );
      process.exit(1);
    }
  });

program
  .command("diff")
  .description("Compare two capability manifests")
  .argument("<base>", "Base manifest file path")
  .argument("<head>", "Head manifest file path")
  .action(async (basePath: string, headPath: string) => {
    try {
      console.log(chalk.blue(`Comparing ${basePath} with ${headPath}...`));

      const result = await DiffProcessor.process(basePath, headPath);

      if (result.capabilities.added.length > 0) {
        console.log(chalk.red("New capabilities detected:"));
        result.capabilities.added.forEach((cap: any) => {
          console.log(
            chalk.red(`  + ${cap.capability}: ${JSON.stringify(cap.value)}`),
          );
        });
      }

      if (result.capabilities.removed.length > 0) {
        console.log(chalk.green("Capabilities removed (improvements):"));
        result.capabilities.removed.forEach((cap: any) => {
          console.log(
            chalk.green(`  - ${cap.capability}: ${JSON.stringify(cap.value)}`),
          );
        });
      }

      if (result.capabilities.unchanged.length > 0) {
        console.log(chalk.blue("Unchanged capabilities:"));
        result.capabilities.unchanged.forEach((cap: any) => {
          console.log(
            chalk.blue(`  = ${cap.capability}: ${JSON.stringify(cap.value)}`),
          );
        });
      }

      console.log(
        chalk.yellow(`\nDiff complete. Exit code: ${result.exitCode}`),
      );

      if (result.exitCode === 2) {
        console.log(
          chalk.red("New capabilities detected - exiting with code 2"),
        );
        process.exit(2);
      }
    } catch (error) {
      console.error(
        chalk.red(
          `Error processing diff: ${error instanceof Error ? error.message : String(error)}`,
        ),
      );
      process.exit(1);
    }
  });

program
  .command("attest")
  .description("Create a signed attestation for a capability manifest")
  .argument("<manifest>", "Manifest file path")
  .action(async (manifestPath: string) => {
    try {
      console.log(chalk.blue(`Creating attestation for ${manifestPath}...`));

      const signerInfo = {
        iss: "github:skillproof",
        sub: "workflow:attest",
        workflow: "attest",
        commit: "current",
      };

      const attestationPath = await Ledger.attest(manifestPath, signerInfo);
      console.log(
        chalk.green(`Attestation complete. Stored at: ${attestationPath}`),
      );
    } catch (error) {
      console.error(
        chalk.red(
          `Error creating attestation: ${error instanceof Error ? error.message : String(error)}`,
        ),
      );
      process.exit(1);
    }
  });

program
  .command("verify")
  .description("Verify a skill attestation")
  .argument("<reference>", "Attestation reference (github:org/repo@sha256:...)")
  .action(async (reference: string) => {
    try {
      console.log(chalk.blue(`Verifying ${reference}...`));

      const verification = await Verifier.verify(reference);

      if (verification.verified) {
        console.log(
          chalk.green(`Verification complete. Attestation is valid.`),
        );
      } else {
        console.log(chalk.red(`Verification failed: ${verification.error}`));
        process.exit(1);
      }
    } catch (error) {
      console.error(
        chalk.red(
          `Error verifying attestation: ${error instanceof Error ? error.message : String(error)}`,
        ),
      );
      process.exit(1);
    }
  });

program
  .command("eval")
  .description("Run evaluation harness on a skill")
  .option("--agent <type>", "Agent type (claude, openhands, etc.)", "claude")
  .option("--models <models>", "Comma-separated list of models to evaluate", "")
  .option(
    "--tasks <tasks>",
    "Path to tasks file or glob pattern",
    "./evals/*.md",
  )
  .option("--runs <count>", "Number of evaluation runs", "3")
  .option("--budget-usd <amount>", "Budget in USD", "10")
  .option("--judge <id>", "Judge ID for evaluation", "default")
  .action(async (options) => {
    try {
      console.log(chalk.blue("Starting evaluation harness..."));
      console.log(
        chalk.yellow(
          "Evaluation command implemented - pending full implementation",
        ),
      );
      console.log(chalk.gray(`Agent: ${options.agent}`));
      console.log(chalk.gray(`Models: ${options.models}`));
      console.log(chalk.gray(`Tasks: ${options.tasks}`));
      console.log(chalk.gray(`Runs: ${options.runs}`));
      console.log(chalk.gray(`Budget: $${options.budgetUsd}`));
      console.log(chalk.gray(`Judge: ${options.judge}`));
    } catch (error) {
      console.error(
        chalk.red(
          `Error running evaluation: ${error instanceof Error ? error.message : String(error)}`,
        ),
      );
      process.exit(1);
    }
  });

program.parse();
