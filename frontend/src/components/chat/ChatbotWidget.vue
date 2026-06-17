<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

const isOpen = ref(false)
const input = ref('')
const isSending = ref(false)
const error = ref('')
const messages = ref<{ role: 'user' | 'assistant'; content: string }[]>([
  {
    role: 'assistant',
    content:
      "Welcome to TZEL CAFÉ. How can I help today—menu recommendations, ordering, delivery, or corporate services?",
  },
])

const canSend = computed(() => input.value.trim().length > 0 && !isSending.value)

async function send() {
  const text = input.value.trim()
  if (!text || isSending.value) return

  error.value = ''
  isSending.value = true
  messages.value.push({ role: 'user', content: text })
  input.value = ''

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000'}/api/chat`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text }),
    })

    if (!res.ok) {
      const detail = await res.json().catch(() => ({}))
      throw new Error(detail?.message || `Chat failed (${res.status})`)
    }

    const data = (await res.json()) as { data: { reply: string } }
    messages.value.push({
      role: 'assistant',
      content: data?.data?.reply || 'Thanks—how else can I help?',
    })

    await nextTick()
    const el = document.getElementById('tzel-chat-scroll')
    if (el) el.scrollTop = el.scrollHeight
  } catch (e: any) {
    error.value = e?.message || 'Chat failed.'
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Panel -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-3 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-3 scale-95"
    >
      <div
        v-if="isOpen"
        class="mb-4 w-[340px] overflow-hidden rounded-3xl border border-white/5 bg-tzel-espresso/40 shadow-2xl shadow-black/40 backdrop-blur"
        role="dialog"
        aria-label="TZEL CAFÉ chat assistant"
      >
        <header class="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <div>
            <p class="text-[10px] font-medium tracking-[0.35em] text-tzel-bronze uppercase">
              TZEL CAFÉ
            </p>
            <p class="mt-1 font-serif text-lg text-tzel-cream">AI Assistant</p>
          </div>
          <button
            type="button"
            class="rounded-full border border-white/10 bg-tzel-ink/30 px-3 py-1.5 text-xs font-medium text-tzel-sand hover:border-tzel-bronze/50 hover:text-tzel-gold"
            @click="isOpen = false"
          >
            Close
          </button>
        </header>

        <div id="tzel-chat-scroll" class="max-h-[360px] space-y-3 overflow-y-auto px-5 py-4">
          <div
            v-for="(m, idx) in messages"
            :key="idx"
            class="max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
            :class="
              m.role === 'assistant'
                ? 'border border-white/5 bg-tzel-ink/30 text-tzel-sand'
                : 'ml-auto border border-tzel-bronze/20 bg-tzel-bronze/10 text-tzel-cream'
            "
          >
            {{ m.content }}
          </div>
        </div>

        <div class="border-t border-white/5 px-5 py-4">
          <p v-if="error" class="mb-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs text-red-200">
            {{ error }}
          </p>
          <form class="flex gap-2" @submit.prevent="send">
            <input
              v-model="input"
              type="text"
              class="w-full rounded-full border border-white/10 bg-tzel-ink/30 px-4 py-3 text-sm text-tzel-cream placeholder:text-tzel-muted focus:border-tzel-bronze/60 focus:ring focus:ring-tzel-bronze/20"
              placeholder="Ask about menu, ordering, delivery…"
              :disabled="isSending"
            />
            <button
              type="submit"
              class="shrink-0 rounded-full bg-tzel-bronze px-4 py-3 text-sm font-semibold text-tzel-ink hover:bg-tzel-gold disabled:opacity-50"
              :disabled="!canSend"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Floating button -->
    <button
      type="button"
      class="group flex h-14 w-14 items-center justify-center rounded-full border border-tzel-bronze/30 bg-tzel-espresso/80 shadow-xl shadow-black/40 transition hover:border-tzel-bronze hover:bg-tzel-roast"
      aria-label="Open chat assistant"
      @click="isOpen = !isOpen"
    >
      <span class="text-lg text-tzel-gold" aria-hidden="true">✦</span>
    </button>
  </div>
</template>

