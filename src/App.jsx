import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import ThankYouPage from './ThankYouPage'
import WistiaHeroFacade from './components/WistiaHeroFacade.jsx'
import TrackedAgendaLink from './components/TrackedAgendaLink.jsx'
import { persistMetaTracking, trackEvent } from './lib/meta-capi'
import { useInViewOnce } from './hooks/useInViewOnce'

const LandingFooter = lazy(() => import('./components/LandingFooter.jsx'))

const isThankYouPage = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('thankyou') || window.location.hash === '#gracias')

function AgendaCalendar({ iframeRef }) {
  const [wrapRef, inView] = useInViewOnce()
  return (
    <div ref={wrapRef} className="rounded-2xl overflow-hidden shadow-2xl bg-white min-h-[520px] sm:min-h-[600px]">
      {inView ? (
        <iframe
          ref={iframeRef}
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3rG58Sh4U2JTyrYUzg8nX9__q22x_R-ByArvu6ZeqIud7lCpmLVJ7V9lWMxo1urWem5q_DS9aq?gv=true"
          width="100%"
          height="600"
          frameBorder={0}
          style={{ border: 0 }}
          title="Agenda tu llamada"
          className="w-full min-h-[520px] sm:min-h-[600px]"
          loading="lazy"
        />
      ) : (
        <div className="w-full min-h-[520px] sm:min-h-[600px] bg-slate-100 animate-pulse" aria-hidden />
      )}
    </div>
  )
}

function App() {
  const [navbarSolid, setNavbarSolid] = useState(false)
  const [showMobileFab, setShowMobileFab] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const heroRef = useRef(null)
  const agendaRef = useRef(null)
  const calendarIframeRef = useRef(null)

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

      {/* Bloque principal: promesa + 3 pasos */}
      <section ref={heroRef} className="relative overflow-hidden pt-14 sm:pt-16 pb-12 lg:pb-16">
        <div className="absolute inset-0 bg-gradient-hero min-h-full" />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--primary-glow)] rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-10">
          <div className="text-center space-y-4">
            <span className="inline-flex px-3 py-1 rounded-full bg-white/15 text-white/95 text-xs font-medium">
              Certificación High Ticket Closing · Closwork
            </span>
            <h1 className="hero-title-in text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-white leading-snug">
              Te formamos como closer High Ticket y te conectamos con empresas para que generes entre{' '}
              <span className="text-white">$2,000 y $6,000 USD al mes</span> en menos de 90 días. Si no lo logramos,
              devolvemos el 100% de tu inversión y te damos <span className="text-white">$200 USD</span> por tu tiempo.
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Dos pasos: mira el video y elige tu horario en el calendario. Sin presión.
            </p>
          </div>

          {/* Paso 1 */}
          <div className="space-y-4 pt-2 border-t border-white/15">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white tracking-tight">
              Paso 1 · Mira el video
            </h2>
            <p className="text-white text-base sm:text-lg leading-relaxed">
              Conoce cómo funciona el programa y si encaja contigo.
            </p>
            <WistiaHeroFacade />
          </div>
        </div>
      </section>

      {/* Paso 2 · Calendario */}
      <section ref={agendaRef} id="agenda" className="relative py-14 lg:py-20 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Paso 2 · Elige día y hora</h2>
            <p className="text-white/80 text-sm">Las horas se muestran en tu zona horaria local.</p>
          </div>
          <AgendaCalendar iframeRef={calendarIframeRef} />
          <p className="text-center">
            <a
              href="https://calendar.app.google/rFZ298FNE1WXRP8KA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/85 hover:text-white text-sm underline underline-offset-2"
            >
              ¿No ves el calendario? Abre el enlace directo
            </a>
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="h-24 bg-[var(--secondary)]" />}>
        <LandingFooter />
      </Suspense>
    </div>
  )
}

export default App
