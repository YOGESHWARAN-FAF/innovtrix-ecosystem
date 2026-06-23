import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ]

  const activeStyle = "text-brand-primary font-semibold"
  const inactiveStyle = "text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"

  const isHome = location.pathname === '/'
  const showBackground = scrolled || !isHome || isOpen

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      showBackground 
        ? 'py-4 backdrop-blur-md bg-brand-light/95 dark:bg-brand-dark/95 border-b border-slate-200/50 dark:border-white/10 shadow-sm' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent font-sans tracking-wide">
            INNOVTRIX
          </span>
          <span className="text-xs px-2 py-0.5 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full font-medium">
            Studio
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `${isActive ? activeStyle : inactiveStyle} text-sm font-medium`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => navigate('/contact')}
            className="btn-primary py-2 px-5 text-sm"
          >
            Get Proposal
          </button>
        </div>

        {/* Mobile menu triggers */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-brand-light/95 dark:bg-brand-dark/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 py-6 px-6 shadow-xl flex flex-col space-y-4 transition-all duration-300">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `${isActive ? activeStyle : inactiveStyle} text-base font-medium py-1`}
            >
              {link.name}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setIsOpen(false)
              navigate('/contact')
            }}
            className="btn-primary w-full py-3"
          >
            Get Proposal
          </button>
        </div>
      )}
    </nav>
  )
}
