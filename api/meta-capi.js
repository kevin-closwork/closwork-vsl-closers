import crypto from 'crypto'

const PIXEL_ID = process.env.META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN
const API_VERSION = 'v21.0'

function hashSHA256(value) {
  if (!value) return undefined
  const normalized = String(value).trim().toLowerCase()
  if (!normalized) return undefined
  return crypto.createHash('sha256').update(normalized).digest('hex')
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Missing Meta CAPI configuration' })
  }

  try {
    const { event_name, event_id, event_source_url, user_data = {}, custom_data = {} } = req.body

    if (!event_name) return res.status(400).json({ error: 'event_name is required' })

    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
      || req.headers['x-real-ip']
      || req.socket?.remoteAddress
    const clientUserAgent = req.headers['user-agent']

    const hashedUserData = {
      client_ip_address: clientIp,
      client_user_agent: clientUserAgent,
      fbp: user_data.fbp || undefined,
      fbc: user_data.fbc || undefined,
      em: user_data.email ? [hashSHA256(user_data.email)] : undefined,
      ph: user_data.phone ? [hashSHA256(user_data.phone)] : undefined,
      fn: user_data.first_name ? [hashSHA256(user_data.first_name)] : undefined,
      ln: user_data.last_name ? [hashSHA256(user_data.last_name)] : undefined,
      ct: user_data.city ? [hashSHA256(user_data.city)] : undefined,
      st: user_data.state ? [hashSHA256(user_data.state)] : undefined,
      zp: user_data.zip_code ? [hashSHA256(user_data.zip_code)] : undefined,
      country: user_data.country ? [hashSHA256(user_data.country)] : undefined,
      db: user_data.date_of_birth ? [hashSHA256(user_data.date_of_birth)] : undefined,
    }

    Object.keys(hashedUserData).forEach(k => {
      if (hashedUserData[k] === undefined) delete hashedUserData[k]
    })

    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: event_id || `${event_name}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          action_source: 'website',
          event_source_url,
          user_data: hashedUserData,
          ...(Object.keys(custom_data).length > 0 ? { custom_data } : {}),
        },
      ],
    }

    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Meta CAPI error:', result)
      return res.status(response.status).json({ error: 'Meta CAPI request failed', details: result })
    }

    return res.status(200).json({ success: true, ...result })
  } catch (error) {
    console.error('Meta CAPI handler error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
