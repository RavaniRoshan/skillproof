# AGENTS.md

Guidance for AI coding agents working in this repository. Read this before
changing code or docs. `PLAN.md` is the human-facing scope/roadmap source of
truth; this file is the machine-facing operating manual.

## What this product is

SkillProof is an open registry of **proof** for agent skills — not a place that
hosts skills. Skills live on GitHub. SkillProof records, in a public
append-only ledger keyed by content hash:

1. what capabilities a skill touches (network, exec, filesystem, secrets,
   subagents, MCP), as a machine-readable manifest;
2. the **capability delta** between two versions of that skill;
3. whether the skill's eval pass-rate survived a model bump.

Two invariants are load-bearing. Do not weaken them in code, docs, or copy:

- **Content addressing beats names.** Records are keyed by the hash of the
  skill directory, never by skill name. Names are squattable; hashes are not.
- **Evidence, never guarantees.** An attestation proves *what was analysed, by
  which scanner version*. It never certifies safety. Never write copy that
  promises safety, and never rename a heuristic as a guarantee.

A third, softer rule: the manifest is not the product — **the diff is**. Static
detection will always be incomplete; the diff promise ("v1.2 added capability
X") is what must hold.

## Repository map

```
packages/cli/        skillproof CLI: scan, diff, attest, verify, eval
packages/schemas/    Zod source of truth + generated *.schema.json / OpenAPI
openapi/v1.yaml      read API contract (GENERATED — never hand-edit)
site/                VitePress marketing + docs site (the product frontend)
PLAN.md              scope, locked decisions, kill criteria, progress log
```

Paths that docs may reference as *planned* but that do **not** exist yet:
`ledger/`, `actions/capability-diff/`, `docs/limitations.md`, `evals/`.
Do not write instructions that assume they are present.

## Commands

```bash
npm install                # workspace install (Node 20+)

npm run build              # tsc -b packages/*        (CLI + schemas only)
npm run typecheck          # tsc -b, no emit
npm run lint               # eslint + prettier
npx vitest run             # test suite — must stay green

npm run docs:dev           # VitePress dev server, hot reload
npm run docs:build         # SSG build → site/.vitepress/dist
npm run docs:preview       # serve the built dist

npm run generate -w skillproof-schemas   # regen *.schema.json + openapi/v1.yaml
```

`npm run build` does **not** build the site. The site is a separate VitePress
workspace (`site/`) and is never type-checked by `tsc -b`.

## Current implementation status (verify before you trust the docs)

v0.1 is a **scaffold**, not a finished tool. As of this writing:

- `Scanner.scan` walks `*.md` files only and applies substring heuristics. On a
  match it pushes **placeholder** values (`http://example.com`, `API_KEY`,
  `./data.txt`, `mcp-server`, `research`), not the extracted real value.
  See `packages/cli/src/scanner.ts:56-134`.
- `Scanner.computeHash` returns the concatenated contents of every file in the
  directory. It is **not** a sha256 despite the `sha256:` prefix written at
  `packages/cli/src/index.ts:32`. `content_hash` is therefore not a content
  address today, and the resulting value is far larger than the "~1 KB record"
  the ledger design assumes.
- `scanner.ts` emits a `hygiene` block that has **no counterpart** in
  `ManifestSchema` (`packages/schemas/src/index.ts:5-46`), so a scan output
  cannot currently validate against the committed schema.
- `scan` overwrites `skill.name` / `skill.version` / `skill.source` with
  hardcoded values (`packages/cli/src/index.ts:28-34`); frontmatter parsing and
  the declared-vs-derived cross-check are not implemented.
- `Ledger.attest` writes a local JSONL file and performs **no Sigstore
  signing** (`packages/cli/src/ledger.ts:6-41`).
- `Verifier.verify` short-circuits to `{ verified: true }` and verifies
  nothing (`packages/cli/src/verifier.ts:62-76`).
- `DiffProcessor` works, but a capability whose *value changed* is pushed into
  `added` **without** setting `exitCode = 2`
  (`packages/cli/src/diff-processor.ts:41-45`) — so a modified capability does
  not fail CI even though a wholly new one does.
- `skillproof eval` prints its flags and exits; the harness is v0.2 work
  (`packages/cli/src/index.ts:175-209`).
- The CLI is **unpublished** (`skillproof-cli`, private workspace). Never
  document `npx skillproof`; use `node packages/cli/dist/index.js`.

When you fix one of these, update this section in the same change.

## Conventions

**TypeScript / packages.** Strict TS, ESM only, Node 20+. `commander` for CLI
parsing, `zod` for schemas, `vitest` for tests. Keep the CLI dependency-light:
`chalk`, `commander`, `zod`, `sigstore`. Tests live in `packages/*/test/` and
use `node:fs` / `node:path` imports.

**Schemas are the single source of truth.** Never edit `openapi/v1.yaml` or
`packages/schemas/*.schema.json` by hand — change `packages/schemas/src/index.ts`
and regenerate. Every schema field must earn its place by appearing in a check
or a report; do not add speculative fields.

**Site theme.** The design system is `site/.vitepress/theme/style.css`. Reuse
its tokens (`--sp-bg`, `--sp-surface`, `--sp-surface-2`, `--sp-border`,
`--sp-text`, `--sp-muted`, `--sp-faint`, `--sp-cta-bg`, `--ts-radius`,
`--ts-max`) and its layout classes (`.ts-section`, `.ts-h2`, `.ts-sub`,
`.ts-card-outer` + `.ts-card`, `.ts-eyebrow`, `.ts-btn`) rather than inventing
parallel ones. Both light and dark themes must work; a new colour needs a
`.dark` value.

Motion is dependency-free on purpose — CSS transitions plus
`site/.vitepress/theme/reveal.ts` (IntersectionObserver). Do **not** add GSAP,
framer-motion, or any animation runtime; opt elements in with `data-reveal`
and honour `prefers-reduced-motion`.

New Vue components go in `site/.vitepress/theme/components/` and must be
registered in `site/.vitepress/theme/index.ts` to be usable from markdown.

**Site base path.** `base` is `/skillproof/` for GitHub Pages and `/` on
Vercel, selected by `process.env.VERCEL` (`site/.vitepress/config.ts:5`). Use
`withBase()` for any asset or internal link built in a component; hardcoding
`/foo` breaks one of the two hosts. When previewing locally, the correct URL is
`http://localhost:4173/skillproof/` — the bare root legitimately 404s.

## Documentation rules

Docs follow Diátaxis and live in `site/`: `guide/` (tutorials, how-to,
reference), `api/` (reference), `manifesto.md` / `roadmap.md` (explanation).
Every page opens with `<DocHero eyebrow title sub />` and carries a frontmatter
`title:`.

Use the shared page furniture instead of ad-hoc markup:

- `<FeatureCards :items="cards" />` for a grid of cards — the same
  double-border card as the landing page. Items are
  `{ icon, title, body, to?, meta? }`, where `icon` is a key into the
  `CARD_ICONS` map in `site/.vitepress/theme/cards.ts`.
- `<FaqList :items="items" label="FAQs" />` for an accessible accordion
  (`button` + `aria-expanded` / `aria-controls`, first row open).
- `<AgentOnboard />` for the copyable setup prompt plus agent deep links.
  It has a default prompt and `docUrl`; pass `prompt` only when a page needs a
  genuinely different task, not a reworded one.
- FAQ copy lives in `site/.vitepress/theme/faq.ts` (`PRODUCT_FAQ`,
  `DOCS_FAQ`) so the landing page and the guide share one source.

Page furniture conventions borrowed from Parallel's docs and marketing site:

- **Decision tables** open reference pages with the
  `| Command | Reads | Exit code | Use when |` shape, so a reader picks an
  option before learning its flags.
- **Multi-variant commands** use VitePress `::: code-group` (Local /
  GitHub Actions), never two stacked fences.
- **Deep links into an agent** may only use schemes documented by that vendor.
  Verified today: `claude-cli://open?q=` and
  `cursor://anysphere.cursor-deeplink/prompt?text=`. Every other agent gets the
  clipboard. Do not invent a scheme to make the button row look symmetric.
- **`site/public/llms.txt`** is the machine-readable index an agent reads
  first. It hand-lists every page, so update it in the same change that adds,
  renames or removes a page or a contract file.

Prose style: sentence case, second person, active voice. No superlatives, no
exclamation marks, no emoji in body copy. Code fences get a language tag. Two
space indentation in TS/Vue/CSS; match the surrounding lines rather than
reformatting untouched ones.

Commands in docs must be **runnable as written**. Because the CLI is
unpublished, use `node packages/cli/dist/index.js <command>` after
`npm run build`, and never `--out`.

## Working agreement

1. Read the file before editing it. Match the existing style.
2. Keep the diff surgical: every changed line must trace to the request. Do
   not refactor untouched code, reformat adjacent lines, or delete unrelated
   dead code — mention it instead.
3. Verify with real commands: `npx vitest run` for CLI changes,
   `npm run docs:build` for site changes. Do not claim a build passed unless
   you ran it.
4. `site/.vitepress/dist/` and `site/.vitepress/cache/` are generated. Never
   commit them, never hand-edit files inside them.
5. Never commit or push unless explicitly asked.
