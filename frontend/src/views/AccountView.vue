<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useOrdersStore } from '@/stores/orders'
import { formatPrice } from '@/utils/format'
import { usePageMeta } from '@/composables/usePageMeta'

const auth = useAuthStore()
const ordersStore = useOrdersStore()
usePageMeta()

const name = ref('')
const email = ref('')
const otp = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const profileStatus = ref('')
const passwordStatus = ref('')
const profileError = ref('')
const passwordError = ref('')

const recentOrders = computed(() => ordersStore.orders.slice(0, 10))
const inputClass =
  'w-full rounded-xl border border-white/10 bg-tzel-ink/40 px-4 py-3 text-tzel-cream focus:border-tzel-bronze focus:outline-none focus:ring-1 focus:ring-tzel-bronze'

onMounted(async () => {
  await auth.fetchMe()
  name.value = auth.user?.name || ''
  email.value = auth.user?.email || ''
  await ordersStore.refresh()
})

async function saveProfile() {
  profileError.value = ''
  profileStatus.value = ''
  try {
    await auth.updateProfile(name.value, email.value)
    profileStatus.value = 'Profile updated.'
  } catch (e: any) {
    profileError.value = e?.message || 'Update failed.'
  }
}

async function sendOtp() {
  passwordError.value = ''
  passwordStatus.value = ''
  try {
    await auth.sendProfileOtp()
    passwordStatus.value = 'Verification code sent to your email.'
  } catch (e: any) {
    passwordError.value = e?.message || 'Could not send code.'
  }
}

async function changePassword() {
  passwordError.value = ''
  passwordStatus.value = ''
  try {
    await auth.updatePassword(otp.value, password.value, passwordConfirmation.value)
    passwordStatus.value = 'Password updated.'
    otp.value = ''
    password.value = ''
    passwordConfirmation.value = ''
  } catch (e: any) {
    passwordError.value = e?.message || 'Password update failed.'
  }
}
</script>

<template>
  <main class="min-h-screen pt-24">
    <section class="px-4 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl space-y-8">
        <div class="rounded-3xl border border-white/5 bg-tzel-espresso/40 p-8">
          <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">Profile</p>
          <h1 class="mt-3 font-serif text-3xl text-tzel-cream">Your Account</h1>

          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl border border-tzel-bronze/20 bg-tzel-ink/30 p-6">
              <p class="text-sm text-tzel-muted">TZEL Rewards points</p>
              <p class="mt-2 font-serif text-3xl text-tzel-gold">{{ auth.user?.reward_points ?? 0 }}</p>
              <p class="mt-2 text-xs text-tzel-sand/70">Earn 1 point per KES 100 on paid orders.</p>
            </div>
            <div class="rounded-2xl border border-white/5 bg-tzel-ink/30 p-6 flex flex-col justify-center gap-3">
              <PrimaryButton to="/menu" variant="secondary">Browse Menu</PrimaryButton>
              <PrimaryButton to="/checkout">Go to Checkout</PrimaryButton>
              <PrimaryButton variant="ghost" @click="auth.logout()">Logout</PrimaryButton>
            </div>
          </div>
        </div>

        <form class="rounded-3xl border border-white/5 bg-tzel-espresso/40 p-8" @submit.prevent="saveProfile">
          <h2 class="font-serif text-xl text-tzel-cream">Edit profile</h2>
          <p v-if="profileStatus" class="mt-4 text-sm text-tzel-gold">{{ profileStatus }}</p>
          <p v-if="profileError" class="mt-4 text-sm text-red-300">{{ profileError }}</p>
          <div class="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-sm text-tzel-sand" for="name">Name</label>
              <input id="name" v-model="name" type="text" required :class="inputClass" />
            </div>
            <div>
              <label class="mb-1.5 block text-sm text-tzel-sand" for="email">Email</label>
              <input id="email" v-model="email" type="email" required :class="inputClass" />
            </div>
          </div>
          <PrimaryButton type="submit" class="mt-6">Save profile</PrimaryButton>
        </form>

        <div class="rounded-3xl border border-white/5 bg-tzel-espresso/40 p-8">
          <h2 class="font-serif text-xl text-tzel-cream">Change password</h2>
          <p class="mt-2 text-sm text-tzel-sand/80">Requires a 6-digit code sent to your email.</p>
          <p v-if="passwordStatus" class="mt-4 text-sm text-tzel-gold">{{ passwordStatus }}</p>
          <p v-if="passwordError" class="mt-4 text-sm text-red-300">{{ passwordError }}</p>
          <button type="button" class="mt-4 text-sm text-tzel-gold underline" @click="sendOtp">Send verification code</button>
          <form class="mt-6 space-y-4" @submit.prevent="changePassword">
            <input v-model="otp" type="text" maxlength="6" placeholder="000000" :class="inputClass + ' font-mono'" required />
            <input v-model="password" type="password" placeholder="New password" :class="inputClass" required />
            <input v-model="passwordConfirmation" type="password" placeholder="Confirm password" :class="inputClass" required />
            <PrimaryButton type="submit">Update password</PrimaryButton>
          </form>
        </div>

        <div class="rounded-3xl border border-white/5 bg-tzel-espresso/40 p-8">
          <h2 class="font-serif text-xl text-tzel-cream">Your orders</h2>
          <div v-if="recentOrders.length" class="mt-6 space-y-4">
            <article v-for="order in recentOrders" :key="order.id" class="rounded-2xl border border-white/5 bg-tzel-ink/30 p-5">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <p class="font-mono text-sm text-tzel-bronze">#{{ order.id }}</p>
                <span class="rounded-full border border-white/10 px-3 py-1 text-xs capitalize text-tzel-sand">{{ order.status }}</span>
              </div>
              <p class="mt-2 text-sm text-tzel-cream">{{ formatPrice((order.total_cents || 0) / 100) }}</p>
              <ul class="mt-3 space-y-1 text-xs text-tzel-muted">
                <li v-for="item in order.items" :key="item.id">{{ item.quantity }}× {{ item.name }}</li>
              </ul>
              <PrimaryButton :to="`/track-order?order=${order.id}`" variant="ghost" size="sm" class="mt-4">
                Track order
              </PrimaryButton>
            </article>
          </div>
          <p v-else class="mt-6 text-sm text-tzel-muted">No orders yet.</p>
        </div>
      </div>
    </section>
  </main>
</template>
