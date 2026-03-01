import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, FileText, User, Calendar, Clock, Filter } from 'lucide-react'

export default function Consultas() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const consultas = [
    {
      id: '1',
      patient: { id: '1', name: 'María González', rut: '12.345.678-9' },
      type: 'Primera Consulta',
      date: '2024-02-01',
      time: '10:00',
      doctor: 'Dr. Juan Pérez',
      status: 'completed',
      diagnosis: 'Envejecimiento facial moderado',
      procedures: 4
    },
    {
      id: '2',
      patient: { id: '1', name: 'María González', rut: '12.345.678-9' },
      type: 'Control Post-Tratamiento',
      date: '2024-02-15',
      time: '11:30',
      doctor: 'Dr. Juan Pérez',
      status: 'completed',
      diagnosis: 'Evaluación post-Botox',
      procedures: 0
    },
    {
      id: '3',
      patient: { id: '2', name: 'Ana Martínez', rut: '13.456.789-0' },
      type: 'Primera Consulta',
      date: '2024-02-20',
      time: '09:00',
      doctor: 'Dr. Juan Pérez',
      status: 'completed',
      diagnosis: 'Hiperpigmentación facial',
      procedures: 3
    },
    {
      id: '4',
      patient: { id: '3', name: 'Carmen Silva', rut: '14.567.890-1' },
      type: 'Consulta de Seguimiento',
      date: '2024-02-25',
      time: '15:00',
      doctor: 'Dr. Juan Pérez',
      status: 'in-progress',
      diagnosis: 'Pendiente',
      procedures: 0
    },
    {
      id: '5',
      patient: { id: '4', name: 'Pedro Ramírez', rut: '15.678.901-2' },
      type: 'Primera Consulta',
      date: '2024-02-28',
      time: '10:30',
      doctor: 'Dr. Juan Pérez',
      status: 'scheduled',
      diagnosis: 'Pendiente',
      procedures: 0
    },
    {
      id: '6',
      patient: { id: '5', name: 'Laura Torres', rut: '16.789.012-3' },
      type: 'Evaluación Pre-Tratamiento',
      date: '2024-03-01',
      time: '14:00',
      doctor: 'Dr. Juan Pérez',
      status: 'scheduled',
      diagnosis: 'Pendiente',
      procedures: 0
    }
  ]

  const filteredConsultas = consultas.filter(consulta => {
    const matchesSearch = 
      consulta.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consulta.patient.rut.includes(searchQuery) ||
      consulta.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consulta.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || consulta.status === filterStatus
    const matchesType = filterType === 'all' || consulta.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const completedCount = consultas.filter(c => c.status === 'completed').length
  const scheduledCount = consultas.filter(c => c.status === 'scheduled').length
  const inProgressCount = consultas.filter(c => c.status === 'in-progress').length

  const consultaTypes = ['Primera Consulta', 'Control Post-Tratamiento', 'Consulta de Seguimiento', 'Evaluación Pre-Tratamiento']

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultas Médicas</h1>
          <p className="text-gray-600">{consultas.length} consultas registradas</p>
        </div>
        <Link to="/dashboard/consultas/new" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nueva Consulta
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-white" />
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

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-orange-700 font-medium">En Progreso</p>
              <p className="text-2xl font-bold text-orange-900">{inProgressCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar consulta..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter by Status */}
          <div className="md:col-span-1">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="all">Todos los estados</option>
                <option value="completed">Completadas</option>
                <option value="in-progress">En Progreso</option>
                <option value="scheduled">Programadas</option>
              </select>
            </div>
          </div>

          {/* Filter by Type */}
          <div className="md:col-span-1">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="all">Todos los tipos</option>
              {consultaTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Consultas List */}
      <div className="space-y-4">
        {filteredConsultas.map((consulta) => (
          <div key={consulta.id} className="card hover:shadow-lg transition">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left: Date */}
              <div className="flex flex-col items-center justify-center md:w-24 flex-shrink-0">
                <div className={`w-20 h-20 rounded-lg flex flex-col items-center justify-center ${
                  consulta.status === 'completed' ? 'bg-green-100' :
                  consulta.status === 'in-progress' ? 'bg-orange-100' :
                  'bg-blue-100'
                }`}>
                  <span className="text-2xl font-bold text-gray-900">
                    {new Date(consulta.date).getDate()}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(consulta.date).toLocaleDateString('es-CL', { month: 'short' })}
                  </span>
                </div>
                <span className="mt-2 text-sm text-gray-600 font-medium">{consulta.time}</span>
              </div>

              {/* Center: Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{consulta.type}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={16} />
                      <Link 
                        to={`/dashboard/patients/${consulta.patient.id}`}
                        className="hover:text-blue-600 font-medium"
                      >
                        {consulta.patient.name}
                      </Link>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm">{consulta.patient.rut}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    consulta.status === 'completed' ? 'bg-green-100 text-green-700' :
                    consulta.status === 'in-progress' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {consulta.status === 'completed' ? 'Completada' : 
                     consulta.status === 'in-progress' ? 'En Progreso' : 'Programada'}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FileText size={16} className="text-purple-600" />
                    <span className="font-medium">Doctor:</span>
                    <span>{consulta.doctor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FileText size={16} className="text-green-600" />
                    <span className="font-medium">Diagnóstico:</span>
                    <span>{consulta.diagnosis}</span>
                  </div>
                </div>

                {consulta.procedures > 0 && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-600">
                      {consulta.procedures} procedimiento{consulta.procedures > 1 ? 's' : ''} propuesto{consulta.procedures > 1 ? 's' : ''}
                    </span>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  {consulta.status === 'completed' ? (
                    <>
                      <Link 
                        to={`/dashboard/diagnostico/${consulta.id}`}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        <FileText size={16} />
                        Ver Diagnóstico
                      </Link>
                      {consulta.procedures > 0 && (
                        <>
                          <span className="text-gray-300">•</span>
                          <Link 
                            to={`/dashboard/plan/${consulta.id}`}
                            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                          >
                            <FileText size={16} />
                            Ver Plan de Tratamiento
                          </Link>
                        </>
                      )}
                    </>
                  ) : consulta.status === 'in-progress' ? (
                    <Link 
                      to={`/dashboard/diagnostico/${consulta.id}`}
                      className="btn-primary text-sm inline-flex items-center gap-2"
                    >
                      <FileText size={16} />
                      Continuar Diagnóstico
                    </Link>
                  ) : (
                    <button className="btn-secondary text-sm inline-flex items-center gap-2">
                      <Calendar size={16} />
                      Reagendar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredConsultas.length === 0 && (
          <div className="card text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">No se encontraron consultas</p>
            <p className="text-sm text-gray-500">Intenta con otros filtros o crea una nueva consulta</p>
          </div>
        )}
      </div>
    </div>
  )
}
