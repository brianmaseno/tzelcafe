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
        <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">OUR STORY</p>
        <h2
          id="about-heading"
          class="mt-3 font-serif text-3xl leading-tight text-tzel-cream sm:text-4xl lg:text-5xl"
        >
          Creating memorable experiences, one cup, one meal, one connection at a time
        </h2>
        <p class="mt-6 text-base leading-relaxed text-tzel-sand/85">
          {{ BRAND.name }} {{ BRAND.suffix }} was founded on a simple idea: to create a place where
          people can enjoy exceptional food, premium beverages, meaningful conversations, and experiences
          that nourish both people and communities.
        </p>
        <p class="mt-4 text-base leading-relaxed text-tzel-sand/85">
          We believe food creates connections, coffee inspires ideas, and businesses should do well while
          doing good. Every cup served and every meal shared contributes to stronger communities and a more
          sustainable future.
        </p>

        <div class="mt-10 grid gap-6 sm:grid-cols-2">
          <div class="rounded-2xl border border-white/5 bg-tzel-espresso/40 p-6">
            <p class="text-xs font-medium tracking-[0.35em] text-tzel-bronze uppercase">OUR PROMISE</p>
            <ul class="mt-4 space-y-2 text-sm text-tzel-sand/85">
              <li>Fresh ingredients.</li>
              <li>Authentic flavours.</li>
              <li>Quality without compromise.</li>
              <li>Warm hospitality.</li>
              <li>Sustainability and social impact.</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-white/5 bg-tzel-espresso/40 p-6">
            <p class="text-xs font-medium tracking-[0.35em] text-tzel-bronze uppercase">EAT. SIP. CONNECT.</p>
            <p class="mt-4 text-sm leading-relaxed text-tzel-sand/85">
              Eat delicious meals. Sip amazing beverages. Connect with family, friends, colleagues, and communities.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <PrimaryButton to="/menu" variant="secondary">Order Online</PrimaryButton>
              <PrimaryButton to="/our-story" variant="ghost">Our Story</PrimaryButton>
            </div>
          </div>
        </div>
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
          <p class="font-serif text-3xl text-tzel-gold">Fast.</p>
          <p class="text-sm font-medium text-tzel-cream">Fresh. Convenient.</p>
          <p class="mt-1 text-xs text-tzel-muted">Website ordering • Delivery • Corporate orders</p>
        </aside>
      </div>
    </div>
  </section>
</template>
