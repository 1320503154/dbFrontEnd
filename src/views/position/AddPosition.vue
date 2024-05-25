<template>
	<div>
		<el-button
			type="primary"
			@click="dialog = true"
			>新建职位需求</el-button
		>

		<el-drawer
			v-model="dialog"
			title="新建职位需求"
			direction="ltr"
			class="demo-drawer">
			<div class="demo-drawer__content">
				<el-form
					:model="form"
					:rules="rules"
					ref="formRef"
					label-width="120px">
					<el-form-item
						label="职位名称"
						prop="jobName">
						<el-input
							v-model="form.jobName"
							autocomplete="off" />
					</el-form-item>
					<el-form-item
						label="职位描述"
						prop="jobDescription">
						<el-input
							v-model="form.jobDescription"
							type="textarea" />
					</el-form-item>
					<el-form-item
						label="需求人数"
						prop="numberRequired">
						<el-input
							v-model="form.numberRequired"
							autocomplete="off" />
					</el-form-item>
					<el-form-item
						label="公司ID"
						prop="companyId">
						<el-input
							v-model="form.companyId"
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

	defineEmits(["refreshDataList"]);

	const dialog = ref(false);
	const loading = ref(false);

	const form = reactive({
		jobName: "",
		jobDescription: "",
		numberRequired: 1,
		companyId: 1,
	});

	const rules = {
		jobName: [{ required: true, message: "请输入职位名称", trigger: "blur" }],
		jobDescription: [
			{ required: true, message: "请输入职位描述", trigger: "blur" },
		],
		numberRequired: [
			{ required: true, message: "请输入需求人数", trigger: "blur" },
		],
		companyId: [{ required: true, message: "请输入公司ID", trigger: "blur" }],
	};

	const formRef = ref(null);
	let timer;

	const submitForm = () => {
		formRef.value.validate((valid) => {
			if (valid) {
				loading.value = true;
				LHG.post("/api/jobrequirement/insert", form)
					.then((response) => {
						loading.value = false;
						if (response.code === 1) {
							ElMessage({
								message: "操作成功",
								type: "success",
								duration: 1500,
							});
							dialog.value = false;
						} else {
							ElMessage({
								message: response.message || "操作失败",
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
