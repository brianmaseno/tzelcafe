import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CartItem, MenuItem } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isDrawerOpen = ref(false)

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const subtotal = computed(() =>
    items.value.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0,
    ),
  )

  const isEmpty = computed(() => items.value.length === 0)

  function openDrawer() {
    isDrawerOpen.value = true
  }

  function closeDrawer() {
    isDrawerOpen.value = false
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  function addItem(menuItem: MenuItem, quantity = 1) {
    const existing = items.value.find((item) => item.menuItem.id === menuItem.id)

    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ menuItem, quantity })
    }

    openDrawer()
  }

  function removeItem(menuItemId: string) {
    items.value = items.value.filter((item) => item.menuItem.id !== menuItemId)
  }

  function updateQuantity(menuItemId: string, quantity: number) {
    const item = items.value.find((entry) => entry.menuItem.id === menuItemId)
    if (!item) return

    if (quantity <= 0) {
      removeItem(menuItemId)
      return
    }

    item.quantity = quantity
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    isDrawerOpen,
    itemCount,
    subtotal,
    isEmpty,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})
