<template>
	<div>
		<!-- 搜索表单 -->
		<el-form
			:inline="true"
			:model="searchForm">
			<el-form-item>
				<!-- 输入框 -->
				<el-input
					v-model="searchForm.companyName"
					placeholder="请输入公司名"
					clearable></el-input>
			</el-form-item>
			<el-form-item>
				<!-- 查询按钮 -->
				<el-button @click="getDataList">查询</el-button>
			</el-form-item>
		</el-form>

		<!-- 新建按钮 -->
		<add-company></add-company>
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
				prop="companyId"
				label="公司ID"
				width="100"></el-table-column>
			<el-table-column
				prop="companyName"
				label="公司名"></el-table-column>
			<el-table-column
				prop="contactName"
				label="联系人"></el-table-column>
			<el-table-column
				prop="contactPhone"
				label="联系电话"></el-table-column>
			<el-table-column
				prop="address"
				label="地址"></el-table-column>
			<el-table-column
				prop="companyIntro"
				label="公司简介"></el-table-column>
			<el-table-column
				label="操作"
				fixed="right"
				width="150">
				<template #default="scope">
					<!-- 操作按钮 -->
					<el-button
						link
						size="small"
						@click="updateData(scope.row.companyId)"
						>修改</el-button
					>
					<el-button
						link
						size="small"
						@click="showDetails(scope.row.companyId)"
						>查看</el-button
					>
					<el-button
						link
						size="small"
						@click="deleteHandle(scope.row.companyName, scope.row.companyId)"
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
	import { ref, reactive, onMounted } from "vue";
	import { useRouter } from "vue-router";
	import LHG from "@/utils/axios.js";
	import { ElMessage, ElMessageBox } from "element-plus";
	import AddCompany from "@/views/company/AddCompany.vue";
	const router = useRouter();

	const searchForm = reactive({
		companyName: "",
	});

	// 定义响应式数据
	const dataList = ref([]);
	const dataListSelections = ref([]);
	const pageIndex = ref(1);
	const pageSize = ref(10);
	const totalPage = ref(0);

	const getDataList = () => {
		console.log(
			"In ViewCompany.vue searchForm.companyName::: ",
			searchForm.companyName
		);

		LHG({
			method: "get",
			url: "/api/company/page",
			data: {
				pageIndex: pageIndex.value,
				pageSize: pageSize.value,
				companyName: searchForm.companyName,
			},
		}).then((res) => {
			console.info("🚀 ~ file:ViewCompany.vue method: line:122 -----", res);

			if (res && res.code === 1) {
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

	const updateData = (id) => {
		// 跳转到修改页面
		ElMessage({
			message: `跳转到修改页面，ID: ${id}`,
			type: "success",
			duration: 1500,
		});
		router.push(`/company/edit/${id}`);
	};

	const showDetails = (id) => {
		// 展示详情
		ElMessage({
			message: `跳转到详情页面，ID: ${id}`,
			type: "success",
			duration: 1500,
		});
		router.push(`/company/detail/${id}`);
	};

	const deleteSelectionsHandle = () => {
		//   批量删除
		ElMessageBox.confirm("确定对所选项进行[删除]操作?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(() => {
				const ids = dataListSelections.value.map((item) => item.companyId);
				LHG({
					method: "delete",
					url: "/api/company/delete",
					data: {
						companyIds: ids,
					},
				}).then((res) => {
					if (res && res.code === 1) {
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

	const deleteHandle = (companyName, companyId) => {
		// 单个删除
		ElMessageBox.confirm(`确定删除公司: ${companyName} ?`, "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(() => {
				LHG({
					method: "delete",
					url: `/api/company/delete`,
					params: {
						companyName: companyName,
					},
				}).then((res) => {
					if (res && res.code === 1) {
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
		dataListSelections.value = val;
	};

	const sizeChangeHandle = (val) => {
		// 处理分页大小变化
		pageSize.value = val;
		pageIndex.value = 1;
		getDataList();
	};

	const currentChangeHandle = (val) => {
		// 处理当前页变化
		pageIndex.value = val;
		getDataList();
	};

	onMounted(() => {
		// 组件挂载时获取数据
		getDataList();
	});
</script>
