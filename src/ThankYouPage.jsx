import { useEffect, useRef } from 'react'
import { Check, Quote } from 'lucide-react'
import { trackEvent } from './lib/meta-capi'
import WistiaTestimonialGrid from './components/WistiaTestimonialGrid.jsx'

const TESTIMONIOS_EMPRESAS = [
  { id: '22xpkuadcy', aspect: '1.7843866171003717' },
  { id: 'wg27x4kya7', aspect: '1.7843866171003717' },
  { id: 'rd06ag3xmc', aspect: '1.7843866171003717' },
]

const TESTIMONIOS_CLOSERS = [
  { id: '2v79098752', aspect: '1.7843866171003717' },
  { id: '5ydnmq4z0y', aspect: '1.7777777777777777' },
  { id: 'z6cqho9fgw', aspect: '1.7777777777777777' },
]

export default function ThankYouPage() {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    tracked.current = true
    trackEvent('Schedule')
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center opacity-0 animate-[tyFade_0.5s_ease-out_forwards]">
          <style>{`@keyframes tyFade { to { opacity: 1; } }`}</style>
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-8">
            <Check className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] mb-4">
            Tu lugar está reservado.
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-12">
            Lo que sigue va a cambiar el rumbo de tu carrera.
          </p>
          <p className="text-[var(--secondary)] mb-12 leading-relaxed">
            Gracias por dar este paso. Agendaste una llamada con Andrés. La mayoría de las personas ve la oportunidad y la deja pasar. Tú no.
          </p>
          <div className="text-left bg-[var(--background-subtle)] rounded-2xl p-8 mb-12 border border-[var(--border)]">
            <h3 className="font-bold text-[var(--secondary)] mb-4">Lo que va a pasar en la llamada:</h3>
            <ol className="space-y-3 text-[var(--secondary)] list-decimal list-inside">
              <li>Entender dónde estás hoy y qué quieres lograr.</li>
              <li>Ver si el programa de certificación es el camino correcto para ti.</li>
              <li>Si encaja, explicarte cómo empezar con tu certificación y conectarte con empresas reales.</li>
            </ol>
          </div>
          <div className="text-left bg-white rounded-2xl p-8 mb-12 border border-[var(--border)]">
            <h3 className="font-bold text-[var(--secondary)] mb-4">Para que la llamada sea productiva, reflexiona sobre estas 3 preguntas:</h3>
            <ol className="space-y-3 text-[var(--secondary)] list-decimal list-inside">
              <li>¿Cuál es tu situación económica actual y cómo te gustaría que fuera en 6 meses?</li>
              <li>¿Qué has intentado antes para mejorar tus ingresos y por qué no funcionó?</li>
              <li>¿Qué te impediría tomar una decisión hoy si el programa encaja con lo que buscas?</li>
            </ol>
          </div>
          <p className="text-[var(--text-secondary)] italic mb-16">
            Nos vemos pronto. — Andrés Guauque · Closwork
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <WistiaTestimonialGrid
          title="Lo que dicen las empresas"
          subtitle="Empresas que ya confían en closers certificados por Closwork"
          videos={TESTIMONIOS_EMPRESAS}
        />
        <WistiaTestimonialGrid
          title="Lo que dicen nuestros closers"
          subtitle="Closers que ya están generando resultados reales"
          videos={TESTIMONIOS_CLOSERS}
        />
        <div className="max-w-2xl mx-auto p-6 bg-[var(--background-subtle)] rounded-xl border border-[var(--border)] text-center">
          <Quote className="w-10 h-10 text-[var(--primary)]/50 mx-auto mb-4" aria-hidden />
          <p className="text-[var(--secondary)] italic">
            &ldquo;He entrenado closers que llegaron sin experiencia en ventas y hoy generan comisiones mensuales en dólares con empresas reales.&rdquo;
          </p>
          <p className="text-[var(--primary)] font-semibold mt-4">— Andrés Guauque</p>
        </div>
      </div>
    </div>
  )
}
