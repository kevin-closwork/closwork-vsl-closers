import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Play,
  ChevronDown,
  Check,
  X,
  Zap,
  Shield,
  Clock,
  BookOpen,
  Users,
  GraduationCap,
  Sun,
  Calendar,
  Phone,
  Coffee,
  Home,
  DollarSign,
  Menu,
  X as CloseIcon,
  Linkedin,
  Twitter,
  Quote,
} from 'lucide-react'

import ThankYouPage from './ThankYouPage'

// Check if we're on thank you page (redirect from Calendly)
const isThankYouPage = () => typeof window !== 'undefined' && (window.location.search.includes('thankyou') || window.location.hash === '#gracias')

const CTAButton = ({ children, className = '', size = 'md' }) => (
  <a
    href="#agenda"
    className={`
      inline-flex items-center justify-center gap-2 font-semibold text-white
      bg-[var(--primary)] hover:bg-[var(--primary-glow)]
      rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
      hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(74,171,111,0.4)]
      ${size === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-base'}
      ${className}
    `}
  >
    {children}
  </a>
)

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const AnimatedCounter = ({ end, prefix = '', suffix = '', duration = 1.5 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

function App() {
  const [navbarSolid, setNavbarSolid] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    setShowThankYou(isThankYouPage())
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setNavbarSolid(window.scrollY > 50)
      setShowFloatingCTA(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const faqs = [
    { q: '¿Necesito experiencia en ventas?', a: 'No. El programa está diseñado desde cero. De hecho, muchos de los mejores closers que conozco empezaron sin experiencia. Lo que necesitas son ganas de aprender y disposición para practicar.' },
    { q: '¿Cuánto puedo ganar como closer?', a: 'Depende de tu esfuerzo y las oportunidades que tomes. Un closer activo en el mercado mexicano puede generar entre $1,500 y $5,000 USD mensuales en comisiones. Algunos más.' },
    { q: '¿Qué pasa después de certificarme?', a: 'Obtienes acceso a la red de empresas de Closwork — empresas reales que ya necesitan closers certificados y están pagando comisiones. No te quedas solo con el conocimiento.' },
    { q: '¿Es un curso pregrabado?', a: 'Es un programa híbrido: módulos grabados para que avances a tu ritmo + sesiones en vivo semanales con Andrés + comunidad activa en Skool + role plays grupales. No estás solo.' },
    { q: '¿Hay garantía?', a: 'Sí. Si en 90 días no podemos conectarte con una empresa en el sector High Ticket, nosotros asumimos el riesgo — te devolvemos el valor de tu inversión + $200 USD por hacerte perder tu tiempo. El riesgo es nuestro, no tuyo.' },
    { q: '¿Quién es Closwork?', a: 'Closwork es la plataforma que conecta empresas con closers de ventas en LATAM. Es el puente entre tu certificación y las empresas que necesitan tu habilidad. No solo te enseñamos — te colocamos.' },
  ]

  const heroStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }

  if (showThankYou) return <ThankYouPage />

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarSolid ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <a href="#" className="flex items-center">
              <span className={`text-xl font-bold transition-colors ${navbarSolid ? 'text-[var(--secondary)]' : 'text-white'}`}>Closwork</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#programa" className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${navbarSolid ? 'text-[var(--secondary)]' : 'text-white/90'}`}>Programa</a>
              <a href="#resultados" className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${navbarSolid ? 'text-[var(--secondary)]' : 'text-white/90'}`}>Resultados</a>
              <CTAButton size="md">Agenda tu llamada gratuita</CTAButton>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden p-2 ${navbarSolid ? 'text-[var(--secondary)]' : 'text-white'}`}>
              {mobileMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[var(--border)] py-4 px-4">
            <div className="flex flex-col gap-4">
              <a href="#programa" onClick={() => setMobileMenuOpen(false)} className="text-[var(--secondary)] font-medium">Programa</a>
              <a href="#resultados" onClick={() => setMobileMenuOpen(false)} className="text-[var(--secondary)] font-medium">Resultados</a>
              <CTAButton className="w-full justify-center">Agenda tu llamada gratuita</CTAButton>
            </div>
          </div>
        )}
      </nav>

      {/* Floating CTA */}
      {showFloatingCTA && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 right-6 z-40">
          <a href="#agenda" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-glow)] rounded-2xl shadow-xl transition-all hover:scale-[1.03]">
            Agenda tu llamada
          </a>
        </motion.div>
      )}

      {/* 1. HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--primary-glow)] rounded-full blur-3xl opacity-50" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={heroStagger} initial="hidden" animate="visible">
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
                Programa de Certificación en High Ticket Closing
              </motion.div>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Aprende a cerrar ventas de alto valor y gana en dólares desde donde quieras.
              </motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl">
                Si en 90 días no podemos conectarte con una empresa en el sector High Ticket nosotros asumimos el riesgo… te devolvemos el valor de inversión + $200 USD por hacerte perder tu tiempo.
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <CTAButton size="lg" className="mb-4">Agenda tu llamada gratuita</CTAButton>
                <p className="text-white/80 text-sm mb-4">Sin compromiso. Una conversación de 30 minutos para ver si es para ti.</p>
                <p className="text-white/70 text-sm flex items-center gap-2">⭐ Respaldado por Closwork — la red de closers #1 de LATAM</p>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="relative">
              <div className="aspect-video rounded-2xl bg-black/30 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden flex items-center justify-center ring-4 ring-[var(--primary)]/20">
                <motion.button animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors hover:scale-110">
                  <Play className="w-10 h-10 text-white ml-1" fill="white" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. BARRA DE CREDIBILIDAD */}
      <section className="py-16 bg-white border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={0}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-[var(--secondary)]">
                  <AnimatedCounter end={50} suffix="+" />
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">horas de metodología real</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-[var(--secondary)]">
                  <AnimatedCounter end={10} />
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">módulos especializados</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-[var(--secondary)]">
                  <AnimatedCounter end={85} prefix="$" suffix=",000" />
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">USD cerrados en una sola llamada por nuestro instructor</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <p className="text-lg font-bold text-[var(--primary)]">✓</p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">Acceso a empresas que ya pagan comisiones</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. PROBLEMA */}
      <section className="py-20 lg:py-28 bg-gradient-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] text-center mb-16">¿Esto te suena?</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {[
              'Llevas meses buscando cómo ganar más y nada termina de funcionar',
              'Ya intentaste dropshipping, agencias o vender en redes... y no despegó',
              'Tu trabajo te paga lo justo pero sientes que tu tiempo vale más',
              'Quieres ganar en dólares pero no sabes por dónde empezar sin invertir en un negocio propio',
            ].map((text, i) => (
              <AnimatedSection key={i}>
                <div className="p-6 bg-white rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-all h-full">
                  <p className="text-[var(--secondary)] font-medium">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="text-center">
            <p className="text-lg font-medium text-[var(--secondary)] max-w-2xl mx-auto">
              Hay una profesión que ya está pagando comisiones reales en México y en toda LATAM — y casi nadie la conoce.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. LA OPORTUNIDAD */}
      <section id="programa" className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] text-center mb-12">
              El High Ticket Closing: la habilidad que paga en dólares
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <p className="text-[var(--secondary)] text-lg mb-6">
              En México hay miles de infoproductores, coaches, agencias y empresas vendiendo programas de $2,000 a $10,000 dólares.
            </p>
            <p className="text-[var(--secondary)] text-lg mb-8">
              Todos necesitan personas que cierren esas ventas por ellos. Y pagan entre el 8% y el 15% de comisión por cada cierre.
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-gradient-primary p-8 rounded-2xl text-white text-center shadow-xl mb-8">
              <p className="text-lg mb-2 opacity-90">8 ventas al mes × $3,000 USD × 10% comisión</p>
              <p className="text-4xl lg:text-5xl font-bold">= $2,400 USD/mes en comisiones</p>
              <p className="mt-4 opacity-90">Sin inventario. Sin producto propio. Sin oficina. Solo conversaciones de valor.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. VIDEO VSL */}
      <section className="py-20 lg:py-28 bg-gradient-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-6">
              Andrés te explica cómo funciona en menos de 6 minutos
            </h2>
            <p className="text-white/80 text-center mb-8">Este video vale más que horas buscando en internet. Dale play.</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl mb-8" style={{ padding: '75% 0 0 0' }}>
              <iframe
                src="https://player.vimeo.com/video/1177176345?badge=0&autopause=0&player_id=0&app_id=58479"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Vsl A Corregir"
              />
            </div>
            <div className="text-center">
              <CTAButton size="lg">¿Listo? Agenda tu llamada gratuita</CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 6. SOBRE ANDRÉS */}
      <section className="py-20 lg:py-28 bg-gradient-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] text-center mb-16">Tu instructor: Andrés Guauque</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <AnimatedSection className="md:col-span-2">
              <div className="aspect-square max-w-xs mx-auto rounded-2xl bg-[var(--background-muted)]" />
            </AnimatedSection>
            <div className="md:col-span-3">
              <AnimatedSection>
                <ul className="space-y-4 text-[var(--secondary)] mb-8">
                  <li className="flex gap-3"><Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />Closer profesional con años de experiencia en ventas consultivas de alto valor.</li>
                  <li className="flex gap-3"><Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />Ha cerrado ventas individuales de $3,000 hasta $85,000 dólares.</li>
                  <li className="flex gap-3"><Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />Ha entrenado closers que hoy generan comisiones reales en el mercado hispano.</li>
                  <li className="flex gap-3"><Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />Su metodología se basa en una premisa: el cierre no es una técnica, es una conversación de valor.</li>
                </ul>
                <blockquote className="pl-6 border-l-4 border-[var(--primary)] italic text-[var(--secondary)]">
                  "Cualquier persona que aprenda a tener conversaciones de alto valor puede cerrar. Sin importar su edad, su carrera o su experiencia previa."
                </blockquote>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* 7. QUÉ INCLUYE */}
      <section id="resultados" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] text-center mb-16">Lo que obtienes con la certificación</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Programa completo (50 horas)', items: ['10 módulos de metodología real', 'Desde mentalidad del closer hasta psicología de persuasión avanzada', 'Scripts adaptados al mercado mexicano (no traducciones de guiones gringos)'] },
              { icon: Users, title: 'Comunidad + Sesiones en vivo', items: ['Acceso a la comunidad de closers en Skool', '1 sesión semanal en vivo con Andrés (60-90 min)', 'Role plays grupales y feedback directo', 'La comunidad ES parte del producto — no es un add-on'] },
              { icon: GraduationCap, title: 'Certificación + Placement', items: ['Certificado digital de Closer Certificado — Closwork', 'Acceso a la red de empresas de Closwork post-certificación', 'Empresas reales que ya pagan comisiones y necesitan closers ahora', 'No te quedas buscando dónde aplicar. Las empresas ya te están esperando.'] },
            ].map((card, i) => (
              <AnimatedSection key={i}>
                <div className="p-8 bg-[var(--background-subtle)] rounded-2xl border border-[var(--border)] h-full hover:border-[var(--primary)]/30 transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-6">
                    <card.icon className="w-7 h-7 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--secondary)] mb-4">{card.title}</h3>
                  <ul className="space-y-2 text-[var(--text-secondary)]">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex gap-2"><Check className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5" />{item}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CÓMO FUNCIONA */}
      <section className="py-20 lg:py-28 bg-gradient-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] text-center mb-16">Así de simple</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Agenda tu llamada', desc: 'Una conversación de 30 minutos con Andrés para entender dónde estás y si el programa es para ti.', icon: Calendar },
              { num: '02', title: 'Certifícate como closer', desc: '10 módulos + sesiones en vivo + role plays. En semanas, no en años.', icon: GraduationCap },
              { num: '03', title: 'Empieza a cerrar ventas reales', desc: 'Closwork te conecta con empresas que ya necesitan closers certificados. Tú pones las ganas.', icon: Zap },
            ].map((step, i) => (
              <AnimatedSection key={i}>
                <div className="relative">
                  <div className="p-8 bg-white rounded-2xl border border-[var(--border)] h-full">
                    <span className="text-5xl font-bold text-[var(--primary)]/20">{step.num}</span>
                    <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center my-6">
                      <step.icon className="w-7 h-7 text-[var(--primary)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--secondary)] mb-3">{step.title}</h3>
                    <p className="text-[var(--text-secondary)]">{step.desc}</p>
                  </div>
                  {i < 2 && <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-[var(--border)]" />}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DÍA DEL CLOSER */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] text-center mb-16">Un martes cualquiera como closer certificado</h2>
          </AnimatedSection>
          <div className="space-y-6">
            {[
              { icon: Sun, text: 'Te levantas sin alarma.' },
              { icon: Calendar, text: 'Revisas tu calendario: 3 llamadas agendadas.' },
              { icon: Phone, text: '10am — 45 minutos de conversación. Cierre. Comisión: $300 USD.' },
              { icon: Coffee, text: 'Mediodía — Segunda llamada. No estaba listo. Seguimiento en 2 semanas.' },
              { icon: DollarSign, text: '3pm — Tercera llamada. Otro cierre. Otra comisión.' },
              { icon: Home, text: 'Y todo desde tu casa, una cafetería, o donde quieras.' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--background-subtle)] border border-[var(--border)]">
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <p className="text-[var(--secondary)] font-medium">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="text-center mt-12">
            <p className="text-lg text-[var(--secondary)]">Eso es lo que hace un closer. Conversaciones de alto valor, desde donde quieras.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* 10. COMPARATIVA */}
      <section className="py-20 lg:py-28 bg-gradient-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] text-center mb-16">El closer vs. El empleado promedio</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-[var(--background-muted)] border border-[var(--border)] opacity-90">
                <h3 className="text-xl font-bold text-[var(--text-secondary)] mb-6">Empleado promedio</h3>
                <ul className="space-y-3 text-[var(--text-secondary)]">
                  <li className="flex gap-2"><X className="w-5 h-5 text-[var(--destructive)] flex-shrink-0" />9 horas al día en oficina</li>
                  <li className="flex gap-2"><X className="w-5 h-5 text-[var(--destructive)] flex-shrink-0" />$15,000 MXN al mes</li>
                  <li className="flex gap-2"><X className="w-5 h-5 text-[var(--destructive)] flex-shrink-0" />Espera el bono de fin de año</li>
                  <li className="flex gap-2"><X className="w-5 h-5 text-[var(--destructive)] flex-shrink-0" />Depende de que le aumenten el sueldo</li>
                  <li className="flex gap-2"><X className="w-5 h-5 text-[var(--destructive)] flex-shrink-0" />Horario fijo, ubicación fija</li>
                </ul>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-[var(--primary)]/10 border-2 border-[var(--primary)] shadow-lg">
                <h3 className="text-xl font-bold text-[var(--secondary)] mb-6">Closer certificado</h3>
                <ul className="space-y-3 text-[var(--secondary)]">
                  <li className="flex gap-2"><Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />3 llamadas al día</li>
                  <li className="flex gap-2"><Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />$2,000 - $5,000 USD al mes en comisiones</li>
                  <li className="flex gap-2"><Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />Ingreso directo por cada cierre</li>
                  <li className="flex gap-2"><Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />Escala con su propia habilidad</li>
                  <li className="flex gap-2"><Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />Horario libre, trabaja desde donde quiera</li>
                </ul>
              </motion.div>
            </AnimatedSection>
          </div>
          <AnimatedSection className="text-center mt-8">
            <p className="text-lg text-[var(--secondary)]">La diferencia no es suerte. Es que uno aprendió a cerrar ventas de alto valor.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* 11. OFERTA */}
      <section id="planes" className="py-20 lg:py-28 bg-gradient-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] text-center mb-4">Todo lo que incluye tu certificación</h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="relative p-8 rounded-2xl border-2 border-[var(--primary)] bg-white shadow-xl shadow-[var(--primary)]/10">
              <ul className="space-y-3 mb-8">
                {['Programa completo (10 módulos, 50 horas)', 'Comunidad de closers en Skool', 'Sesiones en vivo semanales con Andrés', 'Scripts adaptados al mercado mexicano', 'Certificación oficial Closwork', 'Acceso a la red de empresas de Closwork', 'Acceso de por vida al programa y actualizaciones'].map((f, i) => (
                  <li key={i} className="flex gap-2 text-[var(--secondary)]"><Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
              <CTAButton size="lg" className="w-full justify-center mb-6">Agenda tu llamada de 30 minutos</CTAButton>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--background-subtle)] border border-[var(--border)]">
                <Shield className="w-6 h-6 text-[var(--primary)] flex-shrink-0" />
                <p className="text-sm text-[var(--secondary)]">Si en 90 días no podemos conectarte con una empresa en el sector High Ticket, nosotros asumimos el riesgo — te devolvemos el valor de tu inversión + $200 USD por hacerte perder tu tiempo.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 12. TESTIMONIOS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] text-center mb-16">Lo que dicen quienes ya empezaron</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { name: 'Testimonio 1', videoUrl: 'VIDEO_DRIVE_URL_1' },
              { name: 'Testimonio 2', videoUrl: 'VIDEO_DRIVE_URL_2' },
              { name: 'Testimonio 3', videoUrl: 'VIDEO_DRIVE_URL_3' },
            ].map((testimonial, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-subtle)] overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-video bg-black/10 flex items-center justify-center relative">
                    {/* TODO: Replace VIDEO_DRIVE_URL with actual Google Drive embed URLs */}
                    <Play className="w-12 h-12 text-[var(--primary)] opacity-60" />
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-[var(--secondary)] font-semibold">{testimonial.name}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl border border-[var(--border)] text-center">
              <Quote className="w-10 h-10 text-[var(--primary)]/50 mx-auto mb-4" />
              <p className="text-[var(--secondary)] italic">"He entrenado closers que llegaron sin experiencia en ventas y hoy generan comisiones mensuales en dólares con empresas reales."</p>
              <p className="text-[var(--primary)] font-semibold mt-4">— Andrés Guauque</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 13. FAQ */}
      <section id="faq" className="py-20 lg:py-28 bg-gradient-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] text-center mb-16">Preguntas que probablemente tengas</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i}>
                <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left font-medium text-[var(--secondary)] hover:bg-[var(--background-subtle)] transition-colors">
                    {faq.q}
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <motion.div initial={false} animate={{ height: openFaq === i ? 'auto' : 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden">
                    <p className="px-6 pb-6 text-[var(--text-secondary)]">{faq.a}</p>
                  </motion.div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 14. CTA FINAL + CALENDARIO */}
      <section id="agenda" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-[var(--primary-glow)] rounded-full blur-3xl opacity-50" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              El mercado mexicano de High Ticket Closing no va a seguir esperando.
            </h2>
            <p className="text-xl text-white/90 mb-4">
              La pregunta es si vas a dar el paso ahora... o seguir esperando.
            </p>
            <p className="text-white/70 text-sm">Sin compromiso en la llamada. Garantía de inversión + $200 USD.</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3rG58Sh4U2JTyrYUzg8nX9__q22x_R-ByArvu6ZeqIud7lCpmLVJ7V9lWMxo1urWem5q_DS9aq?gv=true"
                width="100%"
                height="600"
                frameBorder="0"
                style={{ border: 0 }}
                title="Agenda tu llamada de 30 minutos"
                className="w-full min-h-[600px]"
                loading="lazy"
              />
            </div>
            <p className="text-center mt-4">
              <a
                href="https://calendar.app.google/rFZ298FNE1WXRP8KA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white text-sm underline underline-offset-2 transition-colors"
              >
                ¿No puedes ver el calendario? Haz clic aquí para agendar directamente
              </a>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 15. FOOTER */}
      <footer className="bg-[var(--secondary)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <a href="#" className="text-xl font-bold text-white block">Closwork</a>
              <span className="text-white/60 text-sm">× Andrés Guauque</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-white/80 hover:text-white text-sm">Términos</a>
              <a href="#" className="text-white/80 hover:text-white text-sm">Privacidad</a>
              <a href="#" className="text-white/80 hover:text-white text-sm">Contacto</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 text-center">
            <p className="text-white/60 text-sm">© 2026 Closwork. Todos los derechos reservados.</p>
            <p className="text-white/40 text-xs mt-2 max-w-2xl mx-auto">
              Closwork y Andrés Guauque no garantizan ingresos específicos. Los resultados dependen del esfuerzo, dedicación y habilidad de cada alumno. Las cifras compartidas son ejemplos basados en el mercado actual y no constituyen una promesa de ganancias. Toda inversión en formación implica un compromiso personal con el proceso.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
