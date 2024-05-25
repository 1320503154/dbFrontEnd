import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('counter', () => {
  const userInfo = ref({});

  function use() {
    count.value++
  }

  return { count, doubleCount, increment }
})
