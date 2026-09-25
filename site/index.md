---
layout: page
title: SkillProof — Proof for agent skills
sidebar: false
aside: false
---

<script setup>
import { PRODUCT_FAQ } from "./.vitepress/theme/faq";
import { CHANGELOG } from "./.vitepress/theme/changelog";

const faq = PRODUCT_FAQ;
const latest = CHANGELOG.slice(0, 3).map((entry) => ({
  icon: "check",
  title: entry.title,
  body: entry.body,
  to: entry.to,
  meta: entry.date,
}));
</script>

<div class="ts-page">

<HomeHero />

<Showcase><DiffDemo gif="/demo-scan.gif" /></Showcase>

<HomeProof />

<section class="ts-section">
<h2 class="ts-h2">The manifest viewer</h2>
<p class="ts-sub">A preview of the manifest viewer — one pane per capability, signed and synced.</p>
<Showcase>
<div class="ts-app">
<div class="ts-app-top"><span>◈ SkillProof</span><span>6 open manifests</span></div>
<div class="ts-app-cols">
<div class="ts-app-side">
<div class="ts-app-row"><span>◈ stripe-refunds</span><span class="ts-pill high" aria-label="risk: high"><span class="ts-pill-glyph" aria-hidden="true">▲</span>high</span></div>
<div class="ts-app-row"><span>◑ pdf-extract</span><span class="ts-pill medium" aria-label="risk: medium"><span class="ts-pill-glyph" aria-hidden="true">●</span>medium</span></div>
<div class="ts-app-row"><span>◒ web-search</span><span class="ts-pill low">low</span></div>
<div class="ts-app-row"><span>✓ reviewed</span><span class="ts-pill done" aria-label="risk: done"><span class="ts-pill-glyph" aria-hidden="true">✓</span>done</span></div>
</div>
<div class="ts-app-main">
<div class="ts-app-row"><span>network.outbound_domains — api.stripe.com</span><span class="ts-pill">ID 4821</span></div>
<div class="ts-app-row"><span>exec.shell — python3 scripts/refund.py</span><span class="ts-pill medium" aria-label="risk: medium"><span class="ts-pill-glyph" aria-hidden="true">●</span>todo</span></div>
<div class="ts-app-row"><span>filesystem.writes — ./reports/**</span><span class="ts-pill">ID 9056</span></div>
<div class="ts-app-row"><span>secrets — STRIPE_SECRET in reach</span><span class="ts-pill high" aria-label="risk: high"><span class="ts-pill-glyph" aria-hidden="true">▲</span>new</span></div>
<div class="ts-app-row"><span>eval delta — claude-4.6 → 4.7 · 12/12 pass</span><span class="ts-pill done" aria-label="risk: done"><span class="ts-pill-glyph" aria-hidden="true">✓</span>signed</span></div>
</div>
<div class="ts-app-detail">
<div class="ts-app-row"><span>Manifest Details</span><span class="ts-pill done" aria-label="risk: done"><span class="ts-pill-glyph" aria-hidden="true">✓</span>signed</span></div>
<div class="ts-app-row"><span>Status · attested</span><span class="ts-pill">sigstore</span></div>
<div class="ts-app-row"><span>Content hash · sha256:9f…</span><span class="ts-pill">ledger</span></div>
<div class="ts-app-row"><span>Subtasks · 1/3 complete</span><span class="ts-pill">+ check</span></div>
</div>
</div>
</div>
</Showcase>
</section>

<section class="ts-section" data-reveal>

## Everything a skill can touch, in one manifest

<CapGrid />

`skillproof scan` derives all six from `SKILL.md`, scripts, hooks and MCP
configs — then cross-checks them against what the skill *declares*, so honest
authors get verification for free.

</section>

<div class="sp-band" data-reveal>

### Why this exists

<div class="sp-stats">
  <div>
    <div class="sp-stat-num">36.8%</div>
    <div class="sp-stat-label">of 3,984 scanned skills contained a flaw — <a href="https://snyk.io/blog/snyk-finds-prompt-injection-in-36-1467-malicious-payloads-in-a-toxicskills-study-of-agent-skills-supply-chain-compromise/">Snyk ToxicSkills, Feb 2026</a></div>
  </div>
  <div>
    <div class="sp-stat-num">25,000</div>
    <div class="sp-stat-label">repos touched by npm's Shai-Hulud wave — the attack skill registries haven't had <em>yet</em></div>
  </div>
  <div>
    <div class="sp-stat-num">0</div>
    <div class="sp-stat-label">neutral, open bodies answering who signed a skill, what it does, and whether it still works</div>
  </div>
</div>

</div>

<HomeIntegrations />

<section class="ts-section" data-reveal>

## Latest changes

<FeatureCards :items="latest" />

<p class="ts-sub"><a href="/changelog">Full changelog →</a></p>

</section>

<HomeCompare />

<section data-reveal>

## How it works

1. **Scan** — the CLI statically analyses a skill into a signed-able
   capability manifest.
2. **Attest** — CI signs it with Sigstore and appends it to the public,
   append-only ledger, keyed by content hash.
3. **Gate** — installs, PRs and harnesses fetch the attestation and the
   capability diff, and block on new privileges or model-bump regressions.

## Evidence, not guarantees

Attestations prove what was analysed, and by which scanner version. They never
certify safety — and neither do we. Start with [core concepts](/guide/concepts),
then [scan your first skill](/guide/getting-started).

</section>

<AgentOnboard />

<FaqList :items="faq" label="FAQs" />

<HomeClose />

</div>
