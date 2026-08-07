import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import ThankYouPage from './ThankYouPage'
import WistiaHeroFacade from './components/WistiaHeroFacade.jsx'
import { persistMetaTracking } from './lib/meta-capi'

const LandingFooter = lazy(() => import('./components/LandingFooter.jsx'))

const isThankYouPage = () =>
  typeof window !== 'undefined' &&
  (window.location.search.includes('thankyou') || window.location.hash === '#gracias')

function App() {
  const [navbarSolid, setNavbarSolid] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setShowThankYou(isThankYouPage())
    persistMetaTracking()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current
      const pastHero = hero ? window.scrollY > hero.offsetTop + hero.offsetHeight - 72 : window.scrollY > 400
      setNavbarSolid(pastHero)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (showThankYou) return <ThankYouPage />

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes softPulse {
          0%, 100% { opacity: 0.28; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.04); }
        }
        .anim-fade-up {
          opacity: 0;
          animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .anim-delay-1 { animation-delay: 0.08s; }
        .anim-delay-2 { animation-delay: 0.2s; }
        .anim-delay-3 { animation-delay: 0.34s; }
        .anim-delay-4 { animation-delay: 0.48s; }
        .anim-delay-5 { animation-delay: 0.62s; }
        .bg-orb-pulse { animation: softPulse 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .anim-fade-up { opacity: 1; animation: none; }
          .bg-orb-pulse { animation: none; }
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navbarSolid ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center">
          <a href="#" className={`text-lg font-bold ${navbarSolid ? 'text-[var(--secondary)]' : 'text-white'}`}>
            Closwork
          </a>
        </div>
      </header>

      <section ref={heroRef} className="relative overflow-hidden pt-14 sm:pt-16 pb-16 lg:pb-24 min-h-screen">
        {/* Fondo atmosférico */}
        <div className="absolute inset-0 bg-[var(--secondary)]" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 15% 10%, rgba(74, 171, 111, 0.45) 0%, transparent 55%),
              radial-gradient(ellipse 80% 60% at 90% 85%, rgba(74, 171, 111, 0.28) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 70% 20%, rgba(26, 74, 122, 0.9) 0%, transparent 55%),
              radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0, 40, 85, 0.95) 0%, transparent 60%),
              linear-gradient(165deg, #002850 0%, #003976 38%, #0a4a6e 68%, #0d5c52 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="bg-orb-pulse absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-[var(--primary)] blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-[var(--primary-glow)] blur-[120px] opacity-40" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
          <div className="text-center space-y-5 sm:space-y-6">
            <span className="anim-fade-up anim-delay-1 inline-flex px-3.5 py-1.5 rounded-full bg-white/12 ring-1 ring-white/20 text-white/90 text-[11px] sm:text-xs font-semibold tracking-[0.08em] uppercase">
              Certificación High Ticket Closing · Closwork
            </span>

            <h1 className="anim-fade-up anim-delay-2 text-[1.65rem] sm:text-4xl lg:text-[2.65rem] font-extrabold text-white tracking-tight leading-[1.15] max-w-2xl mx-auto">
              Cómo entrar al mundo del High Ticket Closing en{' '}
              <span className="text-[var(--primary-glow)]">90 días</span>
            </h1>

            <p className="anim-fade-up anim-delay-3 text-base sm:text-xl text-white/90 font-medium leading-snug max-w-xl mx-auto">
              Accede a oportunidades reales con empresas que ya están contratando closers en México
            </p>

            <p className="anim-fade-up anim-delay-4 text-sm sm:text-base text-white/70 leading-relaxed max-w-lg mx-auto">
              Programa guiado donde te formamos, te acompañamos y te conectamos con el mercado
              {' — '}
              incluso si empiezas desde cero.
            </p>
          </div>

          <div className="anim-fade-up anim-delay-5 pt-1">
            <WistiaHeroFacade />
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-24 bg-[var(--secondary)]" />}>
        <LandingFooter />
      </Suspense>
    </div>
  )
}

export default App
