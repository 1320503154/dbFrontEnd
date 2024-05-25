<template>
	<el-radio-group
		v-model="isCollapse"
		style="margin-bottom: 20px">
		<el-radio-button :value="false">展开</el-radio-button>
		<el-radio-button :value="true">折叠</el-radio-button>
	</el-radio-group>
	<el-menu
		default-active="2"
		class="el-menu-vertical-demo"
		:collapse="isCollapse"
		@open="handleOpen"
		@close="handleClose">
		<el-sub-menu index="1">
			<template #title>
				<el-icon><location /></el-icon>
				<span>人才库</span>
			</template>
			<el-menu-item-group>
				<el-menu-item
					index="1-1"
					@click="navigateTo('/talent/add')"
					>添加人才</el-menu-item
				>
			</el-menu-item-group>

			<el-menu-item-group>
				<el-menu-item
					index="1-2"
					@click="navigateTo('/talent/view')"
					>查看人才</el-menu-item
				>
			</el-menu-item-group>
		</el-sub-menu>
		<el-sub-menu index="2">
			<template #title>
				<el-icon><icon-menu /></el-icon>
				<span>申请和审核</span>
			</template>
			<el-menu-item-group>
				<el-menu-item
					index="2-1"
					@click="navigateTo('/application/add')"
					>添加申请</el-menu-item
				>
			</el-menu-item-group>

			<el-menu-item-group>
				<el-menu-item
					index="2-2"
					@click="navigateTo('/application/view')"
					>查看申请</el-menu-item
				>
			</el-menu-item-group>
		</el-sub-menu>
		<el-sub-menu index="3">
			<template #title>
				<el-icon><document /></el-icon>
				<span>岗位需求</span>
			</template>
			<el-menu-item-group>
				<el-menu-item
					index="3-1"
					@click="navigateTo('/position/add')"
					>添加岗位</el-menu-item
				>
			</el-menu-item-group>
			<el-menu-item-group>
				<el-menu-item
					index="3-2"
					@click="navigateTo('/position/view')"
					>查看岗位</el-menu-item
				>
			</el-menu-item-group>
		</el-sub-menu>
		<el-sub-menu index="4">
			<template #title>
				<el-icon><document /></el-icon>
				<span>企业管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item
					index="4-1"
					@click="navigateTo('/company/add')"
					>添加企业</el-menu-item
				>
			</el-menu-item-group>
			<el-menu-item-group>
				<el-menu-item
					index="4-2"
					@click="navigateTo('/company/view')"
					>查看企业</el-menu-item
				>
			</el-menu-item-group>
		</el-sub-menu>

		<el-sub-menu index="5">
			<template #title>
				<el-icon><setting /></el-icon>
				<span>负责人管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item
					index="5-1"
					@click="navigateTo('/manager/add')"
					>添加负责人</el-menu-item
				>
			</el-menu-item-group>
			<el-menu-item-group>
				<el-menu-item
					index="5-2"
					@click="navigateTo('/manager/view')"
					>查看负责人</el-menu-item
				>
			</el-menu-item-group>
		</el-sub-menu>
		<el-sub-menu index="6">
			<template #title>
				<el-icon><document /></el-icon>
				<span>学历查看</span>
			</template>
			<el-menu-item-group>
				<el-menu-item
					index="6-1"
					@click="navigateTo('/degree/add')"
					>添加学历</el-menu-item
				>
			</el-menu-item-group>
			<el-menu-item-group>
				<el-menu-item
					index="6-2"
					@click="navigateTo('/degree/view')"
					>查看学历</el-menu-item
				>
			</el-menu-item-group>
		</el-sub-menu>
	</el-menu>
</template>

<script setup>
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import {
		Document,
		Menu as IconMenu,
		Location,
		Setting,
	} from "@element-plus/icons-vue";

	const isCollapse = ref(false);
	const router = useRouter();

	const navigateTo = (path) => {
		router.push(path);
	};
  const handleOpen = (key, keyPath) => {
    // console.log(key, keyPath);
  };
  const handleClose = (key, keyPath) => {
    // console.log(key, keyPath);
  };
</script>

<style scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
</style>
