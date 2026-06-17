<template>
  <section class="relative px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="business-heading">
    <div class="mx-auto max-w-7xl rounded-3xl border border-tzel-bronze/20 bg-gradient-to-r from-tzel-espresso/80 to-tzel-ink/40 p-10">
      <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">OUR BUSINESS MODEL</p>
      <h2 id="business-heading" class="mt-3 font-serif text-3xl text-tzel-cream">Premium Quality + Affordable Excellence</h2>
      <p class="mt-4 max-w-3xl text-tzel-sand/85">
        Digital convenience and community impact — walk-in, online, delivery, corporate catering, loyalty, and more.
      </p>
      <ul class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="item in items" :key="item" class="rounded-2xl border border-white/5 bg-tzel-ink/30 px-4 py-3 text-sm text-tzel-sand/90">{{ item }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  'Walk-in Customers', 'Online Orders', 'Delivery Services', 'Corporate Catering',
  'Family Dining', 'Student Offers', 'Business Meetings', 'Events and Functions',
  'Takeaway Services', 'Loyalty Programme', 'Seasonal Promotions', 'Retail Products',
]
</script>
