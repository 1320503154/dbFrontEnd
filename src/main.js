import { createApp } from "vue";
import { createPinia } from "pinia";
import { useRouteStore } from "@/stores/route";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
	components,
	directives,
});

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.use(vuetify);

const routeStore = useRouteStore();
router.beforeEach((to, from, next) => {
	routeStore.setCurrentRoute(to);
	next();
});

app.mount("#app");
