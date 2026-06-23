import { useState } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  const faqs = [
    {
      q: 'Do you use pre-built templates or builders like WordPress?',
      a: 'Yes. We develop websites using both WordPress and custom technologies such as React (Vite) and Tailwind CSS. Based on your business requirements, budget, and project complexity, we recommend the most suitable solution. Whether you need a flexible WordPress website or a fully custom web application, we ensure every project is responsive, secure, and optimized for performance.'
    },
    {
      q: 'What backend server technology do you deploy?',
      a: 'We develop secure and scalable backend systems using Python (FastAPI and Flask), Node.js, and PHP depending on the project requirements. Our backend solutions are designed for high performance, secure APIs, and seamless integration with modern databases and third-party services.'
    },
    {
      q: 'How long does website development take?',
      a: 'The development timeline depends on the project type and requirements.\n\n• Basic Business Website: 3–7 Working Days\n• Professional Business Website: 7–15 Working Days\n• E-Commerce Website: 10–15 Working Days'
    },
    {
      q: 'Do you offer services beyond website development?',
      a: 'Yes. In addition to E-Commerce and Commercial Website Development, Innovtrix also provides Mobile App Development, Electronics Projects, IoT Solutions, and Embedded System Development. We deliver customized technology solutions based on your business or project requirements.'
    }
  ]

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <div className="font-sans">
      {/* Intro Banner */}
      <section className="bg-slate-950 py-20 px-6 relative border-b border-white/5">
        <div className="glow-bg bg-brand-primary top-0 left-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">HAVE QUESTIONS?</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Find answers about our design platforms, server languages, timeline estimations, and custom IoT services.
          </p>
        </div>
      </section>

      {/* Accordion List */}
      <section className="py-24 bg-slate-950 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="glass-card border-white/5 overflow-hidden transition-all duration-300 animate-fade-in"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full px-6 py-5 flex justify-between items-center text-left text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="font-bold text-sm md:text-base">{faq.q}</span>
                <span className="text-brand-primary ml-4">
                  {openIdx === idx ? <FiMinus size={18} /> : <FiPlus size={18} />}
                </span>
              </button>
              
              {openIdx === idx && (
                <div className="px-6 pb-6 pt-2 text-slate-400 text-sm leading-relaxed border-t border-white/5 bg-slate-900/30 whitespace-pre-line">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
