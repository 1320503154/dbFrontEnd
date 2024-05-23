import axios from "axios";
const { VITE_APP_URL, VITE_APP_TIMEOUT } = import.meta.env;
const LHG = axios.create({
	baseURL: VITE_APP_URL, //baseURL='http://127.0.0.1:8084/api'
	timeout: VITE_APP_TIMEOUT,
});
LHG.interceptors.request.use(
	(config) => {
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
