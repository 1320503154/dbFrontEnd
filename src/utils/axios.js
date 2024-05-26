import router from "@/router";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { ElMessage } from "element-plus";
const { VITE_APP_URL, VITE_APP_TIMEOUT } = import.meta.env;
const LHG = axios.create({
	baseURL: VITE_APP_URL, //baseURL='http://127.0.0.1:8084/api'
	timeout: VITE_APP_TIMEOUT,
});

LHG.interceptors.request.use(
	(config) => {
		const userStore = useUserStore();
		const token = userStore.getToken();
		if (token) {
			config.headers.Authorization = token;
		} else {
			ElMessage.error("请先登录");
			router.push("/login");
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
LHG.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);
export default LHG;
