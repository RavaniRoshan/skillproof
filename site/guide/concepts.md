---
title: Core concepts
---

<script setup>
const notThis = [
  {
    icon: "book",
    title: "Not a package host",
    body: "GitHub already hosts and versions skills. The ledger is designed to hold roughly one kilobyte of signed JSON per attestation — manifests and eval results, never skill code.",
  },
  {
    icon: "lock",
    title: "Not new signing infrastructure",
    body: "Sigstore already exists. The plan is to build on keyless signing from CI rather than invent a second trust root.",
  },
  {
    icon: "shield",
    title: "Not an enforcement engine",
    body: "Sandboxes and harnesses enforce policy. SkillProof produces the machine-consumable evidence they gate on, and stays out of the enforcement path.",
  },
  {
    icon: "alert",
    title: "Not liable, and not a certificate",
    body: "Attestations are evidence. Signing proves what was analysed and by which scanner version — never that a skill is safe.",
  },
];
</script>

<DocHero
  eyebrow="Explanation"
  title="The diff is the product"
  sub="Four ideas explain every design decision here: skills are a supply chain, the manifest is a means rather than an end, content hashes beat names, and evidence is not a guarantee."
/>

## Skills are a supply chain

A skill is a directory: markdown instructions plus scripts, hooks and MCP
configs. It runs inside your agent's privileged context — filesystem,
credentials, network, shell. Installing a skill is trusting third-party code
that an LLM will re-invoke on every task. Treat it like a dependency.

## The manifest is not the product — the diff is

Static analysis will miss things; that is acceptable. What matters is the
**capability delta between two versions**: a one-line `curl` added to a
script is indistinguishable from a typo fix at review time, unless a tool
produces the diff. Removed capabilities never fail. Added ones always do,
until a human acknowledges them.

## Content addressing beats names

Skills are copied, forked and vendored constantly. A name is a weak identity;
the hash of the skill directory is a strong one. Every ledger record is keyed
by content hash, which is what makes the ledger immune to name-squatting,
typosquatting and registry-hopping.

## What a scan covers

<CapGrid />

The intent is that `skillproof scan` derives all six classes from `SKILL.md`,
scripts, hooks and MCP configs, then cross-checks them against what the skill
itself declares — so an honest author gets verification for free.

> [!WARNING] Status: the scanner is a heuristic shell
> v0.1 reads markdown files only and matches substrings such as `curl` or
> `token`. Matches produce placeholder values, frontmatter is not parsed, and
> the declared-versus-derived cross-check is not implemented. Unicode-tag
> hygiene findings are collected but have no counterpart in the published
> schema yet. The manifest is therefore incomplete by construction — which is
> exactly why the diff, not the scan, carries the promise.

## What SkillProof is not

<FeatureCards :items="notThis" />

## Threat model

The product keeps one promise and refuses another. The promise kept is the
diff: "v1.2 added capability X" is a claim that can be checked against a
manifest anyone can regenerate. The promise refused is safety — a skill that
passes every check can still be malicious, and a scanner that misses
something is behaving as documented rather than failing.

Known limits are stated next to the feature rather than in a separate
document: mutable external links, memory-file persistence and Unicode-tag
payloads are all things a heuristic scan will not reliably catch. Publishing
the scanner version alongside every record is what makes those limits
auditable after the fact.
