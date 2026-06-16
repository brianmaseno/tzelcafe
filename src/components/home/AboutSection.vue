<script setup lang="ts">
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { BRAND } from '@/constants/brand'
</script>

<template>
  <section
    id="about"
    class="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    aria-labelledby="about-heading"
  >
    <div
      class="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-tzel-roast/40 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
      <div>
        <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">
          About Us
        </p>
        <h2
          id="about-heading"
          class="mt-3 font-serif text-3xl leading-tight text-tzel-cream sm:text-4xl lg:text-5xl"
        >
          A culinary destination where passion meets perfection
        </h2>
        <p class="mt-6 text-base leading-relaxed text-tzel-sand/85">
          {{ BRAND.name }} {{ BRAND.suffix }} is more than a café — it's a sanctuary for
          those who appreciate the art of slow living. From ethically sourced beans to
          chef-crafted plates, every detail is designed to elevate your everyday ritual.
        </p>
        <p class="mt-4 text-base leading-relaxed text-tzel-sand/85">
          Inspired by world-class hospitality and rooted in local warmth, we invite you
          to eat, sip, and connect in a space that feels unmistakably premium.
        </p>
        <PrimaryButton to="/menu" variant="secondary" class="mt-8">
          Discover Our Menu
        </PrimaryButton>
      </div>

      <div class="relative">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
          alt="Warm interior of TZEL CAFÉ with ambient lighting"
          class="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl shadow-black/40"
          loading="lazy"
          width="600"
          height="750"
        />
        <aside
          class="absolute -bottom-6 -left-4 max-w-[220px] rounded-2xl border border-tzel-bronze/30 bg-tzel-espresso/95 p-5 shadow-xl backdrop-blur-sm sm:-left-8"
        >
          <p class="font-serif text-3xl text-tzel-gold">10+</p>
          <p class="text-sm font-medium text-tzel-cream">Years of Excellence</p>
          <p class="mt-1 text-xs text-tzel-muted">Serving Nairobi since 2015</p>
        </aside>
      </div>
    </div>
  </section>
</template>
