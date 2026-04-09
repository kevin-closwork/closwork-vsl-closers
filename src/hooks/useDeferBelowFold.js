import { useEffect, useState } from 'react'

/** Carga contenido bajo el hero tras idle o al hacer scroll (mejor UX que solo idle). */
export function useDeferBelowFold({ idleTimeoutMs = 2000, scrollThresholdPx = 48 } = {}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) return
    let idleId
    let timeoutId

    const activate = () => setReady(true)

    const onScroll = () => {
      if (window.scrollY > scrollThresholdPx) {
        activate()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(activate, { timeout: idleTimeoutMs })
    } else {
      timeoutId = window.setTimeout(activate, Math.min(idleTimeoutMs, 1200))
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (idleId != null && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      if (timeoutId != null) window.clearTimeout(timeoutId)
    }
  }, [ready, idleTimeoutMs, scrollThresholdPx])

  return ready
}
