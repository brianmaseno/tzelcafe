<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { NAV_LINKS } from '@/constants/brand'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'

const cart = useCartStore()
const auth = useAuthStore()
const isMobileMenuOpen = ref(false)

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-tzel-ink/80 backdrop-blur-md">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      aria-label="Main navigation"
    >
      <RouterLink
        to="/"
        class="group flex items-center gap-3"
        aria-label="TZEL CAFÉ home"
        @click="closeMobileMenu"
      >
        <img
          src="/logo.png"
          alt="TZEL CAFÉ logo"
          class="h-14 w-14 rounded-full object-cover ring-2 ring-tzel-bronze/40 transition group-hover:ring-tzel-bronze sm:h-16 sm:w-16"
          width="64"
          height="64"
          loading="eager"
        />
        <div class="hidden sm:block">
          <p class="font-serif text-lg leading-none tracking-[0.2em] text-tzel-cream">
            TZEL
          </p>
          <p class="text-[10px] font-medium tracking-[0.35em] text-tzel-bronze">
            CAFÉ
          </p>
        </div>
      </RouterLink>

      <ul class="hidden items-center gap-8 lg:flex">
        <li v-for="link in NAV_LINKS" :key="link.to">
          <RouterLink
            :to="link.to"
            class="text-sm font-medium text-tzel-sand/80 transition hover:text-tzel-gold"
            active-class="text-tzel-gold"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="relative rounded-full p-2 text-tzel-cream transition hover:text-tzel-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tzel-bronze"
          aria-label="Open shopping cart"
          @click="cart.toggleDrawer()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 1.879-.921 1.654-1.89l-1.044-4.66A2.25 2.25 0 0 0 15.75 6H5.25"
            />
          </svg>
          <span
            v-if="cart.itemCount > 0"
            class="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-tzel-bronze px-1 text-[10px] font-bold text-tzel-ink"
          >
            {{ cart.itemCount }}
          </span>
        </button>

        <PrimaryButton to="/menu" size="sm" class="hidden sm:inline-flex">
          Order Now
        </PrimaryButton>

        <PrimaryButton
          v-if="!auth.token"
          to="/login"
          size="sm"
          variant="secondary"
          class="hidden sm:inline-flex"
        >
          Login
        </PrimaryButton>
        <PrimaryButton
          v-else
          to="/account"
          size="sm"
          variant="secondary"
          class="hidden sm:inline-flex"
        >
          Account
        </PrimaryButton>

        <button
          type="button"
          class="rounded-lg p-2 text-tzel-cream lg:hidden"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg
            v-if="!isMobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        class="border-t border-white/5 bg-tzel-espresso px-4 py-4 lg:hidden"
      >
        <ul class="space-y-3">
          <li v-for="link in NAV_LINKS" :key="link.to">
            <RouterLink
              :to="link.to"
              class="block rounded-lg px-3 py-2 text-base font-medium text-tzel-sand hover:bg-white/5 hover:text-tzel-gold"
              @click="closeMobileMenu"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
        <PrimaryButton to="/menu" class="mt-4 w-full" @click="closeMobileMenu">
          Order Now
        </PrimaryButton>
        <PrimaryButton
          v-if="!auth.token"
          to="/login"
          variant="secondary"
          class="mt-3 w-full"
          @click="closeMobileMenu"
        >
          Login
        </PrimaryButton>
        <PrimaryButton
          v-else
          to="/account"
          variant="secondary"
          class="mt-3 w-full"
          @click="closeMobileMenu"
        >
          Account
        </PrimaryButton>
      </div>
    </Transition>
  </header>
</template>
