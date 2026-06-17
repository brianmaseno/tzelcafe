import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiFetch } from '@/api/client'

export interface Promotion {
  id: number
  name: string
  code: string
  type: 'fixed' | 'percent'
  value: number
}

export const usePromotionsStore = defineStore('promotions', () => {
  const promotions = ref<Promotion[]>([])
  const loaded = ref(false)

  async function refresh() {
    const res = await apiFetch<{ data: Promotion[] }>('/api/promotions')
    promotions.value = res.data
    loaded.value = true
  }

  return { promotions, loaded, refresh }
})
