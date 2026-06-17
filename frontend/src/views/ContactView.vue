<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import LocationSection from '@/components/home/LocationSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'

usePageMeta()
</script>

<template>
  <main class="pt-24">
    <LocationSection />
    <ContactSection />
  </main>
</template>
