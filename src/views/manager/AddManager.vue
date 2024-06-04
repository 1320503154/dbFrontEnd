<template>
	<el-form
		ref="ruleFormRef"
		style="max-width: 600px"
		:model="ruleForm"
		:rules="rules"
		label-width="auto"
		class="demo-ruleForm"
		:size="formSize"
		status-icon>
		<el-form-item
			label="姓名"
			prop="name">
			<el-input v-model="ruleForm.name" />
		</el-form-item>

		<el-form-item
			label="手机号码"
			prop="phoneNumber">
			<el-input
				placeholder="请输入有效的手机号码"
				v-model="ruleForm.phoneNumber" />
		</el-form-item>

		<el-form-item
			label="有效邮箱"
			prop="email">
			<el-input
				placeholder="支持qq邮箱和Google邮箱"
				v-model="ruleForm.email" />
		</el-form-item>

		<el-form-item
			label="公司ID"
			prop="companyId">
			<el-input
				placeholder="输入公司对应ID"
				v-model="ruleForm.companyId" />
		</el-form-item>

		<el-form-item>
			<el-button
				type="primary"
				@click="submitForm(ruleFormRef)"
				>添加负责人</el-button
			>
			<el-button @click="resetForm(ruleFormRef)">重新提交</el-button>
		</el-form-item>
	</el-form>
</template>
<style lang="scss" scoped>
	.demo-ruleForm {
		margin-left: 20vw;
		margin-top: 20vh;
	}
</style>
<script setup>
	import { onMounted, reactive, ref } from "vue";
	import { ElMessage } from "element-plus";
	import { useUserStore } from "@/stores/user";
	import LHG from "@/utils/axios";
	import { getManagerList } from "@/api/manager";

	const userInfo = useUserStore().getUserInfo();
	const formSize = ref("default");
	const ruleFormRef = ref();
	const ruleForm = reactive({
		userId: userInfo.id,
		name: "张三",
		email: "1320503154@qq.com",
		phoneNumber: "13772763778",
		companyId: 1,
	});

	const rules = reactive({
		name: [
			{
				required: true,
				message: "请输入你的姓名",
				trigger: "blur",
			},
		],
		email: [
			{
				// required: true,
				message: "请输入有效邮箱",
				trigger: "blur",
			},
		],
		phoneNumber: [
			{
				required: true,
				message: "请输入有效的11位手机号码", //13772763778
				trigger: "blur",
			},
		],
		companyId: [
			{
				required: true,
				message: "请输入有效的公司id",
				trigger: "blur",
			},
		],
	});

	const submitForm = async (formEl) => {
		if (!formEl) return;
		await formEl.validate((valid, fields) => {
			if (valid) {
				console.log("submit!", ruleForm);
				LHG({
					url: "/api/responsibleperson/add",
					method: "post",
					data: ruleForm,
				})
					.then(({ data }) => {
						console.log("In AddResponsibleperson.vue data::: ", data);
						// 弹出消息框
						ElMessage({
							message: "添加成功！",
							type: "success",
						});
					})
					.catch((error) => {
						console.log("In AddResponsibleperson.vue error::: ", error);
					});
			} else {
				console.log("error submit!", fields);
			}
		});
	};

	const resetForm = (formEl) => {
		if (!formEl) return;
		formEl.resetFields();
	};
</script>
