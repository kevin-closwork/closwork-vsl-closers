import { useEffect, useState, createElement } from 'react'
import { Check, Quote, Play, Star } from 'lucide-react'
import { trackScheduleOnce } from './lib/meta-capi'
import { ensureWistiaPlayerJs, ensureWistiaEmbedModule } from './lib/wistiaPlayer'
import { useInViewOnce } from './hooks/useInViewOnce'

const VIDEO_PRINCIPAL = { id: 'wpdtadch0z', aspect: '1.7777777777777777' }

const TESTIMONIOS_PROGRAMA = [
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

function VideoPlayer({ video, ready, className = '' }) {
  if (ready) {
    return createElement('wistia-player', {
      'media-id': video.id,
      aspect: video.aspect,
      className: `w-full block ${className}`,
    })
  }
  return (
    <div className={`aspect-video bg-slate-100/80 animate-pulse flex items-center justify-center ${className}`}>
      <Play className="w-10 h-10 text-slate-300" />
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--primary)] bg-[var(--primary)]/8 px-3 py-1 rounded-full mb-4">
      {children}
    </span>
  )
}

function VideoGrid({ videos, ready, cols = 3 }) {
  const gridClass =
    cols === 2
      ? 'grid sm:grid-cols-2 gap-4'
      : 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4'

  return (
    <div className={gridClass}>
      {videos.map((v) => (
        <div
          key={v.id}
          className="rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--background-subtle)] transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <VideoPlayer video={v} ready={ready} />
        </div>
      ))}
    </div>
  )
}

function LazySection({ children, allVideoIds }) {
  const [wrapRef, inView] = useInViewOnce()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!inView || ready) return
    let cancelled = false
    ;(async () => {
      try {
        await ensureWistiaPlayerJs()
        await Promise.all(allVideoIds.map((id) => ensureWistiaEmbedModule(id)))
        if (!cancelled) setReady(true)
      } catch {
        if (!cancelled) setReady(true)
      }
    })()
    return () => { cancelled = true }
  }, [inView, ready])

  return <div ref={wrapRef}>{children(ready)}</div>
}

export default function ThankYouPage() {
  const [heroReady, setHeroReady] = useState(false)

  useEffect(() => {
    trackScheduleOnce()
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await ensureWistiaPlayerJs()
        await ensureWistiaEmbedModule(VIDEO_PRINCIPAL.id)
        if (!cancelled) setHeroReady(true)
      } catch {
        if (!cancelled) setHeroReady(true)
      }
    })()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50/50">
      {/* Hero confirmation */}
      <div className="max-w-2xl mx-auto px-4 pt-16 sm:pt-20 pb-12">
        <div className="text-center opacity-0 animate-[tyFade_0.5s_ease-out_forwards]">
          <style>{`@keyframes tyFade { to { opacity: 1; } }`}</style>
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-100/50">
            <Check className="w-7 h-7 text-emerald-600" strokeWidth={3} />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--secondary)] mb-3">
            Tu lugar está reservado
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-10">
            Lo que sigue va a cambiar el rumbo de tu carrera.
          </p>
          <p className="text-[var(--secondary)] mb-10 leading-relaxed max-w-lg mx-auto">
            Gracias por dar este paso. Agendaste una llamada con Andrés. La mayoría de las personas ve la oportunidad y la deja pasar. Tú no.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-left mb-10">
            <div className="bg-[var(--background-subtle)] rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-bold text-[var(--secondary)] mb-3 text-sm uppercase tracking-wide">En la llamada:</h3>
              <ol className="space-y-2 text-[var(--secondary)] text-sm list-decimal list-inside">
                <li>Entender dónde estás hoy y qué quieres lograr.</li>
                <li>Ver si la certificación es el camino correcto.</li>
                <li>Si encaja, explicarte cómo empezar.</li>
              </ol>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-bold text-[var(--secondary)] mb-3 text-sm uppercase tracking-wide">Reflexiona antes:</h3>
              <ol className="space-y-2 text-[var(--secondary)] text-sm list-decimal list-inside">
                <li>¿Cómo es tu situación económica actual?</li>
                <li>¿Qué has intentado antes y por qué no funcionó?</li>
                <li>¿Qué te impediría decidir hoy?</li>
              </ol>
            </div>
          </div>

          <p className="text-[var(--text-secondary)] text-sm italic">
            Nos vemos pronto. — Andrés Guauque · Closwork
          </p>
        </div>
      </div>

      {/* Video principal destacado */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="text-center mb-6">
          <SectionLabel><Star className="w-3.5 h-3.5" /> Destacado</SectionLabel>
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)]">
            Mira esto antes de tu llamada
          </h2>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
          <VideoPlayer video={VIDEO_PRINCIPAL} ready={heroReady} />
        </div>
      </div>

      {/* Testimonios organizados */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Testimonios del programa */}
        <LazySection allVideoIds={TESTIMONIOS_PROGRAMA.map((v) => v.id)}>
          {(ready) => (
            <section className="mb-20">
              <div className="text-center mb-8">
                <SectionLabel>Testimonios</SectionLabel>
                <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)] mb-2">
                  Lo que dicen sobre el programa
                </h2>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto">
                  Historias reales de personas que tomaron la decisión
                </p>
              </div>
              <VideoGrid videos={TESTIMONIOS_PROGRAMA} ready={ready} cols={3} />
            </section>
          )}
        </LazySection>

        {/* Closers */}
        <LazySection allVideoIds={TESTIMONIOS_CLOSERS.map((v) => v.id)}>
          {(ready) => (
            <section className="mb-20">
              <div className="text-center mb-8">
                <SectionLabel>Resultados</SectionLabel>
                <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)] mb-2">
                  Closers generando ingresos
                </h2>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto">
                  Personas que ya están cerrando ventas y ganando comisiones
                </p>
              </div>
              <VideoGrid videos={TESTIMONIOS_CLOSERS} ready={ready} cols={3} />
            </section>
          )}
        </LazySection>

        {/* Empresas - más compacto */}
        <LazySection allVideoIds={TESTIMONIOS_EMPRESAS.map((v) => v.id)}>
          {(ready) => (
            <section className="mb-16 max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-semibold text-[var(--text-secondary)] mb-1">
                  Empresas que confían en Closwork
                </h3>
              </div>
              <VideoGrid videos={TESTIMONIOS_EMPRESAS} ready={ready} cols={3} />
            </section>
          )}
        </LazySection>

        {/* Quote final */}
        <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl border border-[var(--border)] text-center shadow-sm">
          <Quote className="w-8 h-8 text-[var(--primary)]/40 mx-auto mb-4" aria-hidden />
          <p className="text-[var(--secondary)] italic leading-relaxed">
            &ldquo;He entrenado closers que llegaron sin experiencia en ventas y hoy generan comisiones mensuales en dólares con empresas reales.&rdquo;
          </p>
          <p className="text-[var(--primary)] font-semibold mt-4 text-sm">— Andrés Guauque</p>
        </div>
      </div>
    </div>
  )
}
