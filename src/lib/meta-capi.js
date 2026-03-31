function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

function generateEventId(eventName) {
  return `${eventName}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Send an event to both Meta Pixel (client) and CAPI (server) with deduplication.
 *
 * @param {string} eventName - 'Lead', 'Schedule', 'PageView', etc.
 * @param {object} [userData] - Optional PII: { email, phone, first_name, last_name, city, state, zip_code, country, date_of_birth }
 * @param {object} [customData] - Optional custom data: { currency, value, ... }
 */
export async function trackEvent(eventName, userData = {}, customData = {}) {
  const eventId = generateEventId(eventName)
  const eventSourceUrl = window.location.href
  const fbp = getCookie('_fbp')
  const fbc = getCookie('_fbc') || buildFbc()

  // 1. Fire client-side pixel with event_id for deduplication
  if (typeof window.fbq === 'function') {
    const pixelParams = { ...customData }
    if (eventName === 'Lead' || eventName === 'Schedule') {
      window.fbq('track', eventName, pixelParams, { eventID: eventId })
    } else {
      window.fbq('track', eventName, pixelParams, { eventID: eventId })
    }
  }

  // 2. Send server-side CAPI event
  try {
    await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: eventSourceUrl,
        user_data: {
          fbp,
          fbc,
          ...userData,
        },
        custom_data: customData,
      }),
    })
  } catch (err) {
    console.warn('Meta CAPI request failed:', err)
  }
}

function buildFbc() {
  const params = new URLSearchParams(window.location.search)
  const fbclid = params.get('fbclid')
  if (!fbclid) return null
  return `fb.1.${Date.now()}.${fbclid}`
}
