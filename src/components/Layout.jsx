import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="text-sm text-gray-400 font-medium tracking-wide uppercase">Policy Management</div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600 font-medium">Sarah Johnson</div>
            <div className="w-9 h-9 rounded-full bg-lrn-gold flex items-center justify-center text-white font-bold text-sm shadow">SJ</div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
