<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import OrderStatusTimeline from '@/components/orders/OrderStatusTimeline.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useOrdersStore, type ApiOrder } from '@/stores/orders'
import { formatPrice } from '@/utils/format'
import { usePageMeta } from '@/composables/usePageMeta'

const route = useRoute()
const auth = useAuthStore()
const ordersStore = useOrdersStore()
usePageMeta('Track Order')

const orderId = ref('')
const email = ref('')
const error = ref('')
const isLoading = ref(false)
const order = ref<ApiOrder | null>(null)

const queryOrderId = computed(() => String(route.query.order || ''))
const queryToken = computed(() => String(route.query.token || ''))

const inputClass =
  'w-full rounded-xl border border-white/10 bg-tzel-ink/40 px-4 py-3 text-tzel-cream focus:border-tzel-bronze focus:outline-none focus:ring-1 focus:ring-tzel-bronze'

async function loadFromQuery() {
  if (!queryOrderId.value) return
  orderId.value = queryOrderId.value
  if (queryToken.value) {
    await track({ orderId: Number(queryOrderId.value), token: queryToken.value })
    return
  }
  if (auth.token) {
    await trackAuthenticated(Number(queryOrderId.value))
  }
}

async function trackAuthenticated(id: number) {
  error.value = ''
  isLoading.value = true
  try {
    order.value = await ordersStore.fetchOrder(id)
  } catch (e: any) {
    error.value = e?.message || 'Could not load order.'
    order.value = null
  } finally {
    isLoading.value = false
  }
}

async function track(payload?: { orderId: number; email?: string; token?: string }) {
  error.value = ''
  isLoading.value = true
  try {
    const id = payload?.orderId ?? Number(orderId.value)
    if (!id) {
      error.value = 'Enter a valid order number.'
      return
    }

    if (auth.token && !payload?.email && !payload?.token) {
      order.value = await ordersStore.fetchOrder(id)
      return
    }

    order.value = await ordersStore.trackOrder({
      orderId: id,
      email: payload?.email ?? (email.value || undefined),
      token: payload?.token,
    })
  } catch (e: any) {
    error.value = e?.message || 'Order not found.'
    order.value = null
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  if (auth.token) {
    await auth.fetchMe()
    email.value = auth.user?.email || ''
  }
  await loadFromQuery()
})

watch(() => route.query, loadFromQuery)
</script>

<template>
  <main class="min-h-screen pt-24">
    <section class="px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl space-y-8">
        <div class="rounded-3xl border border-white/5 bg-tzel-espresso/40 p-8">
          <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">Orders</p>
          <h1 class="mt-3 font-serif text-3xl text-tzel-cream">Track your order</h1>
          <p class="mt-3 text-sm text-tzel-sand/80">
            Enter your order number and the email used at checkout. You can also open the tracking link from your confirmation email.
          </p>

          <form class="mt-8 grid gap-4 sm:grid-cols-2" @submit.prevent="track()">
            <div>
              <label class="mb-1.5 block text-sm text-tzel-sand" for="orderId">Order number</label>
              <input id="orderId" v-model="orderId" type="number" min="1" required :class="inputClass" placeholder="e.g. 42" />
            </div>
            <div>
              <label class="mb-1.5 block text-sm text-tzel-sand" for="email">Email</label>
              <input id="email" v-model="email" type="email" :required="!auth.token" :class="inputClass" placeholder="you@example.com" />
            </div>
            <div class="sm:col-span-2">
              <PrimaryButton type="submit" :disabled="isLoading">
                {{ isLoading ? 'Looking up…' : 'Track order' }}
              </PrimaryButton>
            </div>
          </form>

          <p v-if="error" class="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {{ error }}
          </p>
        </div>

        <div v-if="order" class="rounded-3xl border border-white/5 bg-tzel-espresso/40 p-8">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="font-mono text-sm text-tzel-bronze">Order #{{ order.id }}</p>
              <p class="mt-2 text-sm capitalize text-tzel-sand">
                {{ order.order_type }} · {{ order.payment_status }}
              </p>
            </div>
            <span class="rounded-full border border-tzel-bronze/40 bg-tzel-bronze/10 px-4 py-1.5 text-xs font-medium capitalize text-tzel-gold">
              {{ order.status.replace(/_/g, ' ') }}
            </span>
          </div>

          <div class="mt-8">
            <h2 class="font-serif text-xl text-tzel-cream">Progress</h2>
            <div class="mt-6">
              <OrderStatusTimeline :status="order.status" :order-type="order.order_type" />
            </div>
          </div>

          <div v-if="order.dropoff_location" class="mt-8 rounded-2xl border border-white/5 bg-tzel-ink/30 p-5">
            <p class="text-xs font-medium tracking-[0.35em] text-tzel-bronze uppercase">Delivery to</p>
            <p class="mt-2 text-sm text-tzel-sand">{{ order.dropoff_location }}</p>
          </div>

          <div class="mt-8">
            <h2 class="font-serif text-xl text-tzel-cream">Items</h2>
            <ul class="mt-4 space-y-3">
              <li
                v-for="item in order.items"
                :key="item.id"
                class="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-tzel-ink/30 px-4 py-3 text-sm"
              >
                <span class="text-tzel-cream">{{ item.quantity }}× {{ item.name }}</span>
                <span class="text-tzel-sand">{{ formatPrice(item.line_total_cents / 100) }}</span>
              </li>
            </ul>
            <p class="mt-6 text-right font-serif text-2xl text-tzel-gold">
              {{ formatPrice((order.total_cents || 0) / 100) }}
            </p>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <PrimaryButton to="/menu" variant="secondary">Order again</PrimaryButton>
            <PrimaryButton v-if="!auth.token" to="/login">Login for faster tracking</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
