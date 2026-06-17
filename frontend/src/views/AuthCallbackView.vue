<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  const token = route.query.token as string
  if (!token) {
    await router.replace('/login')
    return
  }
  auth.acceptToken(token)
  await auth.fetchMe()
  await router.replace((route.query.next as string) || '/account')
})
</script>

<template>
  <main class="flex min-h-screen items-center justify-center pt-24 text-tzel-sand">Signing you in…</main>
</template>
