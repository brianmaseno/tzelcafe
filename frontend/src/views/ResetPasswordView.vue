<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const email = ref((route.query.email as string) || '')
const otp = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const isLoading = ref(false)
const error = ref('')

const inputClass =
  'w-full rounded-xl border border-white/10 bg-tzel-ink/40 px-4 py-3 text-tzel-cream focus:border-tzel-bronze focus:outline-none focus:ring-1 focus:ring-tzel-bronze'

async function submit() {
  error.value = ''
  isLoading.value = true
  try {
    await auth.resetPasswordWithOtp(email.value, otp.value, password.value, passwordConfirmation.value)
    await router.push('/login')
  } catch (e: any) {
    error.value = e?.message || 'Reset failed.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen pt-24">
    <section class="px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg rounded-3xl border border-white/5 bg-tzel-espresso/40 p-8">
        <h1 class="font-serif text-3xl text-tzel-cream">Reset password</h1>
        <p class="mt-2 text-sm text-tzel-sand/80">Enter the code from your email and choose a new password.</p>
        <p v-if="error" class="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{{ error }}</p>
        <form class="mt-8 space-y-5" @submit.prevent="submit">
          <div>
            <label class="mb-1.5 block text-sm text-tzel-sand" for="email">Email</label>
            <input id="email" v-model="email" type="email" required :class="inputClass" />
          </div>
          <div>
            <label class="mb-1.5 block text-sm text-tzel-sand" for="otp">Verification code</label>
            <input id="otp" v-model="otp" type="text" maxlength="6" required :class="inputClass + ' font-mono tracking-[0.5em]'" />
          </div>
          <div>
            <label class="mb-1.5 block text-sm text-tzel-sand" for="password">New password</label>
            <input id="password" v-model="password" type="password" required :class="inputClass" />
          </div>
          <div>
            <label class="mb-1.5 block text-sm text-tzel-sand" for="password2">Confirm password</label>
            <input id="password2" v-model="passwordConfirmation" type="password" required :class="inputClass" />
          </div>
          <PrimaryButton type="submit" class="w-full" :disabled="isLoading">Reset password</PrimaryButton>
        </form>
      </div>
    </section>
  </main>
</template>
