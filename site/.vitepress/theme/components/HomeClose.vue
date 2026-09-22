<script setup lang="ts">
import { withBase } from "vitepress";
import { BRAND_PATHS } from "./brands";

const features = [
  "Network domains",
  "Shell + interpreters",
  "Filesystem reads / writes",
  "Secrets in reach",
  "Subagent spawning",
  "MCP servers",
  "Declared-vs-derived check",
  "Content-hash identity",
  "Signed eval deltas",
  "Sigstore keyless signing",
  "CI diff gating",
  "Public append-only ledger",
];

// Real brand marks (Simple Icons, CC0) rendered monochrome via currentColor.
const agents = [
  { name: "Claude Code", path: BRAND_PATHS.claude },
  { name: "OpenAI", path: BRAND_PATHS.openai },
  { name: "Cursor", path: BRAND_PATHS.cursor },
  { name: "OpenCode", path: BRAND_PATHS.opencode },
  { name: "Cline", path: BRAND_PATHS.cline },
  { name: "Replit", path: BRAND_PATHS.replit },
];
</script>

<template>
  <section class="ts-section">
    <h2 class="ts-h2" data-reveal>Everything you expect from a skill manifest</h2>
    <p class="ts-sub" data-reveal style="--reveal-delay: 80ms">
      SkillProof packs all six capability classes into one signed record — from quick
      scans to detailed organization.
    </p>
    <div class="ts-feature-box" data-reveal="scale">
      <div class="ts-feature-grid">
        <span v-for="feature in features" :key="feature">{{ feature }}</span>
      </div>
      <p class="ts-feature-foot">All through keyless Sigstore signing or the always-synced public ledger.</p>
    </div>
  </section>

  <section class="ts-final" data-reveal>
    <h2 class="ts-h2" style="margin-bottom: 0" data-reveal>Start proving your skills</h2>
    <div class="ts-final-cta">
      <span class="ts-ripple">
        <a class="ts-btn ts-btn-primary" :href="withBase('/guide/getting-started')">Scan your first skill<span class="ts-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span></a>
      </span>
      <div class="ts-icon-row" aria-label="Works where skills get installed">
        <span v-for="agent in agents" :key="agent.name" class="ts-mini-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path :d="agent.path" /></svg>
          <span class="ts-tip">{{ agent.name }}</span>
        </span>
      </div>
    </div>
  </section>
</template>
