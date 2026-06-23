import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Shell components
import Sidebar from './components/Sidebar'
import Header from './components/Header'

// Core pages
import Login from './pages/Login'
import DashboardOverview from './pages/DashboardOverview'
import Leads from './pages/Leads'
import Orders from './pages/Orders'
import Projects from './pages/Projects'
import Invoices from './pages/Invoices'
import Payments from './pages/Payments'
import Messages from './pages/Messages'
import Settings from './pages/Settings'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
    }
    setCheckingAuth(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_email')
    setIsAuthenticated(false)
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Checking session authenticity...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <Router>
      <div className="flex bg-slate-950 min-h-screen font-sans">
        
        {/* Persistent Sidebar */}
        <Sidebar />

        {/* Dashboard Content Container */}
        <div className="flex-grow flex flex-col min-w-0">
          
          {/* Header */}
          <Header onLogout={handleLogout} />

          {/* Module Views */}
          <main className="p-8 flex-grow">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
        </div>

      </div>
    </Router>
  )
}
