import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Plus, Clock, User, FileText, X } from 'lucide-react'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 1, 1)) // February 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showNewAppointment, setShowNewAppointment] = useState(false)

  const appointments = [
    {
      id: '1',
      patient: { id: '1', name: 'María González' },
      date: '2024-02-15',
      time: '10:00',
      duration: 60,
      type: 'Sesión',
      procedure: 'Botox Facial',
      status: 'confirmed',
      color: 'blue'
    },
    {
      id: '2',
      patient: { id: '2', name: 'Ana Martínez' },
      date: '2024-02-15',
      time: '11:30',
      duration: 90,
      type: 'Sesión',
      procedure: 'Relleno Ácido Hialurónico',
      status: 'confirmed',
      color: 'green'
    },
    {
      id: '3',
      patient: { id: '3', name: 'Carmen Silva' },
      date: '2024-02-20',
      time: '09:00',
      duration: 45,
      type: 'Consulta',
      procedure: 'Primera Consulta',
      status: 'confirmed',
      color: 'purple'
    },
    {
      id: '4',
      patient: { id: '4', name: 'Pedro Ramírez' },
      date: '2024-02-22',
      time: '15:00',
      duration: 60,
      type: 'Consulta',
      procedure: 'Control',
      status: 'pending',
      color: 'orange'
    },
    {
      id: '5',
      patient: { id: '5', name: 'Laura Torres' },
      date: '2024-02-25',
      time: '10:00',
      duration: 120,
      type: 'Sesión',
      procedure: 'Radiofrecuencia Facial',
      status: 'confirmed',
      color: 'blue'
    },
    {
      id: '6',
      patient: { id: '1', name: 'María González' },
      date: '2024-02-28',
      time: '14:00',
      duration: 30,
      type: 'Control',
      procedure: 'Evaluación Post-Tratamiento',
      status: 'confirmed',
      color: 'green'
    }
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek }
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate)

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getAppointmentsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return appointments.filter(apt => apt.date === dateStr)
  }

  const selectedDateAppointments = selectedDate 
    ? getAppointmentsForDate(selectedDate.getDate())
    : []

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length
  const pendingCount = appointments.filter(a => a.status === 'pending').length
  const totalCount = appointments.length

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendario de Citas</h1>
          <p className="text-gray-600">Gestión de agenda y citas médicas</p>
        </div>
        <button 
          onClick={() => setShowNewAppointment(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nueva Cita
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Total Citas</p>
              <p className="text-2xl font-bold text-blue-900">{totalCount}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Confirmadas</p>
              <p className="text-2xl font-bold text-green-900">{confirmedCount}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-orange-700 font-medium">Pendientes</p>
              <p className="text-2xl font-bold text-orange-900">{pendingCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square"></div>
              ))}

              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const dayAppointments = getAppointmentsForDate(day)
                const isSelected = selectedDate?.getDate() === day && 
                                   selectedDate?.getMonth() === currentDate.getMonth()
                const isToday = new Date().getDate() === day && 
                               new Date().getMonth() === currentDate.getMonth() &&
                               new Date().getFullYear() === currentDate.getFullYear()

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                    className={`aspect-square p-2 rounded-lg border transition relative ${
                      isSelected 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : isToday
                        ? 'bg-blue-50 border-blue-300 text-blue-900'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{day}</span>
                    {dayAppointments.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {dayAppointments.slice(0, 3).map((apt, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-white' :
                              apt.color === 'blue' ? 'bg-blue-500' :
                              apt.color === 'green' ? 'bg-green-500' :
                              apt.color === 'purple' ? 'bg-purple-500' :
                              'bg-orange-500'
                            }`}
                          ></div>
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">
              {selectedDate 
                ? `Citas del ${selectedDate.getDate()} de ${monthNames[selectedDate.getMonth()]}`
                : 'Selecciona una fecha'
              }
            </h3>

            {selectedDate ? (
              <div className="space-y-3">
                {selectedDateAppointments.length > 0 ? (
                  selectedDateAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        apt.color === 'blue' ? 'bg-blue-50 border-blue-500' :
                        apt.color === 'green' ? 'bg-green-50 border-green-500' :
                        apt.color === 'purple' ? 'bg-purple-50 border-purple-500' :
                        'bg-orange-50 border-orange-500'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-600" />
                          <span className="font-semibold text-gray-900">{apt.time}</span>
                          <span className="text-sm text-gray-600">({apt.duration} min)</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {apt.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <User size={16} className="text-gray-600" />
                        <Link 
                          to={`/dashboard/patients/${apt.patient.id}`}
                          className="font-medium text-gray-900 hover:text-blue-600"
                        >
                          {apt.patient.name}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-600" />
                        <span className="text-sm text-gray-700">{apt.procedure}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Clock size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No hay citas para esta fecha</p>
                    <button
                      onClick={() => setShowNewAppointment(true)}
                      className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Agendar nueva cita
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Haz clic en una fecha para ver las citas</p>
              </div>
            )}
          </div>

          {/* Upcoming Appointments */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold mb-4">Próximas Citas</h3>
            <div className="space-y-3">
              {appointments.slice(0, 4).map((apt) => (
                <div key={apt.id} className="flex items-center gap-3 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {new Date(apt.date).getDate()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {monthNames[new Date(apt.date).getMonth()].slice(0, 3)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{apt.patient.name}</p>
                    <p className="text-gray-600">{apt.time} - {apt.procedure}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Nueva Cita</h2>
              <button onClick={() => setShowNewAppointment(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select className="input">
                    <option>Consulta</option>
                    <option>Sesión</option>
                    <option>Control</option>
                    <option>Evaluación</option>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duración (minutos)</label>
                  <input type="number" className="input" defaultValue={60} min={15} step={15} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select className="input">
                    <option value="pending">Pendiente Confirmación</option>
                    <option value="confirmed">Confirmada</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Procedimiento</label>
                <input type="text" className="input" placeholder="ej: Primera Consulta, Botox Facial..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                <textarea className="input" rows={3} placeholder="Observaciones adicionales..."></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowNewAppointment(false)} className="btn-secondary flex-1">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Agendar Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
