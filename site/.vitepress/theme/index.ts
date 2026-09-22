import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import AgentOnboard from "./components/AgentOnboard.vue";
import CapGrid from "./components/CapGrid.vue";
import DiffDemo from "./components/DiffDemo.vue";
import DocHero from "./components/DocHero.vue";
import FaqList from "./components/FaqList.vue";
import FeatureCards from "./components/FeatureCards.vue";
import HomeClose from "./components/HomeClose.vue";
import HomeCompare from "./components/HomeCompare.vue";
import HomeHero from "./components/HomeHero.vue";
import HomeIntegrations from "./components/HomeIntegrations.vue";
import HomeProof from "./components/HomeProof.vue";
import Showcase from "./components/Showcase.vue";
import CustomLayout from "./Layout.vue";
import { initReveal } from "./reveal";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app, router }) {
    app.component("DiffDemo", DiffDemo);
    app.component("CapGrid", CapGrid);
    app.component("AgentOnboard", AgentOnboard);
    app.component("DocHero", DocHero);
    app.component("FaqList", FaqList);
    app.component("FeatureCards", FeatureCards);
    app.component("HomeHero", HomeHero);
    app.component("HomeProof", HomeProof);
    app.component("HomeIntegrations", HomeIntegrations);
    app.component("HomeCompare", HomeCompare);
    app.component("HomeClose", HomeClose);
    app.component("Showcase", Showcase);
    if (typeof window !== "undefined") {
      // Client-only: re-arm scroll reveal after each client-side navigation.
      initReveal();
      router?.onAfterRouteChanged?.(() => initReveal());
    }
  },
} satisfies Theme;
