import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, MapPin, Calendar, FileText, DollarSign, Image, Activity, Plus, Edit2, X } from 'lucide-react'

export default function PatientDetail() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('historia')
  const [showEditModal, setShowEditModal] = useState(false)

  const patient = {
    id: '1',
    name: 'María González',
    rut: '12.345.678-9',
    email: 'maria@example.com',
    phone: '+56 9 1234 5678',
    birthDate: '1982-05-15',
    age: 42,
    address: 'Las Condes, Santiago',
    registrationDate: '2024-01-15',
    status: 'active',
    consultations: [
      { id: '1', date: '2024-02-01', type: 'Primera Consulta', doctor: 'Dr. Juan Pérez', status: 'completed' },
      { id: '2', date: '2024-02-15', type: 'Control Post-Botox', doctor: 'Dr. Juan Pérez', status: 'completed' }
    ],
    treatments: [
      { id: '1', name: 'Rejuvenecimiento Facial Integral', startDate: '2024-02-01', status: 'active' }
    ],
    budgets: [
      { id: '1', date: '2024-02-05', total: 1440000, status: 'approved' }
    ],
    sessions: [
      { id: '1', date: '2024-02-15', procedure: 'Botox Facial', status: 'completed' },
      { id: '2', date: '2024-02-22', procedure: 'Relleno Ácido Hialurónico', status: 'completed' },
      { id: '3', date: '2024-03-01', procedure: 'Radiofrecuencia Facial', status: 'scheduled' }
    ],
    documents: [
      { id: '1', name: 'Consentimiento Botox', date: '2024-02-15', type: 'consent' },
      { id: '2', name: 'Consentimiento Rellenos', date: '2024-02-22', type: 'consent' },
      { id: '3', name: 'Ficha Médica', date: '2024-02-01', type: 'medical' }
    ],
    photos: 12
  }

  const timeline = [
    { date: '2024-02-22', type: 'session', title: 'Sesión: Relleno Ácido Hialurónico', icon: Activity, color: 'green' },
    { date: '2024-02-15', type: 'session', title: 'Sesión: Botox Facial', icon: Activity, color: 'green' },
    { date: '2024-02-05', type: 'budget', title: 'Presupuesto aprobado - $1.440.000', icon: DollarSign, color: 'blue' },
    { date: '2024-02-01', type: 'treatment', title: 'Inicio Plan de Tratamiento', icon: FileText, color: 'purple' },
    { date: '2024-02-01', type: 'consultation', title: 'Primera Consulta', icon: FileText, color: 'orange' },
    { date: '2024-01-15', type: 'registration', title: 'Registro en el sistema', icon: Calendar, color: 'gray' }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link to="/dashboard/patients" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft size={20} />
          Volver a Pacientes
        </Link>
      </div>

      {/* Patient Header */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{patient.name}</h1>
                <p className="text-gray-600">{patient.rut}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowEditModal(true)} className="btn-secondary flex items-center gap-2">
                  <Edit2 size={16} />
                  Editar
                </button>
                <Link to={`/dashboard/consultas/new?patient=${patient.id}`} className="btn-primary flex items-center gap-2">
                  <Plus size={16} />
                  Nueva Consulta
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Teléfono</p>
                  <p className="text-sm font-medium">{patient.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium">{patient.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500">Edad</p>
                  <p className="text-sm font-medium">{patient.age} años</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500">Ubicación</p>
                  <p className="text-sm font-medium">{patient.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <FileText size={24} className="mx-auto text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-blue-900">{patient.consultations.length}</p>
          <p className="text-sm text-blue-700">Consultas</p>
        </div>
        <div className="card text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <Activity size={24} className="mx-auto text-green-600 mb-2" />
          <p className="text-2xl font-bold text-green-900">{patient.sessions.length}</p>
          <p className="text-sm text-green-700">Sesiones</p>
        </div>
        <div className="card text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <DollarSign size={24} className="mx-auto text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-purple-900">{patient.budgets.length}</p>
          <p className="text-sm text-purple-700">Presupuestos</p>
        </div>
        <div className="card text-center bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <Image size={24} className="mx-auto text-pink-600 mb-2" />
          <p className="text-2xl font-bold text-pink-900">{patient.photos}</p>
          <p className="text-sm text-pink-700">Fotografías</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-6">
        <div className="flex gap-2 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab('historia')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'historia' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Historia Clínica
          </button>
          <button
            onClick={() => setActiveTab('tratamientos')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'tratamientos' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tratamientos
          </button>
          <button
            onClick={() => setActiveTab('documentos')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'documentos' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Documentos
          </button>
          <button
            onClick={() => setActiveTab('fotos')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'fotos' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Galería de Fotos
          </button>
        </div>

        <div className="pt-6">
          {/* Timeline Tab */}
          {activeTab === 'historia' && (
            <div className="space-y-4">
              {timeline.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.color === 'blue' ? 'bg-blue-100' :
                        item.color === 'green' ? 'bg-green-100' :
                        item.color === 'purple' ? 'bg-purple-100' :
                        item.color === 'orange' ? 'bg-orange-100' :
                        'bg-gray-100'
                      }`}>
                        <Icon size={20} className={`${
                          item.color === 'blue' ? 'text-blue-600' :
                          item.color === 'green' ? 'text-green-600' :
                          item.color === 'purple' ? 'text-purple-600' :
                          item.color === 'orange' ? 'text-orange-600' :
                          'text-gray-600'
                        }`} />
                      </div>
                    </div>
                    <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-6 -ml-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString('es-CL', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Treatments Tab */}
          {activeTab === 'tratamientos' && (
            <div className="space-y-4">
              {patient.treatments.map((treatment) => (
                <Link key={treatment.id} to={`/dashboard/plan/${treatment.id}`} className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{treatment.name}</h3>
                      <p className="text-sm text-gray-600">Inicio: {new Date(treatment.startDate).toLocaleDateString('es-CL')}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {treatment.status === 'active' ? 'Activo' : 'Completado'}
                    </span>
                  </div>
                </Link>
              ))}
              <div className="text-center py-8">
                <Link to={`/dashboard/plan/new?patient=${patient.id}`} className="btn-primary inline-flex items-center gap-2">
                  <Plus size={18} />
                  Nuevo Plan de Tratamiento
                </Link>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documentos' && (
            <div className="space-y-3">
              {patient.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className={doc.type === 'consent' ? 'text-blue-600' : 'text-green-600'} />
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-600">{new Date(doc.date).toLocaleDateString('es-CL')}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Descargar
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'fotos' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Array.from({ length: patient.photos }).map((_, idx) => (
                  <div key={idx} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image size={32} className="text-gray-400" />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button className="btn-secondary inline-flex items-center gap-2">
                  <Plus size={18} />
                  Agregar Fotografías
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Patient Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Editar Paciente</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input type="text" className="input" defaultValue={patient.name} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RUT *
                    </label>
                    <input type="text" className="input" defaultValue={patient.rut} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input type="email" className="input" defaultValue={patient.email} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input type="tel" className="input" defaultValue={patient.phone} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de nacimiento
                    </label>
                    <input type="date" className="input" defaultValue={patient.birthDate} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Género
                    </label>
                    <select className="input">
                      <option value="">Seleccionar</option>
                      <option value="femenino">Femenino</option>
                      <option value="masculino">Masculino</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <input type="text" className="input" defaultValue={patient.address} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previsión
                  </label>
                  <select className="input">
                    <option value="">Seleccionar</option>
                    <option value="fonasa">FONASA</option>
                    <option value="isapre">ISAPRE</option>
                    <option value="particular">Particular</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select className="input" defaultValue={patient.status}>
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
