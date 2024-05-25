import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({});
  function setUserInfo(info) {
    userInfo.value = info;
  }
  function getUserInfo() {
    return userInfo.value;
  }
    return { userInfo, setUserInfo,getUserInfo }
},{
  persist:true,
});
