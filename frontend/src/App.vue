<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppLoader from '@/components/layout/AppLoader.vue'
import CartDrawer from '@/components/cart/CartDrawer.vue'
import ChatbotWidget from '@/components/chat/ChatbotWidget.vue'
import WhatsAppWidget from '@/components/layout/WhatsAppWidget.vue'
import { usePageMeta } from '@/composables/usePageMeta'

usePageMeta()

const router = useRouter()
const appReady = ref(false)

onMounted(async () => {
  await router.isReady()
  appReady.value = true
})
</script>

<template>
  <Transition
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <AppLoader v-if="!appReady" />
  </Transition>

  <div v-show="appReady" class="flex min-h-screen flex-col bg-tzel-ink">
    <AppNavbar />
    <div class="flex-1">
      <RouterView />
    </div>
    <AppFooter />
    <CartDrawer />
    <ChatbotWidget />
    <WhatsAppWidget />
  </div>
</template>
