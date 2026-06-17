<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const isLoading = ref(false)
const error = ref('')
const sent = ref(false)

const inputClass =
  'w-full rounded-xl border border-white/10 bg-tzel-ink/40 px-4 py-3 text-tzel-cream focus:border-tzel-bronze focus:outline-none focus:ring-1 focus:ring-tzel-bronze'

async function submit() {
  error.value = ''
  isLoading.value = true
  try {
    await auth.sendPasswordOtp(email.value)
    sent.value = true
    await router.push({ name: 'reset-password', query: { email: email.value } })
  } catch (e: any) {
    error.value = e?.message || 'Could not send code.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen pt-24">
    <section class="px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg rounded-3xl border border-white/5 bg-tzel-espresso/40 p-8">
        <h1 class="font-serif text-3xl text-tzel-cream">Forgot password</h1>
        <p class="mt-2 text-sm text-tzel-sand/80">We will email you a 6-digit verification code.</p>
        <p v-if="error" class="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{{ error }}</p>
        <form class="mt-8 space-y-5" @submit.prevent="submit">
          <div>
            <label class="mb-1.5 block text-sm text-tzel-sand" for="email">Email</label>
            <input id="email" v-model="email" type="email" required :class="inputClass" />
          </div>
          <PrimaryButton type="submit" class="w-full" :disabled="isLoading">Send verification code</PrimaryButton>
        </form>
        <p class="mt-6 text-center text-sm">
          <RouterLink to="/login" class="text-tzel-gold hover:underline">Back to login</RouterLink>
        </p>
      </div>
    </section>
  </main>
</template>
