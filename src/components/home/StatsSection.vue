<script setup lang="ts">
const stats = [
  {
    value: '100%',
    label: 'Fresh Ingredients',
    description: 'Locally sourced, daily delivered',
    icon: '🌿',
  },
  {
    value: '50+',
    label: 'Unique Menu Items',
    description: 'Crafted by our expert chefs',
    icon: '👨‍🍳',
  },
  {
    value: '1000+',
    label: 'Happy Guests Monthly',
    description: 'And growing every day',
    icon: '★',
  },
]
</script>

<template>
  <section
    class="relative px-4 py-24 sm:px-6 lg:px-8"
    aria-label="Restaurant statistics"
  >
    <div class="mx-auto max-w-7xl">
      <div class="overflow-hidden rounded-3xl border border-white/5 bg-tzel-espresso/40">
        <div class="grid divide-y divide-white/5 md:grid-cols-3 md:divide-x md:divide-y-0">
          <article
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col items-center px-8 py-12 text-center"
          >
            <span class="text-3xl" aria-hidden="true">{{ stat.icon }}</span>
            <p class="mt-4 font-serif text-4xl text-tzel-gold sm:text-5xl">
              {{ stat.value }}
            </p>
            <p class="mt-2 font-medium text-tzel-cream">{{ stat.label }}</p>
            <p class="mt-1 text-sm text-tzel-muted">{{ stat.description }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
