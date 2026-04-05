import { useState, useEffect, createElement } from 'react'
import { loadWistiaHeroScripts } from '../lib/loadWistiaHero'

const POSTER = '/assets/hero-vsl-poster.webp'
const POSTER_W = 720
const POSTER_H = 406
const ASPECT = '1.7712177121771218'

export default function HeroWistia() {
  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    const start = () => {
      loadWistiaHeroScripts()
        .then(() => setShowPlayer(true))
        .catch(() => {
          /* keep poster visible */
        })
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 2200 })
      return () => window.cancelIdleCallback(id)
    }
    const t = window.setTimeout(start, 450)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl ring-4 ring-[var(--primary)]/20 bg-black/30"
      style={{ aspectRatio: ASPECT }}
    >
      {!showPlayer && (
        <img
          src={POSTER}
          alt=""
          width={POSTER_W}
          height={POSTER_H}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {showPlayer &&
        createElement('wistia-player', {
          'media-id': 'uwfdvzk86j',
          aspect: ASPECT,
          className: 'w-full block h-full',
          autoplay: true,
          'silent-autoplay': 'allow',
        })}
    </div>
  )
}
