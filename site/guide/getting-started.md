---
title: Getting started
---

<script setup>
const next = [
  {
    icon: "compass",
    title: "Core concepts",
    body: "The model behind manifests and diffs — read this before wiring anything into CI.",
    to: "/guide/concepts",
    meta: "Explanation",
  },
  {
    icon: "terminal",
    title: "CLI reference",
    body: "Every command, argument and exit code, including the parts that are still placeholders.",
    to: "/guide/cli",
    meta: "Reference",
  },
  {
    icon: "gauge",
    title: "Evaluations",
    body: "Catch the skill that quietly stopped working when a new model shipped.",
    to: "/guide/evaluations",
    meta: "Planned · v0.2",
  },
];
</script>

<DocHero
  eyebrow="Tutorial"
  title="Scan your first skill"
  sub="About ten minutes, no network access needed. By the end you have a capability manifest for a skill directory, a diff between two versions, and an attestation record written to disk."
/>

You need Node.js 20+ and npm.

```bash
git clone https://github.com/RavaniRoshan/skillproof.git
cd skillproof
npm install
```

## 1. Build the CLI

```bash
npm run build
```

The package is not published to npm yet, so commands run against the built
entry point. Everything below uses `node packages/cli/dist/index.js`; the
`npx skillproof` form does not work until the package is published.

## 2. Scan a skill directory

```bash
node packages/cli/dist/index.js scan ./my-skill base.json
```

`scan` takes two positional arguments: the skill directory and the output
path. There is no `--out` flag.

The manifest it writes has one section per capability class — `network`,
`exec`, `filesystem`, `secrets`, `agents`, `mcp` — plus a `hygiene` block for
invisible Unicode tags and external URLs.

> [!WARNING] Status: findings are placeholders
> The v0.1 scanner walks markdown files and matches substrings such as `curl`
> or `token`. When it matches, it records a **placeholder** value rather than
> the real one, and it does not yet read frontmatter, scripts or MCP configs.
> Use it to exercise the pipeline, not to audit a skill you intend to install.

## 3. Diff two versions

::: code-group

```bash [Local]
node packages/cli/dist/index.js diff base.json head.json
```

```yaml [GitHub Actions]
- name: Fail on new capabilities
  run: |
    npm ci
    npm run build
    node packages/cli/dist/index.js scan ./skill head.json
    # base.json is the manifest already on record for this skill
    node packages/cli/dist/index.js diff base.json head.json
```

:::

A removed capability is an improvement and exits `0`. A newly added capability
class prints under "New capabilities detected" and exits `2` — that is the
signal to wire into CI, so skill updates become reviewable like dependency
updates. See [ledger](/guide/ledger) for the GitHub Action that consumes it.

> [!NOTE] Status: changed values do not fail yet
> A capability whose value changed is listed as added but does not set the exit
> code, so it will not fail a gate. Only wholly new capability classes block.

## 4. Attest and verify

```bash
node packages/cli/dist/index.js attest base.json
node packages/cli/dist/index.js verify github:org/repo@sha256:9f3e…
```

`attest` writes an append-only JSONL record. `verify` is intended to check a
signature and print the manifest without needing permission from anyone.

> [!WARNING] Status: not signed yet
> `attest` performs no Sigstore signing in v0.1, and `verify` returns success
> without checking anything. Treat a green verify as a placeholder until
> signing lands.

## Where to go next

<FeatureCards :items="next" />

<AgentOnboard />
