import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import CapGrid from "./components/CapGrid.vue";
import DiffDemo from "./components/DiffDemo.vue";
import CustomLayout from "./Layout.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.component("DiffDemo", DiffDemo);
    app.component("CapGrid", CapGrid);
  },
} satisfies Theme;
