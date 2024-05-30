<template>
	<div class="home-view">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-card>
					<h2>欢迎, {{ userInfo.username }}!</h2>
					<p>当前用户类型: {{ userType }}</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card>
					<h3>总人才数</h3>
					<p>{{ talentCount }}</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card>
					<h3>总职位数</h3>
					<p>{{ positionCount }}</p>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card>
					<h3>总学位数</h3>
					<p>{{ degreeCount }}</p>
				</el-card>
			</el-col>
		</el-row>
		<el-row
			:gutter="20"
			style="margin-top: 20px">
			<el-col :span="24">
				<el-card>
					<div
						ref="info"
						style="width: 100%; height: 400px"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
	import { onMounted, ref, inject, computed } from "vue";
	import { useUserStore } from "@/stores/user.js";
	import { useDataStore } from "@/stores/data.js";

	// 通过 inject 使用 echarts
	const echarts = inject("echarts");

	// 获取 HTML 元素的 ref
	const info = ref();

	// 使用 store 获取用户和数据
	const userStore = useUserStore();
	const dataStore = useDataStore();

	// 计算属性
	const userInfo = computed(() => userStore.userInfo);
	const userType = computed(() =>
		userInfo.value.userType === 1 ? "负责人" : "人才"
	);
	const talentCount = computed(() => dataStore.getTalentData().length);
	const positionCount = computed(() => dataStore.getPositionData().length);
	const degreeCount = computed(() => dataStore.getDegreeData().length);
	const degreeList = computed(() => dataStore.getDegreeData());

	// 根据 major 统计人数
	const countByMajor = (degreeList) => {
		let count = {};
		degreeList.forEach((degree) => {
			if (count[degree.major]) {
				count[degree.major]++;
			} else {
				count[degree.major] = 1;
			}
		});
		return count;
	};

	// 获取统计后的数据
	const majorCount = computed(() => {
		const majorData = degreeList.value;
		return countByMajor(majorData);
	});

	// 更新图表选项
	const updateChartOption = () => {
		if (info.value) {
			// 初始化 echarts 实例
			const userEc = echarts.init(info.value, "light");

			const majorData = majorCount.value;
			const chartData = Object.keys(majorData).map((key) => ({
				value: majorData[key],
				name: key,
			}));

			const option = {
				title: {
					text: "人才学历分布",
				},
				tooltip: {
					trigger: "item",
				},
				legend: {
					top: "5%",
					left: "center",
					data: chartData.map((item) => item.name),
				},
				series: [
					{
						name: "学历",
						type: "pie",
						radius: "50%",
						data: chartData,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
						color: [
							"#516b91",
							"#59c4e6",
							"#edafda",
							"#93b7e3",
							"#a5e7f0",
							"#cbb0e3",
							"#c12e34",
							"#e6b600",
							"#0098d9",
							"#2b821d",
							"#005eaa",
							"#339ca8",
							"#cda819",
							"#32a487",
						],
					},
				],
			};

			// 使用刚指定的配置项和数据显示图表
			userEc.setOption(option);
		}
	};

	// 在组件挂载时更新图表
	onMounted(() => {
		updateChartOption();
	});
</script>

<style scoped>
	.home-view {
		padding: 20px;
	}
</style>
