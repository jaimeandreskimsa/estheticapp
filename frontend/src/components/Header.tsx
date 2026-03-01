import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  const notifications = [
    { id: 1, type: 'appointment', message: 'Nueva cita programada para hoy a las 15:00', time: '5 min' },
    { id: 2, type: 'budget', message: 'Presupuesto #1234 fue aceptado', time: '1 hora' },
    { id: 3, type: 'alert', message: 'Producto Botox 100U próximo a vencer', time: '2 horas' },
  ]

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Buscar pacientes, tratamientos, RUT..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3 ml-6">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-lg hover:bg-gray-100 transition"
            >
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0">
                      <p className="text-sm text-gray-900 mb-1">{notif.message}</p>
                      <p className="text-xs text-gray-500">{notif.time} atrás</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <Link to="/dashboard/profile" className="flex items-center gap-3 p-2 pr-4 rounded-lg hover:bg-gray-100 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.name ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2) : 'U'}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">{user.name || 'Usuario'}</p>
              <p className="text-xs text-gray-500">{user.role || 'Doctor'}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
