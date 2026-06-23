import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()

  const projects = [
    {
      title: 'Vogue Silk Textiles',
      category: 'E-Commerce Storefront',
      type: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
      desc: 'Enterprise-grade catalog and retail store custom designed for a high-fashion textile exporter.',
      link: 'https://ps-tex-production.up.railway.app'
    },
    {
      title: 'Aura Fine Jewellery',
      category: 'Online Shopping Websites',
      type: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop',
      desc: 'Elegant high-conversion digital boutique featuring Stripe checkout, inventory management, and 3D preview mockups.'
    },
    {
      title: 'Apex Construction Group',
      category: 'Corporate Websites',
      type: 'Corporate',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop',
      desc: 'Premium commercial website showing heavy industrial portfolios, active projects tracker, and bids portal.'
    },
    {
      title: 'Lumina Electronics Hub',
      category: 'Modern E-Commerce Websites',
      type: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop',
      desc: 'High-speed retail store built with fast search query processing for thousands of electronic items.'
    },
    {
      title: 'Verdant Real Estate',
      category: 'Landing Pages',
      type: 'Landing Pages',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop',
      desc: 'Single-page landing page featuring dynamic properties galleries, contact forms, and booking triggers.'
    },
    {
      title: 'Apex Furniture Showroom',
      category: 'Product Catalog Websites',
      type: 'Product Catalog',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop',
      desc: 'Premium interactive catalog with customization configuration parameters and quotation builder tools.'
    },
    {
      title: 'Zenith Wholesale Emporium',
      category: 'Wholesale Business Websites',
      type: 'Wholesale',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
      desc: 'Portal built for wholesale B2B buyers with login restrictions, custom tier pricing structure, and bulk invoice automation.'
    }
  ]

  const filterCategories = ['All', 'E-Commerce', 'Textile', 'Corporate', 'Landing Pages', 'Product Catalog', 'Wholesale']

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.type === filter || p.category.includes(filter))

  return (
    <div className="font-sans">
      {/* Intro Banner */}
      <section className="bg-slate-950 py-20 px-6 relative border-b border-white/5">
        <div className="glow-bg bg-brand-primary top-0 left-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">OUR PORTFOLIO</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
            Engineering Showcases
          </h1>
          <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Take a look at some of our production builds. Each project was customized to optimize speed, conversions, and layout design.
          </p>
        </div>
      </section>

      {/* Filterable Portfolio Grid */}
      <section className="py-24 bg-slate-950 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16" data-aos="fade-up">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl border transition-all duration-200 cursor-pointer ${
                  filter === cat 
                    ? 'border-brand-primary bg-brand-primary/10 text-white shadow-glow' 
                    : 'border-white/5 bg-slate-900/60 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="glass-card overflow-hidden hover:border-brand-primary/20 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors"></div>
                    <span className="absolute top-4 left-4 text-[10px] font-bold tracking-wider uppercase bg-slate-950/90 text-brand-primary px-3 py-1 rounded-full border border-white/10">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.desc}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 btn-secondary text-xs bg-emerald-500/10 hover:bg-emerald-500 border-emerald-500/20 hover:border-transparent text-white py-3 transition-all flex items-center justify-center gap-2"
                    >
                      Sample Website <FiArrowRight size={12} />
                    </a>
                  )}
                  <button 
                    onClick={() => navigate('/contact')}
                    className="flex-1 btn-secondary text-xs hover:bg-brand-primary hover:border-transparent transition-all flex items-center justify-center gap-2 py-3"
                  >
                    Discuss Build <FiArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="text-center text-slate-500 text-sm py-12">
              No project listings in this category. More updates coming soon.
            </p>
          )}

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-slate-900 border-t border-white/5 px-6">
        <div className="max-w-4xl mx-auto text-center" data-aos="zoom-in">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Want a Customized Platform?</h2>
          <p className="text-slate-400 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Let us review your design goals, required features, and budget ranges to build a proposal proposal.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="btn-primary px-8"
          >
            Launch Your Quote Request
          </button>
        </div>
      </section>

    </div>
  )
}
