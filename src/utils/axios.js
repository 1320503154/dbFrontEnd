import axios from "axios";
import dev from "@/config/dev";
const LHG = axios.create({
	baseURL: dev.apiBaseUrl,
	timeout: dev.timeout,
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
