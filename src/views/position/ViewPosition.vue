<template>
	<div>
		<!-- 搜索表单 -->
		<el-form
			:inline="true"
			:model="searchForm">
			<el-form-item>
				<!-- 输入框 -->
				<el-input
					v-model="searchForm.jobName"
					placeholder="请输入职位名"
					clearable></el-input>
			</el-form-item>
			<el-form-item>
				<!-- 查询按钮 -->
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>

		<!-- 新建按钮 -->
		<add-position @refresh-data-list="getDataList()"></add-position>
		<!-- 批量删除按钮 -->
		<el-button
			type="danger"
			@click="deleteSelectionsHandle"
			:disabled="dataListSelections.length <= 0"
			>批量删除</el-button
		>

		<!-- 表格 -->
		<el-table
			:data="dataList"
			style="width: 100%"
			@selection-change="selectionChangeHandle">
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
					<!-- 操作按钮 -->
					<el-button
						link
						size="small"
						@click="UpdateData(scope.row.jobId)"
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
						@click="deleteHandle(scope.row.jobName, scope.row.companyId)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<el-pagination
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
			:current-page="pageIndex"
			:page-sizes="[10, 20, 50, 100]"
			:page-size="pageSize"
			:total="totalPage"
			layout="total, sizes, prev, pager, next, jumper"></el-pagination>
	</div>
</template>

<script setup>
	import { ref, reactive, onMounted, nextTick } from "vue";
	import { useRouter } from "vue-router";
	import axios from "axios";
	import LHG from "@/utils/axios.js";
	import { ElMessage, ElMessageBox } from "element-plus";
	import AddPosition from "@/views/position/AddPosition.vue";
	const router = useRouter();

	const searchForm = reactive({
		jobName: "",
	});

	// 定义响应式数据dataList，用于存储列表数据
	const dataList = ref([]);
	// 定义响应式数据dataListSelections，用于存储列表中选中的数据
	const dataListSelections = ref([]);
	// 定义响应式数据pageIndex，用于存储当前页码
	const pageIndex = ref(1);
	// 定义响应式数据pageSize，用于存储每页显示条数
	const pageSize = ref(10);
	// 定义响应式数据totalPage，用于存储总页数
	const totalPage = ref(0);
	// 定义响应式数据addOrUpdateVisible，用于控制新增或编辑模态框的显示与隐藏
	const addOrUpdateVisible = ref(false);

	const getDataList = () => {
		LHG({
			method: "get",
			url: "/api/jobrequirement/page",
			params: {
				pageIndex: pageIndex.value,
				pageSize: pageSize.value,
				jobName: searchForm.jobName,
			},
		}).then((res) => {
			console.info("🚀 ~ file:ViewPosition.vue method: line:130 -----", res);

			if (res && res.code == 1) {
				dataList.value = res.data.records;
				totalPage.value = res.data.total;
			} else {
				ElMessage({
					message: "操作失败",
					type: "error",
					duration: 1500,
				});
			}
		});
	};

	const addData = () => {
		// 处理新增操作
		ElMessage({
			message: "跳转到新增页面",
			type: "success",
			duration: 1500,
		});
		router.push("/position/add");
	};
	const addOrUpdateHandle = (id) => {
		console.info(
			"🚀 ~ file:ViewPosition.vue method:addOrUpdateHandle line:149 -----",
			id
		);
	};

	const showDetails = (id) => {
		console.info(
			"🚀 ~ file:ViewPosition.vue method:addOrUpdateHandle line:149 -----",
			id
		);
	};
	const deleteSelectionsHandle = () => {
		console.info(
			"🚀 ~ file:ViewPosition.vue method:deleteSelectionsHandle line:151 -----",
			dataListSelections.value
		);
	};
	const deleteHandle = (jobName, companyId) => {
		// 处理删除操作
		ElMessageBox.confirm("确定对所选项进行[删除]操作?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(() => {
				LHG({
					method: "delete",
					url: "/api/jobrequirement/delete",
					params: {
						jobName: jobName,
						companyId: companyId,
					},
				}).then((res) => {
					if (res && res.code == 1) {
						ElMessage({
							message: "操作成功",
							type: "success",
							duration: 1500,
						});
						getDataList();
					}
				});
			})
			.catch(() => {});
	};

	const selectionChangeHandle = (val) => {
		// 处理表格选择事件
		console.info(
			"🚀 ~ file:ViewPosition.vue method:selectionChangeHandle line:183 -----",
			val
		);
		dataListSelections.value = val;
	};

	const sizeChangeHandle = (val) => {
		// 处理分页大小变化
		console.info(
			"🚀 ~ file:ViewPosition.vue method:sizeChangeHandle line:189 -----",
			val
		);
		pageSize.value = val;
		pageIndex.value = 1;
		getDataList();
	};

	const currentChangeHandle = (val) => {
		// 处理当前页变化
		console.info(
			"🚀 ~ file:ViewPosition.vue method:currentChangeHandle line:197 -----",
			val
		);
		pageIndex.value = val;
		getDataList();
	};

	onMounted(() => {
		// 组件挂载时获取数据
		getDataList();
	});
</script>
