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
import { useUserStore } from "@/stores/user.js";

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomeView,
		meta: {
			requiresAuth: true,
			title: "首页",
			breadcrumb: [{ name: "首页", path: "/" }],
		},
	},
	{
		path: "/about",
		name: "About",
		component: AboutView,
		meta: {
			requiresAuth: false,
			title: "关于",
			breadcrumb: [
				{ name: "首页", path: "/" },
				{ name: "关于", path: "/about" },
			],
		},
	},
	{
		path: "/login",
		name: "Login",
		component: LoginView,
		meta: {
			requiresAuth: false,
			title: "登录",
			breadcrumb: [
				{ name: "首页", path: "/" },
				{ name: "登录", path: "/login" },
			],
		},
	},
	{
		path: "/talent",
		name: "Talent",
		component: HomeView,
		meta: {
			requiresAuth: true,
			title: "人才",
			breadcrumb: [
				{ name: "首页", path: "/" },
				{ name: "人才", path: "/talent" },
			],
		},
		children: [
			{
				path: "add",
				name: "AddTalent",
				component: AddTalent,
				meta: {
					title: "添加人才",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "人才", path: "/talent" },
						{ name: "添加人才", path: "/talent/add" },
					],
				},
			},
			{
				path: "view",
				name: "ViewTalent",
				component: ViewTalent,
				meta: {
					title: "浏览人才",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "人才", path: "/talent" },
						{ name: "浏览人才", path: "/talent/view" },
					],
				},
			},
		],
	},
	{
		path: "/application",
		name: "Application",
		component: HomeView,
		meta: {
			requiresAuth: true,
			title: "申请",
			breadcrumb: [
				{ name: "首页", path: "/" },
				{ name: "申请", path: "/application" },
			],
		},
		children: [
			{
				path: "add",
				name: "AddApplication",
				component: AddApplication,
				meta: {
					title: "添加申请",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "申请", path: "/application" },
						{ name: "添加申请", path: "/application/add" },
					],
				},
			},
			{
				path: "view",
				name: "ViewApplication",
				component: ViewApplication,
				meta: {
					title: "浏览申请",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "申请", path: "/application" },
						{ name: "浏览申请", path: "/application/view" },
					],
				},
			},
		],
	},
	{
		path: "/position",
		name: "Position",
		component: HomeView,
		meta: {
			requiresAuth: true,
			title: "岗位",
			breadcrumb: [
				{ name: "首页", path: "/" },
				{ name: "岗位", path: "/position" },
			],
		},
		children: [
			{
				path: "add",
				name: "AddPosition",
				component: AddPosition,
				meta: {
					title: "添加岗位",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "岗位", path: "/position" },
						{ name: "添加岗位", path: "/position/add" },
					],
				},
			},
			{
				path: "view",
				name: "ViewPosition",
				component: ViewPosition,
				meta: {
					title: "浏览岗位",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "岗位", path: "/position" },
						{ name: "浏览岗位", path: "/position/view" },
					],
				},
			},
		],
	},
	{
		path: "/company",
		name: "Company",
		component: HomeView,
		meta: {
			requiresAuth: true,
			title: "公司",
			breadcrumb: [
				{ name: "首页", path: "/" },
				{ name: "公司", path: "/company" },
			],
		},
		children: [
			{
				path: "add",
				name: "AddCompany",
				component: AddCompany,
				meta: {
					title: "添加公司",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "公司", path: "/company" },
						{ name: "添加公司", path: "/company/add" },
					],
				},
			},
			{
				path: "view",
				name: "ViewCompany",
				component: ViewCompany,
				meta: {
					title: "查看公司",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "公司", path: "/company" },
						{ name: "查看公司", path: "/company/view" },
					],
				},
			},
		],
	},
	{
		path: "/manager",
		name: "Manager",
		component: HomeView,
		meta: {
			requiresAuth: true,
			title: "经理",
			breadcrumb: [
				{ name: "首页", path: "/" },
				{ name: "经理", path: "/manager" },
			],
		},
		children: [
			{
				path: "add",
				name: "AddManager",
				component: AddManager,
				meta: {
					title: "添加经理",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "经理", path: "/manager" },
						{ name: "添加经理", path: "/manager/add" },
					],
				},
			},
			{
				path: "view",
				name: "ViewManager",
				component: ViewManager,
				meta: {
					title: "查看经理",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "经理", path: "/manager" },
						{ name: "查看经理", path: "/manager/view" },
					],
				},
			},
		],
	},
	{
		path: "/degree",
		name: "Degree",
		component: HomeView,
		meta: {
			requiresAuth: true,
			title: "学位",
			breadcrumb: [
				{ name: "首页", path: "/" },
				{ name: "学位", path: "/degree" },
			],
		},
		children: [
			{
				path: "add",
				name: "AddDegree",
				component: AddDegree,
				meta: {
					title: "添加学位",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "学位", path: "/degree" },
						{ name: "添加学位", path: "/degree/add" },
					],
				},
			},
			{
				path: "view",
				name: "ViewDegree",
				component: ViewDegree,
				meta: {
					title: "查看学位",
					breadcrumb: [
						{ name: "首页", path: "/" },
						{ name: "学位", path: "/degree" },
						{ name: "查看学位", path: "/degree/view" },
					],
				},
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
	const userStore = useUserStore();
	const userInfo = userStore.getUserInfo();
	let isAuthenticated = false;
	if (userInfo) {
		isAuthenticated = true;
	} else {
		isAuthenticated = false;
	}

	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// 需要认证的路由
		if (!isAuthenticated) {
			// 用户未认证，重定向到登录页面或其他处理
			next({ name: "Login" }); // 如果有登录页面的路由名为 'Login'
		} else {
			// 用户已认证，放行
			next();
		}
	} else {
		// 不需要认证的路由，直接放行
		next();
	}
});

export default router;
