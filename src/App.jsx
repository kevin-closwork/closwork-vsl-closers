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
        @keyframes heroTitleIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .hero-title-in { animation: heroTitleIn 0.45s ease-out forwards; }
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
          <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-[var(--primary)] blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-[var(--primary-glow)] blur-[120px] opacity-40" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-10">
          <div className="text-center space-y-4">
            <span className="inline-flex px-3 py-1 rounded-full bg-white/15 text-white/95 text-xs font-medium">
              Certificación High Ticket Closing · Closwork
            </span>
            <h1 className="hero-title-in text-2xl sm:text-3xl lg:text-[1.9rem] font-bold text-white leading-snug">
              <span className="block">Cómo entrar al mundo del High Ticket Closing en 90 días</span>
              <span className="block mt-2 sm:mt-3">
                Accede a oportunidades reales con empresas que ya están contratando closers en México
              </span>
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Programa guiado donde te formamos, te acompañamos y te conectamos con el mercado
              {' — '}
              incluso si empiezas desde cero.
            </p>
          </div>

          <div className="pt-2">
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
