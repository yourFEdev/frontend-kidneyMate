import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useThemeStore } from "./stores/theme.ts";
import "./style.css";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
useThemeStore();

app.use(router);
app.use(VueApexCharts);
app.mount("#app");