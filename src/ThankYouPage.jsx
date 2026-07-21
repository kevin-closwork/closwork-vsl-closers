import { useEffect, useState, createElement } from 'react'
import { Check, Quote, Play } from 'lucide-react'
import { trackScheduleOnce } from './lib/meta-capi'
import { ensureWistiaPlayerJs, ensureWistiaEmbedModule } from './lib/wistiaPlayer'
import { useInViewOnce } from './hooks/useInViewOnce'

const TESTIMONIOS_DESTACADOS = [
  { id: 'wpdtadch0z', aspect: '1.7777777777777777' },
  { id: 'qwpaukexqm', aspect: '2.1524663677130045' },
  { id: '7rfq990019', aspect: '1.7777777777777777' },
  { id: '7hwf033hh0', aspect: '1.7777777777777777' },
]

const TESTIMONIOS_CLOSERS = [
  { id: '2v79098752', aspect: '1.7843866171003717' },
  { id: '5ydnmq4z0y', aspect: '1.7777777777777777' },
  { id: 'z6cqho9fgw', aspect: '1.7777777777777777' },
]

const TESTIMONIOS_EMPRESAS = [
  { id: '22xpkuadcy', aspect: '1.7843866171003717' },
  { id: 'wg27x4kya7', aspect: '1.7843866171003717' },
  { id: 'rd06ag3xmc', aspect: '1.7843866171003717' },
]

function VideoCard({ video, ready }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm bg-[var(--background-subtle)] transition-shadow hover:shadow-md">
      {ready ? (
        createElement('wistia-player', {
          'media-id': video.id,
          aspect: video.aspect,
          className: 'w-full block',
        })
      ) : (
        <div className="aspect-video bg-slate-100/80 animate-pulse flex items-center justify-center">
          <Play className="w-8 h-8 text-slate-300" />
        </div>
      )}
    </div>
  )
}

function TestimonialSection({ title, subtitle, videos, gridCols = 'lg:grid-cols-3', muted = false }) {
  const [wrapRef, inView] = useInViewOnce()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!inView || ready) return
    let cancelled = false
    ;(async () => {
      try {
        await ensureWistiaPlayerJs()
        await Promise.all(videos.map((v) => ensureWistiaEmbedModule(v.id)))
        if (!cancelled) setReady(true)
      } catch {
        if (!cancelled) setReady(true)
      }
    })()
    return () => { cancelled = true }
  }, [inView, ready])

  return (
    <section ref={wrapRef} className={`mb-16 ${muted ? 'opacity-90' : ''}`}>
      <div className="text-center mb-8">
        <h2 className={`font-bold text-[var(--secondary)] mb-2 ${muted ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-sm sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      <div className={`grid sm:grid-cols-2 ${gridCols} gap-5`}>
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} ready={ready} />
        ))}
      </div>
    </section>
  )
}

export default function ThankYouPage() {
  useEffect(() => {
    trackScheduleOnce()
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

          <p className="text-[var(--text-secondary)] italic mb-0">
            Nos vemos pronto. — Andrés Guauque · Closwork
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="border-t border-[var(--border)] pt-16">
          <TestimonialSection
            title="Mira lo que dicen sobre el programa"
            subtitle="Historias reales de personas que tomaron la decisión"
            videos={TESTIMONIOS_DESTACADOS}
            gridCols="lg:grid-cols-2"
          />

          <TestimonialSection
            title="Closers generando resultados"
            subtitle="Personas que ya están cerrando ventas y ganando comisiones"
            videos={TESTIMONIOS_CLOSERS}
            gridCols="lg:grid-cols-3"
          />

          <TestimonialSection
            title="Lo que dicen las empresas"
            subtitle="Empresas que confían en closers certificados por Closwork"
            videos={TESTIMONIOS_EMPRESAS}
            gridCols="lg:grid-cols-3"
            muted
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
    </div>
  )
}
