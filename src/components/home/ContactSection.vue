<script setup lang="ts">
import { ref } from 'vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const submitted = ref(false)

function handleSubmit() {
  submitted.value = true
}
</script>

<template>
  <section
    id="contact"
    class="relative px-4 py-24 sm:px-6 lg:px-8"
    aria-labelledby="contact-heading"
  >
    <div class="mx-auto max-w-7xl">
      <div class="overflow-hidden rounded-3xl border border-white/5 bg-tzel-espresso/40">
        <div class="grid lg:grid-cols-2">
          <div class="p-8 sm:p-12 lg:p-16">
            <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">
              Contact
            </p>
            <h2 id="contact-heading" class="mt-3 font-serif text-3xl text-tzel-cream sm:text-4xl">
              Let's Connect
            </h2>
            <p class="mt-4 text-tzel-sand/80">
              Questions, reservations, or catering inquiries — we'd love to hear from you.
            </p>

            <ul class="mt-8 space-y-4 text-sm text-tzel-sand">
              <li class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-tzel-ink/50 text-tzel-bronze">✉</span>
                hello@tzelcafe.co.ke
              </li>
              <li class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-tzel-ink/50 text-tzel-bronze">☎</span>
                +254 700 123 456
              </li>
              <li class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-tzel-ink/50 text-tzel-bronze">📍</span>
                Nairobi, Kenya
              </li>
            </ul>
          </div>

          <div class="border-t border-white/5 bg-tzel-ink/30 p-8 sm:p-12 lg:border-l lg:border-t-0">
            <div v-if="submitted" class="flex h-full flex-col items-center justify-center text-center">
              <p class="font-serif text-2xl text-tzel-gold">Message Sent!</p>
              <p class="mt-2 text-tzel-sand/80">We'll get back to you within 24 hours.</p>
            </div>

            <form v-else class="space-y-5" @submit.prevent="handleSubmit">
              <div>
                <label for="contact-name" class="mb-1.5 block text-sm text-tzel-sand">Name</label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full rounded-xl border border-white/10 bg-tzel-espresso/60 px-4 py-3 text-tzel-cream placeholder:text-tzel-muted focus:border-tzel-bronze focus:outline-none focus:ring-1 focus:ring-tzel-bronze"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label for="contact-email" class="mb-1.5 block text-sm text-tzel-sand">Email</label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full rounded-xl border border-white/10 bg-tzel-espresso/60 px-4 py-3 text-tzel-cream placeholder:text-tzel-muted focus:border-tzel-bronze focus:outline-none focus:ring-1 focus:ring-tzel-bronze"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label for="contact-message" class="mb-1.5 block text-sm text-tzel-sand">Message</label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  required
                  rows="4"
                  class="w-full resize-none rounded-xl border border-white/10 bg-tzel-espresso/60 px-4 py-3 text-tzel-cream placeholder:text-tzel-muted focus:border-tzel-bronze focus:outline-none focus:ring-1 focus:ring-tzel-bronze"
                  placeholder="How can we help?"
                />
              </div>
              <PrimaryButton type="submit" class="w-full">
                Send Message
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
