import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { apiFetch } from '@/api/client'

export interface ApiCategory {
  id: number
  name: string
  slug: string
  description?: string | null
}

export interface ApiMenuItem {
  id: string
  name: string
  description: string | null
  price: number
  currency: string
  category: string | null
  categoryLabel: string | null
  image: string | null
  rating?: number | null
  featured?: boolean
}

export const useMenuStore = defineStore('menu', () => {
  const categories = ref<ApiCategory[]>([])
  const items = ref<ApiMenuItem[]>([])
  const isLoading = ref(false)
  const error = ref<string>('')

  const featured = computed(() => items.value.filter((i) => i.featured))

  async function refresh() {
    isLoading.value = true
    error.value = ''
    try {
      const [cats, menu] = await Promise.all([
        apiFetch<{ data: ApiCategory[] }>('/api/categories'),
        apiFetch<{ data: ApiMenuItem[] }>('/api/menu-items'),
      ])
      categories.value = cats.data
      items.value = menu.data
    } catch (e: any) {
      error.value = e?.message || 'Failed to load menu.'
    } finally {
      isLoading.value = false
    }
  }

  return { categories, items, featured, isLoading, error, refresh }
})

