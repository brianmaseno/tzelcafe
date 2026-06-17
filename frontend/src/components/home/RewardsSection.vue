<template>
  <section
    class="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    aria-labelledby="rewards-heading"
  >
    <div
      class="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-tzel-bronze/10 blur-3xl"
      aria-hidden="true"
    />
    <div class="relative mx-auto max-w-7xl">
      <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">TZEL CAFÉ Rewards</p>
      <h2 id="rewards-heading" class="mt-3 font-serif text-3xl text-tzel-cream sm:text-4xl">
        Eat Enough. Eat More. Earn More.
      </h2>
      <p class="mt-3 max-w-3xl text-tzel-sand/80">
        Earn points every time you buy. Unlock exclusive offers, birthday rewards, members discounts,
        seasonal promotions, and special events.
      </p>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="perk in perks"
          :key="perk.title"
          class="rounded-3xl border border-tzel-bronze/20 bg-gradient-to-br from-tzel-espresso/60 to-tzel-ink/40 p-6"
        >
          <div class="text-xs font-medium tracking-[0.35em] text-tzel-bronze uppercase">
            {{ perk.title }}
          </div>
          <p class="mt-3 text-sm text-tzel-sand/85">{{ perk.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const perks = [
  { title: 'Earn Points', description: 'Every purchase brings you closer to your next reward.' },
  { title: 'Exclusive Offers', description: 'Members-only deals on your favourite menu items.' },
  { title: 'Birthday Rewards', description: 'Celebrate your day with a special treat on us.' },
  { title: 'Members Discounts', description: 'Save more as a loyal TZEL CAFÉ member.' },
  { title: 'Seasonal Promotions', description: 'Limited-time offers throughout the year.' },
  { title: 'Special Events', description: 'Early access and invites to TZEL experiences.' },
]
</script>
