import React from 'react'
import { Shield, Bell, Eye, Clock, Globe } from 'lucide-react'

export default function Settings() {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-600">Personaliza tu experiencia en Esthetic App</p>
      </div>

      <div className="space-y-6">
        {/* Security Settings */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Shield size={24} className="text-blue-600" />
            Seguridad
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña actual
              </label>
              <input type="password" className="input max-w-md" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nueva contraseña
              </label>
              <input type="password" className="input max-w-md" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar nueva contraseña
              </label>
              <input type="password" className="input max-w-md" placeholder="••••••••" />
            </div>
            <button className="btn-primary">
              Actualizar Contraseña
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Bell size={24} className="text-purple-600" />
            Notificaciones
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <div>
                <p className="font-medium text-gray-900">Citas programadas</p>
                <p className="text-sm text-gray-600">Recibe notificaciones de nuevas citas</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            </label>
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <div>
                <p className="font-medium text-gray-900">Presupuestos aceptados</p>
                <p className="text-sm text-gray-600">Notificar cuando un paciente acepte un presupuesto</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            </label>
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <div>
                <p className="font-medium text-gray-900">Inventario bajo</p>
                <p className="text-sm text-gray-600">Alertas de productos con stock bajo</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            </label>
          </div>
        </div>

        {/* Privacy */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Eye size={24} className="text-green-600" />
            Privacidad
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <div>
                <p className="font-medium text-gray-900">Compartir datos para análisis</p>
                <p className="text-sm text-gray-600">Datos anónimos para mejorar el servicio</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            </label>
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <div>
                <p className="font-medium text-gray-900">Auditoría completa</p>
                <p className="text-sm text-gray-600">Registrar todas las acciones (requerido para MINSAL)</p>
              </div>
              <input type="checkbox" defaultChecked disabled className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 opacity-50" />
            </label>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Globe size={24} className="text-indigo-600" />
            Regional
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zona horaria
              </label>
              <select className="input">
                <option>America/Santiago (GMT-3)</option>
                <option>America/New_York</option>
                <option>Europe/Madrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formato de moneda
              </label>
              <select className="input">
                <option>CLP ($)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formato de fecha
              </label>
              <select className="input">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Idioma
              </label>
              <select className="input">
                <option>Español (Chile)</option>
                <option>Español (España)</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock size={24} className="text-pink-600" />
            Horario de Trabajo
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium text-gray-700">Día</div>
              <div className="font-medium text-gray-700">Horario</div>
              <div className="font-medium text-gray-700">Estado</div>
              
              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
                <React.Fragment key={day}>
                  <div className="text-gray-900">{day}</div>
                  <div className="text-sm text-gray-600">09:00 - 18:00</div>
                  <div>
                    <input 
                      type="checkbox" 
                      defaultChecked={day !== 'Domingo'} 
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
