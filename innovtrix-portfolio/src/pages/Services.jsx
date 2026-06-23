import { useNavigate } from 'react-router-dom'
import { FiShoppingBag, FiGlobe, FiArrowRight, FiCheck } from 'react-icons/fi'

export default function Services() {
  const navigate = useNavigate()

  const serviceDetails = [
    {
      icon: <FiShoppingBag className="text-5xl text-brand-primary mb-6" />,
      title: 'E-Commerce Website Development',
      subtitle: 'Build high-performance, high-converting online stores.',
      description: 'We develop premium E-Commerce portals tailored for retailers, wholesale distributors, and manufacturers. From custom payment gateway integrations to complex product variant architectures, we deliver fast, secure online shopping experiences.',
      features: [
        'Secure Checkout & Multiple Payment Gateways (Stripe, PayPal, etc.)',
        'Dynamic Inventory & Order Management Systems',
        'Product Variant Management (Sizes, Colors, Categories)',
        'Customer Account Portals & Invoice Automation',
        'Advanced Search & Custom Filtering Options',
        'Abandoned Cart Recovery & Coupons Systems'
      ],
      type: 'ecommerce'
    },
    {
      icon: <FiGlobe className="text-5xl text-brand-primary mb-6" />,
      title: 'Commercial Website Development',
      subtitle: 'Premium corporate sites, product catalogs, and landing pages.',
      description: 'We engineer commercial websites designed to build brand authority and generate high-quality leads. Whether you need a corporate business presentation, a wholesale product catalog, or a landing page for real estate, construction, or manufacturing.',
      features: [
        'Custom interactive layout and Stripe/Vercel design patterns',
        'Robust Lead Capture, Quote Forms, & CRM connectivity',
        'Product Catalogs (Showcase items without active carts)',
        'SEO-Optimized speed structures scoring 90+ on Lighthouse',
        'Secure admin integrations and CMS configurations',
        'Multi-lingual support and localization setups'
      ],
      type: 'commercial'
    }
  ]

  const industries = [
    'Textile & Garments', 'Retail Shops', 'Wholesale Businesses', 
    'Manufacturing Companies', 'Jewellery', 'Electronics & Mobiles', 
    'Furniture Showrooms', 'Medical Stores & Supermarkets', 
    'Construction & Real Estate', 'Corporate Businesses', 'Startups & Small Businesses'
  ]

  return (
    <div className="font-sans bg-black text-slate-100 min-h-screen bg-grid-pattern">
      {/* Intro Banner */}
      <section className="bg-black py-28 px-6 relative border-b border-white/10">
        <div className="glow-bg bg-brand-primary/20 top-0 right-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <span className="text-xs font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full">WHAT WE ENGAGE IN</span>
          <h1 className="text-4xl md:text-7xl font-black text-white mt-8 tracking-tight uppercase leading-[1.1]">
            Focused <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white]">Web Services</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed">
            We focus exclusively on two domains. By specializing, we guarantee state-of-the-art results for your online storefront or commercial corporate project.
          </p>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-32 bg-black px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {serviceDetails.map((service, index) => (
            <div 
              key={index}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className="glass-card p-8 lg:p-16 border-white/5 hover:border-brand-primary/30 hover:shadow-glow transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-zinc-900/10"
            >
              <div>
                {service.icon}
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 uppercase tracking-tight">{service.title}</h2>
                <h4 className="text-brand-primary text-sm font-bold mb-8 uppercase tracking-wider">{service.subtitle}</h4>
                <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium">{service.description}</p>
                
                <button 
                  onClick={() => navigate('/contact')}
                  className="btn-primary w-full sm:w-auto px-8 py-4 font-black uppercase tracking-wider text-xs"
                >
                  Request Quote <FiArrowRight />
                </button>
              </div>

              <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-white/5 bg-grid-pattern">
                <h3 className="text-lg font-black text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-4">Key Inclusions</h3>
                <ul className="space-y-4">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-slate-300">
                      <FiCheck className="text-brand-primary text-xl mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Target Industries */}
      <section className="py-28 bg-zinc-950/40 border-t border-white/10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-black text-brand-primary uppercase tracking-widest">TARGET MARKET</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-4 mb-6 uppercase">Who We Build For</h2>
          <p className="text-slate-400 text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Our templates are structured to optimize user experience and conversion layouts for specific business sectors. We build tailored architectures for:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind, idx) => (
              <span 
                key={idx} 
                className="px-5 py-3 rounded-xl bg-black border border-white/5 text-slate-300 text-sm font-bold hover:border-brand-primary/40 hover:text-white transition-all duration-300 cursor-default"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
