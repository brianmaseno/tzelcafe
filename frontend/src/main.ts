import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import './assets/styles/main.css'
import { useAuthStore } from './stores/auth'

const app = createApp(App).use(pinia).use(router)

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (auth.token && !auth.user) {
    await auth.fetchMe()
  }
  if (to.meta.requiresAuth && !auth.token) {
    return { name: 'login', query: { next: to.fullPath } }
  }
})

app.mount('#app')
