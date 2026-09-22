import { defineConfig } from "vitepress";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// GitHub Project Pages serves from /skillproof/, Vercel serves from /.
// Vercel sets VERCEL=1 automatically, so keep one config for both hosts.
const base = process.env.VERCEL ? "/" : "/skillproof/";
// Emit to the repo-root dist/ so the output matches the hosting default
// on both GitHub Pages and Vercel without per-host overrides.
const outDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "dist");

export default defineConfig({
  title: "SkillProof",
  description:
    "An open registry of proof for agent skills — what a skill does, and whether it still works.",
  base,
  outDir,
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: `${base}logo.svg`, media: "(prefers-color-scheme: light)" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: `${base}logo-dark.svg`, media: "(prefers-color-scheme: dark)" }],
    ["meta", { name: "theme-color", content: "#09090b" }],
    ["meta", { property: "og:title", content: "SkillProof — Proof for agent skills" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "The open, signed record of what an agent skill does — and whether it still works.",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  ],
  themeConfig: {
    logo: { light: "/logo.svg", dark: "/logo-dark.svg", alt: "SkillProof logo" },
    siteTitle: "SkillProof",
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
      { text: "Proofs", link: "/skill/" },
      { text: "Changelog", link: "/changelog" },
      { text: "Manifesto", link: "/manifesto" },
      { text: "Roadmap", link: "/roadmap" },
      { text: "Get started →", link: "/guide/getting-started" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Overview", link: "/guide/" },
            { text: "Getting started", link: "/guide/getting-started" },
            { text: "Core concepts", link: "/guide/concepts" },
            { text: "CLI reference", link: "/guide/cli" },
            { text: "Evaluations", link: "/guide/evaluations" },
            { text: "Ledger", link: "/guide/ledger" },
          ],
        },
      ],
      "/api/": [
        {
          text: "Reference",
          items: [{ text: "Read API", link: "/api/" }],
        },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/RavaniRoshan/skillproof",
      },
    ],
    footer: {
      message: "Proof-first skill management for agent-first workflows",
      copyright: "© 2026 SkillProof. All rights reserved. · Privacy · Terms",
    },
  },
});
