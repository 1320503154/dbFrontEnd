<script setup>
	import {
		ref,
		reactive,
		toRefs,
		onBeforeMount,
		onMounted,
		watchEffect,
		computed,
	} from "vue";
	import { useRoute, useRouter } from "vue-router";
	const route = useRoute();
	const router = useRouter();
	const data = reactive({});
	onBeforeMount(() => {
		//console.log('2.组件挂载页面之前执行----onBeforeMount')
	});
	onMounted(() => {
		//console.log('3.-组件挂载到页面之后执行-------onMounted')
	});
	watchEffect(() => {});
	defineExpose({
		...toRefs(data),
	});
</script>
<template>
	<div>
		<h1>
			感谢谭佳卉,刘凯,朱贺君,李禹佳的通力协作和支持,使得本项目能够顺利完成.
		</h1>
		<h1>没有团队的合作和彼此的激励,不可能单枪匹马完成这个作业</h1>
	</div>
</template>

<style scoped></style>
