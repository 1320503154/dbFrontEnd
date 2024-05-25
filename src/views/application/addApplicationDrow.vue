<template>
	<div>
		<el-button
			type="primary"
			@click="dialog = true"
			>新建职位</el-button
		>

		<el-drawer
			v-model="dialog"
			title="新建职位需求"
			direction="ltr"
			class="demo-drawer">
			<div class="demo-drawer__content">
				<el-form
					:model="applicationReview"
					:rules="rules"
					ref="applicationReviewForm"
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
				</el-form>
				<div class="demo-drawer__footer">
					<el-button @click="cancelForm">取消</el-button>
					<el-button
						type="primary"
						:loading="loading"
						@click="submitForm"
						>{{ loading ? "提交中 ..." : "提交" }}</el-button
					>
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script setup>
	import { ref, reactive } from "vue";
	import { ElMessage } from "element-plus";
	import LHG from "@/utils/axios";

	const dialog = ref(false);
	const loading = ref(false);

	const applicationReview = reactive({
		applicationTime: "",
		reviewTime: "",
		reviewResult: "申请通过",
		reviewStatus: 0,
		idNumber: "641218201312286200",
		jobId: 11,
	});

	const rules = {
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
				loading.value = true;
				LHG.post("/api/application-review/insert", applicationReview)
					.then((response) => {
						loading.value = false;
						if (response.code === 1) {
							ElMessage({
								message: "提交成功",
								type: "success",
								duration: 1500,
							});
							dialog.value = false;
						} else {
							ElMessage({
								message: response.message || "提交失败",
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

	const cancelForm = () => {
		loading.value = false;
		dialog.value = false;
		applicationReviewForm.value.resetFields();
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
