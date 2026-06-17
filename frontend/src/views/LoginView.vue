<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

const inputClass =
  'w-full rounded-xl border border-white/10 bg-tzel-ink/40 px-4 py-3 text-tzel-cream placeholder:text-tzel-muted focus:border-tzel-bronze focus:outline-none focus:ring-1 focus:ring-tzel-bronze'

async function submit() {
  error.value = ''
  isLoading.value = true
  try {
    await auth.login(email.value, password.value)
    await router.push((route.query.next as string) || '/account')
  } catch (e: any) {
    error.value = e?.message || 'Login failed.'
  } finally {
    isLoading.value = false
  }
}

function googleLogin() {
  window.location.href = auth.googleLoginUrl()
}
</script>

<template>
  <main class="min-h-screen pt-24">
    <section class="px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg overflow-hidden rounded-3xl border border-white/5 bg-tzel-espresso/40 p-8 shadow-2xl shadow-black/30">
        <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">Account</p>
        <h1 class="mt-3 font-serif text-3xl text-tzel-cream">Welcome back</h1>
        <p class="mt-2 text-sm text-tzel-sand/80">Login to place orders and track delivery status.</p>

        <p v-if="error" class="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{{ error }}</p>

        <form class="mt-8 space-y-5" @submit.prevent="submit">
          <div>
            <label class="mb-1.5 block text-sm text-tzel-sand" for="email">Email</label>
            <input id="email" v-model="email" type="email" autocomplete="email" required :class="inputClass" placeholder="you@email.com" />
          </div>
          <div>
            <div class="mb-1.5 flex items-center justify-between">
              <label class="text-sm text-tzel-sand" for="password">Password</label>
              <RouterLink to="/forgot-password" class="text-xs text-tzel-gold hover:underline">Forgot password?</RouterLink>
            </div>
            <input id="password" v-model="password" type="password" autocomplete="current-password" required :class="inputClass" />
          </div>

          <PrimaryButton type="submit" class="w-full" :disabled="isLoading">{{ isLoading ? 'Signing in…' : 'Sign In' }}</PrimaryButton>
        </form>

        <button
          type="button"
          class="mt-4 flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-tzel-ink/30 px-6 py-3 text-sm text-tzel-cream transition hover:border-tzel-bronze/50"
          @click="googleLogin"
        >
          <span aria-hidden="true">G</span>
          Continue with Google
        </button>

        <p class="mt-6 text-center text-sm text-tzel-muted">
          Don’t have an account?
          <RouterLink to="/register" class="text-tzel-gold hover:underline">Register</RouterLink>
        </p>
      </div>
    </section>
  </main>
</template>
