<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { BRAND } from '@/constants/brand'

const currentSlide = ref(0)

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80',
    alt: 'Barista pouring latte art in warm café lighting',
  },
  {
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
    alt: 'Gourmet plated meal with fresh ingredients',
  },
  {
    image:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80',
    alt: 'Freshly brewed coffee with rich crema',
  },
]

let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  intervalId = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 6000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <section
    class="relative min-h-[100svh] overflow-hidden pt-24"
    aria-labelledby="hero-heading"
  >
    <!-- Ambient background orbs (Eato-style soft ellipses) -->
    <div
      class="pointer-events-none absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-tzel-bronze/10 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -right-24 top-20 h-[420px] w-[420px] rounded-full bg-tzel-roast/60 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-32 left-1/4 h-[380px] w-[380px] rounded-full bg-tzel-bronze/5 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-28">
      <!-- Copy column -->
      <div class="order-2 lg:order-1">
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-tzel-bronze/30 bg-tzel-espresso/60 px-4 py-2 text-sm text-tzel-sand backdrop-blur-sm"
        >
          <span class="h-2 w-2 rounded-full bg-tzel-bronze" aria-hidden="true" />
          <span>Premium Coffeehouse &amp; Restaurant</span>
        </div>

        <h1
          id="hero-heading"
          class="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-tzel-cream text-balance sm:text-5xl lg:text-6xl"
        >
          Savor rich flavors, delight in every bite, enjoy the experience
        </h1>

        <p class="mt-6 max-w-xl text-base leading-relaxed text-tzel-sand/90 sm:text-lg">
          Experience a warm fusion of artisan coffee and crafted cuisine — passion
          in every pour, elegance in every plate. Welcome to {{ BRAND.name }}
          {{ BRAND.suffix }}.
        </p>

        <p class="mt-4 text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">
          {{ BRAND.tagline }}
        </p>

        <div class="mt-10 flex flex-wrap gap-4">
          <PrimaryButton to="/menu" size="lg">
            Order Now
          </PrimaryButton>
          <PrimaryButton to="/menu" variant="secondary" size="lg">
            Explore Our Menu
          </PrimaryButton>
        </div>

        <!-- Social proof strip -->
        <div class="mt-12 grid gap-6 sm:grid-cols-2">
          <figure class="overflow-hidden rounded-2xl border border-white/5 bg-tzel-espresso/50 p-1">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=480&q=80"
              alt="TZEL CAFÉ signature espresso"
              class="h-36 w-full rounded-xl object-cover"
              loading="lazy"
              width="240"
              height="182"
            />
          </figure>

          <blockquote class="flex flex-col justify-center rounded-2xl border border-white/5 bg-tzel-espresso/40 p-5">
            <div class="flex items-center gap-2" aria-label="5 out of 5 stars">
              <span
                v-for="star in 5"
                :key="star"
                class="text-tzel-bronze"
                aria-hidden="true"
              >★</span>
              <span class="ml-1 text-sm font-semibold text-tzel-cream">5.0</span>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-tzel-sand/80">
              Fresh ingredients, bold flavors, and a space that feels like home.
              Every visit is worth the trip.
            </p>
          </blockquote>
        </div>
      </div>

      <!-- Visual column with carousel -->
      <div class="relative order-1 lg:order-2">
        <div class="relative aspect-[4/5] overflow-hidden rounded-3xl border border-tzel-bronze/20 shadow-2xl shadow-black/40 sm:aspect-[5/6]">
          <Transition
            enter-active-class="transition-opacity duration-700 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-700 ease-in absolute inset-0"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            mode="out-in"
          >
            <img
              :key="slides[currentSlide].image"
              :src="slides[currentSlide].image"
              :alt="slides[currentSlide].alt"
              class="h-full w-full object-cover"
              loading="eager"
              width="646"
              height="666"
            />
          </Transition>

          <div
            class="absolute inset-0 bg-gradient-to-t from-tzel-ink/70 via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>

        <!-- Floating badge: quality -->
        <aside
          class="absolute -bottom-4 -left-2 max-w-[180px] rounded-2xl border border-tzel-bronze/30 bg-tzel-espresso/95 p-4 shadow-xl backdrop-blur-sm sm:-left-6"
          aria-label="Quality guarantee"
        >
          <p class="font-serif text-lg text-tzel-gold">100%</p>
          <p class="text-sm font-medium text-tzel-cream">High Quality</p>
          <p class="mt-1 text-xs text-tzel-muted">Finest raw ingredients</p>
        </aside>

        <!-- Floating badge: award -->
        <aside
          class="absolute -right-2 top-8 max-w-[150px] rounded-2xl border border-tzel-bronze/30 bg-tzel-espresso/95 p-4 text-center shadow-xl backdrop-blur-sm sm:-right-6"
          aria-label="Award recognition"
        >
          <div class="flex justify-center gap-1 text-tzel-bronze" aria-hidden="true">
            <span>★</span><span>★</span><span>★</span>
          </div>
          <p class="mt-1 text-sm font-medium text-tzel-cream">Award Winning</p>
        </aside>

        <!-- Carousel indicators -->
        <div
          class="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2"
          role="tablist"
          aria-label="Hero image carousel"
        >
          <button
            v-for="(_, index) in slides"
            :key="index"
            type="button"
            role="tab"
            class="h-2 rounded-full transition-all duration-300"
            :class="index === currentSlide ? 'w-8 bg-tzel-bronze' : 'w-2 bg-white/40'"
            :aria-selected="index === currentSlide"
            :aria-label="`Slide ${index + 1}`"
            @click="currentSlide = index"
          />
        </div>
      </div>
    </div>
  </section>
</template>
