<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import LocationSection from '@/components/home/LocationSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import MpesaPaymentSection from '@/components/home/MpesaPaymentSection.vue'

usePageMeta()
</script>

<template>
  <main class="pt-24">
    <LocationSection />
    <ContactSection />
    <MpesaPaymentSection />
  </main>
</template>
