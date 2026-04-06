import { trackEvent } from './meta-capi'

/** Meta Pixel + CAPI: ViewContent when user starts the hero VSL (first interaction). */
export function trackVslViewContent() {
  trackEvent('ViewContent', {}, {
    content_name: 'VSL Certificacion HTC',
    content_category: 'Video',
  })
}

/** Meta Pixel: custom CTA clicks for funnel analysis. */
export function trackCTAClick(location) {
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'CTAClick', { location })
  }
}
