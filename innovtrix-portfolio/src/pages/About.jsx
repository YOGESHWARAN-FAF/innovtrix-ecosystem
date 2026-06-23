import { motion } from 'framer-motion'
import { FiTarget, FiActivity, FiUsers, FiAward, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

// Profile images
import yogeshImg from '../assets/team/yogesh.png'
import prashanthImg from '../assets/team/prashanth.png'

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

  const founders = [
    {
      name: 'Yogeshwaran M',
      role: 'DevOps Specialist / Co-Founder',
      image: yogeshImg,
      badgeRole: 'DEVOPS / SEC',
      bio: 'Expert in AWS, CI/CD orchestration, Terraform, Docker, and Linux administration. Engineers scalable, automated cloud architecture with high-security guardrails.',
      socials: {
        github: 'https://github.com/YOGESHWARAN-FAF',
        linkedin: '#',
        email: 'mailto:innovtrix30@gmail.com'
      },
      skills: ['AWS', 'Docker', 'Terraform', 'Linux', 'CI/CD', 'Nginx'],
      rotation: '-rotate-3',
      hoverRotation: 'hover:rotate-0'
    },
    {
      name: 'Prashanth S',
      role: 'Full Stack Developer / Co-Founder',
      image: prashanthImg,
      badgeRole: 'DEV / FULLSTACK',
      bio: 'Specialist in modern web rendering frameworks, Python/FastAPI servers, responsive UI designs, and database performance optimizations.',
      socials: {
        github: '#',
        linkedin: '#',
        email: 'mailto:innovtrix30@gmail.com'
      },
      skills: ['React', 'Node.js', 'FastAPI', 'MySQL', 'Tailwind', 'Git'],
      rotation: 'rotate-3',
      hoverRotation: 'hover:rotate-0'
    }
  ]

  return (
    <div className="font-sans bg-black text-slate-100 min-h-screen bg-grid-pattern">
      
      {/* Intro Banner */}
      <section className="bg-black py-28 px-6 relative border-b border-white/10 overflow-hidden">
        <div className="glow-bg bg-brand-primary/20 top-0 left-10"></div>
        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full"
          >
            OUR MISSION
          </motion.span>
          <h1 className="text-4xl md:text-7xl font-black text-white mt-8 tracking-tight uppercase leading-[1.1]">
            We Build Websites <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white]">That Build Businesses</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
            Innovtrix delivers engineering excellence across custom web storefronts, commercial presentation sites, and embedded systems prototypes.
          </p>
        </div>
      </section>

      {/* Team / Founders Section */}
      <section className="py-32 px-6 border-b border-white/10 relative overflow-hidden bg-zinc-950/40">
        <div className="glow-bg bg-brand-primary/15 bottom-10 right-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24" data-aos="fade-up">
            <span className="text-xs font-black tracking-widest text-brand-primary uppercase">INNOVTRIX BRAINS</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase">Founders & Leadership</h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-4">
              Meet the engineering core driving our high-performance client deployments and automation stacks.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
            {founders.map((founder, idx) => (
              <div 
                key={idx} 
                className="flex flex-col md:flex-row items-center md:items-start gap-12 p-8 md:p-12 pt-20 md:pt-12 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 shadow-glass-dark relative group overflow-hidden md:overflow-visible"
                data-aos={idx === 0 ? "fade-right" : "fade-left"}
              >
                {/* Lanyard Clip and Badge Card */}
                <div className="flex flex-col items-center w-full max-w-[240px] md:max-w-none md:w-[220px] shrink-0 relative pt-12">
                  {/* Lanyard String */}
                  <div className="absolute -top-20 left-1/2 w-2 h-32 bg-zinc-800 transform -translate-x-1/2 shadow-inner z-0">
                    {/* Ambassador Google Pin/Gemini Spark */}
                    <div 
                      className={`absolute top-[20px] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-300 z-10 cursor-pointer ${
                        idx === 0 ? 'bg-zinc-950 border border-zinc-800 text-[#FFBA00]' : 'bg-white border border-gray-300 text-black'
                      }`}
                    >
                      {idx === 0 ? (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2a1 1 0 011 1v3.1a1 1 0 01-2 0V3a1 1 0 011-1zm6.364 2.636a1 1 0 010 1.414l-2.192 2.192a1 1 0 01-1.414-1.414l2.192-2.192a1 1 0 011.414 0zM21 12a1 1 0 01-1 1h-3.1a1 1 0 010-2H20a1 1 0 011 1zm-2.636 6.364a1 1 0 01-1.414 0l-2.192-2.192a1 1 0 011.414-1.414l2.192 2.192a1 1 0 010 1.414zM12 21a1 1 0 01-1-1v-3.1a1 1 0 012 0V20a1 1 0 01-1 1zm-6.364-2.636a1 1 0 010-1.414l2.192-2.192a1 1 0 011.414 1.414l-2.192 2.192a1 1 0 01-1.414 0zM3 12a1 1 0 011-1h3.1a1 1 0 010 2H4a1 1 0 01-1-1zm2.636-6.364a1 1 0 011.414 0l2.192 2.192a1 1 0 01-1.414 1.414L5.636 5.636a1 1 0 010-1.414z" />
                        </svg>
                      ) : (
                        <span className="text-[8px] font-black tracking-tighter">STUDIO</span>
                      )}
                    </div>
                  </div>
                  {/* Clip */}
                  <div className="absolute top-10 left-1/2 w-5 h-8 bg-zinc-700 rounded border border-zinc-600 transform -translate-x-1/2 z-10 shadow-md"></div>
                  
                  {/* Badge Card */}
                  <div className={`bg-zinc-950 w-full rounded-3xl p-4 border border-zinc-800 shadow-2xl relative z-20 transform transition-transform duration-500 ${founder.rotation} ${founder.hoverRotation} group-hover:scale-[1.03] group-hover:border-brand-primary/40`}>
                    {/* Hole Cut */}
                    <div className="absolute -top-2 left-1/2 w-10 h-4 bg-zinc-950 rounded-t-lg transform -translate-x-1/2 flex justify-center items-center">
                      <div className="w-5 h-1.5 bg-black/40 rounded-full shadow-inner"></div>
                    </div>
                    {/* Profile Frame */}
                    <div className="w-full aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 relative">
                      <img 
                        src={founder.image} 
                        alt={founder.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    {/* Badge Meta */}
                    <div className="mt-4 text-center">
                      <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">INNOVTRIX ID</div>
                      <h4 className="text-white text-base font-black tracking-tight mt-1 uppercase">{founder.name.split(' ')[0]}</h4>
                      <span className="inline-block mt-2 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 bg-brand-primary text-black rounded-md">
                        {founder.badgeRole}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Founder Info */}
                <div className="flex-1 flex flex-col justify-between w-full">
                  <div className="text-center md:text-left flex flex-col items-center md:items-start">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{founder.name}</h3>
                    <div className="text-brand-primary font-bold text-xs uppercase tracking-widest mt-1.5">{founder.role}</div>
                    
                    <p className="text-slate-400 text-sm mt-6 leading-relaxed font-medium">
                      {founder.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
                      {founder.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-zinc-900 text-slate-300 rounded-full border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Buttons */}
                  <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5 w-full justify-center md:justify-start">
                    <a href={founder.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 hover:bg-brand-primary hover:text-black rounded-2xl border border-white/5 transition-all text-slate-400">
                      <FiGithub size={18} />
                    </a>
                    <a href={founder.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 hover:bg-brand-primary hover:text-black rounded-2xl border border-white/5 transition-all text-slate-400">
                      <FiLinkedin size={18} />
                    </a>
                    <a href={founder.socials.email} className="p-3 bg-zinc-900 hover:bg-brand-primary hover:text-black rounded-2xl border border-white/5 transition-all text-slate-400">
                      <FiMail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-28 bg-black px-6">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <span className="text-xs font-black tracking-widest text-brand-primary uppercase font-sans">THE INNOVTRIX WAY</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-4 mb-8 uppercase leading-tight">Designed for Scale, Engineered for Performance</h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-6 font-medium">
            Our engineering process blends aesthetic design with technical performance. We utilize React and Vite for our frontend rendering because it provides instant compilation, lightweight assets, and modern Component structuring.
          </p>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium">
            On the backend, our services leverage FastAPI (Python) and MySQL database arrays. FastAPI provides high-speed execution, automated documentation via OpenAPI schemas, and strict data type checks to secure company pipelines.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-28 bg-zinc-950 border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <span className="text-xs font-black tracking-widest text-brand-primary uppercase">OUR FOUNDATION</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase">Core Principles We Follow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="glass-card p-8 hover:border-brand-primary/30 hover:shadow-glow transition-all duration-300 flex flex-col justify-start bg-zinc-900/10 border-white/5"
              >
                <div className="mb-4">{val.icon}</div>
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{val.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
