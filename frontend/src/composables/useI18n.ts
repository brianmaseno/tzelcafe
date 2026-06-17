import { ref, watch } from 'vue'
import type { Locale } from '@/i18n/messages'
import { t } from '@/i18n/messages'

const locale = ref<Locale>((localStorage.getItem('tzel_locale') as Locale) || 'en')

watch(locale, (value) => {
  localStorage.setItem('tzel_locale', value)
  document.documentElement.lang = value
})

export function useI18n() {
  function setLocale(next: Locale) {
    locale.value = next
  }

  function translate(key: Parameters<typeof t>[1]) {
    return t(locale.value, key)
  }

  return { locale, setLocale, t: translate }
}
