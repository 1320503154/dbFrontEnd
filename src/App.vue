<script setup>
	import { RouterLink, RouterView } from "vue-router";
	import navBarLeft from "@/components/navBarLeft.vue";
	console.log(import.meta.env);
</script>

<template>
	<div class="common-layout">
		<el-container>
			<el-aside width="200px">
				<nav-bar-left></nav-bar-left>
			</el-aside>
			<el-container>
				<el-header>首部导航栏</el-header>
				<el-main>
					<RouterView></RouterView>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<style scoped lang="scss">
	:root {
		--header-height: 10vh;
		--header-bg-color: #333;
		--header-text-color: white;
		--link-hover-color: #555;
	}

	header {
		height: var(--header-height);
		width: 99vw;
		background-color: var(--header-bg-color);
		color: var(--header-text-color);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	nav {
		display: flex;
		gap: 20px;
	}

	.nav-link {
		color: var(--header-text-color);
		text-decoration: none;
		font-size: 1.2em;
		transition: color 0.3s ease;
	}

	.nav-link:hover {
		color: var(--link-hover-color);
		background-color: aquamarine;
		border-radius: 20%;
	}
	.common-layout {
		scroll-behavior: smooth;
		overflow-x: hidden;
	}
</style>
