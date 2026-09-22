<script setup lang="ts">
import { ref, useId } from "vue";
import type { FaqItem } from "../faq";

// Accessible accordion: button + aria-expanded / aria-controls, first row open.
// Height animates with grid-template-rows (0fr → 1fr), so there is no JS
// measurement and prefers-reduced-motion is a one-line guard.
const props = withDefaults(
  defineProps<{ items: FaqItem[]; label?: string }>(),
  { label: "FAQs" },
);

const uid = useId();
const open = ref(0);

function toggle(index: number) {
  open.value = open.value === index ? -1 : index;
}
</script>

<template>
  <section class="sp-faq" data-reveal>
    <div class="sp-faq-rail">
      <h2 class="sp-faq-label">{{ props.label }}</h2>
    </div>
    <div class="sp-faq-list">
      <div
        v-for="(item, i) in props.items"
        :key="item.q"
        class="sp-faq-row"
        :class="{ 'is-open': open === i }"
      >
        <h3 class="sp-faq-qh">
          <button
            type="button"
            class="sp-faq-q"
            :aria-expanded="open === i"
            :aria-controls="`${uid}-a-${i}`"
            @click="toggle(i)"
          >
            <span>{{ item.q }}</span>
            <span class="sp-faq-chev" aria-hidden="true" />
          </button>
        </h3>
        <div :id="`${uid}-a-${i}`" class="sp-faq-a" role="region">
          <div class="sp-faq-a-inner">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
