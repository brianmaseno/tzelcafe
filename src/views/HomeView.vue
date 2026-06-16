<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import FeaturedSection from '@/components/home/FeaturedSection.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import LocationSection from '@/components/home/LocationSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
</script>

<template>
  <main>
    <HeroSection />
    <AboutSection />
    <StatsSection />
    <FeaturedSection />

    <!-- CTA banner -->
    <section class="px-4 py-16 sm:px-6 lg:px-8" aria-label="Order call to action">
      <div class="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-tzel-bronze/20 bg-gradient-to-r from-tzel-espresso to-tzel-roast px-8 py-14 text-center sm:px-16">
        <h2 class="font-serif text-3xl text-tzel-cream sm:text-4xl">
          Ready to taste the difference?
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-tzel-sand/80">
          Order ahead for pickup or explore our full menu — crafted fresh, served with warmth.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <PrimaryButton to="/menu" size="lg">Order Now</PrimaryButton>
          <PrimaryButton to="/#locations" variant="secondary" size="lg">
            Find a Location
          </PrimaryButton>
        </div>
      </div>
    </section>

    <LocationSection />
    <ContactSection />
  </main>
</template>
