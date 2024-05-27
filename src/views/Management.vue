<script setup>
	import { computed, onBeforeMount, ref, watch } from "vue";
	import { useRoute } from "vue-router";
	import navBarLeft from "@/components/navBarLeft.vue";
	import { ArrowRight } from "@element-plus/icons-vue";
	import { useUserStore } from "@/stores/user.js";

	const route = useRoute();
	const userStore = useUserStore();
	const userInfo = computed(() => userStore.userInfo);
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
					//退出登录
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
