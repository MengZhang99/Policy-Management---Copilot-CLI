import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Upload, FileText, Settings, Shield } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/upload', icon: Upload, label: 'Upload Policy' },
  { to: '/policies/1/review', icon: FileText, label: 'My Policies' },
]

export default function Sidebar() {
  const location = useLocation()

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to.split('/').slice(0, 2).join('/'))
  }

  return (
    <aside className="w-64 bg-lrn-navy flex flex-col shadow-xl">
      <div className="px-6 py-5 border-b border-blue-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-lrn-gold rounded-lg flex items-center justify-center shadow">
            <Shield size={22} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-xl leading-tight">LRN</div>
            <div className="text-blue-300 text-xs">Policy Management</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive(to)
                ? 'bg-lrn-gold text-white shadow-sm'
                : 'text-blue-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-blue-900">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-blue-300 hover:bg-white/10 hover:text-white transition-all"
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>
    </aside>
  )
}
