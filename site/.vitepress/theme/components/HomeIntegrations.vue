<script setup lang="ts">
import { BRAND_PATHS } from "./brands";

// Real brand marks (Simple Icons, CC0) rendered monochrome via currentColor.
const agents = [
  { name: "Claude Code", path: BRAND_PATHS.claude },
  { name: "OpenAI", path: BRAND_PATHS.openai },
  { name: "Gemini", path: BRAND_PATHS.googlegemini },
  { name: "Cursor", path: BRAND_PATHS.cursor },
  { name: "GitHub Copilot", path: BRAND_PATHS.githubcopilot },
  { name: "Windsurf", path: BRAND_PATHS.windsurf },
  { name: "Zed", path: BRAND_PATHS.zedindustries },
  { name: "OpenCode", path: BRAND_PATHS.opencode },
  { name: "Replit", path: BRAND_PATHS.replit },
  { name: "Cline", path: BRAND_PATHS.cline },
  { name: "Codeium", path: BRAND_PATHS.codeium },
  { name: "Anthropic", path: BRAND_PATHS.anthropic },
];
</script>

<template>
  <section class="ts-section">
    <h2 class="ts-h2" data-reveal>It works everywhere skills get installed</h2>
    <p class="ts-sub" data-reveal style="--reveal-delay: 80ms">
      Don't be locked into one registry. Any host, harness, or CI can fetch the
      attestation and gate on the diff — keyed by content hash, never by name.
    </p>
    <div class="ts-grid-4">
      <div class="ts-card-outer" v-for="(agent, i) in agents" :key="agent.name" data-reveal="scale" :style="{ '--reveal-delay': `${(i % 4) * 70}ms` }">
        <div class="ts-card ts-agent">
          <span class="ts-agent-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path :d="agent.path" /></svg>
          </span>
          <div class="ts-agent-name">{{ agent.name }}</div>
          <div class="ts-agent-link">Verify skills with {{ agent.name }}</div>
          <span class="ts-agent-pixels" aria-hidden="true" />
        </div>
      </div>
    </div>
    <p class="ts-note" data-reveal>And any other host or harness that fetches attestations by content hash.</p>
  </section>
</template>
