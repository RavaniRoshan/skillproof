<script setup lang="ts">
import { withBase } from "vitepress";

// Showcase band: own SVG ridgeline backdrop (no stock photo).
// withBase keeps the public-asset URL correct under both "/" and "/skillproof/".
const bg = withBase("/showcase-ridges.svg");
</script>

<template>
  <div class="ts-showcase" :style="{ backgroundImage: `url('${bg}')` }">
    <slot />
  </div>
</template>
