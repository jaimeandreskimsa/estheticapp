import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, FileText, Camera, Mic, Save, ChevronRight, CheckCircle, Edit3 } from 'lucide-react'
import ImageEditor from '../components/ImageEditor'

export default function NewConsulta() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [recording, setRecording] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const [currentPhotoType, setCurrentPhotoType] = useState('')
  const [photos, setPhotos] = useState<{ [key: string]: { image: string; annotations: any[] } }>({})

  const [consultaData, setConsultaData] = useState({
    // Patient Selection
    patientId: '',
    patientName: '',
    
    // Anamnesis
    chiefComplaint: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: '',
    previousTreatments: '',
    contraindications: '',
    expectations: '',
    
    // Physical Exam
    skinType: '',
    hydration: '',
    wrinkles: '',
    volumeLoss: '',
    elasticity: '',
    pigmentation: '',
    vascularization: '',
    skinTexture: '',
    
    // Photos
    photos: [],
    
    // Notes
    additionalNotes: ''
  })

  const patients = [
    { id: '1', name: 'María González', rut: '12.345.678-9' },
    { id: '2', name: 'Ana Martínez', rut: '13.456.789-0' },
    { id: '3', name: 'Carmen Silva', rut: '14.567.890-1' }
  ]

  const handlePatientSelect = (patient: any) => {
    setConsultaData({ 
      ...consultaData, 
      patientId: patient.id,
      patientName: patient.name 
    })
    setStep(2)
  }

  const handleVoiceRecording = () => {
    setRecording(!recording)
    // Simulate voice recording with Whisper API
    if (!recording) {
      setTimeout(() => {
        setConsultaData({
          ...consultaData,
          chiefComplaint: 'Deseo rejuvenecer mi rostro, me veo cansada y envejecida. Tengo líneas de expresión marcadas en la frente y alrededor de los ojos que me preocupan.'
        })
        setRecording(false)
      }, 3000)
    }
  }

  const handleSave = () => {
    alert('Consulta guardada exitosamente')
    navigate(`/dashboard/diagnostico/1`)
  }

  const handleOpenEditor = (photoType: string) => {
    setCurrentPhotoType(photoType)
    setEditorOpen(true)
  }

  const handleSavePhoto = (imageData: string, annotations: any[]) => {
    setPhotos({
      ...photos,
      [currentPhotoType]: { image: imageData, annotations }
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/dashboard/consultas" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft size={20} />
          Volver a Consultas
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nueva Consulta</h1>
        <p className="text-gray-600">Registro de consulta médica estética</p>
      </div>

      {/* Progress Steps */}
      <div className="card mb-6">
        <div className="flex justify-between items-center">
          <div className={`flex items-center gap-3 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              {step > 1 ? <CheckCircle size={20} /> : '1'}
            </div>
            <span className="font-medium hidden sm:inline">Paciente</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-2">
            <div className={`h-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ width: step >= 2 ? '100%' : '0%' }}></div>
          </div>
          
          <div className={`flex items-center gap-3 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              {step > 2 ? <CheckCircle size={20} /> : '2'}
            </div>
            <span className="font-medium hidden sm:inline">Anamnesis</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-2">
            <div className={`h-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ width: step >= 3 ? '100%' : '0%' }}></div>
          </div>
          
          <div className={`flex items-center gap-3 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              {step > 3 ? <CheckCircle size={20} /> : '3'}
            </div>
            <span className="font-medium hidden sm:inline">Examen</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-2">
            <div className={`h-full ${step >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ width: step >= 4 ? '100%' : '0%' }}></div>
          </div>
          
          <div className={`flex items-center gap-3 ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              {step > 4 ? <CheckCircle size={20} /> : '4'}
            </div>
            <span className="font-medium hidden sm:inline">Fotos</span>
          </div>
        </div>
      </div>

      {/* Step 1: Patient Selection */}
      {step === 1 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User size={20} className="text-blue-600" />
            Seleccionar Paciente
          </h2>
          <div className="space-y-3">
            {patients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => handlePatientSelect(patient)}
                className="w-full p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg flex items-center justify-between transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.rut}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Anamnesis */}
      {step === 2 && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Anamnesis
            </h2>
            <div className="text-sm text-gray-600">
              Paciente: <span className="font-semibold">{consultaData.patientName}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Motivo de consulta</label>
                <button
                  onClick={handleVoiceRecording}
                  className={`flex items-center gap-2 text-sm ${recording ? 'text-red-600' : 'text-blue-600'} hover:opacity-80`}
                >
                  <Mic size={16} className={recording ? 'animate-pulse' : ''} />
                  {recording ? 'Grabando...' : 'Dictar'}
                </button>
              </div>
              <textarea
                value={consultaData.chiefComplaint}
                onChange={(e) => setConsultaData({ ...consultaData, chiefComplaint: e.target.value })}
                rows={3}
                className="input"
                placeholder="¿Qué motiva la consulta del paciente?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Antecedentes médicos</label>
              <textarea
                value={consultaData.medicalHistory}
                onChange={(e) => setConsultaData({ ...consultaData, medicalHistory: e.target.value })}
                rows={2}
                className="input"
                placeholder="Enfermedades previas, cirugías, condiciones crónicas..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alergias</label>
                <input
                  type="text"
                  value={consultaData.allergies}
                  onChange={(e) => setConsultaData({ ...consultaData, allergies: e.target.value })}
                  className="input"
                  placeholder="Medicamentos, anestésicos, otros..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medicación actual</label>
                <input
                  type="text"
                  value={consultaData.currentMedications}
                  onChange={(e) => setConsultaData({ ...consultaData, currentMedications: e.target.value })}
                  className="input"
                  placeholder="Lista de medicamentos que toma..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tratamientos estéticos previos</label>
              <textarea
                value={consultaData.previousTreatments}
                onChange={(e) => setConsultaData({ ...consultaData, previousTreatments: e.target.value })}
                rows={2}
                className="input"
                placeholder="Botox, rellenos, láseres, otros procedimientos..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraindicaciones</label>
              <input
                type="text"
                value={consultaData.contraindications}
                onChange={(e) => setConsultaData({ ...consultaData, contraindications: e.target.value })}
                className="input"
                placeholder="Embarazo, lactancia, infecciones activas..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expectativas del paciente</label>
              <textarea
                value={consultaData.expectations}
                onChange={(e) => setConsultaData({ ...consultaData, expectations: e.target.value })}
                rows={2}
                className="input"
                placeholder="¿Qué espera lograr el paciente con el tratamiento?"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(1)} className="btn-secondary flex-1">
              Anterior
            </button>
            <button onClick={() => setStep(3)} className="btn-primary flex-1">
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Physical Exam */}
      {step === 3 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FileText size={20} className="text-green-600" />
            Examen Físico Facial
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de piel</label>
              <select
                value={consultaData.skinType}
                onChange={(e) => setConsultaData({ ...consultaData, skinType: e.target.value })}
                className="input"
              >
                <option value="">Seleccionar...</option>
                <option value="I">Tipo I - Muy clara</option>
                <option value="II">Tipo II - Clara</option>
                <option value="III">Tipo III - Intermedia</option>
                <option value="IV">Tipo IV - Oliva</option>
                <option value="V">Tipo V - Morena</option>
                <option value="VI">Tipo VI - Oscura</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hidratación</label>
              <select
                value={consultaData.hydration}
                onChange={(e) => setConsultaData({ ...consultaData, hydration: e.target.value })}
                className="input"
              >
                <option value="">Seleccionar...</option>
                <option value="normal">Normal</option>
                <option value="leve">Deshidratación leve</option>
                <option value="moderada">Deshidratación moderada</option>
                <option value="severa">Deshidratación severa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Arrugas y líneas de expresión</label>
              <textarea
                value={consultaData.wrinkles}
                onChange={(e) => setConsultaData({ ...consultaData, wrinkles: e.target.value })}
                rows={2}
                className="input"
                placeholder="Ubicación, profundidad, tipo..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pérdida de volumen</label>
              <textarea
                value={consultaData.volumeLoss}
                onChange={(e) => setConsultaData({ ...consultaData, volumeLoss: e.target.value })}
                rows={2}
                className="input"
                placeholder="Región malar, temporal, mandibular..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Elasticidad</label>
              <select
                value={consultaData.elasticity}
                onChange={(e) => setConsultaData({ ...consultaData, elasticity: e.target.value })}
                className="input"
              >
                <option value="">Seleccionar...</option>
                <option value="excelente">Excelente</option>
                <option value="buena">Buena</option>
                <option value="regular">Regular - Ptosis leve</option>
                <option value="mala">Mala - Ptosis moderada/severa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pigmentación</label>
              <input
                type="text"
                value={consultaData.pigmentation}
                onChange={(e) => setConsultaData({ ...consultaData, pigmentation: e.target.value })}
                className="input"
                placeholder="Manchas, hiperpigmentación, melasma..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vascularización</label>
              <input
                type="text"
                value={consultaData.vascularization}
                onChange={(e) => setConsultaData({ ...consultaData, vascularization: e.target.value })}
                className="input"
                placeholder="Rojeces, telangiectasias, rosácea..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Textura de la piel</label>
              <input
                type="text"
                value={consultaData.skinTexture}
                onChange={(e) => setConsultaData({ ...consultaData, skinTexture: e.target.value })}
                className="input"
                placeholder="Poros, irregularidades, cicatrices..."
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(2)} className="btn-secondary flex-1">
              Anterior
            </button>
            <button onClick={() => setStep(4)} className="btn-primary flex-1">
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Photos & Final */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Camera size={20} className="text-pink-600" />
              Fotografías Clínicas
              <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full border border-purple-300">
                Editor v2.2
              </span>
            </h2>
            <p className="text-sm text-gray-600 mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              📸 <strong>Instrucciones:</strong> Capture o suba fotografías estandarizadas. Luego use el editor profesional para marcar áreas de interés, añadir notas y señalar zonas de tratamiento.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {['Frontal', 'Perfil Derecho', 'Perfil Izquierdo', '45° Derecha', '45° Izquierda', 'Detalles'].map((label, idx) => (
                <div key={idx} className="relative group">
                  {photos[label] ? (
                    <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-green-500 bg-gray-100">
                      <img 
                        src={photos[label].image} 
                        alt={label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                        <button
                          onClick={() => handleOpenEditor(label)}
                          className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-lg transform scale-95 group-hover:scale-100 transition"
                        >
                          <Edit3 size={18} />
                          Editar
                        </button>
                      </div>
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        ✓ Capturada
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenEditor(label)}
                      className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-500 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition group"
                    >
                      <Camera size={32} className="text-blue-400 group-hover:text-blue-600 mb-2 transition" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">{label}</span>
                      <span className="text-xs text-gray-500 mt-1">Click para capturar</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-4">
              <h4 className="font-semibold text-pink-900 mb-2 flex items-center gap-2">
                <Edit3 size={18} />
                Editor Profesional de Imágenes
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Marcar zonas de tratamiento con círculos</li>
                <li>✓ Señalar áreas con flechas y líneas</li>
                <li>✓ Agregar notas y observaciones</li>
                <li>✓ Zoom, rotación y ajustes de imagen</li>
                <li>✓ Herramientas de color personalizables</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">Notas adicionales</h3>
            <textarea
              value={consultaData.additionalNotes}
              onChange={(e) => setConsultaData({ ...consultaData, additionalNotes: e.target.value })}
              rows={4}
              className="input"
              placeholder="Observaciones adicionales, impresiones clínicas..."
            />
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="btn-secondary flex-1">
              Anterior
            </button>
            <button onClick={handleSave} className="btn-primary flex items-center justify-center gap-2 flex-1">
              <Save size={18} />
              Guardar y Generar Diagnóstico
            </button>
          </div>
        </div>
      )}

      {/* Image Editor Modal */}
      <ImageEditor
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={handleSavePhoto}
        photoType={currentPhotoType}
        initialImage={photos[currentPhotoType]?.image}
      />
    </div>
  )
}
