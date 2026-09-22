<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

// "Onboard your agent" block, borrowed from Parallel's end-CTA pattern: one
// copyable setup prompt plus deep links into an agent.
// Only schemes verified against vendor documentation are used:
//   Claude Code  claude-cli://open?q=<prompt>
//   Cursor       cursor://anysphere.cursor-deeplink/prompt?text=<prompt>
// Everything else gets the clipboard, which works everywhere.
const props = withDefaults(
  defineProps<{
    /** Setup prompt to copy. Defaults to the repository onboarding prompt. */
    prompt?: string;
    /** Absolute URL of the agent instructions this prompt tells an agent to read. */
    docUrl?: string;
  }>(),
  {
    prompt:
      "You are working in the SkillProof repository (github.com/RavaniRoshan/skillproof). Read AGENTS.md before you touch anything: it carries the build and test commands, the conventions, the two invariants that must not be weakened (content addressing beats names; evidence never guarantees safety), and a status section that names every v0.1 stub next to the file that causes it. Then run npm install, npm run build and npx vitest run, and confirm the baseline is green before you change anything.",
    docUrl:
      "https://github.com/RavaniRoshan/skillproof/blob/main/AGENTS.md",
  },
);

const copied = ref(false);
let reset: ReturnType<typeof setTimeout> | undefined;

const encoded = computed(() => encodeURIComponent(props.prompt));
const claudeUrl = computed(() => `claude-cli://open?q=${encoded.value}`);
const cursorUrl = computed(
  () => `cursor://anysphere.cursor-deeplink/prompt?text=${encoded.value}`,
);

async function copy() {
  try {
    await navigator.clipboard.writeText(props.prompt);
    copied.value = true;
  } catch {
    copied.value = false;
  }
  if (reset) clearTimeout(reset);
  reset = setTimeout(() => (copied.value = false), 2000);
}

onUnmounted(() => {
  if (reset) clearTimeout(reset);
});
</script>

<template>
  <section class="sp-agent" data-reveal>
    <p class="sp-agent-eyebrow">For your agent</p>
    <p class="sp-agent-title">Onboard your agent</p>
    <p class="sp-agent-sub">
      Paste this prompt into your coding agent. It points at the agent
      instructions rather than repeating them, so it cannot go stale here.
    </p>

    <div class="sp-agent-prompt">
      <pre><code>{{ prompt }}</code></pre>
    </div>

    <div class="sp-agent-actions">
      <button type="button" class="sp-agent-link sp-agent-copy" @click="copy">
        {{ copied ? "Copied" : "Copy prompt" }}
      </button>
      <a class="sp-agent-link" :href="claudeUrl">Open in Claude Code</a>
      <a class="sp-agent-link" :href="cursorUrl">Open in Cursor</a>
      <a class="sp-agent-link" :href="docUrl" target="_blank" rel="noreferrer">
        Read the agent instructions
      </a>
    </div>
  </section>
</template>
