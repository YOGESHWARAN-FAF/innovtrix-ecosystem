import { useNavigate } from 'react-router-dom'
import { FiShoppingBag, FiGlobe, FiArrowRight, FiCheck } from 'react-icons/fi'

export default function Services() {
  const navigate = useNavigate()

  const serviceDetails = [
    {
      icon: <FiShoppingBag className="text-4xl text-brand-primary mb-6" />,
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
      icon: <FiGlobe className="text-4xl text-brand-primary mb-6" />,
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
    <div className="font-sans">
      {/* Intro Banner */}
      <section className="bg-slate-950 py-20 px-6 relative border-b border-white/5">
        <div className="glow-bg bg-brand-primary top-0 right-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">WHAT WE ENGAGE IN</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
            Focused Web Services
          </h1>
          <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            We focus exclusively on two domains. By specializing, we guarantee state-of-the-art results for your online storefront or commercial corporate project.
          </p>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-24 bg-slate-950 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          {serviceDetails.map((service, index) => (
            <div 
              key={index}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className="glass-card p-8 lg:p-16 border-white/5 hover:border-brand-primary/20 transition-all grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                {service.icon}
                <h2 className="text-3xl font-bold text-white mb-2">{service.title}</h2>
                <h4 className="text-brand-accent text-sm font-semibold mb-6">{service.subtitle}</h4>
                <p className="text-slate-400 text-base leading-relaxed mb-8">{service.description}</p>
                
                <button 
                  onClick={() => navigate('/contact')}
                  className="btn-primary w-full sm:w-auto px-8 py-3.5"
                >
                  Request Quote <FiArrowRight />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-4">Key Inclusions</h3>
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
      <section className="py-24 bg-slate-900 border-t border-white/5 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">TARGET MARKET</span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-6">Who We Build For</h2>
          <p className="text-slate-400 text-base mb-12 max-w-2xl mx-auto leading-relaxed">
            Our templates are structured to optimize user experience and conversion layouts for specific business sectors. We build tailored architectures for:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind, idx) => (
              <span 
                key={idx} 
                className="px-5 py-2.5 rounded-xl bg-slate-950 border border-white/5 text-slate-300 text-sm font-medium hover:border-brand-primary/30 transition-all duration-300 cursor-default"
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
