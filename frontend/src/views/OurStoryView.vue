<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import ValuesSection from '@/components/home/ValuesSection.vue'
import SustainabilitySection from '@/components/home/SustainabilitySection.vue'
import BusinessModelSection from '@/components/home/BusinessModelSection.vue'
import CommunityImpactSection from '@/components/home/CommunityImpactSection.vue'
import CorporateServicesSection from '@/components/home/CorporateServicesSection.vue'
import RewardsSection from '@/components/home/RewardsSection.vue'
import WhyChooseSection from '@/components/home/WhyChooseSection.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'

usePageMeta()
</script>

<template>
  <main class="pt-24">
    <section class="px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">TZEL CAFÉ</p>
        <h1 class="mt-3 font-serif text-4xl text-tzel-cream sm:text-5xl">Our Story</h1>
        <p class="mx-auto mt-4 max-w-2xl text-tzel-sand/80">
          Where great taste meets great purpose — explore our values, impact programmes, and what makes TZEL special.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <PrimaryButton to="/menu" size="lg">Order Now</PrimaryButton>
          <PrimaryButton to="/contact" variant="secondary" size="lg">Contact Us</PrimaryButton>
        </div>
      </div>
    </section>

    <ValuesSection />
    <SustainabilitySection />
    <BusinessModelSection />
    <CommunityImpactSection />
    <CorporateServicesSection />
    <RewardsSection />
    <WhyChooseSection />
  </main>
</template>
