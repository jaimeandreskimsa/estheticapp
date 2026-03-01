import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, FileText, Settings, Calendar, DollarSign, LogOut, User } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/patients', icon: Users, label: 'Pacientes' },
    { path: '/dashboard/consultas', icon: FileText, label: 'Consultas' },
    { path: '/dashboard/calendar', icon: Calendar, label: 'Calendario' },
    { path: '/dashboard/payments', icon: DollarSign, label: 'Pagos' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Esthetic App
          </span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                active
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-1">
        <Link
          to="/dashboard/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive('/dashboard/profile')
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <User size={20} />
          <span className="font-medium">Mi Perfil</span>
        </Link>
        
        <Link
          to="/dashboard/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive('/dashboard/settings')
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Settings size={20} />
          <span className="font-medium">Configuración</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  )
}
