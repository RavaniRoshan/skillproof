<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
</script>

<template>
  <DefaultTheme.Layout>
    <template #not-found>
      <div class="sp-band" style="max-width: 640px; margin: 48px auto">
        <h3>404 — no proof on record</h3>
        <p>
          Nothing attested at this address. The page you are looking for was
          never scanned, or it moved without leaving a content hash behind.
        </p>
        <p>
          <a href="/skillproof/">Back to safety →</a>
        </p>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
