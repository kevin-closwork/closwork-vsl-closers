import { useLayoutEffect, useRef, useState } from 'react'

/** Dispara true cuando el elemento entra al viewport (una vez). */
export function useInViewOnce(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0, ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView])

  return [ref, inView]
}
