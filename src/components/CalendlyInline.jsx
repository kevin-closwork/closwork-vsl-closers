import { useEffect, useRef } from 'react'
import { useInViewOnce } from '../hooks/useInViewOnce'

export const CALENDLY_INLINE_URL =
  'https://calendly.com/andres-closwork/30min?hide_gdpr_banner=1'

const WIDGET_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'

function loadCalendlyScript() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  if (window.Calendly) return Promise.resolve()

  const existing = document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`)
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.Calendly) {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Calendly script error')))
    })
  }

  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = WIDGET_SCRIPT_SRC
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Calendly script failed to load'))
    document.body.appendChild(s)
  })
}

export default function CalendlyInline() {
  const [wrapRef, inView] = useInViewOnce()
  const hostRef = useRef(null)
  const didInit = useRef(false)

  useEffect(() => {
    if (!inView || didInit.current) return

    let cancelled = false

    loadCalendlyScript()
      .then(() => {
        if (cancelled || didInit.current) return
        const host = hostRef.current
        if (!host || !window.Calendly) return
        window.Calendly.initInlineWidget({
          url: CALENDLY_INLINE_URL,
          parentElement: host,
        })
        didInit.current = true
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [inView])

  return (
    <div ref={wrapRef} className="rounded-2xl overflow-hidden shadow-2xl bg-white min-h-[520px] sm:min-h-[700px]">
      {!inView ? (
        <div className="w-full min-h-[520px] sm:min-h-[700px] bg-slate-100 animate-pulse" aria-hidden />
      ) : (
        <div
          ref={hostRef}
          className="calendly-inline-widget w-full min-w-[320px] min-h-[700px]"
          style={{ minWidth: 320, height: 700 }}
        />
      )}
    </div>
  )
}
