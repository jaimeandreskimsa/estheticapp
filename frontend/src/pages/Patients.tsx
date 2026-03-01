import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Eye, Phone, Calendar, X } from 'lucide-react'

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewPatientModal, setShowNewPatientModal] = useState(false)

  const patients = [
    { id: '1', name: 'María González', rut: '12.345.678-9', email: 'maria.g@email.com', phone: '+56912345678', lastVisit: '2024-01-15', status: 'active' },
    { id: '2', name: 'Carlos López', rut: '98.765.432-1', email: 'carlos.l@email.com', phone: '+56987654321', lastVisit: '2024-01-10', status: 'active' },
    { id: '3', name: 'Ana Martínez', rut: '11.222.333-4', email: 'ana.m@email.com', phone: '+56911222333', lastVisit: '2024-01-05', status: 'active' },
    { id: '4', name: 'Pedro Silva', rut: '22.333.444-5', email: 'pedro.s@email.com', phone: '+56922333444', lastVisit: '2024-01-20', status: 'active' },
    { id: '5', name: 'Laura Torres', rut: '33.444.555-6', email: 'laura.t@email.com', phone: '+56933444555', lastVisit: '2024-01-18', status: 'inactive' },
  ]

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.rut.includes(searchQuery) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pacientes</h1>
          <p className="text-gray-600">{patients.length} pacientes registrados</p>
        </div>
        <button onClick={() => setShowNewPatientModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nuevo Paciente
        </button>
      </div>

      {/* Search Bar */}
      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, RUT o email..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Patients Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Paciente</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">RUT</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Contacto</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Última Visita</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Estado</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{patient.rut}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} />
                      {patient.phone}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      {new Date(patient.lastVisit).toLocaleDateString('es-CL')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {patient.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Link 
                      to={`/dashboard/patients/${patient.id}`} 
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Eye size={16} />
                      Ver Ficha
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron pacientes</p>
          </div>
        )}
      </div>

      {/* New Patient Modal */}
      {showNewPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Nuevo Paciente</h2>
              <button onClick={() => setShowNewPatientModal(false)} className="text-gray-400 hover:text-gray-600">
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
                    <input type="text" className="input" placeholder="Ej: María González" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RUT *
                    </label>
                    <input type="text" className="input" placeholder="12.345.678-9" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input type="email" className="input" placeholder="correo@ejemplo.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input type="tel" className="input" placeholder="+56912345678" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de nacimiento
                    </label>
                    <input type="date" className="input" />
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
                  <input type="text" className="input" placeholder="Calle, número, comuna" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prevision
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
                    Observaciones
                  </label>
                  <textarea className="input" rows={3} placeholder="Notas adicionales sobre el paciente"></textarea>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowNewPatientModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Guardar Paciente
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
