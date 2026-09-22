---
title: Guide
---

<script setup>
import { DOCS_FAQ } from "../.vitepress/theme/faq";

const pages = [
  {
    icon: "route",
    title: "Getting started",
    body: "Build the CLI, scan a skill directory and diff two versions. The shortest path to a first manifest.",
    to: "/guide/getting-started",
    meta: "Tutorial · 10 minutes",
  },
  {
    icon: "compass",
    title: "Core concepts",
    body: "Why the diff matters more than the manifest, and why records are keyed by content hash instead of name.",
    to: "/guide/concepts",
    meta: "Explanation · read first",
  },
  {
    icon: "terminal",
    title: "CLI reference",
    body: "Every command, argument and exit code, including what each one does and does not do today.",
    to: "/guide/cli",
    meta: "Reference · scan, diff, attest, verify",
  },
  {
    icon: "gauge",
    title: "Evaluations",
    body: "Baseline-versus-treated runs across pinned models, so a model bump cannot silently degrade a skill.",
    to: "/guide/evaluations",
    meta: "Planned · v0.2",
  },
  {
    icon: "book",
    title: "Ledger",
    body: "The append-only, content-addressed log of attestations, and how consumers read it without permission.",
    to: "/guide/ledger",
    meta: "Reference · public record",
  },
];

const faq = DOCS_FAQ;
</script>

<DocHero
  eyebrow="Guide"
  title="Proof, from first scan to install gate."
  sub="SkillProof turns a skill directory into a capability record, then diffs it every time the skill changes. These five pages take you from a single local scan to gating installs in CI."
/>

<AgentOnboard />

## Start here

<FeatureCards :items="pages" />

<div class="sp-band" data-reveal>

### Read this before you trust a command

v0.1 is a working scaffold. The command surface, the schemas and the read API
contract are real; the scanner's findings are placeholders and signing is not
wired up yet. Each page states its own status, and
[the roadmap](/roadmap) tracks what is still missing.

</div>

<FaqList :items="faq" label="Documentation FAQs" />
