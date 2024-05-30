import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig((command, mode) => {
	let commandEnv = command;

	return {
		plugins: [vue(), VueDevTools(), legacy()],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		server: {
			proxy: {
				// 选项写法
				"/api": {
					target: "http://localhost:8084/", // 目标地址
					// target: "http://10.33.15.104:8084", // 目标地址 -- 后端
					changeOrigin: true, // 开启代理，在本地创建一个虚拟服务器，然后发送请求的数据，同时会收到请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
					rewrite: (path) => path.replace(/^\/api/, ""), // 路径重写，移除路径中的/api
				},
			},
		},
	};
});
