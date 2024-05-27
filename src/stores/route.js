// stores/route.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRouteStore = defineStore("routeJs", () => {
	const currentRoute = ref(null);

	function setCurrentRoute(route) {
		currentRoute.value = route;
	}

	return { currentRoute, setCurrentRoute };
});
