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
