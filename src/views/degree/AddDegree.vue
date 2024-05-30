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
</script>
<template>
	<div>
		<h1>console.log('In AddManager.vue ::: ', );</h1>
	</div>
</template>

<style scoped></style>
