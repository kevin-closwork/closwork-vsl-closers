import { useEffect, useState, useRef, createElement } from 'react'
import { Check, Play, Star, ArrowDown, Building2 } from 'lucide-react'
import { trackScheduleOnce } from './lib/meta-capi'
import { ensureWistiaPlayerJs, ensureWistiaEmbedModule } from './lib/wistiaPlayer'
import { useInViewOnce } from './hooks/useInViewOnce'

const VIDEOS_DESTACADOS = [
  { id: 'wpdtadch0z', aspect: '1.7777777777777777' },
  { id: 'qwpaukexqm', aspect: '2.1524663677130045' },
  { id: '7rfq990019', aspect: '1.7777777777777777' },
  { id: '7hwf033hh0', aspect: '1.7777777777777777' },
  { id: '2v79098752', aspect: '1.7843866171003717' },
  { id: '5ydnmq4z0y', aspect: '1.7777777777777777' },
  { id: 'z6cqho9fgw', aspect: '1.7777777777777777' },
]

const VIDEOS_EMPRESAS = [
  { id: '22xpkuadcy', aspect: '1.7843866171003717' },
  { id: 'wg27x4kya7', aspect: '1.7843866171003717' },
  { id: 'rd06ag3xmc', aspect: '1.7843866171003717' },
]

const CONFETTI_COLORS = ['#6C63FF', '#FF6584', '#43E97B', '#F7971E', '#38F9D7', '#FAD961', '#A18CD1']

const STYLES = `
@keyframes tyFade { to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.4); opacity: 0; } }
@keyframes confetti-fall {
  0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
@keyframes scale-in { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes slide-up { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes badge-pop { 0% { transform: scale(0) rotate(-12deg); opacity: 0; } 60% { transform: scale(1.1) rotate(2deg); } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }

.ty-fade { opacity: 0; transform: translateY(12px); animation: tyFade 0.6s ease-out forwards; }
.ty-fade-d1 { animation-delay: 0.15s; }
.ty-fade-d2 { animation-delay: 0.3s; }
.ty-fade-d3 { animation-delay: 0.5s; }
.ty-fade-d4 { animation-delay: 0.7s; }
.ty-fade-d5 { animation-delay: 0.9s; }
.float-anim { animation: float 3s ease-in-out infinite; }
.scale-in { animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.badge-pop { opacity: 0; animation: badge-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s forwards; }
.shimmer-bg {
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
}
.slide-up { opacity: 0; animation: slide-up 0.6s ease-out forwards; }

.confetti-piece {
  position: fixed;
  top: -20px;
  width: 10px;
  height: 10px;
  animation: confetti-fall linear forwards;
  pointer-events: none;
  z-index: 50;
}
`

function Confetti() {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    const items = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.8,
      size: 6 + Math.random() * 8,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }))
    setPieces(items)

    const timer = setTimeout(() => setPieces([]), 4500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.shape === 'rect' ? p.size * 0.6 : p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  )
}

function VideoCard({ video, ready, index = 0, large = false }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 ${
        large
          ? 'shadow-lg ring-1 ring-black/5'
          : 'shadow-sm border border-[var(--border)] bg-[var(--background-subtle)]'
      } ${visible ? 'slide-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}
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

function VideoSection({ videos, allIds }) {
  const [wrapRef, inView] = useInViewOnce()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!inView || ready) return
    let cancelled = false
    ;(async () => {
      try {
        await ensureWistiaPlayerJs()
        await Promise.all(allIds.map((id) => ensureWistiaEmbedModule(id)))
        if (!cancelled) setReady(true)
      } catch {
        if (!cancelled) setReady(true)
      }
    })()
    return () => { cancelled = true }
  }, [inView, ready])

  const featured = videos[0]
  const rest = videos.slice(1)

  return (
    <div ref={wrapRef}>
      <div className="max-w-4xl mx-auto mb-8">
        <VideoCard video={featured} ready={ready} large />
      </div>
      {rest.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((v, i) => (
            <VideoCard key={v.id} video={v} ready={ready} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ThankYouPage() {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    trackScheduleOnce()
    const t = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-[#fafbfc] relative overflow-x-hidden">
      <style>{STYLES}</style>
      {showConfetti && <Confetti />}

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto px-4 pt-16 sm:pt-24 pb-14 relative">
          {/* Success indicator with confetti context */}
          <div className="ty-fade flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/30 scale-in">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </div>
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-[pulse-ring_2s_ease-out_infinite]" />
            </div>
          </div>

          {/* Felicidades badge */}
          <div className="flex justify-center mb-6">
            <span className="badge-pop inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full border border-emerald-200 shadow-sm">
              🎉 ¡Felicidades! Vas por buen camino
            </span>
          </div>

          <h1 className="ty-fade ty-fade-d1 text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--secondary)] mb-4 tracking-tight">
            Tu lugar está reservado
          </h1>
          <p className="ty-fade ty-fade-d2 text-center text-lg sm:text-xl text-[var(--text-secondary)] mb-12 max-w-md mx-auto">
            Lo que sigue va a cambiar el rumbo de tu carrera.
          </p>

          {/* Info cards */}
          <div className="ty-fade ty-fade-d3 grid sm:grid-cols-2 gap-4 mb-10">
            <div className="group bg-white rounded-2xl p-6 border border-[var(--border)] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-[var(--primary)] font-bold text-sm">1</span>
              </div>
              <h3 className="font-semibold text-[var(--secondary)] mb-3 text-sm">En la llamada vamos a:</h3>
              <ul className="space-y-2.5 text-[var(--secondary)] text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-[var(--primary)] mt-0.5 shrink-0">•</span>Entender dónde estás y qué quieres lograr</li>
                <li className="flex gap-2"><span className="text-[var(--primary)] mt-0.5 shrink-0">•</span>Ver si la certificación es para ti</li>
                <li className="flex gap-2"><span className="text-[var(--primary)] mt-0.5 shrink-0">•</span>Explicarte cómo conectar con empresas reales</li>
              </ul>
            </div>
            <div className="group bg-white rounded-2xl p-6 border border-[var(--border)] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-amber-600 font-bold text-sm">?</span>
              </div>
              <h3 className="font-semibold text-[var(--secondary)] mb-3 text-sm">Reflexiona antes de la llamada:</h3>
              <ul className="space-y-2.5 text-[var(--secondary)] text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-amber-500 mt-0.5 shrink-0">•</span>¿Cómo es tu situación económica hoy?</li>
                <li className="flex gap-2"><span className="text-amber-500 mt-0.5 shrink-0">•</span>¿Qué has intentado antes?</li>
                <li className="flex gap-2"><span className="text-amber-500 mt-0.5 shrink-0">•</span>¿Qué te impediría decidir hoy?</li>
              </ul>
            </div>
          </div>

          <p className="ty-fade ty-fade-d4 text-center text-[var(--text-secondary)] text-sm">
            Nos vemos pronto. — <span className="font-medium text-[var(--secondary)]">Andrés Guauque</span> · Closwork
          </p>

          {/* Scroll indicator */}
          <div className="ty-fade ty-fade-d5 flex justify-center mt-14">
            <div className="float-anim flex flex-col items-center gap-1.5 text-[var(--text-secondary)]/60">
              <span className="text-xs font-medium uppercase tracking-wider">Testimonios</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonios destacados */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--primary)]/8 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            <Star className="w-3.5 h-3.5" />
            Testimonios destacados
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--secondary)] mb-3">
            Ellos ya lo lograron
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            Closers y personas reales que tomaron la decisión y hoy ven resultados.
          </p>
        </div>

        <VideoSection
          videos={VIDEOS_DESTACADOS}
          allIds={VIDEOS_DESTACADOS.map((v) => v.id)}
        />

        {/* Quote */}
        <div className="mt-20 max-w-xl mx-auto text-center">
          <p className="text-lg sm:text-xl text-[var(--secondary)] italic leading-relaxed">
            &ldquo;He entrenado closers que llegaron sin experiencia y hoy generan comisiones mensuales en dólares con empresas reales.&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
              <span className="text-[var(--primary)] font-bold text-xs">AG</span>
            </div>
            <span className="text-sm font-medium text-[var(--secondary)]">Andrés Guauque</span>
          </div>
        </div>
      </div>

      {/* Empresas - sección separada */}
      <div className="bg-white border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
              <Building2 className="w-3.5 h-3.5" />
              Empresas
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--secondary)] mb-2">
              Empresas que confían en Closwork
            </h2>
            <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto">
              Estas empresas ya trabajan con closers certificados por nosotros.
            </p>
          </div>
          <VideoSection
            videos={VIDEOS_EMPRESAS}
            allIds={VIDEOS_EMPRESAS.map((v) => v.id)}
          />
        </div>
      </div>
    </div>
  )
}
