<template>
	<div>
		<!-- 搜索表单 -->
		<el-form
			inline
			@submit.prevent="getDataList"
			:model="searchForm">
			<el-form-item>
				<el-input
					v-model="searchForm.idNumber"
					placeholder="请输入身份证号码"
					clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					@click="getDataList"
					>查询</el-button
				>
			</el-form-item>
		</el-form>
		<el-button
			type="danger"
			@click="deleteHandle"
			:disabled="dataListSelections.length <= 0"
			>批量删除</el-button
		>

		<!-- <addApplicationDrow></addApplicationDrow> -->
		<!-- 表格 -->
		<el-table
			:data="formattedDataList"
			style="width: 100%"
			@selection-change="selectionChangeHandle">
			<el-table-column
				type="selection"
				width="50"></el-table-column>
			<el-table-column
				prop="applyId"
				label="申请ID"></el-table-column>
			<el-table-column
				prop="applicationTime"
				label="应聘时间"></el-table-column>
			<el-table-column
				prop="reviewTime"
				label="审核时间"></el-table-column>
			<el-table-column
				prop="reviewResult"
				label="审核结果"></el-table-column>

			<el-table-column
				prop="idNumber"
				label="身份证号码"></el-table-column>
			<el-table-column
				prop="jobId"
				label="职位ID"></el-table-column>
			<el-table-column
				prop="jobName"
				label="职位名称"></el-table-column>
		</el-table>

		<!-- 分页 -->
		<el-pagination
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
			:current-page="pageIndex"
			:page-sizes="[10, 20, 50, 100]"
			:page-size="pageSize"
			:total="totalPage"
			layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>
	</div>
</template>

<script setup>
	import { ref, reactive, onMounted, computed } from "vue";
	import { ElMessage, ElMessageBox } from "element-plus";
	import axios from "axios";
	import { useDataStore } from "@/stores/data.js";
	import LHG from "@/utils/axios";

	const dataStore = useDataStore();
	const jobInfo = dataStore.getPositionData();

	const searchForm = reactive({
		idNumber: "",
	});
	const dataList = ref([]);
	const dataListSelections = ref([]);
	const pageIndex = ref(1);
	const pageSize = ref(10);
	const totalPage = ref(0);

	// 构建jobId到jobName的映射
	const jobMap = {};
	jobInfo &&
		jobInfo.forEach((job) => {
			jobMap[job.jobId] = job.jobName;
		});

	// 为dataList添加职位名称
	const formattedDataList = computed(() => {
		return dataList.value.map((item) => {
			return {
				...item,
				jobName: jobMap[item.jobId] || "未知职位",
			};
		});
	});

	const getDataList = () => {
		LHG.get("/api/application-review/page", {
			params: {
				pageIndex: pageIndex.value,
				pageSize: pageSize.value,
				idNumber: searchForm.idNumber,
			},
		}).then((res) => {
			if (res.data && res.code === 1) {
				ElMessage({
					message: "查询成功",
					type: "success",
				});
				dataList.value = res.data.records;
				totalPage.value = res.data.total;
			} else {
				ElMessage({
					message: "查询失败",
					type: "error",
				});
			}
		});
	};

	const deleteHandle = () => {
		let ids = dataListSelections.value.map((item) => item.applyId);
		// console.log("In ViewApplication.vue ids::: ", ids);//[ 17 ]

		ElMessageBox.confirm("确定对所选项进行[删除]操作?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(() => {
				Promise.all(
					ids.map((applyId) => {
						return LHG({
							url: `http://10.33.15.104:8084/api/application-review/${applyId}?applyId=${applyId}`,
							method: "delete",
						});
					})
				)
					.then((results) => {
						// console.log("In ViewApplication.vue results::: ", results);// [ { code: 1, message: '操作成功！', data: '删除成功' } ]
						let allSuccess = results.every((res) => res.data && res.code === 1);
						if (allSuccess) {
							ElMessage({
								message: "操作成功",
								type: "success",
								duration: 1500,
							});
							getDataList();
						} else {
							ElMessage({
								message: "操作失败，部分项未能删除",
								type: "error",
								duration: 1500,
							});
						}
					})
					.catch((error) => {
						ElMessage({
							message: "操作失败",
							type: "error",
							duration: 1500,
						});
					});
			})
			.catch(() => {});
	};

	const selectionChangeHandle = (val) => {
		dataListSelections.value = val;
		console.log(dataListSelections.value);
	};

	const sizeChangeHandle = (val) => {
		pageSize.value = val;
		pageIndex.value = 1;
		getDataList();
	};

	const currentChangeHandle = (val) => {
		pageIndex.value = val;
		getDataList();
	};

	onMounted(() => {
		getDataList();
	});
</script>
