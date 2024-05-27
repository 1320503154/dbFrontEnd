import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";

export const useUserStore = defineStore(
	"user",
	() => {
		const userInfo = ref({});
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
			return userInfo.value.token;
		}
		function logout() {
			userInfo.value = {};
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
