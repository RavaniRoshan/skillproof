<script setup lang="ts">
import { withBase } from "vitepress";
import { CARD_ICONS, type FeatureCard } from "../cards";

// Same double-border card anatomy as the landing page (.ts-card-outer >
// .ts-card), so docs feature grids and marketing read as one product.
// Cards with a `to` render as links; without one, as plain cards.
defineProps<{
  items: FeatureCard[];
}>();
</script>

<template>
  <div class="sp-cards">
    <component
      :is="item.to ? 'a' : 'div'"
      v-for="(item, i) in items"
      :key="item.title"
      :href="item.to ? withBase(item.to) : undefined"
      class="ts-card-outer sp-card"
      data-reveal="scale"
      :style="{ '--reveal-delay': `${(i % 3) * 70}ms` }"
    >
      <div class="ts-card">
        <span v-if="item.icon" class="sp-card-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            v-html="CARD_ICONS[item.icon]"
          />
        </span>
        <p class="sp-card-title">{{ item.title }}</p>
        <p class="sp-card-body">{{ item.body }}</p>
        <span v-if="item.meta" class="sp-card-meta">{{ item.meta }}</span>
      </div>
    </component>
  </div>
</template>
