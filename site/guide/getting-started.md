# Getting started

You need Node.js 20+ and npm.

```bash
git clone https://github.com/RavaniRoshan/skillproof.git
cd skillproof
npm install
```

## Scan your first skill

```bash
npm run build
node packages/cli/dist/index.js scan ./my-skill --out base.json
```

The output is a capability manifest: every network domain, shell interpreter,
filesystem path, secret, subagent type and MCP server the skill touches —
plus anything the skill does that its own frontmatter never declared.

## Diff two versions

```bash
node packages/cli/dist/index.js diff base.json head.json
```

Exit code `2` means a new capability appeared. Wire it into CI so skill
updates are reviewable like dependency updates — see
[ledger](/guide/ledger) for the GitHub Action.

## Attest and verify

```bash
node packages/cli/dist/index.js attest base.json
node packages/cli/dist/index.js verify github:org/repo@sha256:9f3e…
```

`attest` signs with keyless Sigstore (OIDC identity from CI) and appends the
record to the ledger. `verify` checks the signature and prints the manifest —
no permission needed.

## Next steps

- [Core concepts](/guide/concepts) — the model behind manifests and diffs
- [CLI reference](/guide/cli) — every command and flag
- [Evaluations](/guide/evaluations) — surviving model bumps
