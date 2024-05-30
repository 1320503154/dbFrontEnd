<template>
	<div>
		<el-form
			inline
			@submit.prevent="getDataList"
			:model="searchForm">
			<el-form-item label="学校名称">
				<el-input
					v-model="searchForm.schoolName"
					placeholder="请输入学校名称"
					clearable></el-input>
			</el-form-item>
			<el-form-item label="身份证号">
				<el-input
					v-model="searchForm.idNumber"
					placeholder="请输入身份证号"
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
		<el-table
			:data="enhancedDegreeList"
			style="width: 100%"
			stripe>
			<el-table-column
				prop="schoolName"
				label="学校"
				width="180" />
			<el-table-column
				prop="major"
				label="专业"
				width="180" />
			<el-table-column
				prop="enrollmentDate"
				label="入学时间"
				width="180" />
			<el-table-column
				prop="graduationDate"
				label="毕业时间"
				width="180" />
			<el-table-column
				prop="idNumber"
				label="身份证号"
				width="180" />
			<el-table-column
				prop="name"
				label="姓名"
				width="180" />
			<el-table-column
				label="操作"
				width="180">
				<template #default="scope">
					<el-button
						size="mini"
						@click="handleEdit(scope.row)"
						>编辑</el-button
					>
					<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.row.educationId)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
			:current-page="searchForm.pageIndex"
			:page-sizes="[10, 20, 50, 100]"
			:page-size="searchForm.pageSize"
			:total="totalPage"
			layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>

		<el-dialog
			v-model="dialogVisible"
			title="编辑学历"
			width="30%">
			<el-form
				:model="form"
				label-width="80px">
				<el-form-item label="学校">
					<el-input v-model="form.schoolName"></el-input>
				</el-form-item>
				<el-form-item label="专业">
					<el-input v-model="form.major"></el-input>
				</el-form-item>
				<el-form-item label="入学时间">
					<el-date-picker
						v-model="form.enrollmentDate"
						type="date"></el-date-picker>
				</el-form-item>
				<el-form-item label="毕业时间">
					<el-date-picker
						v-model="form.graduationDate"
						type="date"></el-date-picker>
				</el-form-item>
				<el-form-item label="身份证号">
					<el-input
						disabled
						v-model="form.idNumber"></el-input>
				</el-form-item>
			</el-form>
			<span
				slot="footer"
				class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button
					type="primary"
					@click="handleSave"
					>保存</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref, reactive, onMounted, computed } from "vue";
	import LHG from "@/utils/axios";
	import { ElMessage, ElMessageBox } from "element-plus";
	import { useDataStore } from "@/stores/data.js";

	const dataStore = useDataStore();

	const degreeData = reactive({
		degreeList: [],
	});
	const totalPage = ref(0);
	const searchForm = reactive({
		pageIndex: 1,
		pageSize: 10,
		schoolName: "",
		idNumber: "",
	});

	const dialogVisible = ref(false);
	const form = reactive({
		educationId: null,
		schoolName: "",
		major: "",
		enrollmentDate: "",
		graduationDate: "",
		idNumber: "",
	});

	// 获取 talentData
	const talentData = computed(() => dataStore.getTalentData());

	const getDataList = () => {
		LHG.get("/api/education/page", {
			params: searchForm,
		}).then((res) => {
			if (res.code === 1) {
				degreeData.degreeList = res.data.records;
				totalPage.value = res.data.total;
			} else {
				ElMessage.error("数据加载失败");
			}
		});
	};

	// 通过身份证号关联 degreeData 和 talentData
	const enhancedDegreeList = computed(() => {
		return degreeData.degreeList.map((degree) => {
			const talent = talentData.value.find(
				(t) => t.idNumber === degree.idNumber
			);
			return {
				...degree,
				name: talent ? talent.name : "未知",
			};
		});
	});

	const handleDelete = (id) => {
		ElMessageBox.confirm("确定删除该学历信息吗?", "提示", {
			type: "warning",
		}).then(() => {
			LHG.post(`/api/education/delete/${id}`).then((res) => {
				if (res.code === 1) {
					ElMessage.success("删除成功");
					getDataList();
				} else {
					ElMessage.error("删除失败");
				}
			});
		});
	};

	const handleEdit = (row) => {
		Object.assign(form, row);
		dialogVisible.value = true;
	};

	const handleSave = () => {
		if (form.educationId) {
			LHG.post("/api/education/update", form).then((res) => {
				if (res.code === 1) {
					ElMessage.success("更新成功");
					dialogVisible.value = false;
					getDataList();
				} else {
					ElMessage.error("更新失败");
				}
			});
		} else {
			LHG.post("/api/education/insert", form).then((res) => {
				if (res.code === 1) {
					ElMessage.success("插入成功");
					dialogVisible.value = false;
					getDataList();
				} else {
					ElMessage.error("插入失败");
				}
			});
		}
	};
	const sizeChangeHandle = (val) => {
		searchForm.pageSize = val;
		getDataList();
	};
	const currentChangeHandle = (val) => {
		searchForm.pageIndex = val;
		getDataList();
	};
	onMounted(() => {
		getDataList();
	});
</script>

<style scoped>
	.dialog-footer {
		text-align: right;
	}
</style>
