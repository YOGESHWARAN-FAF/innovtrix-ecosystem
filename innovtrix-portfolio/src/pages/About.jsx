import { motion } from 'framer-motion'
import { FiTarget, FiActivity, FiUsers, FiAward } from 'react-icons/fi'

export default function About() {
  const values = [
    {
      icon: <FiTarget className="text-3xl text-brand-primary" />,
      title: 'Laser Focus',
      description: 'We do not build general chatbots or CRM tools. By focusing strictly on premium e-commerce, commercial portfolios, and tech prototypes, we maintain cleaner codebases.'
    },
    {
      icon: <FiAward className="text-3xl text-brand-primary" />,
      title: 'Premium Quality',
      description: 'We adhere to high coding practices: semantic structures, optimized database schemas, fully responsive CSS grids, and smooth animations that keep users engaged.'
    },
    {
      icon: <FiActivity className="text-3xl text-brand-primary" />,
      title: 'Conversion Driven',
      description: 'A beautiful website is useless if it does not sell. Every design decision we make is backed by conversion rate optimization (CRO) principles.'
    },
    {
      icon: <FiUsers className="text-3xl text-brand-primary" />,
      title: 'Collaborative Process',
      description: 'We do not work in isolation. We partner closely with clients from initial concept and wireframing through to launch, server setup, and scaling.'
    }
  ]

  return (
    <div className="font-sans">
      {/* Intro Banner */}
      <section className="bg-slate-950 py-20 px-6 relative border-b border-white/5">
        <div className="glow-bg bg-brand-primary top-0 left-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-semibold text-brand-primary uppercase tracking-wider"
          >
            OUR MISSION
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
            We Build Websites That Build Businesses
          </h1>
          <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Innovtrix delivers engineering excellence across web storefronts, commercial presentation sites, and embedded systems prototypes.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-slate-900 border-b border-white/5 px-6">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">OUR FOUNDING STORY</span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-6">Founders & Vision</h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed bg-slate-950/40 p-8 rounded-2xl border border-white/5 shadow-glass-dark">
            Innovtrix was founded by friends who shared a passion for technology, innovation, and helping businesses grow through professional website and mobile application development. Beyond software solutions, we also specialize in designing and developing innovative electronics projects, IoT systems, embedded solutions, and custom hardware prototypes, delivering complete technology solutions for businesses, students, and industries.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-950 px-6">
        <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
          <span className="text-xs font-semibold tracking-wider text-brand-primary uppercase font-sans">THE INNOVTRIX WAY</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">Designed for Scale, Engineered for Performance</h2>
          <p className="text-slate-400 text-base leading-relaxed mb-6">
            Our engineering process blends aesthetic design with technical performance. We utilize React and Vite for our frontend rendering because it provides instant compilation, lightweight assets, and modern Component structuring.
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
            On the backend, our services leverage FastAPI (Python) and MySQL database arrays. FastAPI provides high-speed execution, automated documentation via OpenAPI schemas, and strict data type checks to secure company pipelines.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-900 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-xs font-semibold tracking-wider text-brand-primary uppercase">OUR FOUNDATION</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Core Principles We Follow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="glass-card p-8 border-white/5 hover:border-brand-primary/20 transition-all flex flex-col justify-start bg-slate-950/50"
              >
                <div className="mb-4">{val.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{val.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
