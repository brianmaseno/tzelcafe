<script setup lang="ts">
import type { MenuCategory } from '@/types'
import { MENU_CATEGORIES } from '@/constants/brand'

interface Props {
  modelValue: MenuCategory | 'all'
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: MenuCategory | 'all']
}>()

const categories = [{ id: 'all' as const, label: 'All Items' }, ...MENU_CATEGORIES]

function selectCategory(id: MenuCategory | 'all') {
  emit('update:modelValue', id)
}
</script>

<template>
  <div
    class="flex gap-2 overflow-x-auto pb-2 scrollbar-none"
    role="tablist"
    aria-label="Menu categories"
  >
    <button
      v-for="category in categories"
      :key="category.id"
      type="button"
      role="tab"
      class="shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300"
      :class="
        modelValue === category.id
          ? 'border-tzel-bronze bg-tzel-bronze text-tzel-ink'
          : 'border-white/10 bg-tzel-espresso/60 text-tzel-sand hover:border-tzel-bronze/50 hover:text-tzel-cream'
      "
      :aria-selected="modelValue === category.id"
      @click="selectCategory(category.id)"
    >
      {{ category.label }}
    </button>
  </div>
</template>

<style scoped>
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
