<script setup lang="ts">
import { onMounted } from 'vue'
import { usePromotionsStore } from '@/stores/promotions'
import { usePageMeta } from '@/composables/usePageMeta'
import { formatPrice } from '@/utils/format'

const promos = usePromotionsStore()
usePageMeta()

onMounted(() => promos.refresh())
</script>

<template>
  <main class="min-h-screen pt-24">
    <section class="px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl">
        <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">Offers</p>
        <h1 class="mt-3 font-serif text-4xl text-tzel-cream">Promotions</h1>
        <p class="mt-3 text-tzel-sand/80">Active deals — enter your code at checkout.</p>

        <div v-if="promos.promotions.length" class="mt-10 grid gap-4 sm:grid-cols-2">
          <article
            v-for="p in promos.promotions"
            :key="p.id"
            class="rounded-3xl border border-tzel-bronze/20 bg-gradient-to-br from-tzel-espresso/60 to-tzel-ink/40 p-6"
          >
            <h2 class="font-serif text-xl text-tzel-cream">{{ p.name }}</h2>
            <p class="mt-2 font-mono text-sm text-tzel-gold">{{ p.code }}</p>
            <p class="mt-3 text-sm text-tzel-sand/85">
              {{ p.type === 'percent' ? `${p.value}% off` : `${formatPrice(p.value)} off` }}
            </p>
          </article>
        </div>
        <p v-else class="mt-10 text-tzel-muted">No active promotions right now. Check back soon.</p>
      </div>
    </section>
  </main>
</template>
