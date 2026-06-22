<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CategoryFilter from '@/components/menu/CategoryFilter.vue'
import MenuItemCard from '@/components/menu/MenuItemCard.vue'
import { useMenuStore } from '@/stores/menu'

const menu = useMenuStore()
const route = useRoute()

const activeCategory = ref<string | 'all'>('all')

const filteredItems = computed(() => {
  if (activeCategory.value === 'all') return menu.items
  return menu.items.filter((item) => item.category === activeCategory.value)
})

function syncCategoryFromRoute() {
  const slug = route.query.category
  if (typeof slug === 'string' && slug) {
    activeCategory.value = slug
  }
}

onMounted(async () => {
  if (menu.items.length === 0) {
    await menu.refresh()
  }
  syncCategoryFromRoute()
})

watch(() => route.query.category, syncCategoryFromRoute)
</script>

<template>
  <main class="min-h-screen pt-24">
    <section class="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div
        class="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-tzel-bronze/10 blur-3xl"
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-7xl">
        <header class="mb-10 text-center">
          <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">
            Our Menu
          </p>
          <h1 class="mt-3 font-serif text-4xl text-tzel-cream sm:text-5xl">
            Crafted to Perfection
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-tzel-sand/80">
            Browse our curated selection of artisan coffee, fresh pastries, hearty meals,
            and refreshing cold beverages.
          </p>
        </header>

        <CategoryFilter
          v-model="activeCategory"
          class="mb-10"
          :categories="menu.categories.map((c) => ({ id: c.slug, label: c.name }))"
        />

        <p v-if="menu.isLoading" class="py-16 text-center text-tzel-muted">
          Loading menu…
        </p>

        <p v-else-if="menu.error" class="py-16 text-center text-tzel-muted">
          {{ menu.error }}
        </p>

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          mode="out-in"
        >
          <div
            :key="activeCategory"
            class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <MenuItemCard
              v-for="item in filteredItems"
              :key="item.id"
              :item="{
                id: String(item.id),
                name: item.name,
                description: item.description || '',
                price: item.price,
                category: item.category || 'brewed-coffee',
                image: item.image,
                rating: item.rating ?? undefined,
                featured: item.featured ?? undefined,
              }"
            />
          </div>
        </Transition>

        <p
          v-if="filteredItems.length === 0"
          class="py-20 text-center text-tzel-muted"
        >
          No items in this category yet.
        </p>
      </div>
    </section>
  </main>
</template>
