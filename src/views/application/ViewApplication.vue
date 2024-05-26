<template>
	<div>
		<!-- 搜索表单 -->
		<el-form
			inline
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
			:data="dataList"
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
				prop="reviewStatus"
				label="审核状态"></el-table-column>
			<el-table-column
				prop="idNumber"
				label="身份证号码"></el-table-column>
			<el-table-column
				prop="jobId"
				label="职位ID"></el-table-column>
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
	import { ref, reactive, onMounted } from "vue";
	import addApplicationDrow from "@/views/application/addApplicationDrow.vue";
	import { ElMessage } from "element-plus";
	import LHG from "@/utils/axios";

	// 删除
	const deleteHandle = (id) => {
		// 处理删除操作
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
	
	const searchForm = reactive({
		idNumber: "",
	});

	const dataList = ref([]);
	const dataListSelections = ref([]);
	const pageIndex = ref(1);
	const pageSize = ref(10);
	const totalPage = ref(0);

	const getDataList = () => {
		LHG.get("/api/application-review/page", {
			params: {
				pageIndex: pageIndex.value,
				pageSize: pageSize.value,
				idNumber: searchForm.idNumber,
			},
		}).then((res) => {
			console.log("In ViewApplication.vue res::: ", res);
			if (res.code == 1) {
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

	onMounted(() => {
		getDataList();
	});
</script>
