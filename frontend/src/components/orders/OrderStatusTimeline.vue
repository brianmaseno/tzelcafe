<script setup lang="ts">
import { computed } from 'vue'
import type { ApiOrderStatus } from '@/stores/orders'

const props = defineProps<{
  status: ApiOrderStatus | string
  orderType?: string
}>()

const steps = computed(() => {
  const isDelivery = props.orderType === 'delivery'
  const base = [
    { key: 'placed', label: 'Order placed', statuses: ['pending', 'paid', 'preparing', 'out_for_delivery', 'delivered'] },
    { key: 'paid', label: 'Payment confirmed', statuses: ['paid', 'preparing', 'out_for_delivery', 'delivered'] },
    { key: 'preparing', label: 'Preparing your order', statuses: ['preparing', 'out_for_delivery', 'delivered'] },
    {
      key: 'fulfillment',
      label: isDelivery ? 'Out for delivery' : 'Ready for pickup',
      statuses: ['out_for_delivery', 'delivered'],
    },
    { key: 'delivered', label: isDelivery ? 'Delivered' : 'Collected', statuses: ['delivered'] },
  ]

  if (props.status === 'cancelled') {
    return [{ key: 'cancelled', label: 'Order cancelled', statuses: ['cancelled'] }]
  }

  return base
})

const activeIndex = computed(() => {
  if (props.status === 'cancelled') return 0
  const idx = steps.value.findIndex((s) => s.statuses.includes(props.status))
  return idx >= 0 ? idx : 0
})

function stepState(index: number): 'done' | 'current' | 'upcoming' {
  if (index < activeIndex.value) return 'done'
  if (index === activeIndex.value) return 'current'
  return 'upcoming'
}
</script>

<template>
  <ol class="space-y-0">
    <li
      v-for="(step, index) in steps"
      :key="step.key"
      class="relative flex gap-4 pb-8 last:pb-0"
    >
      <div class="flex flex-col items-center">
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold"
          :class="{
            'border-tzel-bronze bg-tzel-bronze text-tzel-ink': stepState(index) === 'done',
            'border-tzel-gold bg-tzel-gold/20 text-tzel-gold': stepState(index) === 'current',
            'border-white/15 bg-tzel-ink/40 text-tzel-muted': stepState(index) === 'upcoming',
          }"
        >
          <template v-if="stepState(index) === 'done'">✓</template>
          <template v-else>{{ index + 1 }}</template>
        </span>
        <span
          v-if="index < steps.length - 1"
          class="mt-1 w-px flex-1 min-h-[2rem] bg-white/10"
          :class="{ 'bg-tzel-bronze/60': stepState(index) === 'done' }"
          aria-hidden="true"
        />
      </div>
      <div class="pt-1.5">
        <p
          class="text-sm font-medium capitalize"
          :class="stepState(index) === 'upcoming' ? 'text-tzel-muted' : 'text-tzel-cream'"
        >
          {{ step.label }}
        </p>
        <p v-if="stepState(index) === 'current'" class="mt-1 text-xs text-tzel-bronze">
          Current status: {{ status.replace(/_/g, ' ') }}
        </p>
      </div>
    </li>
  </ol>
</template>
