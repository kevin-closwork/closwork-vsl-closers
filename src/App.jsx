import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import ThankYouPage from './ThankYouPage'
import WistiaHeroFacade from './components/WistiaHeroFacade.jsx'
import TrackedAgendaLink from './components/TrackedAgendaLink.jsx'
import { persistMetaTracking, trackEvent } from './lib/meta-capi'
import { useDeferBelowFold } from './hooks/useDeferBelowFold'

const LandingBelowFold = lazy(() => import('./components/LandingBelowFold.jsx'))
const LandingFooter = lazy(() => import('./components/LandingFooter.jsx'))

const isThankYouPage = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('thankyou') || window.location.hash === '#gracias')

function SectionSkeleton() {
  return <div className="min-h-[320px] bg-[var(--background-subtle)] animate-pulse" aria-hidden />
}

function App() {
  const [navbarSolid, setNavbarSolid] = useState(false)
  const [showMobileFab, setShowMobileFab] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const heroRef = useRef(null)
  const agendaRef = useRef(null)
  const calendarIframeRef = useRef(null)
  const loadBelowFold = useDeferBelowFold({ idleTimeoutMs: 2000 })

  useEffect(() => {
    setShowThankYou(isThankYouPage())
    persistMetaTracking()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current
      const pastHero = hero ? window.scrollY > hero.offsetTop + hero.offsetHeight - 72 : window.scrollY > 400
      setNavbarSolid(pastHero)
      setShowMobileFab(window.scrollY > 300)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleCalendlyEvent = (e) => {
      if (e.origin !== 'https://calendly.com') return
      if (e.data?.event !== 'calendly.event_scheduled') return
      trackEvent('Schedule', {}, { content_name: 'Llamada Certificacion HTC' })
    }
    window.addEventListener('message', handleCalendlyEvent)
    return () => window.removeEventListener('message', handleCalendlyEvent)
  }, [])

  const scrollToAgenda = () => {
    agendaRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (showThankYou) return <ThankYouPage />

  const bigCtaClass =
    'inline-flex items-center justify-center w-full max-w-[480px] min-h-[64px] px-6 rounded-2xl text-[18px] font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-glow)] transition-all hover:scale-[1.02] shadow-[0_12px_40px_rgba(74,171,111,0.45)]'

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes fabIn { from { transform: translate(-50%, 120%); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
        @keyframes heroTitleIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .hero-title-in { animation: heroTitleIn 0.45s ease-out forwards; }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navbarSolid ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <a href="#" className={`text-lg font-bold ${navbarSolid ? 'text-[var(--secondary)]' : 'text-white'}`}>
            Closwork
          </a>
          <TrackedAgendaLink
            location="header"
            onClick={(e) => {
              e.preventDefault()
              scrollToAgenda()
            }}
            href="#agenda"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-glow)] transition-all hover:scale-[1.02] shadow-md shadow-[var(--primary)]/30"
          >
            Agenda tu llamada
          </TrackedAgendaLink>
        </div>
      </header>

      {showMobileFab && (
        <div
          className="md:hidden fixed bottom-4 left-1/2 z-[60] w-[90%] max-w-[400px] pointer-events-auto"
          style={{ animation: 'fabIn 0.3s ease forwards' }}
        >
          <TrackedAgendaLink
            location="mobile_fab"
            onClick={(e) => {
              e.preventDefault()
              scrollToAgenda()
            }}
            href="#agenda"
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-[var(--primary)] text-white font-semibold text-[15px] shadow-[0_8px_32px_rgba(74,171,111,0.45)] hover:bg-[var(--primary-glow)] transition-colors"
          >
            Agenda tu llamada gratuita
          </TrackedAgendaLink>
        </div>
      )}

      <section ref={heroRef} className="relative overflow-hidden pt-14 sm:pt-16">
        <div className="absolute inset-0 bg-gradient-hero min-h-full" />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--primary-glow)] rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 lg:items-start">
            <span className="justify-self-center lg:justify-self-start lg:col-start-1 lg:row-start-1 inline-flex px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
              Programa de Certificación en High Ticket Closing
            </span>

            <h1 className="hero-title-in text-3xl sm:text-4xl lg:text-[2.45rem] font-bold text-white leading-tight text-center lg:text-left max-w-xl mx-auto lg:mx-0 lg:col-start-1 lg:row-start-2">
              Aprende a cerrar ventas de alto valor y gana en dólares desde donde quieras
            </h1>

            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:self-start lg:sticky lg:top-20">
              <WistiaHeroFacade />
            </div>

            <div className="flex flex-col items-center lg:items-start gap-3 lg:col-start-1 lg:row-start-3">
              <TrackedAgendaLink
                location="hero_primary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToAgenda()
                }}
                href="#agenda"
                className={`${bigCtaClass} mx-auto lg:mx-0`}
              >
                Agenda tu llamada gratuita
              </TrackedAgendaLink>
              <p className="text-center lg:text-left text-xs text-white/70 w-full max-w-[480px]">
                Sin compromiso. Sin presión.
              </p>
              <p className="text-center lg:text-left text-sm text-white/85 flex items-center gap-2 justify-center lg:justify-start">
                ⭐ Respaldado por Closwork — la red de closers #1 de LATAM
              </p>
            </div>
          </div>
        </div>
      </section>

      {loadBelowFold ? (
        <Suspense fallback={<SectionSkeleton />}>
          <LandingBelowFold
            ref={agendaRef}
            bigCtaClass={bigCtaClass}
            scrollToAgenda={scrollToAgenda}
            calendarIframeRef={calendarIframeRef}
          />
        </Suspense>
      ) : (
        <SectionSkeleton />
      )}

      <Suspense fallback={<div className="h-24 bg-[var(--secondary)]" />}>
        <LandingFooter />
      </Suspense>
    </div>
  )
}

export default App
