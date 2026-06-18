<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from '@/types'
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/format'

interface Props {
  item: MenuItem
}

const props = defineProps<Props>()
const cart = useCartStore()
const fallbackImage =
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
const imageSrc = ref(props.item.image || fallbackImage)

function handleAdd() {
  cart.addItem(props.item)
}

function onImageError() {
  imageSrc.value = fallbackImage
}
</script>

<template>
  <article
    class="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-tzel-espresso/50 transition-all duration-300 hover:-translate-y-1 hover:border-tzel-bronze/30 hover:shadow-xl hover:shadow-black/30"
  >
    <div class="relative aspect-[4/3] overflow-hidden">
      <img
        :src="imageSrc"
        :alt="item.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        width="400"
        height="300"
        @error="onImageError"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-tzel-ink/80 via-transparent to-transparent opacity-60"
        aria-hidden="true"
      />
      <div
        v-if="item.rating"
        class="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-tzel-ink/80 px-2.5 py-1 text-xs font-medium text-tzel-gold backdrop-blur-sm"
        :aria-label="`Rated ${item.rating} out of 5`"
      >
        <span aria-hidden="true">★</span>
        {{ item.rating }}
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-serif text-lg text-tzel-cream">{{ item.name }}</h3>
        <p class="shrink-0 font-semibold text-tzel-bronze">
          {{ formatPrice(item.price) }}
        </p>
      </div>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-tzel-muted line-clamp-2">
        {{ item.description }}
      </p>
      <button
        type="button"
        class="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-tzel-bronze/40 bg-tzel-ink/50 py-2.5 text-sm font-medium text-tzel-cream transition-all duration-300 hover:border-tzel-bronze hover:bg-tzel-bronze hover:text-tzel-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tzel-bronze"
        :aria-label="`Add ${item.name} to cart`"
        @click="handleAdd"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add to Order
      </button>
    </div>
  </article>
</template>
