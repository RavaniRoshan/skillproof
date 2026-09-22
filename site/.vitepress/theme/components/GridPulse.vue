<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    cell?: number;
    reach?: number;
    ambient?: number;
    maxLit?: number;
    avoid?: string;
  }>(),
  { cell: 24, reach: 2.6, ambient: 2, maxLit: 180, avoid: "[data-grid-avoid]" },
);

const box = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);

const TINTS = [88, 80, 72, 64, 56];
const TINTS_DARK = [28, 24, 20, 16, 12];
// Original colorful transition-shader spectrum: warm amber → cool blue.
// The hero is a light monochrome page, so lit cells carry hue + saturation
// while brightness still adapts to light/dark theme (see `ink`).
const HUES = [28, 36, 45, 145, 190, 210, 225, 265];
const SATS = [72, 64, 58, 52, 48, 62, 70, 66];
const LIGHTS = [55, 52, 50, 48, 46, 50, 54, 58];
const LIGHTS_DARK = [52, 48, 45, 42, 40, 44, 48, 52];
const FAINT = 0.13;
const FADE = 2.2;
const PAD = 5;
const FADE_IN = 160;
const FADE_OUT = 750;

type Cell = { col: number; row: number; colour: string; dim: number; born: number; until: number };
const easeOut = (t: number) => 1 - (1 - t) ** 2;
const easeIn = (t: number) => t * t;

onMounted(() => {
  const el = box.value;
  const paper = canvas.value;
  const ctx = paper?.getContext("2d");
  if (!el || !paper || !ctx) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let cols = 1, rows = 1, width = 0, height = 0;
  let clear: DOMRect[] = [];
  let tints = TINTS;
  const cells = new Map<string, Cell>();

  const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const readTheme = () => {
    if (!probe) return;
    probe.clearRect(0, 0, 1, 1);
    probe.fillStyle = getComputedStyle(el).color;
    probe.fillRect(0, 0, 1, 1);
    const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    dark = luminance > 0.5;
    tints = dark ? TINTS_DARK : TINTS;
  };

  const measureText = () => {
    const bounds = el.getBoundingClientRect();
    const scope = el.parentElement ?? document;
    clear = [...scope.querySelectorAll(props.avoid)].flatMap((node) => {
      const range = document.createRange();
      range.selectNodeContents(node);
      const lines = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
      const boxes = lines.length > 0 ? lines : [node.getBoundingClientRect()];
      return boxes.map((r) => new DOMRect(r.left - bounds.left - PAD, r.top - bounds.top - PAD, r.width + PAD * 2, r.height + PAD * 2));
    });
  };

  let frame = 0;
  let dark = false;
  // Slow hue drift so the field breathes through the spectrum over time.
  let hueBase = 0;
  const draw = (now: number) => {
    frame = 0;
    ctx.clearRect(0, 0, width, height);
    for (const [key, c] of cells) {
      let alpha: number;
      if (now < c.until) {
        alpha = easeOut(Math.min(1, (now - c.born) / FADE_IN));
      } else {
        const t = (now - c.until) / FADE_OUT;
        if (t >= 1) { cells.delete(key); continue; }
        alpha = 1 - easeIn(t);
      }
      ctx.globalAlpha = alpha * c.dim;
      ctx.fillStyle = c.colour;
      ctx.fillRect(c.col * props.cell + 1, c.row * props.cell + 1, props.cell - 1, props.cell - 1);
    }
    ctx.globalAlpha = 1;
    if (cells.size > 0) frame = requestAnimationFrame(draw);
  };
  const wake = () => { if (!frame) frame = requestAnimationFrame(draw); };

  const brightness = (col: number, row: number) => {
    const x = col * props.cell + props.cell / 2;
    const y = row * props.cell + props.cell / 2;
    let nearest = Number.POSITIVE_INFINITY;
    for (const r of clear) {
      const dx = Math.max(r.left - x, 0, x - r.right);
      const dy = Math.max(r.top - y, 0, y - r.bottom);
      nearest = Math.min(nearest, Math.hypot(dx, dy));
      if (nearest === 0) break;
    }
    if (nearest === Number.POSITIVE_INFINITY) return 1;
    return FAINT + (1 - FAINT) * Math.min(1, nearest / (FADE * props.cell));
  };

  const ink = () => {
    const i = Math.floor(Math.random() * HUES.length);
    const sat = SATS[i] ?? 60;
    const lit = (dark ? LIGHTS_DARK : LIGHTS)[i] ?? 55;
    const hue = ((HUES[i] ?? 210) + hueBase) % 360;
    return `hsl(${hue} ${sat}% ${lit}%)`;
  };

  const light = (col: number, row: number, hold: number) => {
    if (col < 0 || row < 0 || col >= cols || row >= rows) return;
    if (cells.size >= props.maxLit) return;
    const key = `${col},${row}`;
    const now = performance.now();
    const lit = cells.get(key);
    if (lit && now < lit.until) return;
    let born = now;
    if (lit) {
      const faded = 1 - easeIn(Math.min(1, (now - lit.until) / FADE_OUT));
      born = now - (1 - Math.sqrt(1 - faded)) * FADE_IN;
    }
    cells.set(key, { col, row, colour: lit?.colour ?? ink(), dim: brightness(col, row), born, until: now + hold });
    wake();
  };

  const measure = () => {
    width = el.clientWidth;
    height = el.clientHeight;
    cols = Math.max(1, Math.ceil(width / props.cell));
    rows = Math.max(1, Math.ceil(height / props.cell));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    paper.width = Math.round(width * dpr);
    paper.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    readTheme();
    measureText();
    wake();
  };

  let pending = 0;
  let at: { x: number; y: number } | null = null;
  const paint = () => {
    pending = 0;
    if (!at) return;
    const cx = Math.floor(at.x / props.cell);
    const cy = Math.floor(at.y / props.cell);
    const span = Math.ceil(props.reach);
    for (let dy = -span; dy <= span; dy++) {
      for (let dx = -span; dx <= span; dx++) {
        const away = Math.hypot(dx, dy);
        if (away > props.reach) continue;
        if (Math.random() > 1 - away / (props.reach + 0.6)) continue;
        light(cx + dx, cy + dy, 260 + Math.random() * 900);
      }
    }
  };
  const onMove = (event: PointerEvent) => {
    const bounds = el.getBoundingClientRect();
    at = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    if (!pending) pending = requestAnimationFrame(paint);
  };

  let visible = true;
  let beat = 0;
  const drift = () => {
    beat = window.setTimeout(drift, 1400 + Math.random() * 1800);
    if (!visible || document.hidden) return;
    for (let i = 0; i < props.ambient; i++) {
      light(Math.floor(Math.random() * cols), Math.floor(Math.random() * rows), 900 + Math.random() * 1600);
    }
  };
  beat = window.setTimeout(drift, 500);

  const sight = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? true; });
  sight.observe(el);
  // Keep the spectrum drifting even when no cells are alive so the field
  // breathes through warm → cool hues like a transition shader.
  let hueTick = 0;
  const hueDrift = () => {
    hueTick = requestAnimationFrame(hueDrift);
    if (!visible || document.hidden) return;
    hueBase = (hueBase + 0.03) % 360;
  };
  hueTick = requestAnimationFrame(hueDrift);
  const resize = new ResizeObserver(measure);
  resize.observe(el);
  let recheck = 0;
  const copy = new MutationObserver(() => {
    if (!recheck) {
      recheck = requestAnimationFrame(() => { recheck = 0; measureText(); });
    }
  });
  copy.observe(el.parentElement ?? document.body, { childList: true, subtree: true, characterData: true });
  const theme = new MutationObserver(readTheme);
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
  const scheme = window.matchMedia("(prefers-color-scheme: dark)");
  const onScheme = () => readTheme();
  scheme.addEventListener("change", onScheme);
  measure();
  document.fonts?.ready.then(measureText).catch(() => {});
  window.addEventListener("pointermove", onMove, { passive: true });

  onUnmounted(() => {
    sight.disconnect();
    resize.disconnect();
    copy.disconnect();
    cancelAnimationFrame(recheck);
    theme.disconnect();
    scheme.removeEventListener("change", onScheme);
    cancelAnimationFrame(frame);
    cancelAnimationFrame(hueTick);
    cancelAnimationFrame(pending);
    clearTimeout(beat);
    window.removeEventListener("pointermove", onMove);
  });
});
</script>

<template>
  <div ref="box" aria-hidden="true" data-slot="grid-pulse" class="grid-pulse" :style="{ '--grid-pulse-cell': `${cell}px` }">
    <canvas ref="canvas" class="grid-pulse-canvas" />
  </div>
</template>
