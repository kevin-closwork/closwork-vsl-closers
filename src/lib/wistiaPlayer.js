const PLAYER_SRC = 'https://fast.wistia.com/player.js'

let playerPromise = null

/** Ensures Wistia player.js is present (required by all embed/*.js modules). */
export function ensureWistiaPlayerJs() {
  if (typeof window !== 'undefined' && window.Wistia) {
    return Promise.resolve()
  }
  if (playerPromise) return playerPromise

  playerPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${PLAYER_SRC}"]`)
    if (existing) {
      if (window.Wistia) {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('player.js')), { once: true })
      return
    }
    const s = document.createElement('script')
    s.src = PLAYER_SRC
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('player.js failed'))
    document.body.appendChild(s)
  })

  return playerPromise
}

const EMBED_BASE = 'https://fast.wistia.com/embed'

/** Loads the embed module for a media id (after player.js). */
export function ensureWistiaEmbedModule(mediaId) {
  return ensureWistiaPlayerJs().then(
    () =>
      new Promise((resolve) => {
        if (document.querySelector(`script[data-wistia-embed="${mediaId}"]`)) {
          resolve()
          return
        }
        const s = document.createElement('script')
        s.src = `${EMBED_BASE}/${mediaId}.js`
        s.async = true
        s.type = 'module'
        s.dataset.wistiaEmbed = mediaId
        s.onload = () => resolve()
        s.onerror = () => resolve()
        document.body.appendChild(s)
      })
  )
}
