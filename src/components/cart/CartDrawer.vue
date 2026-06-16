<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'

import { formatPrice } from '@/utils/format'

const cart = useCartStore()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="cart.isDrawerOpen"
        class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        @click="cart.closeDrawer()"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="cart.isDrawerOpen"
        class="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-white/10 bg-tzel-espresso shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <header class="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 id="cart-title" class="font-serif text-xl text-tzel-cream">
            Your Order
          </h2>
          <button
            type="button"
            class="rounded-full p-2 text-tzel-sand hover:text-tzel-gold"
            aria-label="Close cart"
            @click="cart.closeDrawer()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div v-if="cart.isEmpty" class="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p class="text-tzel-sand">Your cart is empty.</p>
          <PrimaryButton to="/menu" class="mt-4" @click="cart.closeDrawer()">
            Browse Menu
          </PrimaryButton>
        </div>

        <ul v-else class="flex-1 space-y-4 overflow-y-auto px-6 py-4">
          <li
            v-for="item in cart.items"
            :key="item.menuItem.id"
            class="flex gap-4 rounded-xl border border-white/5 bg-tzel-ink/50 p-3"
          >
            <img
              :src="item.menuItem.image"
              :alt="item.menuItem.name"
              class="h-16 w-16 rounded-lg object-cover"
              loading="lazy"
              width="64"
              height="64"
            />
            <div class="min-w-0 flex-1">
              <p class="truncate font-medium text-tzel-cream">{{ item.menuItem.name }}</p>
              <p class="text-sm text-tzel-bronze">{{ formatPrice(item.menuItem.price) }}</p>
              <div class="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  class="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-tzel-sand hover:border-tzel-bronze"
                  :aria-label="`Decrease quantity of ${item.menuItem.name}`"
                  @click="cart.updateQuantity(item.menuItem.id, item.quantity - 1)"
                >
                  −
                </button>
                <span class="text-sm text-tzel-cream" aria-live="polite">{{ item.quantity }}</span>
                <button
                  type="button"
                  class="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-tzel-sand hover:border-tzel-bronze"
                  :aria-label="`Increase quantity of ${item.menuItem.name}`"
                  @click="cart.updateQuantity(item.menuItem.id, item.quantity + 1)"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        </ul>

        <footer v-if="!cart.isEmpty" class="border-t border-white/10 px-6 py-5">
          <div class="mb-4 flex justify-between text-tzel-cream">
            <span>Subtotal</span>
            <span class="font-semibold">{{ formatPrice(cart.subtotal) }}</span>
          </div>
          <PrimaryButton to="/checkout" class="w-full" @click="cart.closeDrawer()">
            Proceed to Checkout
          </PrimaryButton>
        </footer>
      </aside>
    </Transition>
  </Teleport>
</template>
