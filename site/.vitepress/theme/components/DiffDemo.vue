<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

type Line = { text: string; cls: string };

const SCRIPT: Line[] = [
  { text: "$ skillproof diff base.json head.json", cls: "sp-line-prompt" },
  {
    text: '+ network.outbound_domains: ["evil.example.com"]   (NEW)',
    cls: "sp-line-add",
  },
  {
    text: '+ secrets.env_vars: ["AWS_SECRET_ACCESS_KEY"]       (NEW)',
    cls: "sp-line-add",
  },
  { text: "  exec.shell: true                                   (unchanged)", cls: "sp-line-same" },
  {
    text: "exit code: 2 — new capabilities need a human sign-off",
    cls: "sp-line-exit-new",
  },
];

const shown = ref<Line[]>([]);
const typing = ref(false);
let timers: ReturnType<typeof setTimeout>[] = [];

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function play() {
  clearTimers();
  shown.value = [];
  const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (instant) {
    shown.value = [...SCRIPT];
    return;
  }
  typing.value = true;
  SCRIPT.forEach((line, i) => {
    timers.push(
      setTimeout(
        () => {
          shown.value.push(line);
          if (i === SCRIPT.length - 1) typing.value = false;
        },
        350 + i * 520,
      ),
    );
  });
}

onMounted(play);
onUnmounted(clearTimers);
</script>

<template>
  <div class="sp-terminal" aria-label="Animated capability diff demo">
    <div class="sp-terminal-bar">
      <span class="sp-dot r" />
      <span class="sp-dot y" />
      <span class="sp-dot g" />
      <span class="sp-terminal-title">skillproof diff — live demo</span>
    </div>
    <div class="sp-terminal-body"><div v-for="(line, i) in shown" :key="i" :class="line.cls">{{ line.text }}</div><span v-if="typing || shown.length === 0" class="sp-cursor" /></div>
    <div class="sp-terminal-foot">
      <button class="sp-replay" type="button" @click="play">↻ replay</button>
    </div>
  </div>
</template>
