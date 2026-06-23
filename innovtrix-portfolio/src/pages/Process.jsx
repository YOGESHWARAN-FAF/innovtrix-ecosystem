export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Consultation',
      desc: 'We research your target sectors (e.g., Textile, Retail, Jewellery) to understand product attributes and buyer journeys, aligning budgets and key deliverables.'
    },
    {
      num: '02',
      title: 'UI/UX Wireframing & Prototyping',
      desc: 'We design premium, Vercel/Stripe-styled mockups. We optimize navigation flows, product grids, checkout structures, and lead generation banners.'
    },
    {
      num: '03',
      title: 'Frontend Component Architecture',
      desc: 'Using React 19 and Vite, we code the frontend components, applying Tailwind CSS styles and fluid Framer Motion / GSAP animations.'
    },
    {
      num: '04',
      title: 'Backend Logic & DB Integration',
      desc: 'We configure FastAPI Python routers and connect them to MySQL tables. We build secure JWT authorization headers and automated invoicing routes.'
    },
    {
      num: '05',
      title: 'Lighthouse Audits & Security Reviews',
      desc: 'We verify performance, SEO metadata, and accessibility tags. We test payment transactions in staging, ensuring the codebase scores 90+ across categories.'
    },
    {
      num: '06',
      title: 'Vercel / Render Deployment',
      desc: 'We compile and build the final static assets for Vercel, and provision FastAPI services to Render, enabling continuous deployment from Git.'
    }
  ]

  return (
    <div className="font-sans">
      {/* Intro Banner */}
      <section className="bg-slate-950 py-20 px-6 relative border-b border-white/5">
        <div className="glow-bg bg-brand-primary top-0 left-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">DEVELOPMENT LIFECYCLE</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
            Our Development Process
          </h1>
          <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            From your initial idea to server launch, here is how we partner with you to engineer your digital flagship.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-slate-950 px-6">
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 top-8 bottom-8 w-px bg-slate-800 pointer-events-none"></div>

          <div className="space-y-16">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className={`relative flex flex-col md:flex-row items-start ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                data-aos={idx % 2 === 0 ? 'fade-left' : 'fade-right'}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-primary rounded-full border-4 border-slate-950 z-10 top-2 shadow-glow"></div>
                
                {/* Content card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="glass-card p-6 border-white/5 relative hover:border-brand-primary/10 transition-colors">
                    <span className="absolute top-4 right-4 text-xs font-bold text-slate-700 dark:text-slate-600">{step.num}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Empty slot for design balance */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
