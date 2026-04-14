import { useEffect, useState } from 'react'

/** Enlace público (fallback en nueva pestaña). */
export const CALENDLY_INLINE_URL =
  'https://calendly.com/andres-closwork/30min?hide_gdpr_banner=1'

const CALENDLY_PATH = 'andres-closwork/30min'

/**
 * Embed inline oficial (iframe). Más fiable que initInlineWidget + script en React.
 * @see https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview
 */
export default function CalendlyInline() {
  const [embedSrc, setEmbedSrc] = useState('')

  useEffect(() => {
    const host = window.location.hostname || 'localhost'
    const q = new URLSearchParams({
      embed_domain: host,
      embed_type: 'Inline',
      hide_gdpr_banner: '1',
    })
    setEmbedSrc(`https://calendly.com/${CALENDLY_PATH}?${q.toString()}`)
  }, [])

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl bg-white min-h-[520px] sm:min-h-[700px]">
      {!embedSrc ? (
        <div className="w-full min-h-[520px] sm:min-h-[700px] bg-slate-100 animate-pulse" aria-hidden />
      ) : (
        <iframe
          src={embedSrc}
          title="Agenda tu llamada — Calendly"
          width="100%"
          height={700}
          frameBorder={0}
          className="block w-full min-w-[320px] border-0 bg-white"
          style={{ minHeight: 700 }}
          loading="lazy"
        />
      )}
    </div>
  )
}
