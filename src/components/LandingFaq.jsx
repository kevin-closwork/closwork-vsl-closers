import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  { q: '¿Necesito experiencia en ventas?', a: 'No. El programa está diseñado desde cero. Lo que necesitas son ganas de aprender y disposición para practicar.' },
  { q: '¿Cuánto puedo ganar como closer?', a: 'Depende de tu esfuerzo y las oportunidades que tomes. Un closer activo puede generar entre $1,500 y $5,000 USD mensuales en comisiones.' },
  { q: '¿Qué pasa después de certificarme?', a: 'Obtienes acceso a la red de empresas de Closwork — empresas reales que ya necesitan closers certificados.' },
  { q: '¿Es un curso pregrabado?', a: 'Es un programa híbrido: módulos grabados + sesiones en vivo semanales con Andrés + comunidad en Skool + role plays grupales.' },
  { q: '¿Hay garantía?', a: 'Sí. Si en 90 días no podemos conectarte con una empresa en High Ticket, te devolvemos tu inversión + $200 USD.' },
]

export default function LandingFaq() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <section id="faq" className="py-16 lg:py-20 bg-gradient-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-[var(--secondary)] text-center mb-10">
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-medium text-[var(--secondary)] hover:bg-[var(--background-subtle)] transition-colors text-sm sm:text-base"
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
