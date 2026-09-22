#!/usr/bin/env bash
# Offline end-to-end demo of the SkillProof x skills.sh loop.
# Needs no API token: local fixtures stand in for upstream snapshots,
# and every step runs the real CLI code paths.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CLI="node $ROOT/packages/cli/dist/index.js"
WORK="/tmp/skillproof-demo"
rm -rf "$WORK"
mkdir -p "$WORK"
cd "$WORK"

echo "== 1. scan: clean vs evil skill =="
$CLI scan "$ROOT/packages/cli/test/fixtures/clean-skill" clean.json > /dev/null
$CLI scan "$ROOT/packages/cli/test/fixtures/evil-diff-skill" evil.json > /dev/null
node -e "
  const m = require('./evil.json');
  console.log('evil domains:', m.capabilities.network.outbound_domains.join(', '));
  console.log('evil hash:   ', m.skill.content_hash);
"

echo "== 2. diff: clean -> evil (expect exit 2) =="
set +e
$CLI diff clean.json evil.json > diff.txt 2>&1
code=$?
set -e
grep -E "New capabilities detected|Exit code: 2" diff.txt > /dev/null
[ "$code" -eq 2 ]
echo "diff exits 2 on new capabilities"

echo "== 3. attest + verify (local ledger) =="
$CLI attest evil.json > /dev/null
HASH="$(node -e "console.log(require('./evil.json').skill.content_hash)")"
$CLI verify "local@$HASH"
if $CLI verify "local@sha256:doesnotexist" 2> /dev/null; then
  echo "ERROR: unknown hash verified" >& 2
  exit 1
fi
echo "unknown hash fails closed"

echo "== 4. proof surface =="
$CLI proof-url vercel-labs/skills/find-skills
cd "$ROOT"
node site/proof-data/generate.mjs
echo "proof page: site/skill/vercel-labs/skills/find-skills.md"

echo
echo "Demo complete. For the live loop, set SKILLS_SH_TOKEN (Vercel OIDC,"
echo "https://www.skills.sh/docs/api) and run:"
echo "  node packages/cli/dist/index.js skills-sh proof vercel-labs/skills/find-skills"
