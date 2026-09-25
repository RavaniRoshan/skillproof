<script setup lang="ts">
import { withBase } from "vitepress";
import GridPulse from "./GridPulse.vue";
import { BRAND_PATHS } from "./brands";

// Real brand marks (Simple Icons, CC0) rendered monochrome via currentColor.
const agents = [
  { name: "OpenAI", path: BRAND_PATHS.openai },
  { name: "Claude", path: BRAND_PATHS.claude },
  { name: "Gemini", path: BRAND_PATHS.googlegemini },
  { name: "Cursor", path: BRAND_PATHS.cursor },
  { name: "GitHub Copilot", path: BRAND_PATHS.githubcopilot },
  { name: "Windsurf", path: BRAND_PATHS.windsurf },
  { name: "Zed", path: BRAND_PATHS.zedindustries },
  { name: "OpenCode", path: BRAND_PATHS.opencode },
  { name: "Cline", path: BRAND_PATHS.cline },
  { name: "Replit", path: BRAND_PATHS.replit },
];
</script>

<template>
  <section class="ts-hero">
    <GridPulse />
    <div class="ts-hero-inner">
      <span class="ts-eyebrow" data-reveal>Signed proof for every skill you install.</span>
      <h1 class="ts-h1" data-grid-avoid data-reveal>Proof for agent skills.</h1>
      <p class="ts-sub" data-grid-avoid data-reveal style="--reveal-delay: 90ms">
        No more blind installs to keep up with your agents. Your skills now carry
        signed proof of what they touch — exactly where you install them.
      </p>
      <div class="ts-cta-row" data-reveal style="--reveal-delay: 160ms">
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
    </div>
  </section>
</template>
