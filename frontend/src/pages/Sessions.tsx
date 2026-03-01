import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, User, Package, FileText, Plus, CheckCircle, XCircle, AlertCircle, Image as ImageIcon } from 'lucide-react'

export default function Sessions() {
  const [showNewSession, setShowNewSession] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

  const [sessions, setSessions] = useState([
    {
      id: '1',
      patient: { id: '1', name: 'María González', rut: '12.345.678-9' },
      date: '2024-02-15',
      time: '10:00',
      procedure: 'Botox Facial',
      area: 'Frente y entrecejo',
      doctor: 'Dr. Juan Pérez',
      status: 'completed',
      productsUsed: [
        { name: 'Botox Allergan', units: 50, batch: 'BT2024-001', expiry: '2024-12-31' }
      ],
      notes: 'Paciente toleró bien el procedimiento. Sin efectos adversos. Se aplicaron 50 unidades distribuidas en frente (20u), entrecejo (20u) y patas de gallo (10u).',
      photos: ['before-1.jpg', 'after-1.jpg']
    },
    {
      id: '2',
      patient: { id: '1', name: 'María González', rut: '12.345.678-9' },
      date: '2024-02-22',
      time: '11:30',
      procedure: 'Relleno Ácido Hialurónico',
      area: 'Pómulos',
      doctor: 'Dr. Juan Pérez',
      status: 'completed',
      productsUsed: [
        { name: 'Juvederm Voluma', units: 2, batch: 'JV2024-042', expiry: '2025-01-15' }
      ],
      notes: 'Se aplicaron 2ml de ácido hialurónico en región malar bilateral. Resultado natural y simétrico. Paciente satisfecha.',
      photos: ['before-2.jpg', 'after-2.jpg', 'detail-2.jpg']
    },
    {
      id: '3',
      patient: { id: '2', name: 'Ana Martínez', rut: '13.456.789-0' },
      date: '2024-03-01',
      time: '15:00',
      procedure: 'Radiofrecuencia Facial',
      area: 'Rostro completo',
      doctor: 'Dr. Juan Pérez',
      status: 'scheduled',
      productsUsed: [],
      notes: 'Primera sesión de 4 programadas',
      photos: []
    },
    {
      id: '4',
      patient: { id: '3', name: 'Carmen Silva', rut: '14.567.890-1' },
      date: '2024-02-28',
      time: '09:00',
      procedure: 'Peeling Químico',
      area: 'Rostro completo',
      doctor: 'Dr. Juan Pérez',
      status: 'cancelled',
      productsUsed: [],
      notes: 'Paciente canceló por enfermedad',
      photos: []
    }
  ])

  const filteredSessions = sessions.filter(session => 
    filterStatus === 'all' || session.status === filterStatus
  )

  const completedCount = sessions.filter(s => s.status === 'completed').length
  const scheduledCount = sessions.filter(s => s.status === 'scheduled').length
  const totalSessions = sessions.length

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sesiones</h1>
          <p className="text-gray-600">Gestión de sesiones y procedimientos realizados</p>
        </div>
        <button onClick={() => setShowNewSession(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Nueva Sesión
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Completadas</p>
              <p className="text-2xl font-bold text-green-900">{completedCount}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Programadas</p>
              <p className="text-2xl font-bold text-blue-900">{scheduledCount}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Total Sesiones</p>
              <p className="text-2xl font-bold text-purple-900">{totalSessions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completadas
          </button>
          <button
            onClick={() => setFilterStatus('scheduled')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'scheduled' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Programadas
          </button>
          <button
            onClick={() => setFilterStatus('cancelled')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'cancelled' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Canceladas
          </button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <div key={session.id} className="card hover:shadow-lg transition">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left: Date & Status */}
              <div className="flex flex-col items-center justify-center md:w-32 flex-shrink-0">
                <div className={`w-20 h-20 rounded-lg flex flex-col items-center justify-center ${
                  session.status === 'completed' ? 'bg-green-100' :
                  session.status === 'scheduled' ? 'bg-blue-100' :
                  'bg-red-100'
                }`}>
                  <span className="text-2xl font-bold text-gray-900">
                    {new Date(session.date).getDate()}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(session.date).toLocaleDateString('es-CL', { month: 'short' })}
                  </span>
                </div>
                <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  session.status === 'completed' ? 'bg-green-100 text-green-700' :
                  session.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {session.status === 'completed' ? 'Completada' : session.status === 'scheduled' ? 'Programada' : 'Cancelada'}
                </span>
              </div>

              {/* Center: Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{session.procedure}</h3>
                    <p className="text-gray-600">{session.area}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    {session.time}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User size={16} className="text-blue-600" />
                    <Link to={`/dashboard/patients/${session.patient.id}`} className="hover:text-blue-600">
                      {session.patient.name}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <User size={16} className="text-purple-600" />
                    {session.doctor}
                  </div>
                </div>

                {session.productsUsed.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Package size={16} className="text-orange-600" />
                      Productos Utilizados:
                    </p>
                    <div className="space-y-1">
                      {session.productsUsed.map((product, idx) => (
                        <div key={idx} className="text-sm text-gray-600 ml-6">
                          {product.name} - {product.units} {product.units > 1 ? 'unidades' : 'unidad'} 
                          <span className="text-gray-500 ml-2">
                            (Lote: {product.batch}, Vence: {new Date(product.expiry).toLocaleDateString('es-CL')})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {session.notes && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <FileText size={16} className="text-green-600" />
                      Notas:
                    </p>
                    <p className="text-sm text-gray-600 ml-6">{session.notes}</p>
                  </div>
                )}

                {session.photos.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <ImageIcon size={16} className="text-pink-600" />
                      Fotografías ({session.photos.length}):
                    </p>
                    <div className="flex gap-2 ml-6">
                      {session.photos.map((photo, idx) => (
                        <div key={idx} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                          <ImageIcon size={24} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredSessions.length === 0 && (
          <div className="card text-center py-12">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No se encontraron sesiones con este filtro</p>
          </div>
        )}
      </div>

      {/* New Session Modal */}
      {showNewSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Nueva Sesión</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
                  <select className="input">
                    <option>María González</option>
                    <option>Ana Martínez</option>
                    <option>Carmen Silva</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Procedimiento</label>
                  <select className="input">
                    <option>Botox Facial</option>
                    <option>Relleno Ácido Hialurónico</option>
                    <option>Radiofrecuencia Facial</option>
                    <option>Peeling Químico</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <input type="date" className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                  <input type="time" className="input" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Área de aplicación</label>
                <input type="text" className="input" placeholder="ej: Rostro completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                <textarea className="input" rows={3} placeholder="Observaciones, instrucciones..."></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowNewSession(false)} className="btn-secondary flex-1">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Agendar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
