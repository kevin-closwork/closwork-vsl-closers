import { useState, useEffect, useRef, createElement } from 'react'
import { Play } from 'lucide-react'
import { ensureWistiaEmbedModule } from '../lib/wistiaPlayer'
import { trackVslViewContent } from '../lib/pixel'

const MEDIA_ID = 'ia9vl5n52r'
const ASPECT = '1.7777777777777777'
const SWATCH_URL = `https://fast.wistia.com/embed/medias/${MEDIA_ID}/swatch`

export default function WistiaHeroFacade({ onPlay }) {
  const [loaded, setLoaded] = useState(false)
  const [busy, setBusy] = useState(false)
  const viewContentSent = useRef(false)

  useEffect(() => {
    if (!loaded) return
    const disableCaptions = () => {
      const W = window.Wistia
      if (!W || !W.api) return
      const video = W.api(MEDIA_ID)
      if (!video) return
      video
        .plugin('captions')
        .then((c) => {
          if (c && c.turnOff) c.turnOff()
          if (c && c.disable) c.disable()
        })
        .catch(() => {})
    }
    const interval = setInterval(disableCaptions, 500)
    const timeout = setTimeout(() => clearInterval(interval), 10000)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [loaded])

  const handleActivate = async () => {
    if (busy || loaded) return
    setBusy(true)
    try {
      await ensureWistiaEmbedModule(MEDIA_ID)
      if (!viewContentSent.current) {
        viewContentSent.current = true
        trackVslViewContent()
        onPlay?.()
      }
      setLoaded(true)
    } finally {
      setBusy(false)
    }
  }

  if (loaded) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)] ring-4 ring-[var(--primary)]/25">
        {createElement('wistia-player', {
          'media-id': MEDIA_ID,
          aspect: ASPECT,
          className: 'w-full block',
          autoplay: true,
          'silent-autoplay': 'allow',
        })}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handleActivate}
      disabled={busy}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)] ring-4 ring-[var(--primary)]/25 text-left cursor-pointer disabled:opacity-80"
      aria-label="Reproducir video"
    >
      <img
        src={SWATCH_URL}
        alt=""
        width={1280}
        height={720}
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#003976]/35 transition-colors group-hover:bg-[#003976]/25" />
      <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--primary)] shadow-xl transition-transform group-hover:scale-105">
        <Play className="ml-1 h-10 w-10" fill="currentColor" aria-hidden />
      </span>
    </button>
  )
}
