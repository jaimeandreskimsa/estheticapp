import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, Filter, Search, Download, Calendar as CalendarIcon } from 'lucide-react'

export default function Payments() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const payments = [
    {
      id: '1',
      patient: { id: '1', name: 'María González', rut: '12.345.678-9' },
      type: 'Sesión',
      concept: 'Botox Facial',
      date: '2024-02-15',
      amount: 350000,
      method: 'Tarjeta de Crédito',
      status: 'paid',
      invoice: 'FAC-001'
    },
    {
      id: '2',
      patient: { id: '1', name: 'María González', rut: '12.345.678-9' },
      type: 'Presupuesto',
      concept: 'Plan de Tratamiento Integral',
      date: '2024-02-05',
      amount: 1440000,
      method: 'Transferencia',
      status: 'paid',
      invoice: 'FAC-002'
    },
    {
      id: '3',
      patient: { id: '2', name: 'Ana Martínez', rut: '13.456.789-0' },
      type: 'Sesión',
      concept: 'Relleno Ácido Hialurónico',
      date: '2024-02-20',
      amount: 560000,
      method: 'Efectivo',
      status: 'paid',
      invoice: 'FAC-003'
    },
    {
      id: '4',
      patient: { id: '3', name: 'Carmen Silva', rut: '14.567.890-1' },
      type: 'Consulta',
      concept: 'Primera Consulta',
      date: '2024-02-22',
      amount: 50000,
      method: 'Tarjeta de Débito',
      status: 'pending',
      invoice: null
    },
    {
      id: '5',
      patient: { id: '4', name: 'Pedro Ramírez', rut: '15.678.901-2' },
      type: 'Presupuesto',
      concept: 'Plan Anti-Envejecimiento',
      date: '2024-02-25',
      amount: 980000,
      method: 'Transferencia',
      status: 'overdue',
      invoice: null
    },
    {
      id: '6',
      patient: { id: '5', name: 'Laura Torres', rut: '16.789.012-3' },
      type: 'Sesión',
      concept: 'Peeling Químico',
      date: '2024-02-28',
      amount: 190000,
      method: 'Tarjeta de Crédito',
      status: 'pending',
      invoice: null
    }
  ]

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.patient.rut.includes(searchQuery) ||
      payment.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.invoice && payment.invoice.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus
    const matchesType = filterType === 'all' || payment.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0)
  const totalRevenue = totalPaid

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pagos y Caja</h1>
          <p className="text-gray-600">Gestión de pagos y facturación</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download size={20} />
          Exportar Reporte
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Ingresos</p>
              <p className="text-2xl font-bold text-green-900">${totalRevenue.toLocaleString('es-CL')}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Pagados</p>
              <p className="text-2xl font-bold text-blue-900">${totalPaid.toLocaleString('es-CL')}</p>
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
              <p className="text-2xl font-bold text-orange-900">${totalPending.toLocaleString('es-CL')}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-red-700 font-medium">Vencidos</p>
              <p className="text-2xl font-bold text-red-900">${totalOverdue.toLocaleString('es-CL')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por paciente, concepto o factura..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="all">Todos los estados</option>
                <option value="paid">Pagados</option>
                <option value="pending">Pendientes</option>
                <option value="overdue">Vencidos</option>
              </select>
            </div>
          </div>

          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="all">Todos los tipos</option>
              <option value="Consulta">Consultas</option>
              <option value="Sesión">Sesiones</option>
              <option value="Presupuesto">Presupuestos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Fecha</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Paciente</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Concepto</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Tipo</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Método</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">Monto</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Estado</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Factura</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CalendarIcon size={16} className="text-gray-400" />
                      {new Date(payment.date).toLocaleDateString('es-CL')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Link 
                      to={`/dashboard/patients/${payment.patient.id}`}
                      className="hover:text-blue-600"
                    >
                      <p className="font-semibold text-gray-900">{payment.patient.name}</p>
                      <p className="text-sm text-gray-500">{payment.patient.rut}</p>
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{payment.concept}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      payment.type === 'Consulta' ? 'bg-purple-100 text-purple-700' :
                      payment.type === 'Sesión' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {payment.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{payment.method}</td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-bold text-gray-900">${payment.amount.toLocaleString('es-CL')}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'paid' ? 'bg-green-100 text-green-700' :
                      payment.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {payment.status === 'paid' ? (
                        <>
                          <CheckCircle size={14} />
                          Pagado
                        </>
                      ) : payment.status === 'pending' ? (
                        <>
                          <Clock size={14} />
                          Pendiente
                        </>
                      ) : (
                        <>
                          <XCircle size={14} />
                          Vencido
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {payment.invoice ? (
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                        <Download size={14} />
                        {payment.invoice}
                      </button>
                    ) : (
                      <button className="text-gray-400 text-sm">Sin factura</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <DollarSign size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No se encontraron pagos</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Métodos de Pago</h3>
          <div className="space-y-2">
            {['Tarjeta de Crédito', 'Transferencia', 'Efectivo', 'Tarjeta de Débito'].map((method) => {
              const count = payments.filter(p => p.method === method && p.status === 'paid').length
              const total = payments.filter(p => p.method === method && p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
              return (
                <div key={method} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{method}</span>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">${total.toLocaleString('es-CL')}</span>
                    <span className="text-gray-400 ml-2">({count})</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Por Tipo de Servicio</h3>
          <div className="space-y-2">
            {['Consulta', 'Sesión', 'Presupuesto'].map((type) => {
              const count = payments.filter(p => p.type === type && p.status === 'paid').length
              const total = payments.filter(p => p.type === type && p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
              return (
                <div key={type} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{type}</span>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">${total.toLocaleString('es-CL')}</span>
                    <span className="text-gray-400 ml-2">({count})</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
          <h3 className="font-semibold text-gray-900 mb-3">Resumen del Mes</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Ingresos</span>
              <span className="text-lg font-bold text-green-600">${totalRevenue.toLocaleString('es-CL')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Por Cobrar</span>
              <span className="text-lg font-bold text-orange-600">${totalPending.toLocaleString('es-CL')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Vencidos</span>
              <span className="text-lg font-bold text-red-600">${totalOverdue.toLocaleString('es-CL')}</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Total Esperado</span>
                <span className="text-xl font-bold text-blue-900">
                  ${(totalRevenue + totalPending + totalOverdue).toLocaleString('es-CL')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
