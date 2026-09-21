import { defineConfig } from "vitepress";

// GitHub Project Pages serves from /skillproof/, Vercel serves from /.
// Vercel sets VERCEL=1 automatically, so keep one config for both hosts.
const base = process.env.VERCEL ? "/" : "/skillproof/";

export default defineConfig({
  title: "SkillProof",
  description:
    "An open registry of proof for agent skills — what a skill does, and whether it still works.",
  base,
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: `${base}logo.svg` }],
    ["meta", { name: "theme-color", content: "#0a0f1e" }],
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
    logo: "/logo.svg",
    siteTitle: "SkillProof",
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API", link: "/api/" },
      { text: "Manifesto", link: "/manifesto" },
      { text: "Roadmap", link: "/roadmap" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting started", link: "/guide/getting-started" },
          { text: "Core concepts", link: "/guide/concepts" },
          { text: "CLI reference", link: "/guide/cli" },
          { text: "Evaluations", link: "/guide/evaluations" },
          { text: "Ledger", link: "/guide/ledger" },
        ],
      },
      {
        text: "Reference",
        items: [{ text: "Read API", link: "/api/" }],
      },
      {
        text: "Project",
        items: [
          { text: "Manifesto", link: "/manifesto" },
          { text: "Roadmap", link: "/roadmap" },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/RavaniRoshan/skillproof",
      },
    ],
    footer: {
      message: "MIT licensed. The ledger is public, forever.",
      copyright: "SkillProof contributors",
    },
  },
});
