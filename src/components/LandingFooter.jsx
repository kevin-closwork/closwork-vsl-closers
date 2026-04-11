import { Linkedin, Twitter } from 'lucide-react'
import { getFooterSocials } from '../config/organization'

export default function LandingFooter() {
  const social = getFooterSocials()

  return (
    <footer className="bg-[var(--secondary)] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <a href="#" className="text-lg font-bold text-white inline-block">
          Closwork
        </a>
        <p className="text-white/50 text-xs mt-2">× Andrés Guauque</p>
        {(social.linkedin || social.twitter) && (
          <div className="flex justify-center gap-3 mt-6">
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer me"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer me"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
        <p className="text-white/40 text-xs mt-6 max-w-xl mx-auto leading-relaxed">
          © {new Date().getFullYear()} Closwork. Closwork y Andrés Guauque no garantizan ingresos específicos; los resultados dependen del esfuerzo de cada alumno.
        </p>
      </div>
    </footer>
  )
}
