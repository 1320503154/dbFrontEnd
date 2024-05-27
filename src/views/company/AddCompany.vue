<template>
	<div>
		<el-button
			type="primary"
			@click="dialog = true"
			>新建公司</el-button
		>

		<el-drawer
			v-model="dialog"
			title="新建公司"
			:before-close="handleClose"
			direction="ltr"
			class="demo-drawer">
			<div class="demo-drawer__content">
				<el-form
					:model="form"
					:rules="rules"
					ref="formRef"
					label-width="120px">
					<el-form-item
						label="公司姓名"
						prop="companyName">
						<el-input
							v-model="form.companyName"
							autocomplete="off" />
					</el-form-item>
					<el-form-item
						label="公司介绍"
						prop="companyIntro">
						<el-input
							v-model="form.companyIntro"
							type="textarea" />
					</el-form-item>
					<el-form-item
						label="联系人姓名"
						prop="contactName">
						<el-input
							v-model="form.contactName"
							autocomplete="off" />
					</el-form-item>
					<el-form-item
						label="联系手机"
						prop="contactPhone">
						<el-input
							v-model="form.contactPhone"
							autocomplete="off" />
					</el-form-item>
					<el-form-item
						label="电子邮箱"
						prop="email">
						<el-input
							v-model="form.email"
							autocomplete="off" />
					</el-form-item>
					<el-form-item
						label="地址"
						prop="address">
						<el-input
							v-model="form.address"
							autocomplete="off" />
					</el-form-item>
					<el-form-item
						label="网站"
						prop="website">
						<el-input
							v-model="form.website"
							autocomplete="off" />
					</el-form-item>
				</el-form>
				<div class="demo-drawer__footer">
					<el-button @click="cancelForm">取消</el-button>
					<el-button
						type="primary"
						:loading="loading"
						@click="submitForm">
						{{ loading ? "提交中 ..." : "提交" }}
					</el-button>
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive } from "vue";
	import { ElMessageBox, ElMessage } from "element-plus";
	import LHG from "@/utils/axios";
	import AddCompany from "@/views/company/AddCompany.vue";

	const dialog = ref(false);
	const loading = ref(false);

	const form = reactive({
		companyName: "龙腾建筑有限公司",
		companyIntro:
			"龙腾建筑有限公司是一家专业的建筑公司，拥有丰富的建筑经验和雄厚的技术实力。我们致力于为客户提供优质的建筑服务，帮助客户建造梦想家园。",
		contactName: "杨十一",
		contactPhone: "13111111111",
		email: "yangshiyi@longteng.com",
		address: "中国深圳市福田区中心区1号",
		website: "https://www.longteng.com/",
	});

	const rules = {
		companyName: [
			{ required: true, message: "请输入公司名称", trigger: "blur" },
		],
		contactName: [
			{ required: true, message: "请输入联系人姓名", trigger: "blur" },
		],
		contactPhone: [
			{ required: true, message: "请输入联系电话", trigger: "blur" },
		],
		email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
		address: [{ message: "请输入地址", trigger: "blur" }],
		website: [{ message: "请输入网站", trigger: "blur" }],
	};

	const formRef = ref(null);
	let timer;

	const submitForm = () => {
		formRef.value.validate((valid) => {
			if (valid) {
				loading.value = true;
				LHG.post("/api/company/insert", form)
					.then((res) => {
						loading.value = false;
						console.log("AddCompany::submitForm", res);
						if (res.code === 1) {
							ElMessage({
								message: "操作成功",
								type: "success",
								duration: 1500,
							});
							dialog.value = false;
						} else {
							ElMessage({
								message: res.data.message || "操作失败",
								type: "error",
								duration: 1500,
							});
						}
					})
					.catch(() => {
						loading.value = false;
						ElMessage({
							message: "请求失败",
							type: "error",
							duration: 1500,
						});
					});
			} else {
				ElMessage({
					message: "请填写必填项",
					type: "error",
					duration: 1500,
				});
			}
		});
	};

	const handleClose = (done) => {
		if (loading.value) {
			ElMessageBox.confirm("确认关闭？")
				.then(() => {
					done();
				})
				.catch(() => {});
		} else {
			done();
		}
	};

	const cancelForm = () => {
		loading.value = false;
		dialog.value = false;
		clearTimeout(timer);
	};
</script>

<style scoped>
	.demo-drawer__content {
		padding: 20px;
	}

	.demo-drawer__footer {
		display: flex;
		justify-content: flex-end;
		padding-top: 20px;
	}
</style>
