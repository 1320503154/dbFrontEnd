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
		meta: { title: "首页" },
	},
	{
		path: "/about",
		name: "About",
		component: AboutView,
		meta: { title: "关于" },
	},
	{
		path: "/login",
		name: "Login",
		component: LoginView,
		meta: { requiresAuth: false, title: "登录" },
	},
	{
		path: "/talent",
		name: "Talent",
		component: HomeView,
		meta: { title: "人才" },
		children: [
			{
				path: "add",
				name: "AddTalent",
				component: AddTalent,
				meta: { title: "添加人才" },
			},
			{
				path: "view",
				name: "ViewTalent",
				component: ViewTalent,
				meta: { title: "浏览人才" },
			},
		],
	},
	{
		path: "/application",
		name: "Application",
		component: HomeView,
		meta: { title: "申请" },
		children: [
			{
				path: "add",
				name: "AddApplication",
				component: AddApplication,
				meta: { title: "添加申请" },
			},
			{
				path: "view",
				name: "ViewApplication",
				component: ViewApplication,
				meta: { title: "浏览申请" },
			},
		],
	},
	{
		path: "/position",
		name: "Position",
		component: HomeView,
		meta: { title: "岗位" },
		children: [
			{
				path: "add",
				name: "AddPosition",
				component: AddPosition,
				meta: { title: "添加岗位" },
			},
			{
				path: "view",
				name: "ViewPosition",
				component: ViewPosition,
				meta: { title: "浏览岗位" },
			},
		],
	},
	{
		path: "/company",
		name: "Company",
		component: HomeView,
		meta: { title: "公司" },
		children: [
			{
				path: "add",
				name: "AddCompany",
				component: AddCompany,
				meta: { title: "添加公司" },
			},
			{
				path: "view",
				name: "ViewCompany",
				component: ViewCompany,
				meta: { title: "查看公司" },
			},
		],
	},
	{
		path: "/manager",
		name: "Manager",
		component: HomeView,
		meta: { title: "经理" },
		children: [
			{
				path: "add",
				name: "AddManager",
				component: AddManager,
				meta: { title: "添加经理" },
			},
			{
				path: "view",
				name: "ViewManager",
				component: ViewManager,
				meta: { title: "查看经理" },
			},
		],
	},
	{
		path: "/degree",
		name: "Degree",
		component: HomeView,
		meta: { title: "学位" },
		children: [
			{
				path: "add",
				name: "AddDegree",
				component: AddDegree,
				meta: { title: "添加学位" },
			},
			{
				path: "view",
				name: "ViewDegree",
				component: ViewDegree,
				meta: { title: "查看学位" },
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
