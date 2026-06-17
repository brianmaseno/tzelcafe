<template>
  <section class="relative px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="corporate-heading">
    <div class="mx-auto max-w-7xl">
      <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">Corporate Services</p>
      <h2 id="corporate-heading" class="mt-3 font-serif text-3xl text-tzel-cream sm:text-4xl">
        Catering &amp; Events for Every Occasion
      </h2>
      <p class="mt-3 max-w-3xl text-tzel-sand/80">
        From boardroom breakfasts to private celebrations — TZEL CAFÉ delivers premium food and
        beverages with the same excellence you enjoy in-store.
      </p>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="service in services"
          :key="service"
          class="rounded-3xl border border-white/5 bg-tzel-espresso/40 p-6 transition hover:border-tzel-bronze/30"
        >
          <div class="text-sm font-medium text-tzel-cream">{{ service }}</div>
        </div>
      </div>

      <p class="mt-10 text-sm text-tzel-sand/70">
        Corporate catering • Meeting packages • Breakfast packages • Conference meals • Office lunch
        delivery • Events catering • Private functions.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  'Corporate Catering',
  'Meeting Packages',
  'Breakfast Packages',
  'Conference Meals',
  'Office Lunch Delivery',
  'Events Catering',
  'Private Functions',
]
</script>
