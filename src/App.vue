<script setup>
	import { ref } from "vue";
	import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
	import navBarLeft from "@/components/navBarLeft.vue";
	const route = useRoute();
	const title = ref(route.meta.title);
</script>

<template>
	<div class="common-layout">
		<el-container>
			<el-aside width="200px">
				<nav-bar-left></nav-bar-left>
			</el-aside>
			<el-container>
				<el-header height="60px">{{ title }}</el-header>
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
