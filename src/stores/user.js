import { ref } from "vue";
import { defineStore } from "pinia";
import router from "/src/router/index.js";

export const useUserStore = defineStore(
	"user",
	() => {
		const userInfo = ref({ token: null }); // 给 userInfo 设置默认值避免 null 问题
		const companyInfo = ref({});

		function setCompanyInfo(info) {
			companyInfo.value = info;
		}
		function getCompanyInfo() {
			return companyInfo.value;
		}
		function setUserInfo(info) {
			userInfo.value = info;
		}
		function getUserInfo() {
			return userInfo.value;
		}
		function getToken() {
			return userInfo.value ? userInfo.value.token : null; // 检查是否为 null
		}
		function logout() {
			userInfo.value = { token: null }; // 清空 token
			router.push("/login");
		}
		//pinia持久化插件在组合式函数下,只有返回要持久化的数据才会生效,此处必须返回userInfo和companyInfo
		return {
			userInfo,
			companyInfo,
			setUserInfo,
			getUserInfo,
			getToken,
			setCompanyInfo,
			getCompanyInfo,
			logout,
		};
	},
	{
		persist: true,
	}
);
