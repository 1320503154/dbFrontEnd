<script setup>
	import { computed, onBeforeMount, ref, watch, onMounted } from "vue";
	import { useRoute } from "vue-router";
	import navBarLeft from "@/components/navBarLeft.vue";
	import { ArrowRight } from "@element-plus/icons-vue";
	import { useUserStore } from "@/stores/user.js";
	import { useDataStore } from "@/stores/data.js";
	import LHG from "@/utils/axios";

	import { ElMessage, ElMessageBox } from "element-plus";

	const route = useRoute();
	const userStore = useUserStore();
	const dataStore = useDataStore();

	const userInfo = computed(() => userStore.userInfo);
	console.log(userInfo.value);
	const title = ref(route.meta.title);

	watch(
		() => route.meta.title,
		(newVal) => {
			title.value = newVal;
		}
	);

	const breadcrumbItems = ref([]);

	const updateBreadcrumbs = () => {
		const items = [];
		const bread = route.meta.breadcrumb || [];
		bread.forEach((breadcrumb) => {
			const { name, path } = breadcrumb;
			items.push({ to: { path }, text: name });
		});
		breadcrumbItems.value = items;
	};

	onBeforeMount(() => {
		updateBreadcrumbs();
	});

	watch(
		() => route.meta.breadcrumb,
		() => {
			updateBreadcrumbs();
		}
	);
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
			return response.data;
		} catch (error) {
			showMessage("请求错误", "error");
			PromiseRejectionEvent(error);
		}
	};
	onMounted(() => {
		//获取职位信息
		const getJobList = async () => {
			const res = await fetchData("/api/jobrequirement/page", {
				pageIndex: 1,
				pageSize: 100,
				jobName: "",
			});
			const { records } = res;
			if (res) {
				dataStore.setPositionData(records);
				console.log(dataStore.getPositionData());
			} else {
				showMessage("仓库存储岗位信息失败", "error");
			}
		};
		//获取人才信息
		const getTalentList = async () => {
			const res = await fetchData("/api/talent/page", {
				pageIndex: 1,
				pageSize: 100,
				name: "",
				idNumber: "",
				phoneNumber: "",
			});
			const { records } = res;
			if (res) {
				dataStore.setTalentData(records);
				console.log(dataStore.getTalentData());
			} else {
				showMessage("仓库存储人才信息失败", "error");
			}
		};
		//获取学历信息
		const getDegreeList = async () => {
			const res = await fetchData("/api/education/page", {
				pageIndex: 1,
				pageSize: 100,
				schoolName: "",
				idNumber: "",
			});
			const { records } = res;
			if (res) {
				dataStore.setDegreeData(records);
				console.log(dataStore.getDegreeData());
			} else {
				showMessage("仓库存储学历信息失败", "error");
			}
		};
		if (!dataStore.getPositionData().length) {
			getJobList();
		}
		if (!dataStore.getTalentData().length) {
			getTalentList();
		}
		if (!dataStore.getDegreeData().length) {
			getDegreeList();
		}
	});
</script>

<template>
	<div class="common-layout">
		<el-container>
			<el-aside width="200px">
				<nav-bar-left></nav-bar-left>
			</el-aside>
			<el-container>
				<el-header
					height="60px"
					class="appHeader">
					<el-breadcrumb :separator-icon="ArrowRight">
						<el-breadcrumb-item
							v-for="item in breadcrumbItems"
							:key="item.text"
							:to="item.to"
							>{{ item.text }}</el-breadcrumb-item
						>
					</el-breadcrumb>
					<el-affix
						target=".appHeader"
						:offset="5"
						style="margin-left: 30px">
						<span v-if="userInfo"
							>当前用户:{{ userInfo.username }} 用户类型:{{
								userInfo.userType == 1 ? "负责人" : "人才"
							}}</span
						>
					</el-affix>
					<el-button
						type="primary"
						@click="userStore.logout"
						style="margin-left: 20px"
						>退出登录</el-button
					>
				</el-header>
				<el-main>
					<RouterView></RouterView>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<style scoped lang="scss">
	:deep(.el-header) {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.common-layout {
		scroll-behavior: smooth;
		overflow-x: hidden;
	}
</style>
