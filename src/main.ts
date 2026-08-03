import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useThemeStore } from "./stores/theme.ts";
import "./style.css";
import VueApexCharts from "vue3-apexcharts";
import { useAuthStore } from "./stores/auth.ts";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
useThemeStore();
const auth = useAuthStore();

await auth.initialize();
app.use(router);
app.use(VueApexCharts);
app.mount("#app");
