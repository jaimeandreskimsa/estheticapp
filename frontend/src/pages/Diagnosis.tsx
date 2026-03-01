import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Brain, Loader, FileText, Save, Sparkles, Image as ImageIcon, User } from 'lucide-react'

export default function Diagnosis() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [generating, setGenerating] = useState(false)
  const [diagnosis, setDiagnosis] = useState('')
  const [recommendations, setRecommendations] = useState('')

  const consultation = {
    id: '1',
    patient: { id: '1', name: 'María González', rut: '12.345.678-9', age: 42 },
    date: '2024-02-01',
    anamnesis: {
      chiefComplaint: 'Deseo rejuvenecer mi rostro, me veo cansada y envejecida',
      medicalHistory: 'Sin antecedentes médicos relevantes. No alergias conocidas.',
      currentMedications: 'Ninguna',
      previousTreatments: 'Nunca ha realizado procedimientos estéticos',
      expectations: 'Verse más fresca y descansada, sin cambios drásticos'
    },
    physicalExam: {
      skin: 'Piel tipo III, fotoenvejecimiento moderado, textura irregular',
      hydration: 'Deshidratación cutánea moderada',
      wrinkles: 'Líneas de expresión marcadas en región frontal y periocular',
      volume: 'Pérdida de volumen en región malar y temporal',
      elasticity: 'Elasticidad disminuida, ptosis leve en tercio medio facial',
      pigmentation: 'Hiperpigmentación leve en región malar'
    },
    photos: ['front.jpg', 'profile-right.jpg', 'profile-left.jpg', '45-right.jpg', '45-left.jpg']
  }

  const handleGenerateDiagnosis = async () => {
    setGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setDiagnosis(`DIAGNÓSTICO CLÍNICO ESTÉTICO

HALLAZGOS PRINCIPALES:
1. Envejecimiento Facial Cronológico Moderado
   - Paciente de ${consultation.patient.age} años con signos de envejecimiento concordantes con la edad
   - Fotoenvejecimiento tipo III según clasificación de Fitzpatrick

2. Pérdida de Volumen Facial
   - Depleción volumétrica en región malar bilateral
   - Aplanamiento del tercio medio facial
   - Surcos nasogenianos marcados por pérdida de soporte

3. Líneas Dinámicas de Expresión
   - Líneas horizontales frontales profundas en reposo
   - Líneas glabelares verticales (pliegues del entrecejo)
   - Patas de gallo bilaterales grado II

4. Textura y Calidad de Piel
   - Deshidratación cutánea moderada
   - Poros dilatados en zona T
   - Hiperpigmentación leve post-inflamatoria en región malar
   - Elastosis solar leve

5. Signos de Flacidez Incipiente
   - Ptosis leve del tercio medio facial
   - Pérdida de definición del óvalo facial
   - Elasticidad cutánea disminuida`)

      setRecommendations(`RECOMENDACIONES TERAPÉUTICAS

PLAN DE TRATAMIENTO SUGERIDO:

FASE 1 - INMEDIATA (Mes 1-2):
• Toxina Botulínica (Botox/Dysport)
  - Frente: 20-25 unidades
  - Entrecejo: 15-20 unidades  
  - Patas de gallo: 8-12 unidades por lado
  - Objetivo: Suavizar líneas dinámicas y prevenir profundización

• Bioestimulación con Ácido Hialurónico
  - Skinbooster Vital/Profhilo
  - 2 sesiones con intervalo de 4 semanas
  - Objetivo: Hidratación profunda y estimulación de colágeno

FASE 2 - CORTO PLAZO (Mes 2-3):
• Relleno Dérmico con Ácido Hialurónico
  - Región malar: 2-3 ml (Juvederm Voluma/Restylane Lyft)
  - Surcos nasogenianos: 1-2 ml (Juvederm Ultra Plus)
  - Objetivo: Restaurar volumen perdido, lifting no quirúrgico

FASE 3 - MEDIANO PLAZO (Mes 3-6):
• Radiofrecuencia Fraccionada
  - 4 sesiones mensuales
  - Objetivo: Tensado cutáneo, estimulación de colágeno

• Peeling Químico Medio
  - 2-3 sesiones con intervalo de 4-6 semanas
  - Objetivo: Mejorar textura, tono y luminosidad

MANTENIMIENTO:
• Botox: cada 4-6 meses
• Skinboosters: cada 6 meses
• Rellenos: cada 12-18 meses según evolución
• Radiofrecuencia: sesiones de mantenimiento trimestrales

CUIDADOS DOMICILIARIOS:
• Protección solar SPF 50+ diaria
• Rutina de skincare: limpieza, antioxidantes (Vit C), retinoides, hidratación
• Suplementación: colágeno hidrolizado, antioxidantes orales`)

      setGenerating(false)
    }, 3000)
  }

  const handleSave = () => {
    alert('Diagnóstico guardado exitosamente')
  }

  const handleCreatePlan = () => {
    navigate(`/dashboard/plan/${consultation.id}`)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link to="/dashboard/consultas" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft size={20} />
          Volver a Consultas
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Diagnóstico</h1>
            <p className="text-gray-600">Paciente: {consultation.patient.name} - {consultation.patient.age} años</p>
            <p className="text-sm text-gray-500">Consulta: {new Date(consultation.date).toLocaleDateString('es-CL')}</p>
          </div>
        </div>
      </div>

      {/* Patient Summary */}
      <div className="card mb-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {consultation.patient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{consultation.patient.name}</h3>
            <p className="text-gray-600">{consultation.patient.rut} • {consultation.patient.age} años</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Anamnesis */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User size={20} className="text-blue-600" />
            Anamnesis
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Motivo de consulta:</p>
              <p className="text-gray-600">{consultation.anamnesis.chiefComplaint}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Antecedentes médicos:</p>
              <p className="text-gray-600">{consultation.anamnesis.medicalHistory}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Medicación actual:</p>
              <p className="text-gray-600">{consultation.anamnesis.currentMedications}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Tratamientos previos:</p>
              <p className="text-gray-600">{consultation.anamnesis.previousTreatments}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Expectativas:</p>
              <p className="text-gray-600">{consultation.anamnesis.expectations}</p>
            </div>
          </div>
        </div>

        {/* Physical Exam */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText size={20} className="text-green-600" />
            Examen Físico
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Tipo de piel:</p>
              <p className="text-gray-600">{consultation.physicalExam.skin}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Hidratación:</p>
              <p className="text-gray-600">{consultation.physicalExam.hydration}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Arrugas:</p>
              <p className="text-gray-600">{consultation.physicalExam.wrinkles}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Volumen:</p>
              <p className="text-gray-600">{consultation.physicalExam.volume}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Elasticidad:</p>
              <p className="text-gray-600">{consultation.physicalExam.elasticity}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Pigmentación:</p>
              <p className="text-gray-600">{consultation.physicalExam.pigmentation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ImageIcon size={20} className="text-pink-600" />
          Fotografías Clínicas ({consultation.photos.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {consultation.photos.map((photo, idx) => (
            <div key={idx} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageIcon size={32} className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* AI Generation */}
      {!diagnosis && (
        <div className="card mb-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Diagnóstico con Inteligencia Artificial</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Genera un diagnóstico completo y recomendaciones terapéuticas basadas en la anamnesis, 
              examen físico y análisis de fotografías utilizando IA avanzada
            </p>
            <button
              onClick={handleGenerateDiagnosis}
              disabled={generating}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              {generating ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Generando diagnóstico...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generar con IA
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Generated Diagnosis */}
      {diagnosis && (
        <>
          <div className="card mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Brain size={20} className="text-purple-600" />
                Diagnóstico Generado
              </h2>
              <div className="flex items-center gap-2 text-sm text-purple-600">
                <Sparkles size={16} />
                <span>Generado con IA</span>
              </div>
            </div>
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={20}
              className="input font-mono text-sm"
            />
          </div>

          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} className="text-green-600" />
              Recomendaciones Terapéuticas
            </h2>
            <textarea
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              rows={20}
              className="input font-mono text-sm"
            />
          </div>

          <div className="flex gap-3">
            <button onClick={handleSave} className="btn-secondary flex items-center gap-2 flex-1">
              <Save size={18} />
              Guardar Diagnóstico
            </button>
            <button onClick={handleCreatePlan} className="btn-primary flex items-center gap-2 flex-1">
              <FileText size={18} />
              Crear Plan de Tratamiento
            </button>
          </div>
        </>
      )}
    </div>
  )
}
