import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, Download, Send, Check, Edit2, DollarSign } from 'lucide-react'

export default function Budget() {
  const { id } = useParams()
  const [editing, setEditing] = useState(false)
  const [discount, setDiscount] = useState(0)
  
  const [budget, setBudget] = useState({
    id: '1',
    patient: { id: '1', name: 'María González', rut: '12.345.678-9' },
    plan: { id: '1', name: 'Rejuvenecimiento Facial Integral' },
    date: '2024-02-02',
    validUntil: '2024-03-02',
    status: 'pending',
    items: [
      { id: '1', name: 'Botox Facial (100U)', quantity: 1, unitPrice: 350000, total: 350000 },
      { id: '2', name: 'Relleno Labial Juvederm', quantity: 2, unitPrice: 280000, total: 560000 },
      { id: '3', name: 'Radiofrecuencia Facial', quantity: 4, unitPrice: 85000, total: 340000 },
      { id: '4', name: 'Peeling Químico', quantity: 2, unitPrice: 95000, total: 190000 },
    ],
    notes: 'Plan de tratamiento diseñado específicamente para combatir líneas de expresión y mejorar textura de la piel.'
  })

  const subtotal = budget.items.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = subtotal * (discount / 100)
  const total = subtotal - discountAmount

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: 'Nuevo Procedimiento',
      quantity: 1,
      unitPrice: 0,
      total: 0
    }
    setBudget({ ...budget, items: [...budget.items, newItem] })
  }

  const handleRemoveItem = (itemId: string) => {
    setBudget({ ...budget, items: budget.items.filter(item => item.id !== itemId) })
  }

  const handleItemChange = (itemId: string, field: string, value: any) => {
    setBudget({
      ...budget,
      items: budget.items.map(item => {
        if (item.id === itemId) {
          const updated = { ...item, [field]: value }
          if (field === 'quantity' || field === 'unitPrice') {
            updated.total = updated.quantity * updated.unitPrice
          }
          return updated
        }
        return item
      })
    })
  }

  const handleApprove = () => {
    setBudget({ ...budget, status: 'approved' })
    alert('Presupuesto aprobado y enviado al paciente')
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Link to="/dashboard/patients/1" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft size={20} />
          Volver a Paciente
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Presupuesto #{budget.id}</h1>
            <p className="text-gray-600">Paciente: {budget.patient.name} - {budget.patient.rut}</p>
            <p className="text-sm text-gray-500">Válido hasta: {new Date(budget.validUntil).toLocaleDateString('es-CL')}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
            budget.status === 'approved' ? 'bg-green-100 text-green-700' :
            budget.status === 'rejected' ? 'bg-red-100 text-red-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {budget.status === 'approved' ? 'Aprobado' :
             budget.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Budget Items */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Items del Presupuesto</h2>
            <div className="flex gap-2">
              {!editing ? (
                <button onClick={() => setEditing(true)} className="btn-secondary flex items-center gap-2">
                  <Edit2 size={18} />
                  Editar
                </button>
              ) : (
                <button onClick={() => setEditing(false)} className="btn-primary flex items-center gap-2">
                  <Check size={18} />
                  Guardar
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Procedimiento</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Cantidad</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Precio Unit.</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
                  {editing && <th className="text-center py-3 px-4 font-semibold text-gray-700">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {budget.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      {editing ? (
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                          className="input w-full"
                        />
                      ) : (
                        <span className="font-medium text-gray-900">{item.name}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {editing ? (
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value))}
                          className="input w-20 text-center"
                          min="1"
                        />
                      ) : (
                        <span className="text-gray-700">{item.quantity}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {editing ? (
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(item.id, 'unitPrice', parseInt(e.target.value))}
                          className="input w-32 text-right"
                          min="0"
                        />
                      ) : (
                        <span className="text-gray-700">${item.unitPrice.toLocaleString('es-CL')}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-semibold text-gray-900">${item.total.toLocaleString('es-CL')}</span>
                    </td>
                    {editing && (
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editing && (
            <button onClick={handleAddItem} className="mt-4 text-blue-600 hover:text-blue-700 flex items-center gap-2">
              <Plus size={18} />
              Agregar Item
            </button>
          )}
        </div>

        {/* Totals */}
        <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-xl font-semibold text-gray-900">${subtotal.toLocaleString('es-CL')}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-gray-700">Descuento:</span>
                {editing && (
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
                    className="input w-20"
                    min="0"
                    max="100"
                  />
                )}
                <span className="text-gray-600">{discount}%</span>
              </div>
              <span className="text-lg font-medium text-red-600">-${discountAmount.toLocaleString('es-CL')}</span>
            </div>
            <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total:</span>
              <span className="text-3xl font-bold text-blue-600">${total.toLocaleString('es-CL')}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="card">
          <h3 className="font-semibold mb-3">Notas y Observaciones</h3>
          {editing ? (
            <textarea
              value={budget.notes}
              onChange={(e) => setBudget({ ...budget, notes: e.target.value })}
              rows={4}
              className="input"
            />
          ) : (
            <p className="text-gray-700">{budget.notes}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2 flex-1">
            <Download size={18} />
            Descargar PDF
          </button>
          <button className="btn-secondary flex items-center gap-2 flex-1">
            <Send size={18} />
            Enviar por Email
          </button>
          {budget.status === 'pending' && (
            <button onClick={handleApprove} className="btn-primary flex items-center gap-2 flex-1">
              <Check size={18} />
              Aprobar Presupuesto
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
