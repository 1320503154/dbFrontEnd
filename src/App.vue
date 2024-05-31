<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script setup>
	import { provide } from "vue";

	//引入echarts
	import * as echarts from "echarts";

	//通过provide提供echarts
	provide("echarts", echarts);
</script>
