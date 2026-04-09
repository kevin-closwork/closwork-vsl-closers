import { forwardRef } from 'react'
import { Check, Zap, Shield, BookOpen, Users, GraduationCap, Calendar } from 'lucide-react'
import TrackedAgendaLink from './TrackedAgendaLink.jsx'
import OptimizedImage from './OptimizedImage.jsx'
import LandingFaq from './LandingFaq.jsx'
import { useInViewOnce } from '../hooks/useInViewOnce'

function AgendaIframe({ iframeRef }) {
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
        <div
          className="w-full min-h-[520px] sm:min-h-[600px] bg-slate-100 animate-pulse"
          aria-hidden
        />
      )}
    </div>
  )
}

const LandingBelowFold = forwardRef(function LandingBelowFold(
  { bigCtaClass, scrollToAgenda, calendarIframeRef },
  ref
) {
  return (
    <>
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

      <section className="py-16 lg:py-20 bg-gradient-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)] text-center mb-10">
            Tu instructor: Andrés Guauque
          </h2>
          <div className="grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-2">
              <OptimizedImage
                src="/assets/andres-guauque.webp"
                alt="Andrés Guauque, instructor de High Ticket Closing"
                width={600}
                height={600}
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

      <section id="planes" className="py-16 lg:py-20 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)] text-center mb-8">
            Inversión y garantía
          </h2>
          <div className="relative p-8 rounded-2xl border-2 border-[var(--primary)] bg-[var(--background-subtle)] shadow-xl shadow-[var(--primary)]/10">
            <ul className="space-y-2 mb-8 text-sm text-[var(--secondary)]">
              {['Programa completo (módulos + vivo + comunidad)', 'Certificación Closwork', 'Acceso a red de empresas'].map((f) => (
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

      <LandingFaq />

      <section ref={ref} id="agenda" className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Reserva tu llamada</h2>
            <p className="text-white/80 text-sm">Elige el horario que mejor te convenga.</p>
          </div>
          <AgendaIframe iframeRef={calendarIframeRef} />
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
    </>
  )
})

export default LandingBelowFold
