<template>
  <section class="ts-section">
    <h2 class="ts-h2" data-reveal>Hand-reviewing skills no longer scales</h2>
    <p class="ts-sub" data-reveal style="--reveal-delay: 80ms">
      With skills versioned, scripted, and installed from third parties, a new
      verification standard is being born. Proof-first review is the way to ship skills.
    </p>
    <div class="ts-compare">
      <div class="ts-card-outer" data-reveal="left">
        <div class="ts-card dim">
          <h3>Traditional skill review</h3>
          <div class="ts-kv"><h4>Reading code</h4><p>Manually read every SKILL.md, script, and hook — one at a time, on every update.</p></div>
          <div class="ts-kv"><h4>Tracking changes</h4><p>Diff versions by eye and hope no new domain, secret, or exec slipped in.</p></div>
          <div class="ts-kv"><h4>Trusting authors</h4><p>Open the repo, scroll for the install script, and guess whether it changed.</p></div>
          <div class="ts-kv"><h4>Surviving model bumps</h4><p>Re-run every skill by hand after each model update, one by one.</p></div>
          <div class="ts-kv"><h4>Managing skills</h4><p>Manually keep a spreadsheet of which skills you installed, consuming precious time.</p></div>
        </div>
      </div>
      <div class="ts-card-outer" data-reveal="right" style="--reveal-delay: 120ms">
        <div class="ts-card hl">
          <h3>Proof-first verification</h3>
          <div class="ts-kv"><h4>Reading code</h4><p>Read nothing by hand — the scanner derives the manifest from the skill itself.</p></div>
          <div class="ts-kv"><h4>Tracking changes</h4><p>Ask the diff what changed. It reorders, highlights, and fails CI on new privileges.</p></div>
          <div class="ts-kv"><h4>Trusting authors</h4><p>Fetch the Sigstore attestation — who signed it, and which scanner version checked it.</p></div>
          <div class="ts-kv"><h4>Surviving model bumps</h4><p>Publish the eval delta once. Know which of your 40 skills degraded last Tuesday.</p></div>
          <div class="ts-kv"><h4>Managing skills</h4><p>Gate every install in one bulk check.</p></div>
        </div>
      </div>
    </div>
  </section>
</template>
