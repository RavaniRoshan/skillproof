import { defineConfig } from "vitepress";

export default defineConfig({
  title: "SkillProof",
  description: "An open registry of proof for agent skills.",
  // Project Pages URL: https://<user>.github.io/skillproof/
  base: "/skillproof/",
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
