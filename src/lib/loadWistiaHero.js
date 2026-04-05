import { ensureWistiaPlayerJs } from './wistiaPlayer'

/** Loads Wistia player + hero embed only when called (after idle). Safe to call once. */
let loadPromise = null

const HERO_EMBED = 'https://fast.wistia.com/embed/uwfdvzk86j.js'

export function loadWistiaHeroScripts() {
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    window._wq = window._wq || []
    window._wq.push({
      id: 'uwfdvzk86j',
      onReady(video) {
        video.plugin('captions').then((c) => {
          if (c && c.turnOff) c.turnOff()
          if (c && c.disable) c.disable()
        }).catch(() => {})
      },
    })
    window._wq.push({
      id: 'uwfdvzk86j',
      options: {
        plugin: {
          'captions-v1': { onByDefault: false },
          captions: { onByDefault: false },
        },
      },
    })

    const injectEmbed = (src, isModule) =>
      new Promise((res, rej) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          res()
          return
        }
        const s = document.createElement('script')
        s.src = src
        s.async = true
        if (isModule) s.type = 'module'
        s.onload = () => res()
        s.onerror = () => rej(new Error(`Failed to load ${src}`))
        document.body.appendChild(s)
      })

    ensureWistiaPlayerJs()
      .then(() => injectEmbed(HERO_EMBED, true))
      .then(() =>
        customElements.whenDefined('wistia-player').then(() => {
          requestAnimationFrame(() => requestAnimationFrame(resolve))
        })
      )
      .catch(reject)
  })

  return loadPromise
}
