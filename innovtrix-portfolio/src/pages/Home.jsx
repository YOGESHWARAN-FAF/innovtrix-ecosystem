import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { gsap } from 'gsap'
import { FiArrowRight, FiCheckCircle, FiShield, FiTrendingUp, FiZap, FiCheck, FiGlobe, FiShoppingBag, FiSmartphone, FiCpu } from 'react-icons/fi'

const TagCard = ({ number, title, tag, text, className, aosDelay, aosType, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (latest) => {
    if (!ref.current || !containerRef.current) return;
    
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRect.height;
    
    const triggerY = cardTopRelativeToContainer + 55;
    const lineTipY = latest * containerHeight;
    
    if (lineTipY >= triggerY && !isActive) {
      setIsActive(true);
    } else if (lineTipY < triggerY && isActive) {
      setIsActive(false);
    }
  });

  return (
    <div 
      ref={ref}
      data-aos={aosType || "fade-up"} 
      data-aos-delay={aosDelay}
      data-aos-once="true"
      className={`z-10 w-full max-w-[310px] sm:max-w-[350px] ${className}`}
    >
      <div className={`w-full rounded-[2rem] p-2.5 relative flex flex-col items-center hover:scale-[1.02] transition-all duration-700 ${
        isActive 
          ? 'bg-zinc-900 border border-brand-primary shadow-glow' 
          : 'bg-zinc-900 border border-white/5 shadow-glass-dark hover:border-brand-primary/20'
      }`}>
        {/* Hole Punch */}
        <div className="w-5 h-5 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] absolute top-4 border border-zinc-800 z-10 flex items-center justify-center">
          <div className="w-2 h-2 bg-black rounded-full opacity-40"></div>
        </div>
        
        {/* Inner Card */}
        <div className={`w-full h-full rounded-[1.5rem] mt-8 p-6 flex flex-col min-h-[220px] transition-colors duration-700 ${
          isActive ? 'bg-brand-primary/5' : 'bg-black/30'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <span className={`text-xl font-black italic transition-colors duration-700 ${
              isActive ? 'text-brand-primary' : 'text-slate-600'
            }`}>{number}</span>
            <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border transition-colors duration-700 ${
              isActive 
                ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                : 'bg-zinc-800/80 text-zinc-500 border-zinc-800'
            }`}>{tag}</span>
          </div>
          
          <h3 className={`text-xl font-black mb-3 uppercase tracking-tight transition-colors duration-700 ${
            isActive ? 'text-brand-primary' : 'text-slate-200'
          }`}>{title}</h3>
          
          <p className={`text-xs leading-relaxed font-medium transition-colors duration-700 ${
            isActive ? 'text-slate-300' : 'text-slate-400'
          }`}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 })

  const roadmapSteps = [
    {
      number: "01",
      title: "Discovery & Consultation",
      tag: "PHASE 1 - ALIGNMENT",
      text: "We research your target sectors (Textile, Retail, etc.) to understand product attributes and buyer journeys, aligning budgets and key deliverables.",
      className: "md:absolute md:top-[300px] md:right-[5%] lg:right-[10%] rotate-1 md:rotate-4",
      delay: "100"
    },
    {
      number: "02",
      title: "UI/UX Wireframing",
      tag: "PHASE 2 - DESIGN",
      text: "We design premium, high-conversion mockups. We optimize navigation flows, product grids, checkout structures, and lead generation banners.",
      className: "md:absolute md:top-[650px] md:left-[5%] lg:left-[10%] -rotate-1 md:-rotate-4",
      delay: "150"
    },
    {
      number: "03",
      title: "Frontend Architecture",
      tag: "PHASE 3 - FRONTEND",
      text: "Using React 19 and Vite, we code the frontend components, applying Tailwind CSS styles and fluid Framer Motion / GSAP animations.",
      className: "md:absolute md:top-[1000px] md:right-[5%] lg:right-[15%] rotate-1 md:rotate-3",
      delay: "200"
    },
    {
      number: "04",
      title: "Backend & DB Logic",
      tag: "PHASE 4 - SERVICES",
      text: "We configure FastAPI Python routers and connect them to MySQL tables. We build secure JWT authorization headers and automated invoicing routes.",
      className: "md:absolute md:top-[1350px] md:left-[5%] lg:left-[15%] -rotate-1 md:-rotate-3",
      delay: "250"
    },
    {
      number: "05",
      title: "Lighthouse & Security",
      tag: "PHASE 5 - AUDITS",
      text: "We verify performance, SEO metadata, and accessibility tags. We test payment transactions in staging, ensuring the codebase scores 90+ across categories.",
      className: "md:absolute md:top-[1700px] md:right-[5%] lg:right-[12%] rotate-1 md:rotate-4",
      delay: "300"
    },
    {
      number: "06",
      title: "Cloud Deployment",
      tag: "PHASE 6 - LAUNCH",
      text: "We compile and build the final static assets for Vercel, and provision FastAPI services to Render, enabling continuous deployment from Git.",
      className: "md:absolute md:top-[2050px] md:left-[5%] lg:left-[12%] -rotate-1 md:-rotate-4",
      delay: "350"
    }
  ]


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
    <div className="font-sans overflow-x-hidden bg-black text-slate-100">
      {/* Premium Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center bg-black px-6 py-24 bg-grid-pattern border-b border-white/10">
        <div className="glow-bg bg-brand-primary/30 top-10 left-10"></div>
        <div className="glow-bg bg-brand-primary/20 bottom-10 right-10"></div>

        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="px-5 py-2 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(255,186,0,0.15)]"
          >
            ENTERPRISE-GRADE WEB ENGINEERING
          </motion.span>
          
          <h1 className="hero-title text-4xl sm:text-6xl md:text-8xl font-black text-white mt-8 tracking-tight leading-[1.05] opacity-0 uppercase">
            We Engineer High-Performing <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white] block mt-4 hover:[-webkit-text-stroke:1.5px_#FFBA00] transition-colors duration-500">
              Digital Flagships
            </span>
          </h1>
          
          <p className="hero-subtitle text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mt-8 leading-relaxed font-medium opacity-0">
            Innovtrix specializes in building modern E-Commerce platforms and professional commercial websites that are fast, secure, scalable, and designed to help businesses grow in the digital world.
          </p>

          <div className="hero-actions flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 opacity-0">
            <button 
              onClick={() => navigate('/contact')} 
              className="btn-primary w-full sm:w-auto px-8 py-4 text-base font-bold tracking-wider uppercase hover:scale-105 transition-transform duration-300"
            >
              Get a Proposal <FiArrowRight />
            </button>
            <Link 
              to="/pricing" 
              className="btn-secondary w-full sm:w-auto px-8 py-4 text-base font-bold tracking-wider uppercase bg-zinc-900 border-zinc-800 text-white hover:bg-brand-primary hover:text-black hover:border-brand-primary transition-all duration-300"
            >
              Explore Pricing
            </Link>
            <Link 
              to="/portfolio" 
              className="btn-secondary w-full sm:w-auto px-8 py-4 text-base font-bold tracking-wider uppercase bg-zinc-900 border-zinc-800 text-white hover:bg-brand-primary hover:text-black hover:border-brand-primary transition-all duration-300"
            >
              Client Projects
            </Link>
            <a 
              href="https://ps-tex-production.up.railway.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto px-8 py-4 text-base font-bold tracking-wider uppercase bg-emerald-500/10 hover:bg-emerald-500 border-emerald-500/20 hover:border-transparent text-white transition-all duration-300"
            >
              Sample Website
            </a>
          </div>
        </div>
      </section>

      {/* Animated Statistics */}
      <section className="py-20 bg-black border-b border-white/10 px-6 bg-grid-pattern relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="text-center p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-brand-primary/20 transition-all duration-300"
            >
              <div className="text-4xl md:text-6xl font-black text-white bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-slate-500 font-bold mt-3">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Intro & Why Choose Us */}
      <section className="py-28 bg-black px-6 relative bg-grid-pattern border-b border-white/10">
        <div className="glow-bg bg-brand-primary/10 top-40 left-10"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div data-aos="fade-right">
            <span className="text-xs font-black tracking-widest text-brand-primary uppercase">WHO WE ARE</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 mb-8 leading-tight">
              Building Digital Solutions <br />That Drive Business Growth
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed bg-zinc-950/60 border border-white/5 p-6 rounded-2xl">
              At Innovtrix, we were founded by a group of passionate friends dedicated to helping businesses grow through innovative technology. We specialize in E-Commerce Websites, Commercial Websites, Mobile Applications, and Electronics Projects, delivering modern, secure, and high-performance solutions tailored to every client's needs. Our mission is to transform ideas into impactful digital experiences that drive success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-aos="fade-left">
            <div className="glass-card p-6 border-white/5 bg-zinc-900/20 hover:border-brand-primary/30 hover:shadow-glow transition-all duration-300">
              <FiGlobe className="text-brand-primary text-3xl mb-4" />
              <h3 className="text-white font-black text-base mb-2">Premium Website Development</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Modern, responsive, and high-performance websites designed to help businesses grow and create a strong online presence.</p>
            </div>
            <div className="glass-card p-6 border-white/5 bg-zinc-900/20 hover:border-brand-primary/30 hover:shadow-glow transition-all duration-300">
              <FiShoppingBag className="text-brand-primary text-3xl mb-4" />
              <h3 className="text-white font-black text-base mb-2">E-Commerce Solutions</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Secure online stores with product management, payment gateways, shopping carts, and seamless customer experiences.</p>
            </div>
            <div className="glass-card p-6 border-white/5 bg-zinc-900/20 hover:border-brand-primary/30 hover:shadow-glow transition-all duration-300">
              <FiSmartphone className="text-brand-primary text-3xl mb-4" />
              <h3 className="text-white font-black text-base mb-2">Mobile App Development</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Custom Android and iOS applications with intuitive interfaces, high performance, and scalable architecture.</p>
            </div>
            <div className="glass-card p-6 border-white/5 bg-zinc-900/20 hover:border-brand-primary/30 hover:shadow-glow transition-all duration-300">
              <FiCpu className="text-brand-primary text-3xl mb-4" />
              <h3 className="text-white font-black text-base mb-2">Electronics & IoT Projects</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Innovative electronics, IoT systems, embedded solutions, and custom hardware prototypes for students, startups, and industries.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Core Services Overview */}
      <section className="py-28 bg-zinc-950 border-b border-white/10 px-6 bg-grid-pattern relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <span className="text-xs font-black tracking-widest text-brand-primary uppercase">WHAT WE BUILD</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase">Specialized Web Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreServices.map((service, index) => (
              <div 
                key={index}
                data-aos={index === 0 ? "fade-right" : "fade-left"}
                className="glass-card p-6 sm:p-10 lg:p-12 hover:border-brand-primary/30 hover:shadow-glow transition-all duration-300 flex flex-col justify-between bg-zinc-900/20"
              >
                <div>
                  <h3 className="text-xl sm:text-3xl font-black text-white mb-4 uppercase tracking-tight">{service.title}</h3>
                  <p className="text-slate-400 mb-8 text-sm sm:text-base leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-3 mb-10">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-slate-300">
                        <span className="w-2 h-2 bg-brand-primary rounded-full mt-2.5 flex-shrink-0"></span>
                        <span className="text-sm font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href="https://ps-tex-production.up.railway.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary w-full py-3.5 hover:bg-brand-primary hover:text-black hover:border-transparent transition-all duration-300 flex items-center justify-center font-bold uppercase tracking-wider text-xs"
                >
                  Learn More About Service
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll-Animated Roadmap (Service Process) */}
      <section 
        id="roadmap"
        ref={containerRef}
        className="bg-black pt-28 pb-48 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-grid-pattern border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto relative md:h-[2450px]">
          
          {/* Header Content */}
          <div data-aos="fade-up" className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-20 md:mb-0">
            <span className="inline-block bg-brand-primary/10 border border-brand-primary/20 rounded-full px-5 py-2 text-xs font-black uppercase text-brand-primary mb-6 shadow-sm">
              Our service process
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6 uppercase tracking-tight relative">
              Development <br />
              <span className="text-transparent [-webkit-text-stroke:1.5px_white]">Roadmap</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-sm font-medium leading-relaxed">
              A timeline of our design, engineering, and cloud deployment procedures tailored to deliver enterprise-grade results under strict guidelines.
            </p>
          </div>

          {/* Desktop SVG Animated Dashed Line */}
          <svg 
            className="hidden md:block absolute top-0 left-0 w-full h-[2350px] pointer-events-none z-0" 
            viewBox="0 0 1000 2350" 
            preserveAspectRatio="none"
          >
            {/* Faint background path */}
            <path 
              d="M 650,300 C 400,450 200,600 300,850 C 400,1100 750,1250 700,1500 C 650,1750 400,1900 300,2200" 
              fill="none" 
              stroke="#27272a" 
              strokeWidth="3" 
              strokeDasharray="8 10" 
            />

            {/* Mask to reveal the dashed path based on scroll */}
            <mask id="roadmap-path-mask">
              <motion.path 
                d="M 650,300 C 400,450 200,600 300,850 C 400,1100 750,1250 700,1500 C 650,1750 400,1900 300,2200" 
                fill="none" 
                stroke="white" 
                strokeWidth="20" 
                style={{ pathLength }}
              />
            </mask>

            {/* The actual dashed line that gets revealed */}
            <path 
              d="M 650,300 C 400,450 200,600 300,850 C 400,1100 750,1250 700,1500 C 650,1750 400,1900 300,2200" 
              fill="none" 
              stroke="#FFBA00" 
              strokeWidth="3" 
              strokeDasharray="8 10" 
              mask="url(#roadmap-path-mask)"
              className="drop-shadow-[0_0_8px_rgba(255,186,0,0.5)]"
            />
          </svg>

          {/* Mobile Animated Vertical Dashed Line */}
          <svg 
            className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0" 
            viewBox="0 0 4 100" 
            preserveAspectRatio="none"
          >
            <path 
              d="M 2,0 L 2,100" 
              fill="none" 
              stroke="#27272a" 
              strokeWidth="4" 
              strokeDasharray="4 6" 
              vectorEffect="non-scaling-stroke"
            />
            <mask id="roadmap-path-mask-mobile">
              <motion.path 
                d="M 2,0 L 2,100" 
                fill="none" 
                stroke="white" 
                strokeWidth="4" 
                style={{ pathLength }}
                vectorEffect="non-scaling-stroke"
              />
            </mask>
            <path 
              d="M 2,0 L 2,100" 
              fill="none" 
              stroke="#FFBA00" 
              strokeWidth="4" 
              strokeDasharray="4 6" 
              mask="url(#roadmap-path-mask-mobile)"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Cards Container */}
          <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
            {roadmapSteps.map((step, idx) => (
              <TagCard 
                key={idx}
                number={step.number}
                title={step.title}
                tag={step.tag}
                text={step.text}
                className={step.className}
                aosType={idx % 2 === 0 ? "fade-left" : "fade-right"}
                aosDelay={step.delay}
                pathLength={pathLength}
                containerRef={containerRef}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Selected Completed Projects */}
      <section className="py-28 bg-black px-6 bg-grid-pattern border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
            <div data-aos="fade-right">
              <span className="text-xs font-black tracking-widest text-brand-primary uppercase">OUR WORK</span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase">Selected Projects</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 md:mt-0 z-10" data-aos="fade-left">
              <a 
                href="https://ps-tex-production.up.railway.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-6 py-3 text-xs bg-emerald-500/10 hover:bg-emerald-500 border-emerald-500/20 hover:border-transparent text-white flex items-center gap-2 font-bold uppercase tracking-wider"
              >
                Sample Website <FiArrowRight size={14} />
              </a>
              <Link 
                to="/portfolio" 
                className="text-brand-primary hover:text-white font-bold flex items-center gap-2 transition-colors text-sm uppercase tracking-wider"
              >
                Client Projects <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {selectedProjects.map((project, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="glass-card overflow-hidden border border-white/5 hover:border-brand-primary/30 hover:shadow-glow transition-all duration-300 group bg-zinc-900/10"
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/35 transition-colors"></div>
                  <span className="absolute top-4 left-4 text-xs font-bold tracking-widest uppercase bg-black/90 backdrop-blur-md text-brand-primary px-4 py-1.5 rounded-full border border-white/10">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{project.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">{project.desc}</p>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-primary hover:text-white text-xs font-black tracking-widest uppercase flex items-center gap-2 transition-colors w-fit mt-3"
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
      <section className="py-28 bg-zinc-950 border-b border-white/10 px-6 bg-grid-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <span className="text-xs font-black tracking-widest text-brand-primary uppercase">TRANSPARENT PLANS</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase">Web Development Pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={`glass-card p-8 border hover:border-brand-primary/30 transition-all duration-300 flex flex-col justify-between relative ${
                  plan.popular ? 'border-brand-primary/40 shadow-glow bg-black/90' : 'border-white/5 bg-zinc-900/10'
                }`}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-primary text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-glow">
                    Popular Choice
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{plan.name}</h3>
                  <p className="text-[10px] text-slate-500 mb-6 font-bold uppercase truncate">
                    Fits: {plan.suitable}
                  </p>
                  <div className="flex items-baseline mb-3">
                    <span className="text-2xl sm:text-3xl font-black text-white">{plan.price}</span>
                  </div>
                  <p className="text-xs font-bold text-brand-primary mb-6 uppercase tracking-wider">
                    Timeline: {plan.delivery}
                  </p>
                  <div className="h-px bg-white/10 mb-6"></div>
                  
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
                  className={`w-full py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    plan.popular ? 'btn-primary' : 'btn-secondary bg-zinc-900 border-zinc-800 text-white hover:bg-brand-primary hover:text-black hover:border-brand-primary'
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
      <section className="py-24 bg-gradient-to-r from-black via-zinc-950 to-black border-t border-white/10 px-6 relative bg-grid-pattern">
        <div className="glow-bg bg-brand-primary/10 top-10 left-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative" data-aos="zoom-in">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Ready to Build Your Digital Flagship?</h2>
          <p className="text-slate-300 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Partner with Innovtrix to create a premium, high-converting E-Commerce portal or commercial business website configured for enterprise scale.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="btn-primary px-10 py-5 mx-auto font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
          >
            Launch Your Project Proposal
          </button>
        </div>
      </section>

    </div>
  )
}
