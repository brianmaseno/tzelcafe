<template>
  <section class="relative px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="values-heading">
    <div class="mx-auto max-w-7xl">
      <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">OUR VALUES</p>
      <h2 id="values-heading" class="mt-3 font-serif text-3xl text-tzel-cream sm:text-4xl">Excellence, Integrity, Community</h2>
      <p class="mt-3 max-w-3xl text-tzel-sand/80">We create memorable experiences while protecting people and planet.</p>
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="v in values" :key="v.title" class="rounded-3xl border border-white/5 bg-tzel-espresso/40 p-6">
          <div class="text-xs font-medium tracking-[0.35em] text-tzel-bronze uppercase">{{ v.title }}</div>
          <div class="mt-3 text-sm text-tzel-sand/85">{{ v.body }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const values = [
  { title: 'Excellence', body: 'Quality in everything we do.' },
  { title: 'Integrity', body: 'Honesty and trust.' },
  { title: 'Customer Delight', body: 'Creating memorable experiences.' },
  { title: 'Innovation', body: 'Constant improvement and creativity.' },
  { title: 'Inclusiveness', body: 'Everyone belongs.' },
  { title: 'Community Impact', body: 'Growing together.' },
  { title: 'Sustainability', body: 'Protecting people and planet.' },
  { title: 'Stewardship', body: 'Responsible use of resources.' },
]
</script>
