<script setup lang="ts">
import { ref } from 'vue'
import { BRAND, NAV_LINKS, FOOTER_LINKS } from '@/constants/brand'
import { apiFetch } from '@/api/client'
import { useI18n } from '@/composables/useI18n'

const email = ref('')
const status = ref('')
const error = ref('')
const { locale, setLocale, t } = useI18n()

async function subscribe() {
  status.value = ''
  error.value = ''
  try {
    await apiFetch('/api/newsletter/subscribe', {
      method: 'POST',
      json: { email: email.value, locale: locale.value },
    })
    status.value = t('newsletterSuccess')
    email.value = ''
  } catch (e: any) {
    error.value = e?.message || 'Subscription failed.'
  }
}
</script>

<template>
  <footer class="border-t border-white/5 bg-tzel-espresso/30 px-4 py-12 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-10 md:grid-cols-4">
        <div>
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="TZEL CAFÉ logo" class="h-10 w-10 rounded-full object-cover ring-1 ring-tzel-bronze/40" width="40" height="40" loading="lazy" />
            <div>
              <p class="font-serif tracking-[0.15em] text-tzel-cream">{{ BRAND.name }}</p>
              <p class="text-[10px] tracking-[0.35em] text-tzel-bronze">{{ BRAND.suffix }}</p>
            </div>
          </div>
          <p class="mt-4 text-sm text-tzel-muted">{{ BRAND.tagline }}</p>
          <div class="mt-4 flex gap-2">
            <button type="button" class="rounded-full border px-3 py-1 text-xs" :class="locale === 'en' ? 'border-tzel-gold text-tzel-gold' : 'border-white/10 text-tzel-muted'" @click="setLocale('en')">EN</button>
            <button type="button" class="rounded-full border px-3 py-1 text-xs" :class="locale === 'sw' ? 'border-tzel-gold text-tzel-gold' : 'border-white/10 text-tzel-muted'" @click="setLocale('sw')">SW</button>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <p class="text-sm font-medium text-tzel-cream">Quick Links</p>
          <ul class="mt-4 space-y-2">
            <li v-for="link in NAV_LINKS" :key="link.to">
              <RouterLink :to="link.to" class="text-sm text-tzel-muted transition hover:text-tzel-gold">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <nav aria-label="More pages">
          <p class="text-sm font-medium text-tzel-cream">Explore</p>
          <ul class="mt-4 space-y-2">
            <li v-for="link in FOOTER_LINKS" :key="link.to">
              <RouterLink :to="link.to" class="text-sm text-tzel-muted transition hover:text-tzel-gold">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <div>
          <p class="text-sm font-medium text-tzel-cream">{{ t('newsletterTitle') }}</p>
          <form class="mt-4 flex gap-2" @submit.prevent="subscribe">
            <input v-model="email" type="email" required :placeholder="t('newsletterPlaceholder')" class="flex-1 rounded-xl border border-white/10 bg-tzel-ink/40 px-3 py-2 text-sm text-tzel-cream" />
            <button type="submit" class="rounded-xl bg-tzel-bronze px-4 py-2 text-xs font-semibold text-tzel-ink">{{ t('newsletterButton') }}</button>
          </form>
          <p v-if="status" class="mt-2 text-xs text-tzel-gold">{{ status }}</p>
          <p v-if="error" class="mt-2 text-xs text-red-300">{{ error }}</p>
          <p class="mt-6 text-sm text-tzel-muted">Mon – Sun: 7:00 AM – 10:00 PM</p>
          <p class="mt-2 text-sm text-tzel-muted">hello@tzelcafe.co.ke</p>
        </div>
      </div>

      <div class="mt-10 border-t border-white/5 pt-6 text-center text-xs text-tzel-muted">
        © {{ new Date().getFullYear() }} {{ BRAND.name }} {{ BRAND.suffix }}. All rights reserved.
      </div>
    </div>
  </footer>
</template>
