<template>
	<div>
		<el-form
			:inline="true"
			:model="searchForm">
			<el-form-item>
				<el-input
					v-model="searchForm.name"
					placeholder="请输入作物名"
					clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList">查询</el-button>
			</el-form-item>
		</el-form>

		<el-button
			type="primary"
			@click="addOrUpdateHandle"
			size="small"
			>新建</el-button
		>
		<el-button
			type="danger"
			@click="deleteHandle"
			:disabled="dataListSelections.length <= 0"
			>批量删除</el-button
		>

		<el-table
			:data="dataList"
			style="width: 100%"
			@selection-change="selectionChangeHandle">
			<el-table-column
				type="selection"
				width="50"></el-table-column>
			<el-table-column
				prop="cropName"
				label="作物名"></el-table-column>
			<el-table-column
				prop="orderNum"
				label="排序号"></el-table-column>
			<el-table-column
				label="操作"
				fixed="right"
				width="150">
				<template #default="scope">
					<el-button
						type="text"
						size="small"
						@click="addOrUpdateHandle(scope.row.id)"
						>修改</el-button
					>
					<el-button
						type="text"
						size="small"
						@click="showDetails(scope.row.id)"
						>查看</el-button
					>
					<el-button
						type="text"
						size="small"
						@click="deleteHandle(scope.row.id)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
			:current-page="pageIndex"
			:page-sizes="[10, 20, 50, 100]"
			:page-size="pageSize"
			:total="totalPage"
			layout="total, sizes, prev, pager, next, jumper"></el-pagination>

		<AddOrUpdate
			v-if="addOrUpdateVisible"
			ref="addOrUpdate"
			@refreshDataList="getDataList"></AddOrUpdate>
	</div>
</template>

<script setup>
	import { ref, reactive, onMounted, nextTick } from "vue";
	import LHG from "@/utils/axios";
	const searchForm = reactive({
		name: "",
	});

	const dataList = ref([]);
	const dataListSelections = ref([]);
	const pageIndex = ref(1);
	const pageSize = ref(10);
	const totalPage = ref(0);
	const addOrUpdateVisible = ref(false);

	const getDataList = () => {
		LHG({
			url: "/pesticide/crop/list",
			method: "get",
			params: {
				page: pageIndex.value,
				limit: pageSize.value,
				name: searchForm.name,
			},
		}).then(({ data }) => {
			if (data && data.code === 0) {
				dataList.value = data.page.records;
				totalPage.value = data.page.total;
			} else {
				dataList.value = [];
				totalPage.value = 0;
			}
		});
	};

	const addOrUpdateHandle = (id) => {
		addOrUpdateVisible.value = true;
		nextTick(() => {
			addOrUpdateRef.value.init(id);
		});
	};

	const showDetails = (id) => {
		addOrUpdateVisible.value = true;
		nextTick(() => {
			addOrUpdateRef.value.init(id, true);
		});
	};

	const deleteHandle = (id) => {
		let ids = id ? [id] : dataListSelections.value.map((item) => item.id);
		ElMessageBox.confirm("确定对所选项进行[删除]操作?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(() => {
				LHG({
					url: "/pesticide/crop/delete",
					method: "post",
					data: ids,
				}).then(({ data }) => {
					if (data && data.code === 0) {
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
		dataListSelections.value = val;
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

	const addOrUpdateRef = ref(null);

	onMounted(() => {
		getDataList();
	});
</script>
