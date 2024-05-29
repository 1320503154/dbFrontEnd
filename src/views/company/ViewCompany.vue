<template>
	<div>
		<!-- 搜索表单 -->
		<el-form @submit.prevent="getDataList" :inline="true" :model="searchForm">
			<el-form-item>
				<!-- 输入框 -->
				<el-input
					v-model="searchForm.companyName"
					placeholder="请输入公司名"
					clearable
				></el-input>
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
			<el-table-column type="selection" width="50"></el-table-column>
			<el-table-column prop="companyId" label="公司ID" width="100"></el-table-column>
			<el-table-column prop="companyName" label="公司名"></el-table-column>
			<el-table-column prop="contactName" label="联系人"></el-table-column>
			<el-table-column prop="contactPhone" label="联系电话"></el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>
			<el-table-column prop="companyIntro" label="公司简介"></el-table-column>
			<el-table-column prop="website" label="公司网址"></el-table-column>
			<el-table-column label="操作" fixed="right" width="150">
				<template #default="scope">
					<!-- 操作按钮 -->
					<el-button link size="small" @click="updateData(scope.row)">修改</el-button>
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
			layout="total, sizes, prev, pager, next, jumper"
		></el-pagination>

		<!-- 编辑对话框 -->
		<el-dialog v-model="visible" title="修改联系人信息" @close="handleClose">
			<el-form :model="form">
				<el-form-item label="公司名" :label-width="formLabelWidth">
					<el-input v-model="form.companyName" disabled />
				</el-form-item>
				<el-form-item label="联系人" :label-width="formLabelWidth">
					<el-input v-model="form.contactName" />
				</el-form-item>
				<el-form-item label="联系电话" :label-width="formLabelWidth">
					<el-input v-model="form.contactPhone" />
				</el-form-item>
				<el-form-item label="公司网址" :label-width="formLabelWidth">
					<el-input v-model="form.website"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="handleClose">取消</el-button>
				<el-button type="primary" @click="handleSubmit">确认</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import LHG from "@/utils/axios.js";
import { ElMessage, ElMessageBox } from "element-plus";
import AddCompany from "@/views/company/AddCompany.vue";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

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
	if (pageIndex.value < 1) {
		pageIndex.value = 1;
	}
	if (searchForm.companyName === "") {
		searchForm.companyName = null;
	}
	//请求里的data参数是post请求的参数，params是get请求的参数,url查询参数
	LHG({
		method: "get",
		url: "/api/company/page",
		params: {
			pageIndex: pageIndex.value,
			pageSize: pageSize.value,
			companyName: searchForm.companyName,
		},
	}).then((res) => {
		if (res && res.code === 1) {
			ElMessage({
				message: "查询成功",
				type: "success",
				duration: 1500,
			});
			dataList.value = res.data.records;
			userStore.setCompanyInfo(res.data.records);
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

const visible = ref(false);
const formLabelWidth = "120px";
const form = reactive({
	companyName: "",
	contactName: "",
	contactPhone: "",
	website: "",
});

const handleClose = () => {
	visible.value = false;
};

const handleSubmit = () => {
	const updateContactPromise = LHG({
		method: "post",
		url: "/api/company/updateContact",
		data: {
			companyName: form.companyName,
			contactName: form.contactName,
			contactPhone: form.contactPhone,
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});

	const updateWebsitePromise = LHG({
		method: "post",
		url: "/api/company/updateWebsite",
		data: {
			companyName: form.companyName,
			website: form.website,
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});

	Promise.all([updateContactPromise, updateWebsitePromise])
		.then(([contactRes, websiteRes]) => {
			if (contactRes.code === 1 && websiteRes.code === 1) {
				ElMessage({
					message: "更新成功",
					type: "success",
					duration: 1500,
				});
				visible.value = false;
				getDataList();
			} else {
				ElMessage({
					message: "更新失败",
					type: "error",
					duration: 1500,
				});
			}
		})
		.catch(() => {
			ElMessage({
				message: "请求错误",
				type: "error",
				duration: 1500,
			});
		});
};

const updateData = (row) => {
	form.companyName = row.companyName;
	form.contactName = row.contactName;
	form.contactPhone = row.contactPhone;
	form.website = row.website;
	visible.value = true;
};

const deleteSelectionsHandle = () => {
	// 批量删除
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
