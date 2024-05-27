<template>
	<div>
		<!-- 搜索表单 -->
		<el-form
			:inline="true"
			@submit.prevent="getDataList"
			:model="searchForm">
			<el-form-item>
				<!-- 输入框 -->
				<el-input
					v-model="searchForm.name"
					placeholder="请输入姓名"
					clearable></el-input>
			</el-form-item>
			<el-form-item>
				<!-- 查询按钮 -->
				<el-button @click="getEducationList">查询</el-button>
			</el-form-item>
		</el-form>

		<!-- 表格 -->
		<el-table
			:data="educationList"
			style="width: 100%">
			<el-table-column
				prop="school_name"
				label="学校名称"></el-table-column>
			<el-table-column
				prop="major"
				label="专业"></el-table-column>
			<el-table-column
				prop="enrollment_date"
				label="入学日期"></el-table-column>
			<el-table-column
				prop="graduation_date"
				label="毕业日期"></el-table-column>
			<el-table-column
				prop="id_number"
				label="身份证号"></el-table-column>
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
	import LHG from "@/utils/axios.js";
	import { ElMessage } from "element-plus";

	// 搜索表单
	const searchForm = reactive({
		name: "",
	});

	// 学历数据
	const educationList = ref([]);
	const pageIndex = ref(1);
	const pageSize = ref(10);
	const totalPage = ref(0);

	// 获取学历列表
	const getEducationList = () => {
		LHG({
			method: "get",
			url: "/api/education/page",
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
				educationList.value = res.data.records;
				totalPage.value = res.data.total;
			} else {
				ElMessage({
					message: "获取数据失败",
					type: "error",
					duration: 1500,
				});
			}
		});
	};

	// 分页大小变化
	const sizeChangeHandle = (val) => {
		pageSize.value = val;
		pageIndex.value = 1;
		getEducationList();
	};

	// 当前页变化
	const currentChangeHandle = (val) => {
		pageIndex.value = val;
		getEducationList();
	};

	onMounted(() => {
		getEducationList();
	});
</script>
