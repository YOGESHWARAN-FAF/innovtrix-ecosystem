import { useState, useEffect } from 'react'
import { FiBell, FiSearch, FiLogOut, FiUser } from 'react-icons/fi'

export default function Header({ onLogout }) {
  const [adminEmail, setAdminEmail] = useState('innovtrix30@gmail.com')
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New E-Commerce quote request from Silk & Thread', read: false },
    { id: 2, text: 'Project Milestone approved for Apex Group', read: false }
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const savedEmail = localStorage.getItem('admin_email')
    if (savedEmail) {
      setAdminEmail(savedEmail)
    }
  }, [])

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="h-20 bg-slate-900 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-30 font-sans">
      
      {/* Search Bar */}
      <div className="relative w-72">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
        <input
          type="text"
          placeholder="Search leads, projects, orders..."
          className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-white/10 rounded-xl text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </div>

      {/* Action Tools */}
      <div className="flex items-center space-x-6">
        
        {/* Notifications Icon & Panel */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-slate-950/40 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 transition-colors cursor-pointer"
          >
            <FiBell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-white/10 rounded-xl shadow-2xl p-4 z-40 space-y-3">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-white">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[10px] text-brand-primary hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className={`text-xs p-2.5 rounded-lg border ${
                    n.read ? 'border-transparent text-slate-400' : 'border-brand-primary/20 bg-brand-primary/5 text-slate-200'
                  }`}>
                    {n.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 border-l border-white/5 pl-6">
          <div className="p-2 bg-slate-950/60 rounded-full text-slate-400 border border-white/5">
            <FiUser size={16} />
          </div>
          <div className="hidden md:block text-left">
            <h5 className="text-xs font-bold text-white">Innovtrix Support</h5>
            <p className="text-[10px] text-slate-500">{adminEmail}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 transition-all cursor-pointer flex items-center justify-center"
          title="Sign Out"
        >
          <FiLogOut size={16} />
        </button>

      </div>
    </header>
  )
}
