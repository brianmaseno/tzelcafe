<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import FeaturedSection from '@/components/home/FeaturedSection.vue'
import MenuCategoriesSection from '@/components/home/MenuCategoriesSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import PromotionsBanner from '@/components/home/PromotionsBanner.vue'
import MpesaPaymentSection from '@/components/home/MpesaPaymentSection.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
</script>

<template>
  <main>
    <HeroSection />
    <FeaturedSection />
    <MenuCategoriesSection />
    <AboutSection />
    <PromotionsBanner />

    <section class="px-4 py-12 sm:px-6 lg:px-8" aria-label="Discover TZEL">
      <div class="mx-auto max-w-3xl rounded-3xl border border-tzel-bronze/20 bg-tzel-espresso/40 px-8 py-10 text-center">
        <h2 class="font-serif text-2xl text-tzel-cream sm:text-3xl">Discover TZEL CAFÉ</h2>
        <p class="mt-3 text-sm text-tzel-sand/80">
          Values, sustainability, community programmes, corporate services, rewards, and more.
        </p>
        <PrimaryButton to="/our-story" class="mt-6" variant="secondary">Explore Our Story</PrimaryButton>
      </div>
    </section>

    <section class="px-4 py-16 sm:px-6 lg:px-8" aria-label="Order call to action">
      <div class="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-tzel-bronze/20 bg-gradient-to-r from-tzel-espresso to-tzel-roast px-8 py-14 text-center sm:px-16">
        <h2 class="font-serif text-3xl text-tzel-cream sm:text-4xl">ORDER ONLINE</h2>
        <p class="mx-auto mt-4 max-w-xl text-tzel-sand/80">
          Website ordering • WhatsApp ordering • Call and collect • Take away • Corporate orders • Delivery.
          Fast. Fresh. Convenient.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <PrimaryButton to="/menu" size="lg">Order Now</PrimaryButton>
          <PrimaryButton to="/contact" variant="secondary" size="lg">Contact &amp; Location</PrimaryButton>
        </div>
      </div>
    </section>

    <MpesaPaymentSection />
  </main>
</template>
