<template>
  <section class="relative px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="why-heading">
    <div class="mx-auto max-w-7xl">
      <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">Why Choose TZEL</p>
      <h2 id="why-heading" class="mt-3 font-serif text-3xl text-tzel-cream sm:text-4xl">
        Consistency You Can Trust
      </h2>
      <p class="mt-3 max-w-3xl text-tzel-sand/80">
        Premium quality, affordable excellence, and a welcoming space for everyone — from families
        and students to corporate teams and the wider community.
      </p>

      <ul class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="reason in reasons"
          :key="reason"
          class="flex items-center gap-3 rounded-2xl border border-white/5 bg-tzel-espresso/30 px-5 py-4 text-sm text-tzel-sand/90"
        >
          <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-tzel-gold" aria-hidden="true" />
          {{ reason }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const reasons = [
  'Freshly Prepared Daily',
  'Premium Ingredients',
  'Affordable Excellence',
  'Fast Service',
  'Online Ordering',
  'Comfortable Ambience',
  'Family Friendly',
  'Student Friendly',
  'Corporate Friendly',
  'Community Friendly',
  'Consistency You Can Trust',
]
</script>
