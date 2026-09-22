---
title: Changelog
---

<script setup>
import { CHANGELOG } from "./.vitepress/theme/changelog";

const cards = CHANGELOG.map((entry) => ({
  icon: "check",
  title: entry.title,
  body: entry.body,
  to: entry.to,
  meta: entry.date,
}));
</script>

<DocHero
  eyebrow="Changelog"
  title="What shipped"
  sub="Every change below is verified work in this repository — run the commands, read the proofs."
/>

<FeatureCards :items="cards" />
