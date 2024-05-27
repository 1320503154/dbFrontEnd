<template>
	<div>
		<!-- 搜索表单 -->
		<el-form
			:inline="true"
			:model="searchForm">
			<el-form-item>
				<!-- 输入框 -->
				<el-input
					v-model="searchForm.name"
					placeholder="请输入负责人姓名"
					clearable></el-input>
			</el-form-item>
			<el-form-item>
				<!-- 查询按钮 -->
				<el-button @click="getDataList">查询</el-button>
			</el-form-item>
		</el-form>

		<!-- 批量删除按钮 -->
		<el-button
			type="danger"
			@click="deleteSelectionsHandle"
			:disabled="dataListSelections.length <= 0">
			批量删除
		</el-button>

		<!-- 表格 -->
		<el-table
			:data="dataList"
			style="width: 100%"
			@selection-change="selectionChangeHandle">
			<el-table-column
				type="selection"
				width="50"></el-table-column>
			<el-table-column
				prop="name"
				label="负责人姓名"></el-table-column>
			<el-table-column
				prop="phoneNumber"
				label="电话"></el-table-column>
			<el-table-column
				prop="email"
				label="邮箱"></el-table-column>
			<el-table-column
				prop="companyId"
				label="公司ID"></el-table-column>
			<el-table-column
				prop="companyName"
				label="公司姓名"></el-table-column>
			<el-table-column
				label="操作"
				fixed="right"
				width="150">
				<template #default="scope">
					<!-- 操作按钮 -->
					<el-button
						link
						size="small"
						@click="showDetails(scope.row.personId)"
						>查看</el-button
					>
					<el-button
						link
						size="small"
						@click="deleteHandle(scope.row.personId)"
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
	import { ref, reactive, onMounted, onBeforeMount } from "vue";
	import axios from "axios";
	import LHG from "@/utils/axios.js";
	import { ElMessage, ElMessageBox } from "element-plus";
	import { useUserStore } from "@/stores/user";
	const userStore = useUserStore();
	const companyInfo = ref([]);
	// 搜索表单
	const searchForm = reactive({
		name: "",
	});

	// 列表数据
	const dataList = ref([]);
	const dataListSelections = ref([]);
	const pageIndex = ref(1);
	const pageSize = ref(10);
	const totalPage = ref(0);

	// 获取数据列表
	const getDataList = () => {
		LHG({
			method: "get",
			url: "/api/responsibleperson/page",
			params: {
				pageIndex: pageIndex.value,
				pageSize: pageSize.value,
				name: searchForm.name,
			},
		}).then((res) => {
			if (res && res.code == 1) {
				ElMessage({
					message: "查询成功",
					type: "success",
					duration: 1500,
				});
				dataList.value = res.data.records;
				dataList.value.forEach((item) => {
					for (let i = 0; i < companyInfo.value.length; i++) {
						if (item.companyId === companyInfo.value[i].companyId) {
							item.companyName = companyInfo.value[i].companyName;
						}
					}
				});
				totalPage.value = res.data.total;
			} else {
				ElMessage({
					message: "操作失败",
					type: "error",
					duration: 1500,
				});
			}
		});
		console.log(dataList.value);
	};

	// 显示详细信息
	const showDetails = (id) => {
		ElMessage({
			message: `显示详情: ${id}`,
			type: "info",
			duration: 1500,
		});
	};

	// 批量删除
	const deleteSelectionsHandle = () => {
		ElMessageBox.confirm("确定对所选项进行[删除]操作?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(() => {
				ElMessage({
					message: "批量删除成功",
					type: "success",
					duration: 1500,
				});
				// 可以在这里添加实际的删除逻辑
			})
			.catch(() => {});
	};

	// 单个删除
	const deleteHandle = (id) => {
		ElMessageBox.confirm("确定进行[删除]操作?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(() => {
				LHG({
					method: "delete",
					url: `/api/responsibleperson/${id}`,
				}).then((res) => {
					if (res && res.code == 1) {
						ElMessage({
							message: "删除成功",
							type: "success",
							duration: 1500,
						});
						getDataList();
					} else {
						ElMessage({
							message: "删除失败",
							type: "error",
							duration: 1500,
						});
					}
				});
			})
			.catch(() => {});
	};

	// 表格选择变化
	const selectionChangeHandle = (val) => {
		dataListSelections.value = val;
	};

	// 分页大小变化
	const sizeChangeHandle = (val) => {
		pageSize.value = val;
		pageIndex.value = 1;
		getDataList();
	};

	// 当前页变化
	const currentChangeHandle = (val) => {
		pageIndex.value = val;
		getDataList();
	};

	onBeforeMount(() => {
		companyInfo.value = userStore.getCompanyInfo();
		console.log("In ViewManager.vue companyInfo.value::: ", companyInfo.value);

		getDataList();
		dataList.value.forEach((item) => {
			for (let i = 0; i < companyInfo.value.length; i++) {
				if (item.companyId === companyInfo.value[i].companyId) {
					item.companyName = companyInfo.value[i].companyName;
				}
			}
		});
	});
</script>
