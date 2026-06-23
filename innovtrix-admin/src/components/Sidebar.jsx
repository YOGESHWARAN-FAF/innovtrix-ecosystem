import { NavLink } from 'react-router-dom'
import { 
  FiHome, FiBriefcase, FiDollarSign, FiMail, FiLayers, FiSettings, 
  FiShoppingBag, FiUsers, FiFileText, FiStar, FiGrid 
} from 'react-icons/fi'

export default function Sidebar() {
  const menuGroups = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', path: '/', icon: <FiHome size={16} /> }
      ]
    },
    {
      title: 'Sales & Leads',
      items: [
        { name: 'Leads & Inquiries', path: '/leads', icon: <FiUsers size={16} /> },
        { name: 'Website Orders', path: '/orders', icon: <FiShoppingBag size={16} /> }
      ]
    },
    {
      title: 'Operations',
      items: [
        { name: 'Active Projects', path: '/projects', icon: <FiBriefcase size={16} /> },
        { name: 'Invoices', path: '/invoices', icon: <FiFileText size={16} /> },
        { name: 'Payments', path: '/payments', icon: <FiDollarSign size={16} /> }
      ]
    },
    {
      title: 'Content & Settings',
      items: [
        { name: 'Client Messages', path: '/messages', icon: <FiMail size={16} /> },
        { name: 'System Settings', path: '/settings', icon: <FiSettings size={16} /> }
      ]
    }
  ]

  const activeStyle = "bg-brand-primary/10 border-l-2 border-brand-primary text-white font-medium"
  const inactiveStyle = "hover:bg-white/5 border-l-2 border-transparent text-slate-400 hover:text-white"

  return (
    <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col min-h-screen sticky top-0 font-sans">
      {/* Brand Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent tracking-wider">
            INNOVTRIX
          </span>
          <span className="text-[10px] px-2 py-0.5 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full font-bold">
            Admin
          </span>
        </div>
      </div>

      {/* Navigation Group items */}
      <nav className="flex-grow p-4 overflow-y-auto space-y-8">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-2">
            <h4 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {group.title}
            </h4>
            <div className="space-y-1">
              {group.items.map((item, itemIdx) => (
                <NavLink
                  key={itemIdx}
                  to={item.path}
                  className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                    isActive ? activeStyle : inactiveStyle
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
