import { useState } from 'react'
import { FiSave, FiSettings, FiDatabase, FiLock } from 'react-icons/fi'

export default function Settings() {
  const [profile, setProfile] = useState({
    name: 'Innovtrix Support',
    email: 'innovtrix30@gmail.com',
    role: 'Senior Administrator'
  })

  const [backendUrl, setBackendUrl] = useState(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}`)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="space-y-8 font-sans max-w-2xl">
      
      {/* Module Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">System Settings</h1>
        <p className="text-slate-500 text-xs mt-1">Configure profile security and Backend API addresses.</p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="dash-card space-y-6">
        <div className="flex items-center space-x-2 border-b border-white/5 pb-4">
          <FiSettings className="text-brand-primary text-lg" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Admin Profile</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Display Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="dash-input"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Role Label</label>
            <input
              type="text"
              readOnly
              value={profile.role}
              className="dash-input opacity-60 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Email Address</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="dash-input"
          />
        </div>

        <div className="flex items-center space-x-2 border-b border-white/5 pb-4 pt-4">
          <FiDatabase className="text-brand-primary text-lg" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Backend API Connectivity</h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">FastAPI Root URL</label>
          <input
            type="url"
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            placeholder={import.meta.env.VITE_API_URL || 'http://localhost:8000'}
            className="dash-input"
          />
          <p className="text-[10px] text-slate-500 mt-2">
            Address used by React components to sync lead, invoice, and payment transactions with the FastAPI backend.
          </p>
        </div>

        {isSaved && (
          <p className="text-emerald-400 text-xs font-medium animate-pulse">
            Settings saved successfully!
          </p>
        )}

        <button
          type="submit"
          className="btn-primary w-full py-3"
        >
          <FiSave size={16} /> Save Configuration
        </button>

      </form>

    </div>
  )
}
