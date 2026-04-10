import { useState, useEffect, useMemo, createElement } from 'react'
import { ensureWistiaPlayerJs, ensureWistiaEmbedModule } from '../lib/wistiaPlayer'
import { useInViewOnce } from '../hooks/useInViewOnce'

export default function WistiaTestimonialGrid({ title, subtitle, videos }) {
  const [wrapRef, inView] = useInViewOnce()
  const [ready, setReady] = useState(false)
  const videoIdsKey = useMemo(() => videos.map((v) => v.id).join(','), [videos])

  useEffect(() => {
    if (!inView || ready) return
    let cancelled = false
    ;(async () => {
      try {
        await ensureWistiaPlayerJs()
        await Promise.all(videos.map((v) => ensureWistiaEmbedModule(v.id)))
        if (!cancelled) setReady(true)
      } catch {
        if (!cancelled) setReady(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [inView, ready, videoIdsKey])

  return (
    <section ref={wrapRef} className="py-12 border-t border-[var(--border)]">
      <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)] text-center mb-2">{title}</h2>
      {subtitle ? (
        <p className="text-[var(--text-secondary)] text-center mb-10 max-w-2xl mx-auto text-sm sm:text-base">{subtitle}</p>
      ) : null}
      <div className="grid md:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div
            key={v.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--background-subtle)] overflow-hidden shadow-sm"
          >
            {ready ? (
              createElement('wistia-player', {
                'media-id': v.id,
                aspect: v.aspect,
                className: 'w-full block',
              })
            ) : (
              <div className="aspect-video bg-slate-100/80 animate-pulse" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
