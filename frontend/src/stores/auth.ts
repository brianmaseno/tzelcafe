import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { apiFetch } from '@/api/client'

export interface AuthUser {
  id: number
  name: string
  email: string
  reward_points: number
}

interface AuthPayload {
  token: string
  user: AuthUser
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('tzel_token') || '')
  const user = ref<AuthUser | null>(null)

  const isAuthed = computed(() => Boolean(token.value))

  function setSession(payload: AuthPayload) {
    token.value = payload.token
    user.value = payload.user
    localStorage.setItem('tzel_token', payload.token)
  }

  async function register(name: string, email: string, password: string, passwordConfirmation: string) {
    const res = await apiFetch<{ data: AuthPayload }>('/api/auth/register', {
      method: 'POST',
      json: { name, email, password, password_confirmation: passwordConfirmation },
    })
    setSession(res.data)
  }

  async function login(email: string, password: string) {
    const res = await apiFetch<{ data: AuthPayload }>('/api/auth/login', {
      method: 'POST',
      json: { email, password },
    })
    setSession(res.data)
  }

  function acceptToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('tzel_token', newToken)
  }

  async function logout() {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // ignore
    }
    token.value = ''
    user.value = null
    localStorage.removeItem('tzel_token')
  }

  async function fetchMe() {
    if (!token.value) return
    const res = await apiFetch<{ data: AuthUser }>('/api/me')
    user.value = res.data
  }

  async function updateProfile(name: string, email: string) {
    const res = await apiFetch<{ data: AuthUser }>('/api/profile', {
      method: 'PATCH',
      json: { name, email },
    })
    user.value = res.data
  }

  async function sendPasswordOtp(email: string) {
    await apiFetch('/api/auth/password/otp', { method: 'POST', json: { email } })
  }

  async function resetPasswordWithOtp(email: string, otp: string, password: string, passwordConfirmation: string) {
    await apiFetch('/api/auth/password/reset', {
      method: 'POST',
      json: { email, otp, password, password_confirmation: passwordConfirmation },
    })
  }

  async function sendProfileOtp() {
    await apiFetch('/api/profile/password/otp', { method: 'POST' })
  }

  async function updatePassword(otp: string, password: string, passwordConfirmation: string) {
    await apiFetch('/api/profile/password', {
      method: 'PUT',
      json: { otp, password, password_confirmation: passwordConfirmation },
    })
  }

  function googleLoginUrl() {
    return `${API_BASE}/auth/google/redirect`
  }

  return {
    token,
    user,
    isAuthed,
    register,
    login,
    acceptToken,
    logout,
    fetchMe,
    updateProfile,
    sendPasswordOtp,
    resetPasswordWithOtp,
    sendProfileOtp,
    updatePassword,
    googleLoginUrl,
  }
})
