# Scanner limitations (`skillproof-scan/0.1.5`)

Versioned statement of what the heuristic scanner can and cannot see.
The product promise is the **diff** between two scans, not the
completeness of one scan. An attestation proves what was analysed and by
which scanner version. It never certifies safety.

## What the scanner reads

Markdown and common script files (`.md`, `.js`, `.mjs`, `.cjs`, `.ts`,
`.py`, `.sh`, `.json`). Binary files, images, archives, and vendored
`node_modules/` / `.git/` directories are excluded from both scanning
and hashing.

## What the signals catch

- Network clients (`curl`, `wget`, `fetch(`, `axios`, `http.get`) plus
  every `http(s)://` URL and its hostname.
- Shell execution markers and interpreters (`bash`, `python3`, `node`).
- Filesystem paths (`/etc/…`, `~/…`, `.env`, `MEMORY.md`) and
  `readFile`/`writeFile` call arguments.
- Secret names via `process.env.X` and `*_KEY` / `*SECRET*` /
  `*TOKEN*` / `*PASSWORD*` constants.
- Subagent spawning (`subagent`, `Task(`, `subagent_type`) and MCP
  references (`mcp-server`, `mcp.json`).
- Hygiene: invisible Unicode Tag characters (U+E0000–U+E007F),
  unpinned external URLs, and prompt-injection phrases
  (e.g. "ignore previous instructions").

## What the scanner misses

- Obfuscated or encoded payloads (base64, hex, split strings, homoglyph
  substitution outside the Tag block).
- Behavior reachable only at runtime (fetched remote instructions,
  plugin auto-updates, tool responses that steer the agent).
- Capabilities in unscanned file types or binaries.
- Anything requiring data-flow or taint analysis — there is none.
  Static patterns plus the version diff are the whole method,
  per the SkillFortify finding that info-flow adds zero coverage here.
- Prompt-injection phrases can appear in legitimate security
  documentation. A match is evidence to read in context, not a verdict.

## Reproducing a scan

```bash
npm run build
node packages/cli/dist/index.js scan ./skill base.json
node packages/cli/dist/index.js skills-sh proof owner/repo/skill
```

Every manifest records its `scan_version`. Re-scan after a scanner bump:
a changed manifest with unchanged content means the scanner changed,
not the skill.
