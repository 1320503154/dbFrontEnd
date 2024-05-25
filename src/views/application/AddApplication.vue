<template>
	<el-form
		ref="applicationReviewForm"
		:model="applicationReview"
		:rules="rules"
		label-width="100px">
		<el-form-item
			label="应聘时间"
			prop="applicationTime">
			<el-date-picker
				v-model="applicationReview.applicationTime"
				type="datetime" />
		</el-form-item>
		<el-form-item
			label="审核时间"
			prop="reviewTime">
			<el-date-picker
				v-model="applicationReview.reviewTime"
				type="datetime" />
		</el-form-item>
		<el-form-item
			label="审核结果"
			prop="reviewResult">
			<el-input v-model="applicationReview.reviewResult" />
		</el-form-item>
		<el-form-item
			label="审核状态"
			prop="reviewStatus">
			<el-select v-model="applicationReview.reviewStatus">
				<el-option
					label="未审核"
					:value="0" />
				<el-option
					label="审核通过"
					:value="1" />
				<el-option
					label="审核不通过"
					:value="2" />
			</el-select>
		</el-form-item>
		<el-form-item
			label="身份证号码"
			prop="idNumber">
			<el-input v-model="applicationReview.idNumber" />
		</el-form-item>
		<el-form-item
			label="职位ID"
			prop="jobId">
			<el-input v-model="applicationReview.jobId" />
		</el-form-item>
		<el-form-item>
			<el-button
				type="primary"
				@click="submitForm"
				>提交</el-button
			>
			<el-button @click="resetForm">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup>
	import { ref, reactive } from "vue";
	import { ElMessage } from "element-plus";
	import LHG from "@/utils/axios";

	const applicationReview = reactive({
		applicationTime: "",
		reviewTime: "",
		reviewResult: "申请通过",
		reviewStatus: 0,
		idNumber: "641218201312286200",
		jobId: 11,
	});
	const rules = {
		applyId: [{ required: true, message: "请输入申请ID", trigger: "blur" }],
		applicationTime: [
			{ required: true, message: "请选择应聘时间", trigger: "change" },
		],
		reviewTime: [
			{ required: true, message: "请选择审核时间", trigger: "change" },
		],
		reviewResult: [
			{ required: true, message: "请输入审核结果", trigger: "blur" },
		],
		reviewStatus: [
			{ required: true, message: "请选择审核状态", trigger: "change" },
		],
		idNumber: [
			{ required: true, message: "请输入身份证号码", trigger: "blur" },
		],
		jobId: [{ required: true, message: "请输入职位ID", trigger: "blur" }],
	};

	const applicationReviewForm = ref(null);

	const submitForm = () => {
		applicationReviewForm.value.validate((valid) => {
			if (valid) {
				console.log(
					"In AddApplication.vue applicationReview::: ",
					applicationReview
				);
				LHG.post("/api/application-review/insert", applicationReview)
					.then((response) => {
						console.log("In AddApplication.vue response::: ", response);
						ElMessage({
							message: "提交成功",
							type: "success",
						});
					})
					.catch((error) => {
						ElMessage({
							message: `提交失败${error}`,
							type: "error",
						});
					});
			} else {
				ElMessage({
					message: "请检查表单填写",
					type: "error",
				});
			}
		});
	};

	const resetForm = () => {
		applicationReviewForm.value.resetFields();
	};
</script>
