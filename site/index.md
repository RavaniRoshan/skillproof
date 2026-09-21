---
layout: home

hero:
  name: SkillProof
  text: Proof for agent skills.
  tagline: Skills live on GitHub. Proof should live somewhere neutral — the open, signed record of what an agent skill does, and whether it still works.
  image:
    src: /logo.svg
    alt: SkillProof
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

## The three questions every skill installer asks

| Question | SkillProof's answer |
| --- | --- |
| Who signed this skill? | Keyless Sigstore attestation, keyed by content hash |
| What is it allowed to do? | Capability manifest + diff |
| Does it still work after a model bump? | Signed eval delta per model version |

## See it in sixty seconds

```bash
npx skillproof scan ./my-skill --out base.json
npx skillproof diff base.json head.json
```

```text
+ network.outbound_domains: ["evil.example.com"]   (NEW)
+ secrets.env_vars: ["AWS_SECRET_ACCESS_KEY"]       (NEW)
  exec.shell: true                                   (unchanged)
```

That asymmetry is the whole product: removals are improvements, additions
fail the check until a human signs off.

## How it works

1. **Scan** — the CLI statically analyses `SKILL.md`, scripts, hooks and MCP
   configs into a signed-able capability manifest.
2. **Attest** — CI signs the manifest with Sigstore and appends it to the
   public, append-only ledger, keyed by content hash.
3. **Gate** — installs, PRs and harnesses fetch the attestation and the
   capability diff, and block on new privileges or model-bump regressions.

## Evidence, not guarantees

Attestations prove what was analysed, and by which scanner version. They never
certify safety — and neither do we. Read [core concepts](/guide/concepts) for
the threat model and the documented limits of static analysis.

<br>

<div style="display:flex;gap:12px;flex-wrap:wrap">
  <a href="/guide/getting-started" style="font-weight:600">Get started →</a>
  <a href="/roadmap">Roadmap →</a>
  <a href="https://github.com/RavaniRoshan/skillproof">GitHub →</a>
</div>
