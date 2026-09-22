<template>
  <section class="ts-section">
    <h2 class="ts-h2" data-reveal>Give your skills the proof they need to earn trust</h2>
    <p class="ts-sub" data-reveal style="--reveal-delay: 80ms">
      No matter whether you install from GitHub, a registry, or a vendored copy.
      One signed record says what a skill touches and whether it survived the last model bump.
    </p>
    <div class="ts-grid-3">
      <div class="ts-card-outer" data-reveal="scale">
        <div class="ts-card">
          <p class="ts-card-head">Scan your way to a manifest.<br /><span class="dim">Across every skill you install.</span></p>
          <div class="ts-chat">
            <div class="ts-chat-think">Thinking…</div>
            <div>skillproof scan ./stripe-refunds<span class="ts-chat-cursor" /></div>
            <div style="margin-top: 12px"><b>✓</b> Read SKILL.md — 84 lines, 2 tools declared</div>
            <div>◷ Executing tool scan_scripts…</div>
            <div class="ts-chat-think" style="margin-top: 12px">Thinking…</div>
            <div>Sure thing. Manifest ready — 6 capability classes, 2 undeclared finds.</div>
            <div class="ts-chat-foot"><b>skillproof</b> · scan · sigstore-ready</div>
          </div>
        </div>
      </div>
      <div class="ts-card-outer" data-reveal="scale" style="--reveal-delay: 90ms">
        <div class="ts-card">
          <p class="ts-card-head">Diff your way to safe updates.<br /><span class="dim">In the same PR where you review.</span></p>
          <div class="ts-chat">
            <div class="ts-chat-think">Thinking…</div>
            <div>Done. Base vs head compared.</div>
            <div style="margin-top: 12px"><b>✓</b> 5 removals — smaller surface, auto-approved</div>
            <div>◷ Executing tool diff_capabilities…</div>
            <div>◷ Executing tool gate_ci…</div>
            <div class="ts-chat-think" style="margin-top: 12px">Thinking…</div>
            <div>+ network.outbound_domains: evil.example.com — <b>blocked, needs sign-off</b></div>
            <div class="ts-chat-foot"><b>skillproof</b> · diff · exit 2</div>
          </div>
        </div>
      </div>
      <div class="ts-card-outer" data-reveal="scale" style="--reveal-delay: 180ms">
        <div class="ts-card">
          <p class="ts-card-head">Single-prompt attest setup and you're done.<br /><span class="dim">Start gating installs in no time.</span></p>
          <div class="ts-chat">
            <div>Connect attestation with this snippet:</div>
            <div style="margin-top: 8px; border: 1px solid var(--sp-border); border-radius: 8px; padding: 10px 12px; font-size: 12px">{"attestation": "sigstore",<br />"uri": "https://ledger.skillproof.dev/api/att…"}</div>
            <div style="margin-top: 12px">◌ Verifying keyless signature…</div>
            <div>◌ Appending to public ledger…</div>
            <div class="ts-chat-think" style="margin-top: 12px">Thinking…</div>
            <div>Attested and working. Want me to gate the next install?</div>
            <div class="ts-chat-foot"><b>skillproof</b> · attest · ledger</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
