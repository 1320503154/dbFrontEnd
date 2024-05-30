<template>
	<el-form
		ref="applicationReviewForm"
		:model="applicationReview"
		:rules="rules"
		label-width="100px">
		<!-- <el-form-item
			label="职位"
			prop="jobId">
			<el-select
				v-model="applicationReview.jobId"
				filterable
				placeholder="请选择职位"
				@change="handleJobChange">
				<el-option
					v-for="job in jobList"
					:key="job.jobId"
					:label="job.jobName"
					:value="job.jobId">
				</el-option>
			</el-select>
		</el-form-item> -->
		<el-form-item
			label="身份证号码"
			prop="userId">
			<el-input v-model="applicationReview.userId" />
		</el-form-item>
		<el-form-item
			label="职位ID"
			prop="jobId">
			<el-select
				v-model="applicationReview.jobId"
				filterable
				placeholder="请选择职位"
				@change="handleJobChange">
				<el-option
					v-for="job in jobList"
					:key="job.jobId"
					:label="job.jobName"
					:value="job.jobId">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-button
				type="primary"
				@click="submitForm"
				>提交申请</el-button
			>
			<el-button @click="resetForm">重新提交</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup>
	import { ref, reactive, onMounted } from "vue";
	import { ElMessage } from "element-plus";
	import { useUserStore } from "@/stores/user";
	import LHG from "@/utils/axios";
	import { useUserStore } from "@/stores/user";
	import { useDataStore } from "@/stores/data";

	const userInfo = useUserStore().getUserInfo();
	const dataStore = useDataStore();
	console.log(userInfo);

	const jobList = ref([]);
	const userInfo = useUserStore().getUserInfo();
	// const UserId = computed(() => applicationReview.userId / 7 % 1000);
	// const UserId = ref(applicationReview.userId / 7 % 1000);
	const applicationReview = reactive({
		userId: userInfo.id,
		jobId: null, // 默认为空，用户选择
	});

	const rules = {
		applyId: [{ required: true, message: "请输入申请ID", trigger: "blur" }],
		applicationTime: [
			{ required: true, message: "请选择应聘时间", trigger: "change" },
		],
		reviewTime: [{ message: "请选择审核时间", trigger: "change" }],
		reviewResult: [{ message: "请输入审核结果", trigger: "blur" }],
		reviewStatus: [
			{ required: true, message: "请选择审核状态", trigger: "change" },
		],
		idNumber: [
			{ required: true, message: "请输入身份证号码", trigger: "blur" },
		],
		jobId: [{ required: true, message: "请选择职位", trigger: "change" }],
	};

	const applicationReviewForm = ref(null);

	// 获取职位列表
	const fetchJobList = () => {
		jobList.value = dataStore.getPositionData();
	};

	const handleJobChange = (jobId) => {
		const selectedJob = jobList.value.find((job) => job.jobId === jobId);
		console.log("In AddApplication.vue selectedJob::: ", selectedJob);
	};

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

	onMounted(() => {
		fetchJobList();
	});
</script>
