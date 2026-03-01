import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, Save, Calendar, FileText, DollarSign, CheckCircle } from 'lucide-react'

export default function TreatmentPlan() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(true)

  const [plan, setPlan] = useState({
    id: '1',
    patient: { id: '1', name: 'María González', rut: '12.345.678-9' },
    diagnosis: 'Envejecimiento facial moderado, pérdida de volumen en región malar, líneas de expresión en región frontal y periocular',
    objectives: [
      'Restaurar volumen facial perdido',
      'Suavizar líneas de expresión',
      'Mejorar textura y luminosidad de la piel',
      'Prevenir envejecimiento futuro'
    ],
    procedures: [
      {
        id: '1',
        name: 'Botox Facial',
        area: 'Frente y entrecejo',
        sessions: 1,
        interval: '4-6 meses',
        estimatedCost: 350000,
        priority: 'high'
      },
      {
        id: '2',
        name: 'Relleno con Ácido Hialurónico',
        area: 'Pómulos y surcos nasogenianos',
        sessions: 2,
        interval: '12-18 meses',
        estimatedCost: 560000,
        priority: 'high'
      },
      {
        id: '3',
        name: 'Radiofrecuencia Facial',
        area: 'Rostro completo',
        sessions: 4,
        interval: 'Semanal',
        estimatedCost: 340000,
        priority: 'medium'
      },
      {
        id: '4',
        name: 'Peeling Químico',
        area: 'Rostro completo',
        sessions: 2,
        interval: 'Mensual',
        estimatedCost: 190000,
        priority: 'medium'
      }
    ],
    duration: '6 meses',
    totalEstimatedCost: 1440000,
    notes: 'Plan progresivo con revisión cada 2 meses para evaluar resultados y ajustar según respuesta del paciente.',
    createdAt: '2024-02-02'
  })

  const handleAddProcedure = () => {
    const newProcedure = {
      id: Date.now().toString(),
      name: '',
      area: '',
      sessions: 1,
      interval: '',
      estimatedCost: 0,
      priority: 'medium'
    }
    setPlan({ ...plan, procedures: [...plan.procedures, newProcedure] })
  }

  const handleRemoveProcedure = (procedureId: string) => {
    setPlan({ ...plan, procedures: plan.procedures.filter(p => p.id !== procedureId) })
  }

  const handleProcedureChange = (procedureId: string, field: string, value: any) => {
    setPlan({
      ...plan,
      procedures: plan.procedures.map(p => 
        p.id === procedureId ? { ...p, [field]: value } : p
      )
    })
  }

  const handleAddObjective = () => {
    setPlan({ ...plan, objectives: [...plan.objectives, ''] })
  }

  const handleRemoveObjective = (index: number) => {
    setPlan({ ...plan, objectives: plan.objectives.filter((_, i) => i !== index) })
  }

  const handleObjectiveChange = (index: number, value: string) => {
    setPlan({
      ...plan,
      objectives: plan.objectives.map((obj, i) => i === index ? value : obj)
    })
  }

  const handleGenerateBudget = () => {
    alert('Generando presupuesto automático...')
    navigate(`/dashboard/presupuesto/${plan.id}`)
  }

  const totalCost = plan.procedures.reduce((sum, p) => sum + p.estimatedCost, 0)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link to="/dashboard/patients/1" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft size={20} />
          Volver a Paciente
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Plan de Tratamiento</h1>
            <p className="text-gray-600">Paciente: {plan.patient.name} - {plan.patient.rut}</p>
            <p className="text-sm text-gray-500">Creado: {new Date(plan.createdAt).toLocaleDateString('es-CL')}</p>
          </div>
          {editing ? (
            <button onClick={() => setEditing(false)} className="btn-primary flex items-center gap-2">
              <Save size={18} />
              Guardar Plan
            </button>
          ) : (
            <button onClick={() => setEditing(true)} className="btn-secondary">
              Editar
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        {/* Diagnosis */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            Diagnóstico
          </h2>
          {editing ? (
            <textarea
              value={plan.diagnosis}
              onChange={(e) => setPlan({ ...plan, diagnosis: e.target.value })}
              rows={3}
              className="input"
              placeholder="Descripción del diagnóstico..."
            />
          ) : (
            <p className="text-gray-700">{plan.diagnosis}</p>
          )}
        </div>

        {/* Objectives */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              Objetivos del Tratamiento
            </h2>
            {editing && (
              <button onClick={handleAddObjective} className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm">
                <Plus size={16} />
                Agregar
              </button>
            )}
          </div>
          <ul className="space-y-3">
            {plan.objectives.map((objective, index) => (
              <li key={index} className="flex items-center gap-3">
                {editing ? (
                  <>
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => handleObjectiveChange(index, e.target.value)}
                      className="input flex-1"
                      placeholder="Objetivo del tratamiento..."
                    />
                    <button onClick={() => handleRemoveObjective(index)} className="text-red-600 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">{objective}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Procedures */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Procedimientos Propuestos</h2>
            {editing && (
              <button onClick={handleAddProcedure} className="btn-secondary flex items-center gap-2">
                <Plus size={18} />
                Agregar Procedimiento
              </button>
            )}
          </div>

          <div className="space-y-4">
            {plan.procedures.map((procedure) => (
              <div key={procedure.id} className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Procedimiento</label>
                    {editing ? (
                      <input
                        type="text"
                        value={procedure.name}
                        onChange={(e) => handleProcedureChange(procedure.id, 'name', e.target.value)}
                        className="input"
                        placeholder="Nombre del procedimiento"
                      />
                    ) : (
                      <p className="text-gray-900 font-semibold">{procedure.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Área</label>
                    {editing ? (
                      <input
                        type="text"
                        value={procedure.area}
                        onChange={(e) => handleProcedureChange(procedure.id, 'area', e.target.value)}
                        className="input"
                        placeholder="Área de aplicación"
                      />
                    ) : (
                      <p className="text-gray-700">{procedure.area}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sesiones</label>
                    {editing ? (
                      <input
                        type="number"
                        value={procedure.sessions}
                        onChange={(e) => handleProcedureChange(procedure.id, 'sessions', parseInt(e.target.value))}
                        className="input"
                        min="1"
                      />
                    ) : (
                      <p className="text-gray-700">{procedure.sessions}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Intervalo</label>
                    {editing ? (
                      <input
                        type="text"
                        value={procedure.interval}
                        onChange={(e) => handleProcedureChange(procedure.id, 'interval', e.target.value)}
                        className="input"
                        placeholder="ej: Semanal, Mensual"
                      />
                    ) : (
                      <p className="text-gray-700">{procedure.interval}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Costo Estimado</label>
                    {editing ? (
                      <input
                        type="number"
                        value={procedure.estimatedCost}
                        onChange={(e) => handleProcedureChange(procedure.id, 'estimatedCost', parseInt(e.target.value))}
                        className="input"
                        min="0"
                      />
                    ) : (
                      <p className="text-gray-900 font-semibold">${procedure.estimatedCost.toLocaleString('es-CL')}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                    {editing ? (
                      <select
                        value={procedure.priority}
                        onChange={(e) => handleProcedureChange(procedure.id, 'priority', e.target.value)}
                        className="input"
                      >
                        <option value="high">Alta</option>
                        <option value="medium">Media</option>
                        <option value="low">Baja</option>
                      </select>
                    ) : (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        procedure.priority === 'high' ? 'bg-red-100 text-red-700' :
                        procedure.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {procedure.priority === 'high' ? 'Alta' : procedure.priority === 'medium' ? 'Media' : 'Baja'}
                      </span>
                    )}
                  </div>
                </div>
                {editing && (
                  <button
                    onClick={() => handleRemoveProcedure(procedure.id)}
                    className="mt-3 text-red-600 hover:text-red-700 flex items-center gap-2 text-sm"
                  >
                    <Trash2 size={16} />
                    Eliminar procedimiento
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">Duración Total</p>
                {editing ? (
                  <input
                    type="text"
                    value={plan.duration}
                    onChange={(e) => setPlan({ ...plan, duration: e.target.value })}
                    className="input mt-1"
                  />
                ) : (
                  <p className="text-2xl font-bold text-blue-900">{plan.duration}</p>
                )}
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <DollarSign size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-green-700 font-medium">Costo Total Estimado</p>
                <p className="text-2xl font-bold text-green-900">${totalCost.toLocaleString('es-CL')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="card">
          <h3 className="font-semibold mb-3">Notas y Recomendaciones</h3>
          {editing ? (
            <textarea
              value={plan.notes}
              onChange={(e) => setPlan({ ...plan, notes: e.target.value })}
              rows={4}
              className="input"
              placeholder="Notas adicionales, contraindicaciones, cuidados post-tratamiento..."
            />
          ) : (
            <p className="text-gray-700">{plan.notes}</p>
          )}
        </div>

        {/* Actions */}
        {!editing && (
          <div className="flex gap-3">
            <button className="btn-secondary flex items-center gap-2 flex-1">
              <FileText size={18} />
              Descargar PDF
            </button>
            <button onClick={handleGenerateBudget} className="btn-primary flex items-center gap-2 flex-1">
              <DollarSign size={18} />
              Generar Presupuesto
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
