import { useEffect, useState, createElement } from 'react'
import { Check, Play, Star, ArrowDown } from 'lucide-react'
import { trackScheduleOnce } from './lib/meta-capi'
import { ensureWistiaPlayerJs, ensureWistiaEmbedModule } from './lib/wistiaPlayer'
import { useInViewOnce } from './hooks/useInViewOnce'

const ALL_VIDEOS = [
  { id: 'wpdtadch0z', aspect: '1.7777777777777777' },
  { id: 'qwpaukexqm', aspect: '2.1524663677130045' },
  { id: '7rfq990019', aspect: '1.7777777777777777' },
  { id: '7hwf033hh0', aspect: '1.7777777777777777' },
  { id: '2v79098752', aspect: '1.7843866171003717' },
  { id: '5ydnmq4z0y', aspect: '1.7777777777777777' },
  { id: 'z6cqho9fgw', aspect: '1.7777777777777777' },
  { id: '22xpkuadcy', aspect: '1.7843866171003717' },
  { id: 'wg27x4kya7', aspect: '1.7843866171003717' },
  { id: 'rd06ag3xmc', aspect: '1.7843866171003717' },
]

const STYLES = `
@keyframes tyFade { to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.4); opacity: 0; } }
.ty-fade { opacity: 0; transform: translateY(12px); animation: tyFade 0.6s ease-out forwards; }
.ty-fade-d1 { animation-delay: 0.1s; }
.ty-fade-d2 { animation-delay: 0.2s; }
.ty-fade-d3 { animation-delay: 0.35s; }
.ty-fade-d4 { animation-delay: 0.5s; }
.ty-fade-d5 { animation-delay: 0.65s; }
.float-anim { animation: float 3s ease-in-out infinite; }
`

function VideoCard({ video, ready, index = 0, large = false }) {
  const delay = `${index * 80}ms`
  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        large
          ? 'shadow-lg ring-1 ring-black/5'
          : 'shadow-sm border border-[var(--border)] bg-[var(--background-subtle)]'
      }`}
      style={{ animationDelay: delay }}
    >
      {ready ? (
        createElement('wistia-player', {
          'media-id': video.id,
          aspect: video.aspect,
          className: 'w-full block',
        })
      ) : (
        <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-50 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
            <Play className="w-5 h-5 text-slate-400 ml-0.5" />
          </div>
        </div>
      )}
    </div>
  )
}

function TestimonialsZone() {
  const [wrapRef, inView] = useInViewOnce()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!inView || ready) return
    let cancelled = false
    ;(async () => {
      try {
        await ensureWistiaPlayerJs()
        await Promise.all(ALL_VIDEOS.map((v) => ensureWistiaEmbedModule(v.id)))
        if (!cancelled) setReady(true)
      } catch {
        if (!cancelled) setReady(true)
      }
    })()
    return () => { cancelled = true }
  }, [inView, ready])

  const featured = ALL_VIDEOS[0]
  const rest = ALL_VIDEOS.slice(1)

  return (
    <section ref={wrapRef} className="relative">
      {/* Featured video */}
      <div className="max-w-4xl mx-auto mb-10">
        <VideoCard video={featured} ready={ready} large />
      </div>

      {/* Grid of remaining videos */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map((v, i) => (
          <VideoCard key={v.id} video={v} ready={ready} index={i} />
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
    <div className="min-h-screen bg-[#fafbfc]">
      <style>{STYLES}</style>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto px-4 pt-16 sm:pt-24 pb-14 relative">
          {/* Success indicator */}
          <div className="ty-fade flex justify-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-[pulse-ring_2s_ease-out_infinite]" />
            </div>
          </div>

          <h1 className="ty-fade ty-fade-d1 text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--secondary)] mb-4 tracking-tight">
            Tu lugar está reservado
          </h1>
          <p className="ty-fade ty-fade-d2 text-center text-lg sm:text-xl text-[var(--text-secondary)] mb-12 max-w-md mx-auto">
            Lo que sigue va a cambiar el rumbo de tu carrera.
          </p>

          {/* Info cards */}
          <div className="ty-fade ty-fade-d3 grid sm:grid-cols-2 gap-4 mb-10">
            <div className="group bg-white rounded-2xl p-6 border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                <span className="text-[var(--primary)] font-bold text-sm">1</span>
              </div>
              <h3 className="font-semibold text-[var(--secondary)] mb-3 text-sm">En la llamada vamos a:</h3>
              <ul className="space-y-2 text-[var(--secondary)] text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-[var(--primary)] mt-0.5">•</span>Entender dónde estás y qué quieres lograr</li>
                <li className="flex gap-2"><span className="text-[var(--primary)] mt-0.5">•</span>Ver si la certificación es para ti</li>
                <li className="flex gap-2"><span className="text-[var(--primary)] mt-0.5">•</span>Explicarte cómo conectar con empresas reales</li>
              </ul>
            </div>
            <div className="group bg-white rounded-2xl p-6 border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                <span className="text-amber-600 font-bold text-sm">?</span>
              </div>
              <h3 className="font-semibold text-[var(--secondary)] mb-3 text-sm">Reflexiona antes de la llamada:</h3>
              <ul className="space-y-2 text-[var(--secondary)] text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-amber-500 mt-0.5">•</span>¿Cómo es tu situación económica hoy?</li>
                <li className="flex gap-2"><span className="text-amber-500 mt-0.5">•</span>¿Qué has intentado antes?</li>
                <li className="flex gap-2"><span className="text-amber-500 mt-0.5">•</span>¿Qué te impediría decidir hoy?</li>
              </ul>
            </div>
          </div>

          <p className="ty-fade ty-fade-d4 text-center text-[var(--text-secondary)] text-sm">
            Nos vemos pronto. — <span className="font-medium text-[var(--secondary)]">Andrés Guauque</span> · Closwork
          </p>

          {/* Scroll indicator */}
          <div className="ty-fade ty-fade-d5 flex justify-center mt-12">
            <div className="float-anim flex flex-col items-center gap-1 text-[var(--text-secondary)]/60">
              <span className="text-xs font-medium uppercase tracking-wider">Testimonios</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonios destacados - una sola zona */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--primary)]/8 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            <Star className="w-3.5 h-3.5" />
            Testimonios destacados
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--secondary)] mb-3">
            Ellos ya lo lograron
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            Closers, empresas y personas reales que tomaron la decisión y hoy ven resultados.
          </p>
        </div>

        <TestimonialsZone />

        {/* Quote */}
        <div className="mt-16 max-w-xl mx-auto text-center">
          <p className="text-lg sm:text-xl text-[var(--secondary)] italic leading-relaxed">
            &ldquo;He entrenado closers que llegaron sin experiencia y hoy generan comisiones mensuales en dólares con empresas reales.&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
              <span className="text-[var(--primary)] font-bold text-xs">AG</span>
            </div>
            <span className="text-sm font-medium text-[var(--secondary)]">Andrés Guauque</span>
          </div>
        </div>
      </div>
    </div>
  )
}
