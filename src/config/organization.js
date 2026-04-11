/** Identidad de marca y SEO — rellena VITE_* en el deploy para URL fija y redes (evita ambigüedad en Google). */
export const ORGANIZATION_NAME = 'Closwork'

export const ORGANIZATION_DESCRIPTION =
  'Closwork es la plataforma que forma closers High Ticket y conecta talento con empresas en México y LATAM. Formación con Andrés Guauque; te conectamos con empresas o te devolvemos el 100% + $200 USD.'

/** Ruta bajo /public; debe ser absoluta en JSON-LD (se resuelve con el origen del sitio). */
export const ORGANIZATION_LOGO_PATH = '/vite.svg'

export function getSiteOrigin() {
  const fromEnv = import.meta.env.VITE_SITE_ORIGIN
  if (fromEnv && typeof fromEnv === 'string') {
    return fromEnv.replace(/\/$/, '')
  }
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return ''
}

export function getOrganizationCanonicalUrl(origin) {
  if (!origin) return ''
  return `${origin.replace(/\/$/, '')}/`
}

export function getSocialProfileUrls() {
  const keys = [
    'VITE_ORG_LINKEDIN',
    'VITE_ORG_TWITTER',
    'VITE_ORG_INSTAGRAM',
    'VITE_ORG_FACEBOOK',
    'VITE_ORG_YOUTUBE',
    'VITE_ORG_TIKTOK',
  ]
  const out = []
  for (const key of keys) {
    const v = import.meta.env[key]
    if (v && typeof v === 'string') {
      const u = v.trim()
      if (u) out.push(u)
    }
  }
  return out
}

export function getFooterSocials() {
  return {
    linkedin: import.meta.env.VITE_ORG_LINKEDIN?.trim() || null,
    twitter: import.meta.env.VITE_ORG_TWITTER?.trim() || null,
  }
}
