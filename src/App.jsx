import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Shield, BookOpen, Users, GraduationCap, Calendar } from 'lucide-react'

import ThankYouPage from './ThankYouPage'
import WistiaHeroFacade from './components/WistiaHeroFacade.jsx'
import { persistMetaTracking, trackEvent } from './lib/meta-capi'
import { trackCTAClick } from './lib/pixel'

const LandingFaq = lazy(() => import('./components/LandingFaq.jsx'))
const LandingFooter = lazy(() => import('./components/LandingFooter.jsx'))

const isThankYouPage = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('thankyou') || window.location.hash === '#gracias')

function TrackedAgendaLink({ location, href = '#agenda', className = '', children, onClick, ...rest }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        trackCTAClick(location)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </a>
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

  const bigCtaClass =
    'inline-flex items-center justify-center w-full max-w-[480px] min-h-[64px] px-6 rounded-2xl text-[18px] font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-glow)] transition-all hover:scale-[1.02] shadow-[0_12px_40px_rgba(74,171,111,0.45)]'

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes fabIn { from { transform: translate(-50%, 120%); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
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

      {/* Hero: mobile order badge → H1 → video → CTA | desktop: left copy+CTA, right video */}
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

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-3xl sm:text-4xl lg:text-[2.45rem] font-bold text-white leading-tight text-center lg:text-left max-w-xl mx-auto lg:mx-0 lg:col-start-1 lg:row-start-2"
            >
              Aprende a cerrar ventas de alto valor y gana en dólares desde donde quieras
            </motion.h1>

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

      {/* 2. CTA secundario inmediato */}
      <section className="py-8 bg-white border-b border-[var(--border)]">
        <div className="max-w-lg mx-auto px-4">
          <TrackedAgendaLink
            location="cta_secondary"
            onClick={(e) => {
              e.preventDefault()
              scrollToAgenda()
            }}
            href="#agenda"
            className={`${bigCtaClass} w-full`}
          >
            Agenda tu llamada gratuita
          </TrackedAgendaLink>
        </div>
      </section>

      {/* 3. Sobre Andrés */}
      <section className="py-16 lg:py-20 bg-gradient-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)] text-center mb-10">
            Tu instructor: Andrés Guauque
          </h2>
          <div className="grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-2">
              {/* TODO: Reemplazar andres-guauque.webp por versión 600x600 WebP bajo 80 KB */}
              <img
                src="/assets/andres-guauque.webp"
                alt="Andrés Guauque, instructor de High Ticket Closing"
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
                className="aspect-square max-w-[280px] w-full mx-auto rounded-2xl object-cover border border-[var(--border)] shadow-lg"
              />
            </div>
            <div className="md:col-span-3 space-y-4 text-[var(--secondary)]">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Closer profesional con años en ventas consultivas de alto valor; ha cerrado ventas de $3,000 a $85,000 USD y entrena closers que hoy cobran comisiones reales en el mercado hispano.
              </p>
              <blockquote className="pl-4 border-l-4 border-[var(--primary)] italic text-sm sm:text-base">
                “Cualquier persona que aprenda a tener conversaciones de alto valor puede cerrar. Sin importar su edad o su experiencia previa.”
              </blockquote>
              <TrackedAgendaLink
                location="sobre_andres"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToAgenda()
                }}
                href="#agenda"
                className="inline-flex text-sm font-semibold text-[var(--primary)] hover:underline underline-offset-2"
              >
                Agenda tu llamada gratuita →
              </TrackedAgendaLink>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Qué incluye (3 tarjetas) */}
      <section id="programa" className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)] text-center mb-10">
            Qué incluye el programa
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Programa completo',
                text: 'Módulos grabados, metodología real y scripts adaptados al mercado hispano.',
              },
              {
                icon: Users,
                title: 'Comunidad + vivo',
                text: 'Comunidad en Skool, sesiones semanales con Andrés y práctica guiada.',
              },
              {
                icon: GraduationCap,
                title: 'Certificación + acceso',
                text: 'Certificado Closwork y acceso a empresas que buscan closers certificados.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--background-subtle)] h-full flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--secondary)] mb-2">{card.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] flex-1">{card.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <TrackedAgendaLink
              location="post_programa"
              onClick={(e) => {
                e.preventDefault()
                scrollToAgenda()
              }}
              href="#agenda"
              className={`${bigCtaClass} mx-auto`}
            >
              Agenda tu llamada gratuita
            </TrackedAgendaLink>
          </div>
        </div>
      </section>

      {/* 5. Cómo funciona */}
      <section className="py-16 lg:py-20 bg-gradient-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)] text-center mb-10">
            Cómo funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Agenda tu llamada', desc: 'Una llamada corta para ver si el programa encaja contigo.', icon: Calendar },
              { num: '02', title: 'Certifícate', desc: 'Módulos + sesiones en vivo + práctica hasta dominar el cierre.', icon: GraduationCap },
              { num: '03', title: 'Cierra en serio', desc: 'Te conectamos con empresas que ya pagan comisiones a closers.', icon: Zap },
            ].map((step) => (
              <div key={step.num} className="p-6 bg-white rounded-2xl border border-[var(--border)]">
                <span className="text-4xl font-bold text-[var(--primary)]/25">{step.num}</span>
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center my-4">
                  <step.icon className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--secondary)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <TrackedAgendaLink
              location="post_como_funciona"
              onClick={(e) => {
                e.preventDefault()
                scrollToAgenda()
              }}
              href="#agenda"
              className={`${bigCtaClass} mx-auto`}
            >
              Agenda tu llamada gratuita
            </TrackedAgendaLink>
          </div>
        </div>
      </section>

      {/* 6. Precio + garantía */}
      <section id="planes" className="py-16 lg:py-20 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)] text-center mb-8">
            Inversión y garantía
          </h2>
          <div className="relative p-8 rounded-2xl border-2 border-[var(--primary)] bg-[var(--background-subtle)] shadow-xl shadow-[var(--primary)]/10">
            <ul className="space-y-2 mb-8 text-sm text-[var(--secondary)]">
              {[
                'Programa completo (módulos + vivo + comunidad)',
                'Certificación Closwork',
                'Acceso a red de empresas',
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <TrackedAgendaLink
              location="precio_card"
              onClick={(e) => {
                e.preventDefault()
                scrollToAgenda()
              }}
              href="#agenda"
              className={`${bigCtaClass} w-full justify-center mb-6`}
            >
              Agenda tu llamada gratuita
            </TrackedAgendaLink>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[var(--border)]">
              <Shield className="w-6 h-6 text-[var(--primary)] flex-shrink-0" />
              <p className="text-sm text-[var(--secondary)]">
                Si en 90 días no podemos conectarte con una empresa en High Ticket, devolvemos tu inversión + $200 USD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA final (antes del FAQ) */}
      <section className="py-12 bg-gradient-primary text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-6">¿Listo para el siguiente paso?</p>
          <TrackedAgendaLink
            location="cta_final"
            onClick={(e) => {
              e.preventDefault()
              scrollToAgenda()
            }}
            href="#agenda"
            className="inline-flex items-center justify-center w-full max-w-[480px] min-h-[64px] px-6 rounded-2xl text-[18px] font-semibold bg-white text-[var(--primary)] hover:bg-white/95 transition-all hover:scale-[1.02] shadow-lg mx-auto"
          >
            Agenda tu llamada gratuita
          </TrackedAgendaLink>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[200px] bg-[var(--background-subtle)]" />}>
        <LandingFaq />
      </Suspense>

      {/* Agenda + calendario */}
      <section ref={agendaRef} id="agenda" className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Reserva tu llamada</h2>
            <p className="text-white/80 text-sm">Elige el horario que mejor te convenga.</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
            <iframe
              ref={calendarIframeRef}
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3rG58Sh4U2JTyrYUzg8nX9__q22x_R-ByArvu6ZeqIud7lCpmLVJ7V9lWMxo1urWem5q_DS9aq?gv=true"
              width="100%"
              height="600"
              frameBorder={0}
              style={{ border: 0 }}
              title="Agenda tu llamada"
              className="w-full min-h-[520px] sm:min-h-[600px]"
              loading="lazy"
            />
          </div>
          <p className="text-center mt-4">
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
