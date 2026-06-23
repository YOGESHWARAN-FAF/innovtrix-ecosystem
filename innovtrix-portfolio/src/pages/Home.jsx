import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { FiArrowRight, FiCheckCircle, FiShield, FiTrendingUp, FiZap, FiCheck, FiGlobe, FiShoppingBag, FiSmartphone, FiCpu } from 'react-icons/fi'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    )
    gsap.fromTo('.hero-subtitle', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.4 }
    )
    gsap.fromTo('.hero-actions', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.6 }
    )
  }, [])

  const stats = [
    { value: '150+', label: 'Websites Built' },
    { value: '99.9%', label: 'Uptime Guaranteed' },
    { value: '18+', label: 'Industries Served' },
    { value: '24/7', label: 'Tech Support' }
  ]

  const coreServices = [
    {
      title: 'E-Commerce Website Development',
      description: 'High-converting custom store configurations, payment gateways, product options, and order management portals built to scale.',
      features: ['Secure Checkout Systems', 'Inventory Synchronization', 'Dynamic Customer Portals', 'Optimized Cart Speed']
    },
    {
      title: 'Commercial Website Development',
      description: 'State-of-the-art marketing interfaces, portfolio galleries, lead capture machines, and corporate websites showing authority.',
      features: ['Stripe/Vercel Design Styles', 'Lightning-Fast Page Speeds', 'Seamless CRM Webhooks', 'Advanced SEO Architectures']
    }
  ]

  const selectedProjects = [
    {
      title: 'Vogue Silk Textiles',
      category: 'E-Commerce Storefront',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
      desc: 'Enterprise-grade catalog and retail store custom designed for a high-fashion textile exporter.',
      link: 'https://ps-tex-production.up.railway.app'
    },
    {
      title: 'Aura Luxury Jewellery',
      category: 'Product Catalog Website',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop',
      desc: 'High-end visual showroom layout showcasing premium diamonds and custom ordering widgets.'
    },
    {
      title: 'Constructo Global',
      category: 'Commercial Business Site',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop',
      desc: 'A premium portfolio and lead capture portal for an international industrial contractor.'
    }
  ]

  const plans = [
    {
      name: 'Basic Business Website',
      price: '₹5,000 – ₹10,000',
      suitable: 'Gym, Clinic, Salon, Restaurant, Small Business, Freelancers',
      delivery: '3–7 Days',
      features: [
        'Home Page Layout',
        'About Us Page',
        'Services Page',
        'Contact Page Layout',
        'WhatsApp Integration',
        'Mobile Responsive Design'
      ]
    },
    {
      name: 'Professional Business Website',
      price: '₹10,000 – ₹25,000',
      suitable: 'Growing Businesses, Agencies, Consultants, Educational Institutes',
      delivery: '7–15 Days',
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
      suitable: 'Online Stores, Fashion Brands, Organic Products, Electronics Shops',
      delivery: '10–15 Days',
      features: [
        'Dynamic Product Listings',
        'Interactive Shopping Cart',
        'Online Payment Gateway Sync',
        'Secure Order Management',
        'Customer Registration',
        'Inventory Management'
      ]
    }
  ]

  return (
    <div className="font-sans overflow-x-hidden">
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 px-6 py-20">
        <div className="glow-bg bg-brand-primary top-10 left-10"></div>
        <div className="glow-bg bg-brand-secondary bottom-10 right-10"></div>

        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="px-4 py-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider rounded-full"
          >
            ENTERPRISE-GRADE WEB ENGINEERING
          </motion.span>
          
          <h1 className="hero-title text-5xl md:text-7xl font-extrabold text-white mt-6 tracking-tight leading-[1.1] opacity-0">
            We Engineer High-Performing <br />
            <span className="bg-gradient-to-r from-brand-primary via-blue-400 to-brand-accent bg-clip-text text-transparent">
              Digital Flagships
            </span>
          </h1>
          
          <p className="hero-subtitle text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed opacity-0">
            Innovtrix specializes in building modern E-Commerce platforms and professional commercial websites that are fast, secure, scalable, and designed to help businesses grow in the digital world.
          </p>

          <div className="hero-actions flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 opacity-0">
            <button 
              onClick={() => navigate('/contact')} 
              className="btn-primary w-full sm:w-auto px-8 py-4 text-base"
            >
              Get a Proposal <FiArrowRight />
            </button>
            <Link 
              to="/pricing" 
              className="btn-secondary w-full sm:w-auto px-8 py-4 text-base"
            >
              Explore Pricing
            </Link>
            <Link 
              to="/portfolio" 
              className="btn-secondary w-full sm:w-auto px-8 py-4 text-base"
            >
              Explore Portfolio
            </Link>
            <a 
              href="https://ps-tex-production.up.railway.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto px-8 py-4 text-base bg-emerald-500/10 hover:bg-emerald-500 border-emerald-500/20 hover:border-transparent text-white"
            >
              Sample Website
            </a>
          </div>
        </div>
      </section>

      {/* Animated Statistics */}
      <section className="py-16 bg-slate-900 border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm uppercase tracking-wider text-slate-500 font-semibold mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Intro & Why Choose Us */}
      <section className="py-24 bg-slate-950 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div data-aos="fade-right">
            <span className="text-xs font-semibold tracking-wider text-brand-primary uppercase">WHO WE ARE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
              Building Digital Solutions <br />That Drive Business Growth
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              At Innovtrix, we were founded by a group of passionate friends dedicated to helping businesses grow through innovative technology. We specialize in E-Commerce Websites, Commercial Websites, Mobile Applications, and Electronics Projects, delivering modern, secure, and high-performance solutions tailored to every client's needs. Our mission is to transform ideas into impactful digital experiences that drive success.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 scrollbar-none" data-aos="fade-left">
            <div className="glass-card p-5 sm:p-6 border-white/5 bg-slate-900/20 hover:border-brand-primary/20 transition-all min-w-[70vw] sm:min-w-0 snap-align-start flex-shrink-0">
              <FiGlobe className="text-brand-primary text-2xl mb-3" />
              <h3 className="text-white font-bold text-sm mb-1.5">Premium Website Development</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Modern, responsive, and high-performance websites designed to help businesses grow and create a strong online presence.</p>
            </div>
            <div className="glass-card p-5 sm:p-6 border-white/5 bg-slate-900/20 hover:border-brand-primary/20 transition-all min-w-[70vw] sm:min-w-0 snap-align-start flex-shrink-0">
              <FiShoppingBag className="text-brand-primary text-2xl mb-3" />
              <h3 className="text-white font-bold text-sm mb-1.5">E-Commerce Solutions</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Secure online stores with product management, payment gateways, shopping carts, and seamless customer experiences.</p>
            </div>
            <div className="glass-card p-5 sm:p-6 border-white/5 bg-slate-900/20 hover:border-brand-primary/20 transition-all min-w-[70vw] sm:min-w-0 snap-align-start flex-shrink-0">
              <FiSmartphone className="text-brand-primary text-2xl mb-3" />
              <h3 className="text-white font-bold text-sm mb-1.5">Mobile App Development</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Custom Android and iOS applications with intuitive interfaces, high performance, and scalable architecture.</p>
            </div>
            <div className="glass-card p-5 sm:p-6 border-white/5 bg-slate-900/20 hover:border-brand-primary/20 transition-all min-w-[70vw] sm:min-w-0 snap-align-start flex-shrink-0">
              <FiCpu className="text-brand-primary text-2xl mb-3" />
              <h3 className="text-white font-bold text-sm mb-1.5">Electronics & IoT Projects</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Innovative electronics, IoT systems, embedded solutions, and custom hardware prototypes for students, startups, and industries.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Core Services Overview */}
      <section className="py-24 bg-slate-900 border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-xs font-semibold tracking-wider text-brand-primary uppercase">WHAT WE BUILD</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Specialized Web Services</h2>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-6 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-2 scrollbar-none">
            {coreServices.map((service, index) => (
              <div 
                key={index}
                data-aos={index === 0 ? "fade-right" : "fade-left"}
                className="glass-card p-5 sm:p-8 lg:p-12 hover:border-brand-primary/20 transition-all flex flex-col justify-between min-w-[72vw] sm:min-w-[400px] lg:min-w-0 snap-align-start flex-shrink-0"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">{service.title}</h3>
                  <p className="text-slate-400 mb-4 sm:mb-8 text-sm sm:text-base leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-8">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-slate-300">
                        <span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span>
                        <span className="text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href="https://ps-tex-production.up.railway.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary w-full py-2.5 sm:py-3 hover:bg-brand-primary hover:border-transparent transition-all flex items-center justify-center"
                >
                  Learn More About Service
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Completed Projects */}
      <section className="py-24 bg-slate-950 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div data-aos="fade-right">
              <span className="text-xs font-semibold tracking-wider text-brand-primary uppercase">OUR WORK</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Selected Projects</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 md:mt-0 z-10" data-aos="fade-left">
              <a 
                href="https://ps-tex-production.up.railway.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-6 py-2.5 text-xs bg-emerald-500/10 hover:bg-emerald-500 border-emerald-500/20 hover:border-transparent text-white flex items-center gap-2"
              >
                Sample Website <FiArrowRight size={14} />
              </a>
              <Link 
                to="/portfolio" 
                className="text-brand-primary hover:text-white font-medium flex items-center gap-2 transition-colors text-sm"
              >
                Explore Portfolio <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-6 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 scrollbar-none">
            {selectedProjects.map((project, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="glass-card overflow-hidden hover:border-brand-primary/20 transition-all group min-w-[72vw] sm:min-w-[340px] md:min-w-0 snap-align-start flex-shrink-0"
              >
                <div className="relative h-44 sm:h-60 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors"></div>
                  <span className="absolute top-4 left-4 text-xs font-semibold tracking-wider uppercase bg-slate-950/80 backdrop-blur-md text-brand-primary px-3 py-1 rounded-full border border-white/10">
                    {project.category}
                  </span>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{project.desc}</p>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-primary hover:text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors w-fit mt-2"
                    >
                      View Live Demo <FiArrowRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-900 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">TRANSPARENT PLANS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Web Development Pricing</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={`glass-card p-8 border-white/5 hover:border-brand-primary/20 transition-all flex flex-col justify-between relative ${
                  plan.popular ? 'border-brand-primary/30 shadow-glow bg-slate-950/80' : 'bg-slate-950/30'
                }`}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-glow">
                    Popular Choose
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-[10px] text-slate-500 mb-6 font-semibold uppercase truncate">
                    Fits: {plan.suitable}
                  </p>
                  <div className="flex items-baseline mb-2">
                    <span className="text-2xl font-bold text-white">{plan.price}</span>
                  </div>
                  <p className="text-xs font-semibold text-brand-primary mb-6">
                    Timeline: {plan.delivery}
                  </p>
                  <div className="h-px bg-white/5 mb-6"></div>
                  
                  <ul className="space-y-3.5 mb-8">
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
                  className={`w-full py-3 text-xs font-bold uppercase tracking-wider ${
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

      {/* Call to Action Banner */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-indigo-950 border-t border-white/5 px-6 relative">
        <div className="max-w-4xl mx-auto text-center z-10 relative" data-aos="zoom-in">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Build Your Digital Flagship?</h2>
          <p className="text-slate-300 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Partner with Innovtrix to create a premium, high-converting E-Commerce portal or commercial business website configured for enterprise scale.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="btn-primary px-8 py-4 mx-auto"
          >
            Launch Your Project Proposal
          </button>
        </div>
      </section>

    </div>
  )
}
