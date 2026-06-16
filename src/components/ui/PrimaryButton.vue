<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  to?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
})

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-tzel-bronze text-tzel-ink hover:bg-tzel-gold focus-visible:ring-tzel-gold',
  secondary:
    'border border-tzel-bronze/60 bg-transparent text-tzel-cream hover:border-tzel-gold hover:text-tzel-gold focus-visible:ring-tzel-bronze',
  ghost:
    'bg-transparent text-tzel-cream hover:text-tzel-gold focus-visible:ring-tzel-muted',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

const classes = [
  'inline-flex items-center justify-center rounded-full font-medium tracking-wide transition-all duration-300',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-tzel-ink',
  'disabled:pointer-events-none disabled:opacity-50',
  variantClasses[props.variant],
  sizeClasses[props.size],
]
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <slot />
  </RouterLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <slot />
  </button>
</template>
