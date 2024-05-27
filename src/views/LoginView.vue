<template>
	<div class="login">
		<div class="shell">
			<div
				class="container a-container"
				:class="{ 'is-txl': showLoginForm, 'is-z': !transStyle }">
				<form
					class="form"
					id="a-form"
					@submit.prevent>
					<h2 class="form_title title">创建账号</h2>
					<v-sheet
						class="mx-auto"
						width="350">
						<v-form
							fast-fail
							@submit.prevent
							style="background-color: #ecf0f3">
							<v-text-field
								v-model="signupUsername"
								:rules="firstNameRules"
								label="用户名"
								style="border-radius: 8px"></v-text-field>

							<v-text-field
								v-model="signupPassword"
								:rules="lastNameRules"
								label="密码"
								type="password"></v-text-field>

							<div class="mb-2 flex items-center text-sm">
								<el-radio-group
									v-model="radio1"
									class="ml-4">
									<el-radio
										value="0"
										size="large"
										style="margin-right: 20vh"
										>求职者</el-radio
									>
									<el-radio
										value="1"
										size="large"
										>公司 HR</el-radio
									>
								</el-radio-group>
							</div>

							<div class="annui">
								<el-button
									class="mt-2 form_button button"
									type="submit"
									:plain="true"
									@click="signup"
									>注册</el-button
								>
							</div>
						</v-form>
					</v-sheet>
				</form>
			</div>

			<div
				class="container b-container"
				:class="{ 'is-txl': showLoginForm, 'is-z': transStyle }">
				<form
					class="form"
					id="b-form"
					@submit.prevent>
					<h2 class="form_title title">登入账号</h2>
					<input
						type="text"
						class="form_input"
						placeholder="用户名"
						v-model="loginUsername" />
					<input
						type="password"
						class="form_input"
						placeholder="Password"
						v-model="loginPassword" />
					<a class="form_link">忘记密码？</a>
					<button
						class="form_button button submit"
						@click="login">
						登录
					</button>
				</form>
			</div>

			<div
				class="switch"
				id="switch-cnt"
				:class="{ 'is-gx': transStyle, 'is-txr': showLoginForm }">
				<div
					class="switch_circle"
					:class="{ 'is-txr': showLoginForm }"></div>
				<div
					class="switch_circle switch_circle-t"
					:class="{ 'is-txr': showLoginForm }"></div>
				<div
					class="switch_container"
					id="switch-c1"
					:class="{ 'is-hidden': showLoginForm }">
					<h2
						class="switch_title title"
						style="letter-spacing: 0">
						欢迎回来 ！
					</h2>
					<p class="switch_description description">
						已经有账号了嘛，去登入账号来进入奇妙世界吧！！！
					</p>
					<button
						class="switch_button button switch-btn"
						@click="changeStyle">
						登录
					</button>
				</div>

				<div
					class="switch_container"
					id="switch-c2"
					:class="{ 'is-hidden': !showLoginForm }">
					<h2
						class="switch_title title"
						style="letter-spacing: 0">
						你好，朋友 ！
					</h2>
					<p class="switch_description description">
						去注册一个账号，让我们踏入奇妙的旅途！
					</p>
					<button
						class="switch_button button switch-btn"
						@click="changeStyle">
						注册
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, reactive, ref } from "vue";
	import { useRouter } from "vue-router";
	import { ElMessage } from "element-plus";
	import LHG from "@/utils/axios";
	import { useUserStore } from "@/stores/user";

	const radio1 = ref("1");
	onMounted(() => {
		signupUsername.value = "";
		signupPassword.value = "";
		loginUsername.value = "";
		loginPassword.value = "";
	});

	const firstName = ref("");
	const firstNameRules = [
		(value) => {
			if (value?.length >= 2) return true;

			return "用户名必须至少包含2个字符。";
		},
	];

	const lastName = ref("123");
	const lastNameRules = [
		(value) => {
			// if (/[^0-9]/.test(value)) return true;
			if (value?.length >= 5) return true;

			return "密码必须至少包含5个字符。";
		},
	];

	// 跳转路由
	const router = useRouter();

	// 样式切换
	let showLoginForm = ref(false);
	let transStyle = ref(false);
	const changeStyle = () => {
		showLoginForm.value = !showLoginForm.value;
		transStyle.value = !transStyle.value;
		// setTimeout(() => {
		//     transStyle.value = false;
		// }, 1500)
	};

	// 注册所需的用户名和密码
	const signupUsername = ref("");
	const signupPassword = ref("");

	// 登录所需的用户名和密码
	const loginUsername = ref("");
	const loginPassword = ref("");

	// 注册
	const signup = async () => {
		console.log("Signing up...");
		const eUsername = signupUsername.value;
		const ePassword = signupPassword.value;
		const eUserType = radio1.value;
		try {
			const response = await LHG.post("/api/user/register", {
				username: eUsername,
				password: ePassword,
				userType: eUserType
				// status: radio1.value,
			});
			console.log("In LoginView.vue response::: ", response);

			if (response.code == 1) {
				console.log("注册成功");
				// 弹出消息框
				ElMessage({
					message: "恭喜你，注册成功！",
					type: "success",
				});
			} else {
				console.error("注册请求失败");
			}
		} catch (error) {
			console.error("注册请求出错：", error);
		}

		// 清空输入框
		signupUsername.value = "";
		signupPassword.value = "";
	};

	// 登录
	const login = async () => {
		console.log("Logging in...");
		// 获取用户输入的用户名和密码
		const eUsername = loginUsername.value;
		const ePassword = loginPassword.value;

		try {
			const response = await LHG.post("/api/user/login", {
				username: eUsername,
				password: ePassword,
			});
			console.log("In LoginView.vue response::: ", response);
			console.log("In LoginView.vue response::: ", response.data);
			if (response.code == 1) {
				console.log("登录成功");
				const user = response.data;
				useUserStore().setUserInfo(user);
				// 跳转到首页
				router.push("/");
				// 弹出消息框
				ElMessage({
					message: "恭喜你，登录成功！",
					type: "success",
				});
			} else {
				console.error("登录请求失败");
			}
		} catch (error) {
			console.error("登录请求出错：", error);
		}
		// 清空输入框
		loginUsername.value = "";
		loginPassword.value = "";
	};
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		/* 字体无法选中 */
		user-select: none;
	}

	:deep(.v-input__details) {
		background-color: rgb(236, 240, 243);
	}

	.annui {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/* body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
} */
	.login {
		width: 100%;
		/* margin: -20px; */
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		background-color: #ecf0f3;
		color: #a0a5a8;
	}

	.shell {
		position: relative;
		width: 1000px;
		min-width: 1000px;
		min-height: 600px;
		height: 600px;
		padding: 25px;
		background-color: #ecf0f3 !important;
		box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
		border-radius: 12px;
		overflow: hidden;
		margin: 100px auto;
	}

	/* 设置响应式 */
	@media (max-width: 1200px) {
		.shell {
			transform: scale(0.7);
		}
	}

	@media (max-width: 1000px) {
		.shell {
			transform: scale(0.6);
		}
	}

	@media (max-width: 800px) {
		.shell {
			transform: scale(0.5);
		}
	}

	@media (max-width: 600px) {
		.shell {
			transform: scale(0.4);
		}
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		width: 600px;
		height: 100%;
		padding: 25px;
		background-color: #ecf0f3;
		transition: 1.25s;
	}
	.form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.iconfont {
		margin: 0 5px;
		border: rgba(0, 0, 0, 0.5) 2px solid;
		border-radius: 50%;
		font-size: 25px;
		padding: 3px;
		opacity: 0.5;
		transition: 0.1s;
	}
	.iconfont:hover {
		opacity: 1;
		transition: 0.15s;
		cursor: pointer;
	}
	.form_input {
		width: 350px;
		height: 40px;
		margin: 4px 0;
		padding-left: 25px;
		font-size: 13px;
		letter-spacing: 0.15px;
		border: none;
		outline: none;
		background-color: #ecf0f3;
		transition: 0.25s ease;
		border-radius: 8px;
		box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
	}
	.form_input:focus {
		box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
	}
	.form_span {
		margin-top: 30px;
		margin-bottom: 12px;
	}
	.form_link {
		cursor: pointer;
		color: #181818;
		font-size: 15px;
		margin-top: 25px;
		border-bottom: 1px solid #a0a5a8;
		line-height: 2;
	}
	.title {
		font-size: 34px;
		font-weight: 700;
		line-height: 3;
		color: #181818;
		letter-spacing: 10px;
	}
	.description {
		font-size: 14px;
		letter-spacing: 0.25px;
		text-align: center;
		line-height: 1.6;
	}
	.button {
		cursor: pointer;
		width: 180px;
		height: 50px;
		border-radius: 25px;
		margin-top: 50px;
		font-weight: 700;
		font-size: 14px;
		letter-spacing: 1.15px;
		background-color: #4b70e2;
		color: #f9f9f9;
		box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
		border: none;
		outline: none;
	}
	.button:hover {
		background-color: #5f75cc;
		color: white;
	}
	.a-container {
		z-index: 100;
		left: calc(100% - 600px);
	}
	.b-container {
		left: calc(100% - 600px);
		z-index: 0;
	}
	.switch {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 400px;
		padding: 50px;
		z-index: 200;
		transition: 1.25s;
		background-color: #ecf0f3;
		overflow: hidden;
		box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
	}
	.switch_circle {
		position: absolute;
		width: 500px;
		height: 500px;
		border-radius: 50%;
		background-color: #ecf0f3;
		box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
		bottom: -60%;
		left: -60%;
		transition: 1.25s;
	}
	.switch_circle-t {
		top: -30%;
		left: 60%;
		width: 300px;
		height: 300px;
	}
	.switch_container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: absolute;
		width: 400px;
		padding: 50px 55px;
		transition: 1.25s;
	}
	.switch_button {
		cursor: pointer;
	}
	.switch_button:hover,
	.submit:hover {
		box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
		transform: scale(0.985);
		transition: 0.25s;
	}
	.switch_button:active,
	.switch_button:focus {
		box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
		transform: scale(0.97);
		transition: 0.25s;
	}
	.is-txr {
		left: calc(100% - 400px);
		transition: 1.25s;
		transform-origin: left;
	}
	.is-txl {
		left: 0;
		transition: 1.25s;
		transform-origin: right;
	}
	.is-z {
		z-index: 200;
		transition: 1.25s;
	}
	.is-hidden {
		visibility: hidden;
		opacity: 0;
		position: absolute;
		transition: 1.25s;
	}
	.is-gx {
		animation: is-gx 1.25s;
	}
	@keyframes is-gx {
		0%,
		10%,
		100% {
			width: 400px;
		}
		30%,
		50% {
			width: 500px;
		}
	}
</style>
