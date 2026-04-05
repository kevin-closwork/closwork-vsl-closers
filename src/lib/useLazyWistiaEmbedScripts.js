import { useEffect } from 'react'
import { ensureWistiaPlayerJs } from './wistiaPlayer'

/** Embed scripts for below-the-fold players; hero embed loads from index.html */
const LAZY_EMBED_IDS = [
  '22xpkuadcy',
  'wg27x4kya7',
  'rd06ag3xmc',
  '2v79098752',
  '5ydnmq4z0y',
  'z6cqho9fgw',
]

export function useLazyWistiaEmbedScripts(containerRef) {
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let done = false
    const inject = () => {
      if (done) return
      done = true
      ensureWistiaPlayerJs()
        .then(() => {
          LAZY_EMBED_IDS.forEach((id) => {
            if (document.querySelector(`script[data-wistia-embed="${id}"]`)) return
            const s = document.createElement('script')
            s.src = `https://fast.wistia.com/embed/${id}.js`
            s.async = true
            s.type = 'module'
            s.dataset.wistiaEmbed = id
            document.body.appendChild(s)
          })
        })
        .catch(() => {})
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inject()
          obs.disconnect()
        }
      },
      { rootMargin: '600px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
}
