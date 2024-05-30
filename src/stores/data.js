import { defineStore } from "pinia";
import { ref } from "vue";

export const useDataStore = defineStore(
	"dataJs",
	() => {
		// 初始化数据时使用空数组而不是 null
		const positionData = ref([]);
		const talentData = ref([]);
		const degreeData = ref([]);
		function setPositionData(data) {
			positionData.value = data || []; // 确保数据不为 null,默认是空数组
		}
		function getPositionData() {
			return positionData.value;
		}

		function setTalentData(data) {
			talentData.value = data || []; // 确保数据不为 null,默认是空数组
		}
		function getTalentData() {
			return talentData.value;
		}
		function setDegreeData(data) {
			degreeData.value = data || []; // 确保数据不为 null,默认是空数组
		}
		function getDegreeData() {
			return degreeData.value;
		}

		return {
			positionData,
			setPositionData,
			getPositionData,
			talentData,
			setTalentData,
			getTalentData,
			degreeData,
			setDegreeData,
			getDegreeData,
		};
	},
	{
		persist: true,
	}
);
