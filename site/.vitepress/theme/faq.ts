// Single source of truth for FAQ copy.
// The landing page renders PRODUCT_FAQ; the guide renders DOCS_FAQ.
// Answers stay honest about v0.1 status — see AGENTS.md.

export interface FaqItem {
  q: string;
  a: string;
}

export const PRODUCT_FAQ: FaqItem[] = [
  {
    q: "What does SkillProof actually do?",
    a: "It reads a skill directory and produces a machine-readable capability manifest: the network domains, shell interpreters, filesystem paths, secrets, subagents and MCP servers the skill reaches for. It then diffs two versions of that manifest and publishes a signed record to a public ledger.",
  },
  {
    q: "Do you host or distribute skills?",
    a: "No. Skills stay in git, where they already live. The ledger stores roughly one kilobyte of JSON per attestation — manifests and eval results only, never skill code.",
  },
  {
    q: "How is this different from a skill registry?",
    a: "A registry decides what you can install. SkillProof answers a different question: what does the thing you already installed actually touch, and did that change? Any registry, harness or CI can consume the records without asking us.",
  },
  {
    q: "Why key records by content hash instead of skill name?",
    a: "Skills are forked, vendored and renamed constantly. A name is a weak identity that can be squatted; the hash of the skill directory is a strong one. Copies and forks share a single identity automatically.",
  },
  {
    q: "Does an attestation prove a skill is safe?",
    a: "No, and we never claim it does. An attestation proves what was analysed and by which scanner version. Treat it as evidence you can audit, not a safety certificate.",
  },
  {
    q: "What happens when the scanner misses something?",
    a: "Detection will never be complete — that is a stated limitation, not a bug to be hidden. The durable promise is the diff: a capability that appears between two versions is reported even if nobody read the code carefully.",
  },
  {
    q: "Which agents and harnesses does it work with?",
    a: "Anything that can fetch a manifest by hash, because the records are plain JSON with no vendor binding. The field is moving quickly, so the integration list on this page is illustrative rather than exhaustive.",
  },
  {
    q: "Is SkillProof free?",
    a: "The core is MIT and the ledger is public, forever. If the project ever commercialises, it will be hosted conveniences such as scheduled evals and SLAs around a standard that stays open and free.",
  },
  {
    q: "Who signs an attestation?",
    a: "The intent is keyless signing from CI, so the signature binds to an OIDC identity and a workflow rather than a stored key. Keyless signing is not wired up yet — signature work is the next v0.1 milestone.",
  },
  {
    q: "Can I use it in production today?",
    a: "Not yet. v0.1 is a working scaffold: the CLI surface, schemas and docs are real, while the scanner's findings are placeholders and signing is unimplemented. AGENTS.md lists exactly what is stubbed.",
  },
];

export const DOCS_FAQ: FaqItem[] = [
  {
    q: "What do I need to run the CLI?",
    a: "Node.js 20 or newer and npm. The CLI is not published to npm yet, so build it from a checkout and invoke the built entry point with node.",
  },
  {
    q: "How do I run the commands shown in this guide?",
    a: "Run npm run build at the repository root, then node packages/cli/dist/index.js followed by the command. The published-sounding npx skillproof form does not work, because the package has never been published.",
  },
  {
    q: "Why does diff exit with code 2?",
    a: "Exit code 2 is the signal for a newly added capability class, which is what a CI gate should fail on. Removed capabilities exit 0, because a smaller surface is an improvement.",
  },
  {
    q: "Does a modified capability fail the diff too?",
    a: "Not today. A capability whose value changed is reported in the added list but does not set exit code 2, so it will not fail a gate. That gap is tracked in AGENTS.md and PLAN.md.",
  },
  {
    q: "Which files does the scanner read?",
    a: "Markdown files only, walked recursively. Scripts, hooks and MCP configs are in scope for the design but are not parsed by the v0.1 scanner, so treat the manifest as incomplete by construction.",
  },
  {
    q: "Where does the manifest get written?",
    a: "Wherever you point the second argument. scan takes the skill directory and the output path as two positional arguments — there is no --out flag.",
  },
  {
    q: "Where is the ledger stored?",
    a: "The design is a git repository of append-only JSONL files under ledger/attestations/YYYY/MM/. That directory is not in the repository yet; attest currently writes into your working directory instead.",
  },
  {
    q: "Can I verify an attestation offline?",
    a: "Not meaningfully yet. verify returns success without checking a signature, so it currently proves nothing. Until signing lands, treat a green verify as a placeholder.",
  },
  {
    q: "Why is my content hash enormous?",
    a: "Because it is not a hash yet. computeHash concatenates the file contents instead of digesting them, so the value is unbounded in size. This is a known v0.1 gap, not intended behaviour.",
  },
  {
    q: "How do I add a new capability class?",
    a: "Change it in the Zod schema first, regenerate the OpenAPI contract, then teach the scanner to emit it and add a fixture. The schema is the single source of truth, so never start in the generated files.",
  },
];
