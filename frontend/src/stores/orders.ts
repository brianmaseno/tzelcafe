import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { apiFetch } from '@/api/client'

export type ApiOrderStatus =
  | 'pending'
  | 'paid'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

export interface ApiOrderItem {
  id: number
  name: string
  quantity: number
  unit_price_cents: number
  line_total_cents: number
}

export interface ApiOrder {
  id: number
  status: ApiOrderStatus | string
  payment_status?: string
  order_type: 'pickup' | 'delivery' | string
  subtotal_cents?: number
  discount_cents?: number
  delivery_fee_cents?: number
  total_cents: number
  dropoff_location?: string | null
  notes?: string | null
  paystack_reference?: string | null
  placed_at?: string | null
  delivered_at?: string | null
  created_at?: string
  tracking_token?: string | null
  items: ApiOrderItem[]
}

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<ApiOrder[]>([])
  const isLoading = ref(false)
  const error = ref('')

  const totalOrders = computed(() => orders.value.length)

  async function refresh() {
    error.value = ''
    isLoading.value = true
    try {
      const res = await apiFetch<{ data: ApiOrder[] }>('/api/orders', { method: 'GET' })
      orders.value = res.data || []
    } catch (e: any) {
      error.value = e?.message || 'Failed to load orders.'
      orders.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function fetchOrder(orderId: number): Promise<ApiOrder> {
    const res = await apiFetch<{ data: ApiOrder }>(`/api/orders/${orderId}`, { method: 'GET' })
    return res.data
  }

  async function trackOrder(payload: {
    orderId: number
    email?: string
    token?: string
  }): Promise<ApiOrder> {
    const res = await apiFetch<{ data: ApiOrder }>('/api/orders/track', {
      method: 'POST',
      json: payload,
    })
    return res.data
  }

  return { orders, totalOrders, isLoading, error, refresh, fetchOrder, trackOrder }
})
