<script setup lang="ts">
// Docs page opener: same eyebrow → headline → sub rhythm as the landing hero,
// scaled for a reference page. Deliberately not wrapped in data-reveal so the
// page title is never gated on JavaScript.
defineProps<{
  eyebrow: string;
  title: string;
  sub: string;
}>();
</script>

<template>
  <section class="sp-doc-hero">
    <span class="ts-eyebrow">{{ eyebrow }}</span>
    <h1 class="sp-doc-h1">{{ title }}</h1>
    <p class="ts-sub">{{ sub }}</p>
  </section>
</template>
