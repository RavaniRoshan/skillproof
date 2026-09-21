---
layout: home

hero:
  name: SkillProof
  text: Proof for agent skills.
  tagline: Skills live on GitHub. Proof should live somewhere neutral — the open, signed record of what an agent skill does, and whether it still works.
  image:
    src: /logo.svg
    alt: SkillProof seal
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Read the manifesto
      link: /manifesto
    - theme: alt
      text: GitHub
      link: https://github.com/RavaniRoshan/skillproof

features:
  - title: Capability manifests
    details: A machine-readable record of everything a skill touches — network, exec, filesystem, secrets, subagents, MCP servers. No more hand-reviewing installs.
  - title: Capability diffs
    details: A removed capability is an improvement; an added one is a privilege escalation. Diffs fail CI until a human acknowledges them.
  - title: Signed attestations
    details: Keyless Sigstore signing from CI. No new keys to manage, no new infrastructure to trust — the same approach npm and PyPI use.
  - title: Model-bump evals
    details: Re-run skill evals on every model update and publish the delta. Know which of your 40 skills degraded last Tuesday.
  - title: Content-addressed identity
    details: Records are keyed by the sha256 of the skill directory, not its name. Forks and vendored copies share one identity.
  - title: Neutral by design
    details: MIT-licensed, public ledger, consumable by any registry, harness or CI. A complement to every platform, owned by none.
---

## Watch a privilege escalation get caught

<DiffDemo />

The asymmetry is the whole product: removals are improvements, additions fail
the check until a human signs off. No scanner promises safety — the diff
promise is what we keep.

## Everything a skill can touch, in one manifest

<CapGrid />

`skillproof scan` derives all six from `SKILL.md`, scripts, hooks and MCP
configs — then cross-checks them against what the skill *declares*, so honest
authors get verification for free.

<div class="sp-band">

### Why this exists

<div class="sp-stats">
  <div>
    <div class="sp-stat-num">36.8%</div>
    <div class="sp-stat-label">of 3,984 scanned skills contained a flaw — <a href="https://snyk.io/blog/snyk-finds-prompt-injection-in-36-1467-malicious-payloads-in-a-toxicskills-study-of-agent-skills-supply-chain-compromise/">Snyk ToxicSkills, Feb 2026</a></div>
  </div>
  <div>
    <div class="sp-stat-num">25,000</div>
    <div class="sp-stat-label">repos touched by npm's Shai-Hulud wave — the attack skill registries haven't had <em>yet</em></div>
  </div>
  <div>
    <div class="sp-stat-num">0</div>
    <div class="sp-stat-label">neutral, open bodies answering who signed a skill, what it does, and whether it still works</div>
  </div>
</div>

</div>

## How it works

1. **Scan** — the CLI statically analyses a skill into a signed-able
   capability manifest.
2. **Attest** — CI signs it with Sigstore and appends it to the public,
   append-only ledger, keyed by content hash.
3. **Gate** — installs, PRs and harnesses fetch the attestation and the
   capability diff, and block on new privileges or model-bump regressions.

## Evidence, not guarantees

Attestations prove what was analysed, and by which scanner version. They never
certify safety — and neither do we. Start with [core concepts](/guide/concepts),
then [scan your first skill](/guide/getting-started).
