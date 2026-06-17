<script setup lang="ts">
import { PRIMARY_LOCATION } from '@/data/locations'

function mapEmbedUrl(coords: { lat: number; lng: number }) {
  const delta = 0.012
  const bbox = [
    coords.lng - delta,
    coords.lat - delta,
    coords.lng + delta,
    coords.lat + delta,
  ].join(',')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`
}

const location = PRIMARY_LOCATION
</script>

<template>
  <section
    id="location"
    class="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    aria-labelledby="locations-heading"
  >
    <div class="relative mx-auto max-w-7xl">
      <header class="mb-12 text-center">
        <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">Visit Us</p>
        <h2 id="locations-heading" class="mt-3 font-serif text-3xl text-tzel-cream sm:text-4xl">
          Our Location
        </h2>
      </header>

      <div class="grid gap-8 lg:grid-cols-2">
        <div class="rounded-2xl border border-tzel-bronze/30 bg-tzel-espresso/80 p-8">
          <h3 class="font-serif text-xl text-tzel-cream">{{ location.name }}</h3>
          <p class="mt-4 text-sm leading-relaxed text-tzel-sand/85">{{ location.address }}</p>
          <div class="mt-6 space-y-3 text-sm text-tzel-muted">
            <p class="flex items-center gap-2">
              <span class="text-tzel-bronze" aria-hidden="true">☎</span>
              <a :href="`tel:${location.phone.replace(/\s/g, '')}`" class="text-tzel-gold hover:underline">{{ location.phone }}</a>
            </p>
            <p class="flex items-center gap-2">
              <span class="text-tzel-bronze" aria-hidden="true">🕐</span>
              {{ location.hours }}
            </p>
          </div>
        </div>

        <div class="overflow-hidden rounded-2xl border border-white/5">
          <iframe
            :title="`Map showing ${location.name}`"
            :src="mapEmbedUrl(location.coordinates)"
            class="h-80 w-full grayscale-[30%] contrast-[1.1] lg:h-full lg:min-h-[320px]"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </section>
</template>
