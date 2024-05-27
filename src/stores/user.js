import { ref, computed } from "vue";
import { defineStore } from "pinia";

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
		return {
			setUserInfo,
			getUserInfo,
			getToken,
			setCompanyInfo,
			getCompanyInfo,
		};
	},
	{
		persist: true,
	}
);
