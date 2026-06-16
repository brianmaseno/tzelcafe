<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import OrderSummary from '@/components/checkout/OrderSummary.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { CAFE_LOCATIONS } from '@/data/locations'
import { useCartStore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkout'
import { formatPrice } from '@/utils/format'
import type { CheckoutStep } from '@/types'

const router = useRouter()
const cart = useCartStore()
const checkout = useCheckoutStore()

const steps: { id: CheckoutStep; label: string }[] = [
  { id: 'details', label: 'Your Details' },
  { id: 'fulfillment', label: 'Pickup / Delivery' },
  { id: 'confirm', label: 'Confirm' },
]

const currentStepIndex = computed(() =>
  steps.findIndex((s) => s.id === checkout.step),
)

const total = computed(() => checkout.totalWithFees(cart.subtotal))

const inputClass =
  'w-full rounded-xl border border-white/10 bg-tzel-espresso/60 px-4 py-3 text-tzel-cream placeholder:text-tzel-muted focus:border-tzel-bronze focus:outline-none focus:ring-1 focus:ring-tzel-bronze'

onMounted(() => {
  if (cart.isEmpty && !checkout.orderPlaced) {
    router.replace('/menu')
  }
})

function handlePlaceOrder() {
  checkout.placeOrder()
}

function startNewOrder() {
  checkout.reset()
  router.push('/menu')
}
</script>

<template>
  <main class="min-h-screen pt-24">
    <!-- Success state -->
    <section
      v-if="checkout.orderPlaced"
      class="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center"
    >
      <div class="max-w-md rounded-3xl border border-tzel-bronze/30 bg-tzel-espresso/50 p-10">
        <p class="text-5xl" aria-hidden="true">✓</p>
        <h1 class="mt-4 font-serif text-3xl text-tzel-cream">Order Confirmed!</h1>
        <p class="mt-3 text-tzel-sand/80">
          Thank you, {{ checkout.form.fullName }}. Your order is being prepared.
        </p>
        <p class="mt-4 font-mono text-sm text-tzel-bronze">
          Ref: {{ checkout.orderReference }}
        </p>
        <p class="mt-2 text-sm text-tzel-muted">
          We'll send a confirmation to {{ checkout.form.email }}
        </p>
        <PrimaryButton class="mt-8" @click="startNewOrder">
          Order Again
        </PrimaryButton>
      </div>
    </section>

  <section v-else class="px-4 py-12 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <header class="mb-10">
        <h1 class="font-serif text-3xl text-tzel-cream sm:text-4xl">Checkout</h1>
        <p class="mt-2 text-tzel-sand/80">Complete your order in a few simple steps.</p>
      </header>

      <!-- Step indicator -->
      <nav aria-label="Checkout progress" class="mb-10">
        <ol class="flex items-center gap-2 sm:gap-4">
          <li
            v-for="(step, index) in steps"
            :key="step.id"
            class="flex flex-1 items-center gap-2"
          >
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors"
              :class="
                index <= currentStepIndex
                  ? 'bg-tzel-bronze text-tzel-ink'
                  : 'bg-tzel-espresso text-tzel-muted'
              "
            >
              {{ index + 1 }}
            </span>
            <span
              class="hidden text-sm sm:inline"
              :class="index <= currentStepIndex ? 'text-tzel-cream' : 'text-tzel-muted'"
            >
              {{ step.label }}
            </span>
            <div
              v-if="index < steps.length - 1"
              class="hidden h-px flex-1 bg-white/10 sm:block"
              aria-hidden="true"
            />
          </li>
        </ol>
      </nav>

      <div class="grid gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-x-4"
            enter-to-class="opacity-100 translate-x-0"
            mode="out-in"
          >
            <!-- Step 1: Details -->
            <form
              v-if="checkout.step === 'details'"
              key="details"
              class="space-y-5 rounded-2xl border border-white/5 bg-tzel-espresso/30 p-6 sm:p-8"
              @submit.prevent="checkout.nextStep()"
            >
              <h2 class="font-serif text-xl text-tzel-cream">Your Details</h2>
              <div>
                <label for="fullName" class="mb-1.5 block text-sm text-tzel-sand">Full Name</label>
                <input id="fullName" v-model="checkout.form.fullName" type="text" required :class="inputClass" />
              </div>
              <div>
                <label for="email" class="mb-1.5 block text-sm text-tzel-sand">Email</label>
                <input id="email" v-model="checkout.form.email" type="email" required :class="inputClass" />
              </div>
              <div>
                <label for="phone" class="mb-1.5 block text-sm text-tzel-sand">Phone</label>
                <input id="phone" v-model="checkout.form.phone" type="tel" required :class="inputClass" placeholder="+254 7XX XXX XXX" />
              </div>
              <PrimaryButton type="submit" class="w-full sm:w-auto">
                Continue
              </PrimaryButton>
            </form>

            <!-- Step 2: Fulfillment -->
            <form
              v-else-if="checkout.step === 'fulfillment'"
              key="fulfillment"
              class="space-y-5 rounded-2xl border border-white/5 bg-tzel-espresso/30 p-6 sm:p-8"
              @submit.prevent="checkout.nextStep()"
            >
              <h2 class="font-serif text-xl text-tzel-cream">Pickup or Delivery</h2>

              <fieldset class="flex gap-4">
                <legend class="sr-only">Order type</legend>
                <label
                  class="flex flex-1 cursor-pointer items-center justify-center rounded-xl border py-3 text-sm font-medium transition"
                  :class="checkout.form.orderType === 'pickup' ? 'border-tzel-bronze bg-tzel-bronze/10 text-tzel-cream' : 'border-white/10 text-tzel-muted'"
                >
                  <input v-model="checkout.form.orderType" type="radio" value="pickup" class="sr-only" />
                  Pickup
                </label>
                <label
                  class="flex flex-1 cursor-pointer items-center justify-center rounded-xl border py-3 text-sm font-medium transition"
                  :class="checkout.form.orderType === 'delivery' ? 'border-tzel-bronze bg-tzel-bronze/10 text-tzel-cream' : 'border-white/10 text-tzel-muted'"
                >
                  <input v-model="checkout.form.orderType" type="radio" value="delivery" class="sr-only" />
                  Delivery
                </label>
              </fieldset>

              <div v-if="checkout.form.orderType === 'pickup'">
                <label for="location" class="mb-1.5 block text-sm text-tzel-sand">Pickup Location</label>
                <select
                  id="location"
                  v-model="checkout.form.locationId"
                  :class="inputClass"
                >
                  <option
                    v-for="loc in CAFE_LOCATIONS"
                    :key="loc.id"
                    :value="loc.id"
                  >
                    {{ loc.name }}
                  </option>
                </select>
              </div>

              <div v-else>
                <label for="address" class="mb-1.5 block text-sm text-tzel-sand">Delivery Address</label>
                <textarea
                  id="address"
                  v-model="checkout.form.address"
                  required
                  rows="3"
                  :class="inputClass"
                  placeholder="Street, building, area..."
                />
              </div>

              <div>
                <label for="notes" class="mb-1.5 block text-sm text-tzel-sand">Special Instructions (optional)</label>
                <textarea id="notes" v-model="checkout.form.notes" rows="2" :class="inputClass" placeholder="Allergies, extra napkins..." />
              </div>

              <div class="flex gap-3">
                <PrimaryButton type="button" variant="secondary" @click="checkout.prevStep()">
                  Back
                </PrimaryButton>
                <PrimaryButton type="submit">
                  Review Order
                </PrimaryButton>
              </div>
            </form>

            <!-- Step 3: Confirm -->
            <div
              v-else
              key="confirm"
              class="space-y-5 rounded-2xl border border-white/5 bg-tzel-espresso/30 p-6 sm:p-8"
            >
              <h2 class="font-serif text-xl text-tzel-cream">Review &amp; Confirm</h2>

              <dl class="space-y-3 text-sm">
                <div class="flex justify-between border-b border-white/5 pb-3">
                  <dt class="text-tzel-muted">Name</dt>
                  <dd class="text-tzel-cream">{{ checkout.form.fullName }}</dd>
                </div>
                <div class="flex justify-between border-b border-white/5 pb-3">
                  <dt class="text-tzel-muted">Contact</dt>
                  <dd class="text-right text-tzel-cream">{{ checkout.form.email }}<br>{{ checkout.form.phone }}</dd>
                </div>
                <div class="flex justify-between border-b border-white/5 pb-3">
                  <dt class="text-tzel-muted">Fulfillment</dt>
                  <dd class="text-right text-tzel-cream capitalize">
                    {{ checkout.form.orderType }}
                    <template v-if="checkout.form.orderType === 'pickup'">
                      <br>
                      <span class="text-tzel-muted">
                        {{ CAFE_LOCATIONS.find(l => l.id === checkout.form.locationId)?.name }}
                      </span>
                    </template>
                    <template v-else>
                      <br>
                      <span class="text-tzel-muted">{{ checkout.form.address }}</span>
                    </template>
                  </dd>
                </div>
                <div class="flex justify-between pt-1 text-base font-semibold">
                  <dt class="text-tzel-cream">Total</dt>
                  <dd class="text-tzel-bronze">{{ formatPrice(total) }}</dd>
                </div>
              </dl>

              <div class="flex gap-3 pt-2">
                <PrimaryButton type="button" variant="secondary" @click="checkout.prevStep()">
                  Back
                </PrimaryButton>
                <PrimaryButton @click="handlePlaceOrder">
                  Place Order
                </PrimaryButton>
              </div>
            </div>
          </Transition>
        </div>

        <OrderSummary />
      </div>
    </div>
  </section>
  </main>
</template>
