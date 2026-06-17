<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkout'
import { formatPrice } from '@/utils/format'

const cart = useCartStore()
const checkout = useCheckoutStore()

const total = computed(() => checkout.totalWithFees(cart.subtotal))

async function applyPromo() {
  try {
    await checkout.applyPromo(cart.subtotal)
  } catch {
    // message shown via promoMessage
  }
}
</script>

<template>
  <aside class="rounded-2xl border border-white/5 bg-tzel-espresso/40 p-6" aria-label="Order summary">
    <h3 class="font-serif text-lg text-tzel-cream">Order Summary</h3>

    <ul v-if="!cart.isEmpty" class="mt-4 space-y-3">
      <li v-for="item in cart.items" :key="item.menuItem.id" class="flex justify-between gap-3 text-sm">
        <span class="text-tzel-sand">{{ item.quantity }}× {{ item.menuItem.name }}</span>
        <span class="shrink-0 text-tzel-cream">{{ formatPrice(item.menuItem.price * item.quantity) }}</span>
      </li>
    </ul>
    <p v-else class="mt-4 text-sm text-tzel-muted">No items in cart.</p>

    <div class="mt-6 space-y-2">
      <label class="text-xs text-tzel-muted" for="promo">Promo code</label>
      <div class="flex gap-2">
        <input
          id="promo"
          v-model="checkout.promoCode"
          type="text"
          placeholder="Enter code"
          class="flex-1 rounded-xl border border-white/10 bg-tzel-ink/40 px-3 py-2 text-sm text-tzel-cream uppercase"
        />
        <button
          type="button"
          class="rounded-xl border border-tzel-bronze/40 px-3 py-2 text-xs font-semibold text-tzel-gold"
          @click="applyPromo"
        >
          Apply
        </button>
      </div>
      <p v-if="checkout.promoMessage" class="text-xs" :class="checkout.promoDiscount > 0 ? 'text-tzel-gold' : 'text-red-300'">
        {{ checkout.promoMessage }}
      </p>
    </div>

    <dl class="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm">
      <div class="flex justify-between text-tzel-sand">
        <dt>Subtotal</dt>
        <dd>{{ formatPrice(cart.subtotal) }}</dd>
      </div>
      <div v-if="checkout.promoDiscount > 0" class="flex justify-between text-tzel-gold">
        <dt>Promo discount</dt>
        <dd>-{{ formatPrice(checkout.promoDiscount) }}</dd>
      </div>
      <div v-if="checkout.deliveryFee > 0" class="flex justify-between text-tzel-sand">
        <dt>Delivery</dt>
        <dd>{{ formatPrice(checkout.deliveryFee) }}</dd>
      </div>
      <div class="flex justify-between font-semibold text-tzel-cream">
        <dt>Total</dt>
        <dd>{{ formatPrice(total) }}</dd>
      </div>
    </dl>
  </aside>
</template>
