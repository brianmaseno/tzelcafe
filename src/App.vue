<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartDrawer from '@/components/cart/CartDrawer.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-tzel-ink">
    <AppNavbar />
    <div class="flex-1">
      <RouterView />
    </div>
    <AppFooter />
    <CartDrawer />
  </div>
</template>
