import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useThemeStore } from "./stores/theme.ts";
import "./style.css";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

const theme = useThemeStore(pinia);

theme.init();

app.use(router);

app.mount("#app");