import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore(
	"user",
	() => {
		const userInfo = ref({});
		function setUserInfo(info) {
			userInfo.value = info;
		}
		function getUserInfo() {
			return userInfo.value;
		}
		function getToken() {
			return userInfo.value.token;
		}
		return { userInfo, setUserInfo, getUserInfo, getToken };
	},
	{
		persist: true,
	}
);
