import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const vuetify = createVuetify({
	components,
	directives,
});

const app = createApp(App);

app.use(ElementPlus);
app.use(pinia); // Ensure Pinia is used before router
app.use(router);
app.use(vuetify);

app.mount("#app");

// Use stores after the app is mounted and pinia is active
const { useRouteStore } = require("@/stores/route");
const routeStore = useRouteStore();

router.beforeEach((to, from, next) => {
	routeStore.setCurrentRoute(to);
	next();
});
