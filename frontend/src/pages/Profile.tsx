import { useState } from 'react'
import { Camera, Mail, Phone, MapPin, Building2, Stethoscope, Calendar, Shield, Save, X } from 'lucide-react'

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@clinica.cl',
    phone: '+56 9 1234 5678',
    rut: '12.345.678-9',
    medicalLicense: 'MED-2023-00123',
    specialization: 'Medicina Estética',
    clinic: 'Clínica Estética Premium',
    address: 'Av. Providencia 123, Piso 5',
    city: 'Santiago',
    country: 'Chile',
    bio: 'Especialista en medicina estética con más de 10 años de experiencia. Enfocado en tratamientos faciales y rejuvenecimiento.',
    startDate: '2013-03-15'
  })

  const handleSave = () => {
    // TODO: Conectar con API para actualizar perfil
    console.log('Guardando perfil:', profile)
    setEditing(false)
  }

  const handleCancel = () => {
    setEditing(false)
    // Recargar datos originales si se cancela
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Gestiona tu información personal y profesional</p>
      </div>

      {/* Profile Header Card */}
      <div className="card mb-6">
        <div className="relative">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg"></div>
          
          {/* Avatar */}
          <div className="absolute left-8 -bottom-16">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center text-4xl font-bold text-gray-600">
                {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition shadow-lg">
                <Camera size={20} />
              </button>
            </div>
          </div>

          {/* Edit Button */}
          <div className="absolute top-4 right-4">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="btn-primary"
              >
                Editar Perfil
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                  <Save size={18} />
                  Guardar
                </button>
                <button onClick={handleCancel} className="btn-secondary flex items-center gap-2">
                  <X size={18} />
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="pt-20 pb-6 px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Dr. {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-gray-600 mb-4">{profile.specialization}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Building2 size={16} />
              <span>{profile.clinic}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{profile.city}, {profile.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Desde {new Date(profile.startDate).getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Info Cards */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield size={20} className="text-blue-600" />
              Información Personal
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RUT
                </label>
                <p className="text-gray-900">{profile.rut}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {editing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                {editing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Stethoscope size={20} className="text-blue-600" />
              Información Profesional
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registro Médico
                </label>
                <p className="text-gray-900">{profile.medicalLicense}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialización
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={profile.specialization}
                    onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.specialization}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clínica
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={profile.clinic}
                    onChange={(e) => setProfile({ ...profile, clinic: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.clinic}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biografía Profesional
                </label>
                {editing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-blue-600" />
              Dirección
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.address}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ciudad
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  País
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={profile.country}
                    onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.country}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Quick Actions */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Pacientes</span>
                  <span className="text-lg font-bold text-blue-600">124</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Consultas</span>
                  <span className="text-lg font-bold text-purple-600">487</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Presupuestos</span>
                  <span className="text-lg font-bold text-green-600">156</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Acceso Rápido</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Cambiar Email</p>
                  <p className="text-xs text-gray-500">Actualizar email</p>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Seguridad</p>
                  <p className="text-xs text-gray-500">Cambiar contraseña</p>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Notificaciones</p>
                  <p className="text-xs text-gray-500">Configurar alertas</p>
                </div>
              </button>
            </div>
          </div>

          {/* Account Status */}
          <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <h3 className="text-lg font-semibold mb-2">Plan Actual</h3>
            <p className="text-2xl font-bold text-blue-600 mb-1">Premium</p>
            <p className="text-sm text-gray-600 mb-4">Válido hasta 28 Feb 2026</p>
            <button className="w-full btn-primary text-sm">
              Gestionar Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
