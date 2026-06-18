<script setup lang="ts">
import { ref } from 'vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { apiFetch } from '@/api/client'
import { PRIMARY_LOCATION } from '@/data/locations'
import { CONTACT } from '@/constants/contact'

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const submitted = ref(false)
const error = ref('')
const isLoading = ref(false)

const location = PRIMARY_LOCATION

const inputClass =
  'w-full rounded-xl border border-white/10 bg-tzel-espresso/60 px-4 py-3 text-tzel-cream placeholder:text-tzel-muted focus:border-tzel-bronze focus:outline-none focus:ring-1 focus:ring-tzel-bronze'

async function handleSubmit() {
  error.value = ''
  isLoading.value = true
  try {
    await apiFetch('/api/contact', {
      method: 'POST',
      json: {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone || null,
        subject: form.value.subject || null,
        message: form.value.message,
      },
    })
    submitted.value = true
  } catch (e: any) {
    error.value = e?.message || 'Could not send message.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section id="contact" class="relative px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="contact-heading">
    <div class="mx-auto max-w-7xl">
      <div class="overflow-hidden rounded-3xl border border-white/5 bg-tzel-espresso/40">
        <div class="grid lg:grid-cols-2">
          <div class="p-8 sm:p-12 lg:p-16">
            <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">Contact</p>
            <h2 id="contact-heading" class="mt-3 font-serif text-3xl text-tzel-cream sm:text-4xl">Let's Connect</h2>
            <p class="mt-4 text-tzel-sand/80">
              Questions, reservations, or catering inquiries — we'd love to hear from you.
            </p>

            <ul class="mt-8 space-y-4 text-sm text-tzel-sand">
              <li class="flex items-start gap-3">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tzel-ink/50 text-tzel-bronze">📍</span>
                <span>
                  <strong class="block text-tzel-cream">{{ location.name }}</strong>
                  {{ location.address }}
                </span>
              </li>
              <li class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-tzel-ink/50 text-tzel-bronze">☎</span>
                <a :href="`tel:${location.phone.replace(/\s/g, '')}`" class="text-tzel-gold hover:underline">{{ location.phone }}</a>
              </li>
              <li class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-tzel-ink/50 text-tzel-bronze">✉</span>
                <a :href="`mailto:${CONTACT.email}`" class="text-tzel-gold hover:underline">{{ CONTACT.email }}</a>
              </li>
              <li class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-tzel-ink/50 text-tzel-bronze">🌐</span>
                <a :href="CONTACT.website" target="_blank" rel="noopener noreferrer" class="text-tzel-gold hover:underline">{{ CONTACT.websiteDisplay }}</a>
              </li>
            </ul>
          </div>

          <div class="border-t border-white/5 bg-tzel-ink/30 p-8 sm:p-12 lg:border-l lg:border-t-0">
            <div v-if="submitted" class="flex h-full flex-col items-center justify-center text-center">
              <p class="font-serif text-2xl text-tzel-gold">Message Sent!</p>
              <p class="mt-2 text-tzel-sand/80">We'll get back to you within 24 hours.</p>
            </div>

            <form v-else class="space-y-5" @submit.prevent="handleSubmit">
              <p v-if="error" class="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{{ error }}</p>
              <div>
                <label for="contact-name" class="mb-1.5 block text-sm text-tzel-sand">Name</label>
                <input id="contact-name" v-model="form.name" type="text" required :class="inputClass" />
              </div>
              <div>
                <label for="contact-email" class="mb-1.5 block text-sm text-tzel-sand">Email</label>
                <input id="contact-email" v-model="form.email" type="email" required :class="inputClass" />
              </div>
              <div>
                <label for="contact-phone" class="mb-1.5 block text-sm text-tzel-sand">Phone (optional)</label>
                <input id="contact-phone" v-model="form.phone" type="tel" :class="inputClass" placeholder="+254 7XX XXX XXX" />
              </div>
              <div>
                <label for="contact-subject" class="mb-1.5 block text-sm text-tzel-sand">Subject (optional)</label>
                <input id="contact-subject" v-model="form.subject" type="text" :class="inputClass" />
              </div>
              <div>
                <label for="contact-message" class="mb-1.5 block text-sm text-tzel-sand">Message</label>
                <textarea id="contact-message" v-model="form.message" required rows="4" :class="inputClass + ' resize-none'" />
              </div>
              <PrimaryButton type="submit" class="w-full" :disabled="isLoading">
                {{ isLoading ? 'Sending…' : 'Send Message' }}
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
