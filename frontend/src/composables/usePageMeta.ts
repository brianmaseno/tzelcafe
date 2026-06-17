import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export function usePageMeta(defaultTitle = 'TZEL CAFÉ') {
  const route = useRoute()

  function apply() {
    const title = (route.meta.title as string) || defaultTitle
    const description =
      (route.meta.description as string) ||
      'TZEL CAFÉ — premium coffeehouse and restaurant. Eat, sip, connect.'

    document.title = title.includes('TZEL') ? title : `${title} — TZEL CAFÉ`

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }

  onMounted(apply)
  watch(() => route.path, apply)
}
