<template>
	<div>
		<!-- 搜索表单 -->
		<el-form
			:inline="true"
			:model="searchForm">
			<el-form-item>
				<!-- 名字输入框 -->
				<el-input
					v-model="searchForm.name"
					placeholder="请输入姓名"
					clearable></el-input>
			</el-form-item>
			<el-form-item>
				<!-- 身份证号输入框 -->
				<el-input
					v-model="searchForm.idNumber"
					placeholder="请输入身份证号"
					clearable></el-input>
			</el-form-item>
			<el-form-item>
				<!-- 手机号输入框 -->
				<el-input
					v-model="searchForm.phoneNumber"
					placeholder="请输入手机号"
					clearable></el-input>
			</el-form-item>
			<el-form-item>
				<!-- 查询按钮 -->
				<el-button @click="getDataList">查询</el-button>
			</el-form-item>
		</el-form>

		<!-- 新建按钮 -->
		<el-button
			type="primary"
			@click="addTalent"
			>新建</el-button
		>

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
				prop="userId"
				label="ID"
				width="100"></el-table-column>
			<el-table-column
				prop="name"
				label="姓名"></el-table-column>
			<el-table-column
				prop="idNumber"
				label="身份证号"></el-table-column>
			<el-table-column
				prop="phoneNumber"
				label="手机号"></el-table-column>
			<el-table-column
				prop="gender"
				label="性别"></el-table-column
			><el-table-column
				prop="birthDate"
				label="生日"></el-table-column
			><el-table-column
				prop="email"
				label="电子邮箱"></el-table-column>
			<el-table-column
				label="操作"
				fixed="right"
				width="150">
				<template #default="scope">
					<!-- 操作按钮 -->
					<el-button
						link
						size="small"
						@click="updateData(scope.row.userId)"
						>修改</el-button
					>
					<el-button
						link
						size="small"
						@click="showDetails(scope.row.userId)"
						>查看</el-button
					>
					<el-button
						link
						size="small"
						@click="deleteHandle(scope.row.name, scope.row.userId)"
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

	const router = useRouter();

	const searchForm = reactive({
		name: "",
		idNumber: "",
		phoneNumber: "",
	});

	// 定义响应式数据
	const dataList = ref([]);
	const dataListSelections = ref([]);
	const pageIndex = ref(1);
	const pageSize = ref(10);
	const totalPage = ref(0);
	const userINFO = {
		userId: 1,
		idNumber: "32992581308",
		name: "赵伟",
		gender: "F",
		birthDate: "1985-01-24",
		email: "赵伟@qq.com",
		phoneNumber: "1473365997",
	};
	const getDataList = () => {
		if (pageIndex.value < 1) {
			pageIndex.value = 1;
		}
		LHG({
			method: "get",
			url: "/api/talent/page",
			params: {
				pageIndex: pageIndex.value,
				pageSize: pageSize.value,
				name: searchForm.name,
				idNumber: searchForm.idNumber,
				phoneNumber: searchForm.phoneNumber,
			},
		}).then((res) => {
			if (res && res.code === 1) {
				ElMessage({
					message: "查询成功",
					type: "success",
					duration: 1500,
				});
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
		router.push(`/talent/edit/${id}`);
	};

	const showDetails = (id) => {
		// 展示详情
		ElMessage({
			message: `跳转到详情页面，ID: ${id}`,
			type: "success",
			duration: 1500,
		});
		router.push(`/talent/detail/${id}`);
	};

	const deleteSelectionsHandle = () => {
		// 批量删除
		ElMessageBox.confirm("确定对所选项进行[删除]操作?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(() => {
				const ids = dataListSelections.value.map((item) => item.id);
				LHG({
					method: "delete",
					url: "/api/talent/delete",
					data: {
						ids: ids,
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

	const deleteHandle = (name, id) => {
		// 单个删除
		ElMessageBox.confirm(`确定删除人才: ${name} ?`, "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(() => {
				LHG({
					method: "delete",
					url: `/api/talent/delete/${id}`,
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

	const addTalent = () => {
		router.push("/talent/add");
	};

	onMounted(() => {
		// 组件挂载时获取数据
		getDataList();
	});
</script>
