export default function LandingFooter() {
  return (
    <footer className="bg-[var(--secondary)] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <a href="#" className="text-lg font-bold text-white inline-block">
          Closwork
        </a>
        <p className="text-white/50 text-xs mt-2">× Andrés Guauque</p>
        <p className="text-white/40 text-xs mt-6 max-w-xl mx-auto leading-relaxed">
          © {new Date().getFullYear()} Closwork. Closwork y Andrés Guauque no garantizan ingresos específicos; los resultados dependen del esfuerzo de cada alumno.
        </p>
      </div>
    </footer>
  )
}
