<script setup lang="ts">
import PrimaryButton from '@/components/ui/PrimaryButton.vue'

const heroImage =
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80'
</script>

<template>
  <section
    class="relative flex min-h-[100svh] items-center overflow-hidden"
    aria-labelledby="hero-heading"
  >
    <!-- Background image -->
    <img
      :src="heroImage"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      loading="eager"
      aria-hidden="true"
    />

    <!-- Dark overlay for readable text -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-tzel-ink/95 via-tzel-ink/80 to-tzel-ink/50"
      aria-hidden="true"
    />

  <div class="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <h1
          id="hero-heading"
          class="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-tzel-cream text-balance sm:text-5xl lg:text-6xl"
        >
          WELCOME TO TZEL CAFÉ
        </h1>

        <p class="mt-6 text-base leading-relaxed text-tzel-sand/90 sm:text-lg">
          More than a café. More than coffee. A modern lifestyle café for students, families,
          professionals, entrepreneurs, neighbours, and online customers seeking delicious food,
          premium beverages, memorable experiences, and meaningful connections.
        </p>

        <p class="mt-5 text-xs font-medium tracking-[0.35em] text-tzel-bronze uppercase sm:text-sm">
          EAT. SIP. CONNECT. — WHERE GREAT TASTE MEETS GREAT PURPOSE
        </p>

        <div class="mt-10 flex flex-wrap gap-4">
          <PrimaryButton to="/menu" size="lg">Order Now</PrimaryButton>
          <PrimaryButton to="/menu" variant="secondary" size="lg">Explore Our Menu</PrimaryButton>
        </div>
      </div>
    </div>
  </section>
</template>
