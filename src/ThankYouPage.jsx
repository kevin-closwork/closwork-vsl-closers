import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'
import { trackEvent } from './lib/meta-capi'

export default function ThankYouPage() {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    tracked.current = true
    trackEvent('Schedule')
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-20">
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
          <p className="text-[var(--text-secondary)] italic">
            Nos vemos pronto. — Andrés Guauque · Closwork
          </p>
        </div>
      </div>
    </div>
  )
}
