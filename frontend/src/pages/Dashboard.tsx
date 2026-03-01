import { Link } from 'react-router-dom'
import { Users, Calendar, DollarSign, TrendingUp, Clock, FileText, AlertCircle } from 'lucide-react'

export default function Dashboard() {
  const upcomingAppointments = [
    { id: 1, patient: 'María González', time: '10:00', treatment: 'Botox Facial', status: 'confirmed' },
    { id: 2, patient: 'Carlos López', time: '11:30', treatment: 'Relleno Labial', status: 'confirmed' },
    { id: 3, patient: 'Ana Martínez', time: '14:00', treatment: 'Consulta Inicial', status: 'pending' },
    { id: 4, patient: 'Pedro Silva', time: '15:30', treatment: 'Radiofrecuencia', status: 'confirmed' },
  ]

  const recentActivity = [
    { id: 1, type: 'diagnosis', patient: 'María González', action: 'Diagnóstico generado', time: '2 horas' },
    { id: 2, type: 'budget', patient: 'Carlos López', action: 'Presupuesto aceptado', time: '3 horas' },
    { id: 3, type: 'session', patient: 'Ana Martínez', action: 'Sesión completada', time: '5 horas' },
    { id: 4, type: 'plan', patient: 'Pedro Silva', action: 'Plan de tratamiento creado', time: '1 día' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Hoy es {new Date().toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 text-sm mb-1 font-medium">Total Pacientes</p>
              <p className="text-3xl font-bold text-blue-900">124</p>
            </div>
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="text-white" size={28} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-semibold">+12%</span>
            <span className="text-blue-700 ml-2">vs mes anterior</span>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700 text-sm mb-1 font-medium">Consultas Hoy</p>
              <p className="text-3xl font-bold text-purple-900">6</p>
            </div>
            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="text-white" size={28} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-semibold">3 completadas</span>
            <span className="text-purple-700 ml-2">• 3 pendientes</span>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-700 text-sm mb-1 font-medium">Presupuestos Pendientes</p>
              <p className="text-3xl font-bold text-orange-900">8</p>
            </div>
            <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="text-white" size={28} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-orange-700 font-semibold">$3.2M</span>
            <span className="text-orange-700 ml-2">valor total</span>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 text-sm mb-1 font-medium">Ingresos Mes</p>
              <p className="text-3xl font-bold text-green-900">$8.4M</p>
            </div>
            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="text-white" size={28} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-semibold">+24%</span>
            <span className="text-green-700 ml-2">vs mes anterior</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock size={24} className="text-blue-600" />
              Próximas Citas de Hoy
            </h2>
            <Link to="/dashboard/patients" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Ver todas →
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {apt.patient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{apt.patient}</p>
                    <p className="text-sm text-gray-600">{apt.treatment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{apt.time}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      apt.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {apt.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                    </span>
                  </div>
                  <Link to="/dashboard/calendar" className="btn-primary text-sm">
                    Ver
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Acciones Rápidas</h2>
          <div className="space-y-3">
            <Link to="/dashboard/patients" className="block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <Users size={24} />
                <div>
                  <p className="font-semibold">Nuevo Paciente</p>
                  <p className="text-xs text-blue-100">Registrar paciente</p>
                </div>
              </div>
            </Link>
            <Link to="/dashboard/consultas/new" className="block w-full p-4 bg-purple-50 border-2 border-purple-200 rounded-lg text-left hover:bg-purple-100 transition">
              <div className="flex items-center gap-3">
                <Calendar size={24} className="text-purple-600" />
                <div>
                  <p className="font-semibold text-gray-900">Nueva Consulta</p>
                  <p className="text-xs text-gray-600">Agendar cita</p>
                </div>
              </div>
            </Link>
            <Link to="/dashboard/presupuesto" className="block w-full p-4 bg-green-50 border-2 border-green-200 rounded-lg text-left hover:bg-green-100 transition">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">Presupuesto</p>
                  <p className="text-xs text-gray-600">Generar presupuesto</p>
                </div>
              </div>
            </Link>
            <Link to="/dashboard/payments" className="block w-full p-4 bg-orange-50 border-2 border-orange-200 rounded-lg text-left hover:bg-orange-100 transition">
              <div className="flex items-center gap-3">
                <DollarSign size={24} className="text-orange-600" />
                <div>
                  <p className="font-semibold text-gray-900">Pagos</p>
                  <p className="text-xs text-gray-600">Registrar pago</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FileText size={20} className="text-purple-600" />
            Actividad Reciente
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'diagnosis' ? 'bg-blue-100' :
                  activity.type === 'budget' ? 'bg-green-100' :
                  activity.type === 'session' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  <FileText size={18} className={
                    activity.type === 'diagnosis' ? 'text-blue-600' :
                    activity.type === 'budget' ? 'text-green-600' :
                    activity.type === 'session' ? 'text-purple-600' : 'text-orange-600'
                  } />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.patient}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <AlertCircle size={20} className="text-orange-600" />
            Alertas y Pendientes
          </h2>
          <div className="space-y-3">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">3 consentimientos pendientes</p>
                  <p className="text-sm text-gray-600">Requieren firma del paciente</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">2 productos por vencer</p>
                  <p className="text-sm text-gray-600">Revisar inventario</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">5 seguimientos programados</p>
                  <p className="text-sm text-gray-600">Para esta semana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
