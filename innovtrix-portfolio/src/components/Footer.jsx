import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  const targetIndustries = [
    'Textile & Garments', 'Retail & Wholesale', 'Manufacturing', 
    'Jewellery & Electronics', 'Furniture & Retail', 'Medical & Supermarkets', 
    'Corporate & Startups', 'Construction & Real Estate'
  ]

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* About Innovtrix */}
        <div>
          <Link to="/" className="flex items-center space-x-2 mb-6">
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent tracking-wide">
              INNOVTRIX
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Enterprise-grade web agencies specializing exclusively in E-Commerce & Commercial website engineering. We build high-performing digital stores and premium company sites.
          </p>
          <div className="flex">
            <a href="https://wa.me/917200608333?text=Hello%20Innovtrix!%20I'm%20interested%20in%20building%20a%20website%20for%20my%20business." target="_blank" rel="noopener noreferrer" className="p-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-500 hover:text-white transition-all duration-300 flex items-center gap-2 text-xs font-semibold text-slate-300 border border-white/5">
              <FaWhatsapp size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Specialized Services & Industries */}
        <div>
          <h3 className="text-white text-base font-semibold mb-6">Our Focus</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/services" className="hover:text-white transition-colors">E-Commerce Development</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition-colors">Commercial Website Development</Link>
            </li>
            <div className="h-px bg-slate-900 my-3"></div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Industries We Serve</p>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
              {targetIndustries.map((ind, idx) => (
                <span key={idx} className="text-slate-400">{ind}</span>
              ))}
            </div>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-base font-semibold mb-6">Get in Touch</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <FaEnvelope className="text-brand-primary mt-1 flex-shrink-0" />
              <span>innovtrix30@gmail.com</span>
            </li>
            <li className="flex items-start space-x-3">
              <FaPhoneAlt className="text-brand-primary mt-1 flex-shrink-0" />
              <div className="flex flex-col space-y-1">
                <a href="tel:+917200608333" className="hover:text-white transition-colors">+91 7200608333</a>
                <a href="tel:+917603871116" className="hover:text-white transition-colors">+91 7603871116</a>
              </div>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white text-base font-semibold mb-6">Newsletter</h3>
          <p className="text-sm text-slate-400 mb-4">
            Subscribe to our newsletter for insights on high-converting e-commerce and commercial web layouts.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-transparent text-sm"
              required
            />
            <button
              type="submit"
              className="btn-primary py-2.5 text-sm w-full"
            >
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p className="text-brand-accent text-xs mt-2 animate-pulse">
              Thank you! You have successfully subscribed.
            </p>
          )}
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs">
        <p className="text-slate-600 mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} Innovtrix Studio. All rights reserved.
        </p>
        <div className="flex space-x-6 text-slate-600">
          <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
