<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { SITE_PAGES } from '@/data/sitePages'
import { usePageMeta } from '@/composables/usePageMeta'

const route = useRoute()
usePageMeta()

const page = computed(() => SITE_PAGES[route.meta.pageKey as string])
</script>

<template>
  <main v-if="page" class="min-h-screen pt-24">
    <section class="px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">TZEL CAFÉ</p>
        <h1 class="mt-3 font-serif text-4xl text-tzel-cream">{{ page.title }}</h1>
        <p v-if="page.intro" class="mt-4 text-lg text-tzel-sand/85">{{ page.intro }}</p>

        <div class="mt-10 space-y-6">
          <article
            v-for="section in page.sections"
            :key="section.title"
            class="rounded-3xl border border-white/5 bg-tzel-espresso/40 p-8"
          >
            <h2 class="font-serif text-xl text-tzel-cream">{{ section.title }}</h2>
            <p class="mt-3 text-sm leading-relaxed text-tzel-sand/85">{{ section.body }}</p>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
