<script setup lang="ts">
import { ref } from 'vue'
import MenuItemCard from '@/components/menu/MenuItemCard.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { FEATURED_ITEMS } from '@/data/menu'

const activeIndex = ref(1)
const featured = FEATURED_ITEMS
</script>

<template>
  <section
    class="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    aria-labelledby="featured-heading"
  >
    <div
      class="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-tzel-bronze/5 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-7xl">
      <div class="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">
            Signature Selection
          </p>
          <h2 id="featured-heading" class="mt-3 font-serif text-3xl text-tzel-cream sm:text-4xl">
            Guest Favorites
          </h2>
          <p class="mt-3 max-w-xl text-tzel-sand/80">
            Hand-picked dishes and drinks our guests return for again and again.
          </p>
        </div>
        <PrimaryButton to="/menu" variant="secondary">
          View Full Menu
        </PrimaryButton>
      </div>

      <!-- Desktop grid -->
      <div class="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
        <MenuItemCard
          v-for="item in featured.slice(0, 4)"
          :key="item.id"
          :item="item"
        />
      </div>

      <!-- Mobile spotlight carousel -->
      <div class="md:hidden">
        <div class="overflow-hidden rounded-2xl">
          <Transition
            enter-active-class="transition-all duration-400 ease-out"
            enter-from-class="opacity-0 translate-x-8"
            enter-to-class="opacity-100 translate-x-0"
            mode="out-in"
          >
            <MenuItemCard
              :key="featured[activeIndex]?.id"
              :item="featured[activeIndex]!"
            />
          </Transition>
        </div>
        <div class="mt-4 flex justify-center gap-2">
          <button
            v-for="(_, index) in featured.slice(0, 4)"
            :key="index"
            type="button"
            class="h-2 rounded-full transition-all"
            :class="index === activeIndex ? 'w-8 bg-tzel-bronze' : 'w-2 bg-white/30'"
            :aria-label="`Featured item ${index + 1}`"
            @click="activeIndex = index"
          />
        </div>
      </div>
    </div>
  </section>
</template>
