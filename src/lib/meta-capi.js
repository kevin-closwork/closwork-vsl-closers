const STORAGE_KEY = 'meta_tracking'

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

function generateEventId(eventName) {
  return `${eventName}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function buildFbcFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const fbclid = params.get('fbclid')
  if (!fbclid) return null
  return `fb.1.${Date.now()}.${fbclid}`
}

const SCHEDULE_SENT_KEY = 'cw_meta_schedule_sent'

/**
 * Schedule (Pixel + CAPI) una sola vez por sesión: evita duplicar si Calendly envía postMessage y además redirige a ?thankyou.
 */
export function trackScheduleOnce(customData = {}) {
  try {
    if (sessionStorage.getItem(SCHEDULE_SENT_KEY)) return Promise.resolve()
    sessionStorage.setItem(SCHEDULE_SENT_KEY, '1')
  } catch {}
  return trackEvent(
    'Schedule',
    {},
    { content_name: 'Llamada Certificacion HTC', ...customData }
  )
}

/**
 * Persist fbclid, _fbp, and _fbc in sessionStorage so they survive
 * redirect back to ?thankyou (p. ej. tras reservar en Calendly).
 */
export function persistMetaTracking() {
  const fbp = getCookie('_fbp')
  const fbc = getCookie('_fbc') || buildFbcFromUrl()
  const fbclid = new URLSearchParams(window.location.search).get('fbclid')

  const existing = getStoredTracking()

  const data = {
    fbp: fbp || existing.fbp || null,
    fbc: fbc || existing.fbc || null,
    fbclid: fbclid || existing.fbclid || null,
    landingUrl: existing.landingUrl || window.location.href,
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}

  return data
}

function getStoredTracking() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function resolveTrackingParams() {
  const stored = getStoredTracking()
  const fbp = getCookie('_fbp') || stored.fbp
  const fbc = getCookie('_fbc') || buildFbcFromUrl() || stored.fbc
  return { fbp, fbc }
}

/**
 * Send an event to both Meta Pixel (client) and CAPI (server) with deduplication.
 *
 * @param {string} eventName - 'Lead', 'Schedule', 'ViewContent', 'InitiateCheckout', etc.
 * @param {object} [userData] - Optional PII: { email, phone, first_name, last_name, city, state, zip_code, country, date_of_birth }
 * @param {object} [customData] - Optional custom data: { currency, value, ... }
 */
export async function trackEvent(eventName, userData = {}, customData = {}) {
  const eventId = generateEventId(eventName)
  const stored = getStoredTracking()
  const eventSourceUrl = stored.landingUrl || window.location.href
  const { fbp, fbc } = resolveTrackingParams()

  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, { ...customData }, { eventID: eventId })
  }

  try {
    await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: eventSourceUrl,
        user_data: { fbp, fbc, ...userData },
        custom_data: customData,
      }),
    })
  } catch (err) {
    console.warn('Meta CAPI request failed:', err)
  }
}
