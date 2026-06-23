import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen text-slate-800 dark:text-slate-100 bg-brand-light dark:bg-brand-dark transition-colors duration-300">
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Legal mode="privacy" />} />
            <Route path="/terms" element={<Legal mode="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  )
}
