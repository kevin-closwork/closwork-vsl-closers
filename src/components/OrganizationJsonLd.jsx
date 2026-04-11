import { useMemo, useEffect } from 'react'
import {
  ORGANIZATION_NAME,
  ORGANIZATION_DESCRIPTION,
  ORGANIZATION_LOGO_PATH,
  getSiteOrigin,
  getOrganizationCanonicalUrl,
  getSocialProfileUrls,
} from '../config/organization'

function buildOrganizationSchema(origin) {
  const url = getOrganizationCanonicalUrl(origin)
  const logoUrl = origin ? `${origin}${ORGANIZATION_LOGO_PATH}` : ''
  const sameAs = getSocialProfileUrls()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    description: ORGANIZATION_DESCRIPTION,
    url,
    areaServed: [
      { '@type': 'Country', 'name': 'México' },
      { '@type': 'Place', 'name': 'América Latina' },
    ],
  }

  if (logoUrl) {
    schema.logo = {
      '@type': 'ImageObject',
      url: logoUrl,
    }
  }

  if (sameAs.length > 0) {
    schema.sameAs = sameAs
  }

  return schema
}

const SCHEMA_SCRIPT_ID = 'schema-organization-jsonld'

export default function OrganizationJsonLd() {
  const origin = getSiteOrigin()
  const jsonLd = useMemo(() => buildOrganizationSchema(origin), [origin])

  useEffect(() => {
    if (!origin) return
    const canonical = getOrganizationCanonicalUrl(origin)
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical
  }, [origin])

  useEffect(() => {
    if (!origin) return
    let el = document.getElementById(SCHEMA_SCRIPT_ID)
    if (!el) {
      el = document.createElement('script')
      el.id = SCHEMA_SCRIPT_ID
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(jsonLd)
    return () => {
      document.getElementById(SCHEMA_SCRIPT_ID)?.remove()
    }
  }, [origin, jsonLd])

  return null
}
