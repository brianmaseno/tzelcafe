<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { useCheckoutStore } from '@/stores/checkout'

const route = useRoute()
const router = useRouter()
const checkout = useCheckoutStore()

const reference = computed(() => String(route.query.reference || ''))
const isDone = ref(false)

onMounted(async () => {
  if (!reference.value) return
  try {
    await checkout.verifyPayment(reference.value)
  } finally {
    isDone.value = true
  }
})

function goToTracking() {
  if (checkout.lastOrderId) {
    router.push({ path: '/track-order', query: { order: String(checkout.lastOrderId) } })
    return
  }
  router.push('/track-order')
}
</script>

<template>
  <main class="min-h-screen pt-24">
    <section class="px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg rounded-3xl border border-white/5 bg-tzel-espresso/40 p-8 text-center">
        <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">
          Payment
        </p>
        <h1 class="mt-3 font-serif text-3xl text-tzel-cream">
          {{ isDone ? (checkout.orderPlaced ? 'Payment Successful' : 'Payment Pending') : 'Verifying…' }}
        </h1>
        <p class="mt-3 text-sm text-tzel-sand/80">
          Reference: <span class="font-mono text-tzel-bronze">{{ reference || '—' }}</span>
        </p>
        <p v-if="checkout.lastOrderId" class="mt-2 text-sm text-tzel-sand/80">
          Order <span class="font-mono text-tzel-bronze">#{{ checkout.lastOrderId }}</span>
        </p>

        <p v-if="checkout.error" class="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {{ checkout.error }}
        </p>

        <div class="mt-8 flex justify-center gap-3">
          <PrimaryButton to="/menu" variant="secondary">Back to Menu</PrimaryButton>
          <PrimaryButton v-if="checkout.orderPlaced" @click="goToTracking">Track Order</PrimaryButton>
        </div>
      </div>
    </section>
  </main>
</template>
