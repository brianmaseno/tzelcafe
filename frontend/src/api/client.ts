import { useAuthStore } from '@/stores/auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000'

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const auth = useAuthStore()

  const headers = new Headers(init.headers || {})
  headers.set('Accept', 'application/json')

  if (init.json !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  if (auth.token) {
    headers.set('Authorization', `Bearer ${auth.token}`)
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    body: init.json !== undefined ? JSON.stringify(init.json) : init.body,
  })

  if (!res.ok) {
    let detail: unknown = undefined
    try {
      detail = await res.json()
    } catch {
      // ignore
    }
    const message =
      (detail as any)?.message || `Request failed (${res.status})`
    throw new Error(message)
  }

  return (await res.json()) as T
}

