<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { withBase } from "vitepress";

const props = withDefaults(defineProps<{ gif?: string }>(), { gif: "/demo-scan.gif" });

// Fallback live TUI: kept for reduced-motion / missing-GIF, but the primary
// demo is now a real looping GIF (gif prop), like a product demo capture.

type Kind = "bold" | "dim" | "thought" | "run" | "runsub" | "err" | "errsub" | "ok";
type Row = { kind: Kind; mark: string; text: string };
type Step = {
  at: number;
  rows?: Row[];
  status?: string;
  step?: string;
  pill?: string;
  highlight?: boolean;
};

const B = (text: string): Row => ({ kind: "bold", mark: "o", text });
const D = (text: string): Row => ({ kind: "dim", mark: "L", text });
const T = (text: string): Row => ({ kind: "thought", mark: "..", text });
const R = (text: string): Row => ({ kind: "run", mark: "*", text });
const RS = (text: string): Row => ({ kind: "runsub", mark: "L", text });
const E = (text: string): Row => ({ kind: "err", mark: "o", text });
const ES = (text: string): Row => ({ kind: "errsub", mark: "L", text });
const OK = (text: string): Row => ({ kind: "ok", mark: "o", text });

const SCRIPT: Step[] = [
  { at: 600, pill: "⏎", status: "Scanning (tab to toggle)", step: "1–1", highlight: true },
  {
    at: 1500,
    highlight: false,
    rows: [R("Scanning skill… (esc to interrupt)"), RS("Next: stream SKILL.md + scripts"), T("Thinking…")],
  },
  {
    at: 2700,
    pill: "↩",
    rows: [B("Read(SKILL.md)"), D("84 lines · 2 tools declared (ctrl+o to expand)"), OK("Read(hooks/notify.sh)"), D("12 lines · no network")],
    step: "1–2",
  },
  {
    at: 4200,
    rows: [B('Search(scripts: "curl|fetch|socket")'), D("Found 3 files (ctrl+o to expand)"), T(".. Thought for 4s (ctrl+o to show thinking)")],
    step: "1–3",
  },
  {
    at: 5800,
    rows: [B("Read(scripts/refund.py)"), D("212 lines · fs.write, outbound https"), OK("Read(mcp.json)"), D("1 server · stripe-mcp (declared)")],
    step: "1–4",
  },
  {
    at: 7500,
    rows: [R("Cross-checking declarations… (esc to interrupt)"), RS("Next: fail CI on new privileges")],
  },
  {
    at: 9000,
    pill: "→|",
    rows: [E("Bash(skillproof diff base.json head.json)"), ES("Error: + network.outbound_domains (NEW) — needs sign-off"), T(".. Thought for 6s (ctrl+o to show thinking)")],
    step: "1–5",
  },
  {
    at: 10800,
    rows: [B("Eval(model bump claude-4.6 → 4.7)"), D("12/12 cases pass · 0 regressions"), OK("Attest(base.json + evals)")],
    step: "1–6",
  },
  {
    at: 12400,
    rows: [D("sigstore signed · appended to the public ledger"), OK("Done in 9.4s — proof on record")],
    status: "main (skillproof)",
    step: "1–6",
  },
];

const VISIBLE = 9;
const LOOP_MS = 14400;

const rows = ref<Row[]>([]);
const status = ref("main (skillproof)");
const stepLabel = ref("1–1");
const pill = ref<string | null>(null);
const highlight = ref(false);
const gifFailed = ref(false);
const reduced = ref(false);
let timers: ReturnType<typeof setTimeout>[] = [];

const gifSrc = computed(() => withBase(props.gif));
const visibleRows = computed(() => rows.value.slice(-VISIBLE));

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function play() {
  clearTimers();
  rows.value = [];
  status.value = "main (skillproof)";
  stepLabel.value = "1–1";
  pill.value = null;
  highlight.value = false;
  if (reduced.value) {
    for (const s of SCRIPT) {
      if (s.rows) rows.value.push(...s.rows);
      if (s.status) status.value = s.status;
      if (s.step) stepLabel.value = s.step;
    }
    return;
  }
  for (const s of SCRIPT) {
    timers.push(
      setTimeout(() => {
        if (s.rows) rows.value.push(...s.rows);
        if (s.status) status.value = s.status;
        if (s.step) stepLabel.value = s.step;
        if (s.highlight !== undefined) highlight.value = s.highlight;
        if (s.pill) {
          pill.value = s.pill;
          timers.push(setTimeout(() => (pill.value = null), 350));
        }
      }, s.at),
    );
  }
  // Loop forever like a demo GIF; unmount clears timers.
  timers.push(setTimeout(play, LOOP_MS));
}

onMounted(() => {
  reduced.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // GIF-first: reduced-motion and GIF-failure fall back to the settled live TUI.
  if (reduced.value || gifFailed.value) play();
});
onUnmounted(clearTimers);
</script>

<template>
  <div class="tui-stage" aria-label="Looping demo of a skillproof scan">
    <div class="tui-window">
      <img
        v-if="!gifFailed && !reduced"
        class="tui-gif"
        :src="gifSrc"
        alt="Looping terminal demo: skillproof scans stripe-refunds, diffs capabilities, and attests the manifest"
        loading="eager"
        @error="gifFailed = true"
      />
      <template v-else>
        <div class="tui-chrome">
          <span class="sp-dot r" />
          <span class="sp-dot y" />
          <span class="sp-dot g" />
          <span class="tui-chrome-title">◈ Skill scan</span>
          <span class="tui-chrome-step">{{ stepLabel }}</span>
        </div>
        <div class="tui-head">
          <svg class="tui-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="3" width="16" height="16" rx="3" fill="#E66F4D" />
            <rect x="8" y="8" width="3" height="3" fill="#000" />
            <rect x="13" y="8" width="3" height="3" fill="#000" />
            <rect x="9" y="14" width="6" height="2" fill="#000" />
          </svg>
          <div>
            <div class="tui-title">skillproof <span class="tui-ver">v0.1.0</span></div>
            <div class="tui-meta">scan · attest · gate</div>
            <div class="tui-meta">~/skills/stripe-refunds</div>
          </div>
        </div>
        <div class="tui-prompt" :class="{ hl: highlight }">
          <span class="tui-chev">&gt;</span>
          <span class="tui-cmd">skillproof scan ./stripe-refunds --out base.json</span>
          <span class="tui-block" />
        </div>
        <div class="tui-status">
          <span class="tui-branch">main <span class="tui-paren">(skillproof)</span></span>
          <span class="tui-status-right">{{ status }}</span>
        </div>
        <div class="tui-body">
          <div v-for="(row, i) in visibleRows" :key="`${i}-${row.text}`" class="tui-row" :class="`tui-${row.kind}`">
            <span class="tui-mark">{{ row.mark }}</span>
            <span>{{ row.text }}</span>
          </div>
          <div v-if="pill" class="tui-pill" aria-hidden="true">{{ pill }}</div>
        </div>
        <div class="tui-foot">
          <div class="tui-input"><span class="tui-chev">&gt;</span><span class="tui-block" /></div>
          <div class="tui-branchbar">
            <span class="tui-branch">main <span class="tui-paren">(main)</span></span>
            <span class="tui-loop">↻ loops automatically</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
