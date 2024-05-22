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
		<h1>console.log('In AddManager.vue ::: ', );</h1>
	</div>
</template>

<style scoped></style>
