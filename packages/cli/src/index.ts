// CLI entry point
import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import { buildManifest } from "./manifest.js";
import { DiffProcessor } from "./diff-processor.js";
import { Ledger } from "./ledger.js";
import { Verifier } from "./verifier.js";
import {
  buildProofRecord,
  formatAuthHint,
  formatInspect,
  formatProof,
  formatSync,
  inspectSkill,
  parseSkillRef,
  proofSkill,
  proofUrl,
  PROOF_URL_BASE,
  resolveClient,
  searchSkills,
  syncSkills,
  verifySkillsSh,
} from "./skills-sh.js";

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

      const manifest = await buildManifest(skillPath);

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
  .argument(
    "<reference>",
    "Attestation reference (github:org/repo@sha256:... or skills-sh:<source>/<skill>)",
  )
  .option("--token <token>", "Vercel OIDC token for the skills.sh API")
  .option("--base-url <url>", "Override the skills.sh API base URL")
  .action(async (reference: string, options) => {
    try {
      console.log(chalk.blue(`Verifying ${reference}...`));

      const verification = reference.startsWith("skills-sh:")
        ? await verifySkillsSh(
            resolveClient(options),
            reference.slice("skills-sh:".length),
          )
        : await Verifier.verify(reference);

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
        chalk.red(`Error verifying attestation: ${formatAuthHint(error)}`),
      );
      process.exit(1);
    }
  });

program
  .command("proof-url")
  .description("Print the shareable proof page URL for a skills.sh skill")
  .argument("<ref>", "Skill reference (<source>/<skill>)")
  .option("--base <url>", "Site base URL", PROOF_URL_BASE)
  .action((ref: string, options) => {
    try {
      console.log(proofUrl(ref, options.base));
    } catch (error) {
      console.error(
        chalk.red(
          `Error building proof URL: ${error instanceof Error ? error.message : String(error)}`,
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

const skillsSh = program
  .command("skills-sh")
  .description("Read-only skills.sh integration (needs SKILLS_SH_TOKEN)");

skillsSh
  .command("search <query>")
  .description("Search skills on skills.sh")
  .option("--token <token>", "Vercel OIDC token for the skills.sh API")
  .option("--base-url <url>", "Override the skills.sh API base URL")
  .option("--limit <n>", "Maximum results", "50")
  .action(async (query: string, options) => {
    try {
      const output = await searchSkills(
        resolveClient(options),
        query,
        Number(options.limit),
      );
      console.log(output);
    } catch (error) {
      console.error(chalk.red(`Search failed: ${formatAuthHint(error)}`));
      process.exit(1);
    }
  });

skillsSh
  .command("inspect <ref>")
  .description(
    "Show upstream metadata for a skills.sh skill (<source>/<skill>)",
  )
  .option("--token <token>", "Vercel OIDC token for the skills.sh API")
  .option("--base-url <url>", "Override the skills.sh API base URL")
  .option("--json", "Print the raw source observation as JSON")
  .action(async (ref: string, options) => {
    try {
      const result = await inspectSkill(resolveClient(options), ref);
      console.log(
        options.json
          ? JSON.stringify(result.observation, null, 2)
          : formatInspect(result),
      );
    } catch (error) {
      console.error(chalk.red(`Inspect failed: ${formatAuthHint(error)}`));
      process.exit(1);
    }
  });

skillsSh
  .command("proof <ref>")
  .description("Scan a skills.sh skill snapshot and show the local proof")
  .option("--token <token>", "Vercel OIDC token for the skills.sh API")
  .option("--base-url <url>", "Override the skills.sh API base URL")
  .option("--json", "Print the capability manifest as JSON")
  .option("--record", "Print the full proof record as JSON")
  .action(async (ref: string, options) => {
    try {
      const client = resolveClient(options);
      const result = await proofSkill(client, ref);
      if (options.record) {
        const { source, skill } = parseSkillRef(ref);
        const detail = await client.getSkill(source, skill);
        console.log(JSON.stringify(buildProofRecord(detail, result), null, 2));
      } else {
        console.log(
          options.json
            ? JSON.stringify(result.manifest, null, 2)
            : formatProof(result),
        );
      }
      if (result.reconciliation && !result.reconciliation.hash_match) {
        process.exit(2);
      }
    } catch (error) {
      console.error(chalk.red(`Proof failed: ${formatAuthHint(error)}`));
      process.exit(1);
    }
  });

skillsSh
  .command("sync")
  .description("Check a bounded set of skills for hash changes")
  .option("--token <token>", "Vercel OIDC token for the skills.sh API")
  .option("--base-url <url>", "Override the skills.sh API base URL")
  .option(
    "--view <view>",
    "Leaderboard view (all-time, trending, hot)",
    "trending",
  )
  .option("--limit <n>", "Maximum skills to check", "10")
  .option("--json", "Print entries as JSON")
  .action(async (options) => {
    try {
      const entries = await syncSkills(
        resolveClient(options),
        options.view,
        Number(options.limit),
      );
      console.log(
        options.json ? JSON.stringify(entries, null, 2) : formatSync(entries),
      );
      if (entries.some((entry) => entry.status === "mismatch")) {
        process.exit(2);
      }
    } catch (error) {
      console.error(chalk.red(`Sync failed: ${formatAuthHint(error)}`));
      process.exit(1);
    }
  });

program.parse();
