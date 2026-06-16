<script setup lang="ts">
import { BRAND, NAV_LINKS } from '@/constants/brand'
</script>

<template>
  <footer class="border-t border-white/5 bg-tzel-espresso/30 px-4 py-12 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <div class="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="TZEL CAFÉ logo"
              class="h-10 w-10 rounded-full object-cover ring-1 ring-tzel-bronze/40"
              width="40"
              height="40"
              loading="lazy"
            />
            <div>
              <p class="font-serif tracking-[0.15em] text-tzel-cream">{{ BRAND.name }}</p>
              <p class="text-[10px] tracking-[0.35em] text-tzel-bronze">{{ BRAND.suffix }}</p>
            </div>
          </div>
          <p class="mt-4 text-sm text-tzel-muted">{{ BRAND.tagline }}</p>
        </div>

        <nav aria-label="Footer navigation">
          <p class="text-sm font-medium text-tzel-cream">Quick Links</p>
          <ul class="mt-4 space-y-2">
            <li v-for="link in NAV_LINKS" :key="link.to">
              <RouterLink
                :to="link.to"
                class="text-sm text-tzel-muted transition hover:text-tzel-gold"
              >
                {{ link.label }}
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/checkout" class="text-sm text-tzel-muted transition hover:text-tzel-gold">
                Checkout
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div>
          <p class="text-sm font-medium text-tzel-cream">Hours</p>
          <p class="mt-4 text-sm text-tzel-muted">Mon – Sun: 7:00 AM – 10:00 PM</p>
          <p class="mt-2 text-sm text-tzel-muted">hello@tzelcafe.co.ke</p>
        </div>
      </div>

      <div class="mt-10 border-t border-white/5 pt-6 text-center text-xs text-tzel-muted">
        © {{ new Date().getFullYear() }} {{ BRAND.name }} {{ BRAND.suffix }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>
