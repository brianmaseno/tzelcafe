<script setup lang="ts">
import { onMounted } from 'vue'
import { usePromotionsStore } from '@/stores/promotions'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'

const promos = usePromotionsStore()

onMounted(() => {
  if (!promos.loaded) promos.refresh()
})
</script>

<template>
  <section v-if="promos.promotions.length" class="px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-tzel-bronze/30 bg-tzel-espresso/50 px-6 py-4">
      <p class="text-sm text-tzel-sand">
        <span class="font-medium text-tzel-gold">{{ promos.promotions[0]?.name }}</span>
        — use code <span class="font-mono text-tzel-cream">{{ promos.promotions[0]?.code }}</span> at checkout
      </p>
      <PrimaryButton to="/promotions" size="sm" variant="secondary">View all offers</PrimaryButton>
    </div>
  </section>
</template>
