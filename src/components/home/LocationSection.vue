<script setup lang="ts">
import { ref } from 'vue'
import { CAFE_LOCATIONS } from '@/data/locations'

const selectedLocation = ref(CAFE_LOCATIONS[0])

function selectLocation(id: string) {
  const location = CAFE_LOCATIONS.find((entry) => entry.id === id)
  if (location) selectedLocation.value = location
}

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
</script>

<template>
  <section
    id="locations"
    class="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    aria-labelledby="locations-heading"
  >
    <div
      class="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-tzel-bronze/5 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-7xl">
      <header class="mb-12 text-center">
        <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">
          Visit Us
        </p>
        <h2 id="locations-heading" class="mt-3 font-serif text-3xl text-tzel-cream sm:text-4xl">
          Our Locations
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-tzel-sand/80">
          Find your nearest TZEL CAFÉ. Walk in, order ahead, or reserve a table.
        </p>
      </header>

      <div class="grid gap-8 lg:grid-cols-2">
        <div class="space-y-4">
          <button
            v-for="location in CAFE_LOCATIONS"
            :key="location.id"
            type="button"
            class="w-full rounded-2xl border p-6 text-left transition-all duration-300"
            :class="
              selectedLocation.id === location.id
                ? 'border-tzel-bronze bg-tzel-espresso/80'
                : 'border-white/5 bg-tzel-espresso/30 hover:border-tzel-bronze/30'
            "
            @click="selectLocation(location.id)"
          >
            <h3 class="font-serif text-lg text-tzel-cream">{{ location.name }}</h3>
            <p class="mt-2 text-sm text-tzel-sand/80">{{ location.address }}</p>
            <div class="mt-4 flex flex-wrap gap-4 text-sm text-tzel-muted">
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-tzel-bronze" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {{ location.hours }}
              </span>
              <a
                :href="`tel:${location.phone.replace(/\s/g, '')}`"
                class="flex items-center gap-2 transition hover:text-tzel-gold"
                @click.stop
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-tzel-bronze" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                {{ location.phone }}
              </a>
            </div>
          </button>
        </div>

        <div class="overflow-hidden rounded-2xl border border-white/5">
          <iframe
            :title="`Map showing ${selectedLocation.name}`"
            :src="mapEmbedUrl(selectedLocation.coordinates)"
            class="h-80 w-full grayscale-[30%] contrast-[1.1] lg:h-full lg:min-h-[360px]"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </section>
</template>
