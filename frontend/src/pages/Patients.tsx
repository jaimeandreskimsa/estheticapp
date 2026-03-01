import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Eye, Phone, Calendar, X, Loader2 } from 'lucide-react'
import { patientsApi, type Patient } from '../services/api'

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewPatientModal, setShowNewPatientModal] = useState(false)
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [rut, setRut]             = useState('')
  const [email, setEmail]         = useState('')
  const [phone, setPhone]         = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [biologicalSex, setBiologicalSex] = useState('')
  const [address, setAddress]     = useState('')

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async (search?: string) => {
    setLoading(true)
    try {
      const res = await patientsApi.list({ search, limit: 50 })
      setPatients(res.data.data)
    } catch {
      // mantener lista vacía
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    const timeout = setTimeout(() => fetchPatients(value), 400)
    return () => clearTimeout(timeout)
  }

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setSaving(true)
    try {
      await patientsApi.create({
        firstName, lastName, phone, dateOfBirth,
        rut: rut || undefined,
        email: email || undefined,
        biologicalSex: biologicalSex || undefined,
        address: address || undefined,
      })
      setShowNewPatientModal(false)
      // Reset form
      setFirstName(''); setLastName(''); setRut(''); setEmail('')
      setPhone(''); setDateOfBirth(''); setBiologicalSex(''); setAddress('')
      fetchPatients(searchQuery)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error
      setFormError(msg || 'Error al guardar paciente')
    } finally {
      setSaving(false)
    }
  }

  const filteredPatients = patients.filter(p => {
    const name = `${p.first_name} ${p.last_name}`.toLowerCase()
    const q = searchQuery.toLowerCase()
    return name.includes(q) || (p.rut || '').includes(q) || (p.email || '').toLowerCase().includes(q)
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pacientes</h1>
          <p className="text-gray-600">{loading ? 'Cargando...' : `${patients.length} pacientes registrados`}</p>
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
            onChange={(e) => handleSearch(e.target.value)}
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
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12">
                  <Loader2 className="animate-spin mx-auto text-blue-600" size={32} />
                </td></tr>
              ) : filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {patient.first_name[0]}{patient.last_name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{patient.first_name} {patient.last_name}</p>
                        <p className="text-sm text-gray-500">{patient.email || '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{patient.rut || '—'}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} />
                      {patient.phone}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      {patient.last_visit
                        ? new Date(patient.last_visit).toLocaleDateString('es-CL')
                        : 'Sin visitas'}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      patient.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {patient.is_active ? 'Activo' : 'Inactivo'}
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
              <form className="space-y-6" onSubmit={handleCreatePatient}>
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{formError}</div>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                    <input type="text" className="input" placeholder="María" required
                      value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
                    <input type="text" className="input" placeholder="González" required
                      value={lastName} onChange={e => setLastName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RUT</label>
                    <input type="text" className="input" placeholder="12.345.678-9"
                      value={rut} onChange={e => setRut(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" className="input" placeholder="correo@ejemplo.com"
                      value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                    <input type="tel" className="input" placeholder="+56912345678" required
                      value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento *</label>
                    <input type="date" className="input" required
                      value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                    <select className="input" value={biologicalSex} onChange={e => setBiologicalSex(e.target.value)}>
                      <option value="">Seleccionar</option>
                      <option value="F">Femenino</option>
                      <option value="M">Masculino</option>
                      <option value="O">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                    <input type="text" className="input" placeholder="Santiago"
                      value={address} onChange={e => setAddress(e.target.value)} />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowNewPatientModal(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
                    Cancelar
                  </button>
                  <button type="submit" disabled={saving} className="flex-1 btn-primary flex items-center justify-center gap-2">
                    {saving && <Loader2 size={16} className="animate-spin" />}
                    {saving ? 'Guardando...' : 'Guardar Paciente'}
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
