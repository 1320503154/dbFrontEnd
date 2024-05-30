// stores/data.js
import { defineStore } from "pinia";
import { ref } from "vue";
//export是按需导出,导入需要使用{}包裹
//export default是默认导出,导入不需要使用{}包裹
export const useDataStore = defineStore(
	"dataJs",
	() => {
		const positionData = ref(null);

		function setPositionData(data) {
			positionData.value = data;
		}
		function getPositionData() {
			return positionData.value;
		}

		return { positionData, setPositionData, getPositionData };
	},
	{
		persist: true,
	}
);
