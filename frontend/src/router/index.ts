import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue'), meta: { title: 'TZEL CAFÉ — Eat. Sip. Connect.' } },
    { path: '/menu', name: 'menu', component: () => import('@/views/MenuView.vue'), meta: { title: 'Menu' } },
    { path: '/our-story', name: 'our-story', component: () => import('@/views/OurStoryView.vue'), meta: { title: 'Our Story', description: 'Values, sustainability, community impact, and more at TZEL CAFÉ.' } },
    { path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue'), meta: { title: 'Contact Us', description: 'Visit TZEL CAFÉ at Siwaka Plaza, Madaraka, Nairobi.' } },
    { path: '/track-order', name: 'track-order', component: () => import('@/views/TrackOrderView.vue'), meta: { title: 'Track Order' } },
    { path: '/about', name: 'about', component: () => import('@/views/OurStoryView.vue'), meta: { title: 'Our Story' } },
    { path: '/promotions', name: 'promotions', component: () => import('@/views/PromotionsView.vue'), meta: { title: 'Promotions' } },
    { path: '/blog', name: 'blog', component: () => import('@/views/ContentPageView.vue'), meta: { pageKey: 'blog', title: 'Blog & Recipes' } },
    { path: '/gallery', name: 'gallery', component: () => import('@/views/ContentPageView.vue'), meta: { pageKey: 'gallery', title: 'Gallery' } },
    { path: '/careers', name: 'careers', component: () => import('@/views/ContentPageView.vue'), meta: { pageKey: 'careers', title: 'Careers' } },
    { path: '/franchise', name: 'franchise', component: () => import('@/views/ContentPageView.vue'), meta: { pageKey: 'franchise', title: 'Franchise' } },
    { path: '/gift-cards', name: 'gift-cards', component: () => import('@/views/ContentPageView.vue'), meta: { pageKey: 'gift-cards', title: 'Gift Cards' } },
    { path: '/events', name: 'events', component: () => import('@/views/ContentPageView.vue'), meta: { pageKey: 'events', title: 'Events & Bookings' } },
    { path: '/faqs', name: 'faqs', component: () => import('@/views/ContentPageView.vue'), meta: { pageKey: 'faqs', title: 'FAQs' } },
    { path: '/reviews', name: 'reviews', component: () => import('@/views/ContentPageView.vue'), meta: { pageKey: 'reviews', title: 'Reviews' } },
    { path: '/checkout', name: 'checkout', component: () => import('@/views/CheckoutView.vue'), meta: { requiresAuth: true, title: 'Checkout' } },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue'), meta: { title: 'Login' } },
    { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue'), meta: { title: 'Register' } },
    { path: '/forgot-password', name: 'forgot-password', component: () => import('@/views/ForgotPasswordView.vue'), meta: { title: 'Forgot Password' } },
    { path: '/reset-password', name: 'reset-password', component: () => import('@/views/ResetPasswordView.vue'), meta: { title: 'Reset Password' } },
    { path: '/auth/callback', name: 'auth-callback', component: () => import('@/views/AuthCallbackView.vue') },
    { path: '/account', name: 'account', component: () => import('@/views/AccountView.vue'), meta: { requiresAuth: true, title: 'My Account' } },
    { path: '/payment/callback', name: 'payment-callback', component: () => import('@/views/PaymentCallbackView.vue'), meta: { requiresAuth: true } },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
