import { useNavigate } from 'react-router-dom'
import { FiCheck, FiInfo } from 'react-icons/fi'

export default function Pricing() {
  const navigate = useNavigate()

  const plans = [
    {
      name: 'Basic Business Website',
      price: '₹5,000 – ₹10,000',
      period: 'approx.',
      delivery: '3–7 Days',
      suitable: 'Gym, Clinic, Salon, Restaurant, Small Business, Freelancers',
      features: [
        'Home Page Layout',
        'About Us Page',
        'Services Page',
        'Contact Page Layout',
        'WhatsApp Integration API',
        'Mobile Responsive Design'
      ]
    },
    {
      name: 'Professional Business Website',
      price: '₹10,000 – ₹25,000',
      period: 'approx.',
      delivery: '7–15 Days',
      suitable: 'Growing Businesses, Agencies, Consultants, Educational Institutes',
      features: [
        'Everything in Basic Package',
        'Custom Premium Design',
        'Active Blog Section Layout',
        'Interactive Gallery Page',
        'Structured SEO Optimization',
        'Lead Capture Contact Forms',
        'Google Maps Integration'
      ],
      popular: true
    },
    {
      name: 'E-Commerce Website',
      price: '₹25,000 – ₹50,000+',
      period: 'approx.',
      delivery: '10–15 Days',
      suitable: 'Online Stores, Fashion Brands, Organic Products, Electronics Shops',
      features: [
        'Dynamic Product Listings',
        'Interactive Shopping Cart',
        'Online Payment Gateway integration',
        'Secure Order Management',
        'Customer Registration & Accounts',
        'Internal Inventory Management'
      ]
    }
  ]

  const factors = [
    {
      title: 'Number of Pages',
      desc: 'More pages require additional wireframing, layout styling, and database schema mappings, which affect overall scope.'
    },
    {
      title: 'Custom UI/UX Design',
      desc: 'Specific custom styling overrides, micro-animations, single-page transitions, and customized CTA configurations require extra design hours.'
    },
    {
      title: 'Advanced Features',
      desc: 'Additional logics like booking calendars, user authentication, multi-currency modules, and third-party API configurations increase complexity.'
    },
    {
      title: 'Content Creation & Copywriting',
      desc: 'If our developers draft copy, edit product images, or formulate banners, content support fees apply.'
    },
    {
      title: 'SEO Requirements',
      desc: 'Standard schema configs are included. Advanced keyword tracking and listing optimization audits are handled separately.'
    }
  ]

  const additionalCharges = [
    { service: 'Domain Name (.com / .in)', cost: '₹800 – ₹1,500/year' },
    { service: 'Cloud Hosting Services', cost: '₹2,000 – ₹8,000/year' },
    { service: 'Monthly Support & Maintenance', cost: '₹500 – ₹2,000/month' }
  ]

  return (
    <div className="font-sans">
      {/* Page Header */}
      <section className="bg-slate-950 py-20 px-6 relative border-b border-white/5">
        <div className="glow-bg bg-brand-primary top-0 right-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">PROJECT PRICING</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
            Clear, Value-Driven Pricing
          </h1>
          <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Select a package suited to your current operational needs. We construct clean, secure storefronts and commercial websites.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-24 bg-slate-950 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={`glass-card p-8 border-white/5 hover:border-brand-primary/20 transition-all flex flex-col justify-between relative ${
                  plan.popular ? 'border-brand-primary/30 shadow-glow bg-slate-900/60' : 'bg-slate-900/30'
                }`}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-glow">
                    Most Popular
                  </span>
                )}
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-[10px] text-slate-500 mb-6 font-semibold uppercase tracking-wider">
                    Suitable for: {plan.suitable}
                  </p>
                  
                  <div className="flex items-baseline mb-2">
                    <span className="text-2xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-500 text-xs ml-2">/ {plan.period}</span>
                  </div>
                  
                  <p className="text-xs font-semibold text-brand-primary mb-6">
                    Delivery Timeline: {plan.delivery}
                  </p>
                  
                  <div className="h-px bg-white/5 mb-6"></div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-3 text-slate-300">
                        <FiCheck className="text-brand-primary mt-1 flex-shrink-0" />
                        <span className="text-xs leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => navigate('/contact')}
                  className={`w-full py-3.5 text-xs font-bold uppercase tracking-wider ${
                    plan.popular ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  Request Proposal
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factors Affecting Cost */}
      <section className="py-24 bg-slate-900 border-t border-white/5 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">VARIABLE FACTORS</span>
            <h2 className="text-3xl font-bold text-white mt-2">What Affects Project Cost?</h2>
          </div>

          <div className="space-y-6">
            {factors.map((f, idx) => (
              <div key={idx} className="glass-card p-6 border-white/5 flex items-start space-x-4 bg-slate-950/40">
                <FiInfo className="text-brand-primary text-xl mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">{idx + 1}. {f.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Charges Table */}
      <section className="py-24 bg-slate-950 border-t border-white/5 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">ANNUAL & RECURRING COSTS</span>
            <h2 className="text-3xl font-bold text-white mt-2">Additional Charges</h2>
          </div>

          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="px-6 py-4">Service Category</th>
                  <th className="px-6 py-4 text-right">Estimated Cost Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {additionalCharges.map((ac, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-xs font-semibold text-slate-300">{ac.service}</td>
                    <td className="px-6 py-4 text-xs font-bold text-white text-right">{ac.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  )
}
