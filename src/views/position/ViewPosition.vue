<template>
	<div>
		<!-- 搜索表单 -->
		<el-form
			inline
			:model="searchForm"
			@submit.prevent="getDataList">
			<el-form-item>
				<el-input
					v-model="searchForm.jobName"
					placeholder="请输入职位名"
					clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList">查询</el-button>
			</el-form-item>
		</el-form>

		<!-- 表格 -->
		<el-table
			:data="dataList"
			style="width: 100%"
			@selection-change="handleSelectionChange">
			<el-table-column
				type="selection"
				width="50"></el-table-column>
			<el-table-column
				prop="jobName"
				label="职位名"></el-table-column>
			<el-table-column
				prop="jobDescription"
				label="职位描述"></el-table-column>
			<el-table-column
				prop="numberRequired"
				label="需求人数"></el-table-column>
			<el-table-column
				label="操作"
				fixed="right"
				width="150">
				<template #default="scope">
					<el-button
						link
						size="small"
						@click="editJob(scope.row)"
						>修改</el-button
					>
					<el-button
						link
						size="small"
						@click="showDetails(scope.row.jobId)"
						>查看</el-button
					>
					<el-button
						link
						size="small"
						@click="handleDelete(scope.row.jobName, scope.row.companyId)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="pageIndex"
			:page-sizes="[10, 20, 50, 100]"
			:page-size="pageSize"
			:total="totalPage"
			layout="total, sizes, prev, pager, next, jumper"></el-pagination>

		<!-- 编辑对话框 -->
		<el-dialog
			v-model="visible"
			title="修改职位信息"
			@close="handleClose">
			<el-form :model="form">
				<el-form-item
					label="职位名"
					:label-width="formLabelWidth">
					<el-input
						v-model="form.jobName"
						disabled />
				</el-form-item>
				<el-form-item
					label="职位描述"
					:label-width="formLabelWidth">
					<el-input
						v-model="form.jobDescription"
						type="textarea" />
				</el-form-item>
				<el-form-item
					label="需求人数"
					:label-width="formLabelWidth">
					<el-input-number
						v-model="form.numberRequired"
						:min="0" />
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="handleClose">取消</el-button>
				<el-button
					type="primary"
					@click="handleSubmit"
					>确认</el-button
				>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref, reactive, onMounted } from "vue";
	import { ElMessage, ElMessageBox } from "element-plus";
	import LHG from "@/utils/axios.js";

	const searchForm = reactive({
		jobName: "",
	});

	const dataList = ref([]);
	const dataListSelections = ref([]);
	const pageIndex = ref(1);
	const pageSize = ref(10);
	const totalPage = ref(0);
	const visible = ref(false);
	const formLabelWidth = "120px";

	const form = reactive({
		jobName: "",
		jobDescription: "",
		numberRequired: 0,
		companyId: 0,
	});

	const showMessage = (message, type = "success") => {
		ElMessage({
			message,
			type,
			duration: 1500,
		});
	};

	const fetchData = async (url, params = {}) => {
		try {
			const response = await LHG.get(url, { params });
			if (response && response.code === 1) {
				return response.data;
			} else {
				showMessage("操作失败", "error");
				return null;
			}
		} catch (error) {
			showMessage("请求错误", "error");
			return null;
		}
	};

	const getDataList = async () => {
		const data = await fetchData("/api/jobrequirement/page", {
			pageIndex: pageIndex.value,
			pageSize: pageSize.value,
			jobName: searchForm.jobName,
		});
		if (data) {
			showMessage("查询成功");
			dataList.value = data.records;
			totalPage.value = data.total;
		}
	};

	const handleClose = () => {
		visible.value = false;
	};

	const handleSubmit = async () => {
		try {
			const [descRes, numRes] = await Promise.all([
				LHG.post("/api/jobrequirement/update/description", {
					jobName: form.jobName,
					companyId: form.companyId,
					jobDescription: form.jobDescription,
				}),
				LHG.post("/api/jobrequirement/update/numberRequired", {
					jobName: form.jobName,
					companyId: form.companyId,
					numberRequired: form.numberRequired,
				}),
			]);

			if (descRes.code === 1 && numRes.code === 1) {
				showMessage("更新成功");
				visible.value = false;
				getDataList();
			} else {
				showMessage("更新失败", "error");
			}
		} catch (error) {
			showMessage("请求错误", "error");
		}
	};

	const openDialog = (job) => {
		Object.assign(form, job);
		visible.value = true;
	};

	const editJob = (job) => {
		openDialog(job);
	};

	const showDetails = (id) => {
		showMessage(`跳转到详情页面，ID: ${id}`);
		router.push(`/position/detail/${id}`);
	};

	const handleDelete = (jobName, companyId) => {
		ElMessageBox.confirm(`确定删除职位: ${jobName} ?`, "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(async () => {
				const response = await LHG.delete("/api/jobrequirement/delete", {
					params: { jobName, companyId },
				});
				if (response && response.code === 1) {
					showMessage("删除成功");
					getDataList();
				}
			})
			.catch(() => {});
	};

	const handleSelectionChange = (val) => {
		dataListSelections.value = val;
	};

	const handleSizeChange = (val) => {
		pageSize.value = val;
		pageIndex.value = 1;
		getDataList();
	};

	const handleCurrentChange = (val) => {
		pageIndex.value = val;
		getDataList();
	};

	onMounted(getDataList);
</script>
