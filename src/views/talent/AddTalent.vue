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
			label="身份证号码"
			prop="idNumber">
			<el-input
				placeholder="此处输入你的身份证"
				v-model="ruleForm.idNumber" />
		</el-form-item>

		<el-form-item
			label="姓名"
			prop="name">
			<el-input v-model="ruleForm.name" />
		</el-form-item>

		<el-form-item
			label="性别"
			prop="gender">
			<el-select
				v-model="ruleForm.gender"
				placeholder="请选择你的性别">
				<el-option
					label="女"
					value="女" />
				<el-option
					label="男"
					value="男" />
			</el-select>
		</el-form-item>

		<el-form-item
			label="生日日期"
			prop="birthDate">
			<el-date-picker
				v-model="ruleForm.birthDate"
				type="date"
				placeholder="选择一个日期"
				style="width: 100%" />
		</el-form-item>

		<el-form-item
			label="有效邮箱"
			prop="email">
			<el-input
				placeholder="支持qq邮箱和Google邮箱"
				v-model="ruleForm.email" />
		</el-form-item>

		<el-form-item
			label="手机号码"
			prop="phoneNumber">
			<el-input
				placeholder="请输入有效的手机号码"
				v-model="ruleForm.phoneNumber" />
		</el-form-item>

		<el-form-item>
			<el-button
				type="primary"
				@click="submitForm(ruleFormRef)"
				>添加人才</el-button
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
	import { reactive, ref } from "vue";
	import LHG from "@/utils/axios";
	const formSize = ref("default");
	const ruleFormRef = ref();
	const ruleForm = reactive({
		userId: 1,
		idNumber: "130000000001234567",
		name: "张三",
		gender: "男",
		birthDate: "",
		email: "1320503154@qq.com",
		phoneNumber: "13772763778",
	});

	const rules = reactive({
		idNumber: [
			{
				required: true,
				message: "请输入你的身份证",
				trigger: "blur",
			},
		],
		name: [
			{
				required: true,
				message: "请输入你的姓名",
				trigger: "blur",
			},
		],
		gender: [
			{
				required: true,
				message: "请选择你的性别",
				trigger: "change",
			},
		],
		birthDate: [
			{
				type: "date",
				required: true,
				message: "请选择一个日期",
				trigger: "change",
			},
		],
		email: [
			{
				required: true,
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
	});

	const submitForm = async (formEl) => {
		if (!formEl) return;
		await formEl.validate((valid, fields) => {
			if (valid) {
				console.log("submit!", ruleForm);
				LHG({
					url: "/api/talent/add",
					method: "post",
					data: ruleForm,
				})
					.then(({ data }) => {
						console.log("In AddTalent.vue data::: ", data);
					})
					.catch((error) => {
						console.log("In AddTalent.vue error::: ", error);
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
