import { createRouter, createWebHistory } from "vue-router";

// 引入相应的组件
import AddTalent from "@/views/talent/AddTalent.vue";
import ViewTalent from "@/views/talent/ViewTalent.vue";
import AddApplication from "@/views/application/AddApplication.vue";
import ViewApplication from "@/views/application/ViewApplication.vue";
import AddPosition from "@/views/position/AddPosition.vue";
import ViewPosition from "@/views/position/ViewPosition.vue";
import AddCompany from "@/views/company/AddCompany.vue";
import ViewCompany from "@/views/company/ViewCompany.vue";
import AddManager from "@/views/manager/AddManager.vue";
import ViewManager from "@/views/manager/ViewManager.vue";
import AddDegree from "@/views/degree/AddDegree.vue";
import ViewDegree from "@/views/degree/ViewDegree.vue";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomeView,
	},
	{
		path: "/about",
		name: "About",
		component: AboutView,
	},
	{
		path: "/login",
		name: "Login",
		component: LoginView,
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: "/talent",
		name: "Talent",
		component: HomeView, // 假设 HomeView 是主组件
		children: [
			{ path: "add", name: "AddTalent", component: AddTalent },
			{ path: "view", name: "ViewTalent", component: ViewTalent },
		],
	},
	{
		path: "/application",
		name: "Application",
		component: HomeView, // 假设 HomeView 是主组件
		children: [
			{ path: "add", name: "AddApplication", component: AddApplication },
			{ path: "view", name: "ViewApplication", component: ViewApplication },
		],
	},
	{
		path: "/position",
		name: "Position",
		component: HomeView, // 假设 HomeView 是主组件
		children: [
			{ path: "add", name: "AddPosition", component: AddPosition },
			{ path: "view", name: "ViewPosition", component: ViewPosition },
		],
	},
	{
		path: "/company",
		name: "Company",
		component: HomeView, // 假设 HomeView 是主组件
		children: [
			{ path: "add", name: "AddCompany", component: AddCompany },
			{ path: "view", name: "ViewCompany", component: ViewCompany },
		],
	},
	{
		path: "/manager",
		name: "Manager",
		component: HomeView, // 假设 HomeView 是主组件
		children: [
			{ path: "add", name: "AddManager", component: AddManager },
			{ path: "view", name: "ViewManager", component: ViewManager },
		],
	},
	{
		path: "/degree",
		name: "Degree",
		component: HomeView, // 假设 HomeView 是主组件
		children: [
			{ path: "add", name: "AddDegree", component: AddDegree },
			{ path: "view", name: "ViewDegree", component: ViewDegree },
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
