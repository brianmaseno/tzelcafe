<script setup lang="ts">
import { computed, onMounted } from 'vue'
import MenuItemCard from '@/components/menu/MenuItemCard.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { useMenuStore } from '@/stores/menu'
import type { MenuItem } from '@/types'

const menu = useMenuStore()

const categorySections = computed(() =>
  menu.categories.slice(0, 4).map((category) => ({
    category,
    items: menu.items
      .filter((item) => item.category === category.slug)
      .slice(0, 4)
      .map(
        (i): MenuItem => ({
          id: String(i.id),
          name: i.name,
          description: i.description ?? '',
          price: i.price,
          category: i.categoryLabel || i.category || '',
          image: i.image ?? null,
          rating: i.rating ?? undefined,
          featured: Boolean(i.featured),
        }),
      ),
  })).filter((section) => section.items.length > 0),
)

onMounted(async () => {
  if (!menu.items.length) {
    await menu.refresh()
  }
})
</script>

<template>
  <section
    class="relative border-t border-white/5 px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    aria-labelledby="menu-categories-heading"
  >
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">From Our Menu</p>
          <h2 id="menu-categories-heading" class="mt-3 font-serif text-3xl text-tzel-cream sm:text-4xl">
            Explore by Category
          </h2>
          <p class="mt-3 max-w-xl text-tzel-sand/80">
            Coffee, bites, meals, and more — browse highlights from each section of our menu.
          </p>
        </div>
        <PrimaryButton to="/menu" variant="secondary">See Full Menu</PrimaryButton>
      </div>

      <div v-if="menu.isLoading && !categorySections.length" class="rounded-3xl border border-white/5 bg-tzel-espresso/40 p-10 text-center">
        <p class="text-sm text-tzel-sand/80">Loading menu categories…</p>
      </div>

      <div v-else class="space-y-16">
        <div
          v-for="section in categorySections"
          :key="section.category.id"
          class="scroll-mt-28"
        >
          <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 class="font-serif text-2xl text-tzel-cream">{{ section.category.name }}</h3>
              <p v-if="section.category.description" class="mt-1 max-w-2xl text-sm text-tzel-sand/70">
                {{ section.category.description }}
              </p>
            </div>
            <RouterLink
              :to="{ path: '/menu', query: { category: section.category.slug } }"
              class="text-sm font-medium text-tzel-gold transition hover:text-tzel-cream"
            >
              View all {{ section.category.name }} →
            </RouterLink>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <MenuItemCard v-for="item in section.items" :key="item.id" :item="item" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
