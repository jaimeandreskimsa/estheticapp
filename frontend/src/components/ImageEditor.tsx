import { useState, useRef, useEffect } from 'react'
import { 
  X, ZoomIn, ZoomOut, RotateCw, Move, Type, Circle, 
  ArrowRight, Minus, Download, Trash2, Upload, Camera,
  Undo, Redo, Save, Square, Pen, Eraser, Ruler, 
  Eye, EyeOff, Layers, Sun, Contrast, Droplet, Grid3x3,
  Copy, Scissors, RefreshCw, AlignCenter
} from 'lucide-react'

interface Annotation {
  id: string
  type: 'circle' | 'arrow' | 'line' | 'text' | 'rect' | 'freehand' | 'measurement' | 'numbered'
  x: number
  y: number
  x2?: number
  y2?: number
  points?: { x: number; y: number }[]
  text?: string
  number?: number
  color: string
  size: number
  visible?: boolean
}

interface ImageEditorProps {
  isOpen: boolean
  onClose: () => void
  onSave: (imageData: string, annotations: Annotation[]) => void
  photoType: string
  initialImage?: string
}

export default function ImageEditor({ isOpen, onClose, onSave, photoType, initialImage }: ImageEditorProps) {
  const [image, setImage] = useState<string | null>(initialImage || null)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [history, setHistory] = useState<Annotation[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [activeTool, setActiveTool] = useState<'select' | 'circle' | 'arrow' | 'line' | 'text' | 'rect' | 'freehand' | 'measurement' | 'numbered' | null>('select')
  const [activeColor, setActiveColor] = useState('#EF4444')
  const [activePenSize, setActivePenSize] = useState(3)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null)
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([])
  const [showTextInput, setShowTextInput] = useState(false)
  const [textPosition, setTextPosition] = useState<{ x: number; y: number } | null>(null)
  const [textValue, setTextValue] = useState('')
  const [numberCounter, setNumberCounter] = useState(1)
  
  // Image adjustments
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [showGrid, setShowGrid] = useState(false)
  const [showRulers, setShowRulers] = useState(false)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([])
  const [selectedCameraId, setSelectedCameraId] = useState('')
  const [cameraError, setCameraError] = useState('')
  const [cameraLoading, setCameraLoading] = useState(false)

  const colors = [
    { name: 'Rojo', value: '#EF4444' },
    { name: 'Azul', value: '#3B82F6' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Amarillo', value: '#F59E0B' },
    { name: 'Morado', value: '#8B5CF6' },
    { name: 'Negro', value: '#000000' },
    { name: 'Blanco', value: '#FFFFFF' },
  ]

  useEffect(() => {
    if (image) {
      drawCanvas()
    }
  }, [image, annotations, zoom, rotation, brightness, contrast, saturation, showGrid, showRulers])

  useEffect(() => {
    if (!showCamera || !stream || !videoRef.current) return

    const videoElement = videoRef.current
    let pollId: number | null = null
    const readyTimeout = window.setTimeout(() => {
      if (videoElement.readyState >= 2 || videoElement.videoWidth > 0) {
        setVideoReady(true)
      } else {
        setCameraError('La cámara no entregó video. Prueba cambiar de dispositivo.')
      }
    }, 1800)

    videoElement.srcObject = stream
    videoElement.onloadedmetadata = async () => {
      try {
        await videoElement.play()
      } catch (error) {
        console.error('No se pudo iniciar reproducción de cámara:', error)
        setCameraError('No se pudo iniciar la reproducción de la cámara.')
      }
    }

    videoElement.onloadeddata = () => {
      setVideoReady(true)
    }

    videoElement.oncanplay = () => {
      setVideoReady(true)
    }

    pollId = window.setInterval(() => {
      if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
        setVideoReady(true)
        if (pollId) {
          window.clearInterval(pollId)
          pollId = null
        }
      }
    }, 250)

    return () => {
      window.clearTimeout(readyTimeout)
      if (pollId) {
        window.clearInterval(pollId)
      }
      videoElement.onloadedmetadata = null
      videoElement.onloadeddata = null
      videoElement.oncanplay = null
      if (!showCamera) {
        videoElement.srcObject = null
      }
    }
  }, [showCamera, stream])

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas || !image) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.src = image
    img.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Save context state
      ctx.save()
      
      // Apply transformations
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.scale(zoom / 100, zoom / 100)
      ctx.translate(-canvas.width / 2, -canvas.height / 2)
      
      // Apply image filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
      
      // Draw image
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
      const x = (canvas.width - img.width * scale) / 2
      const y = (canvas.height - img.height * scale) / 2
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
      
      // Reset filter
      ctx.filter = 'none'
      
      // Restore context
      ctx.restore()
      
      // Draw grid
      if (showGrid) {
        drawGridLines(ctx, canvas.width, canvas.height)
      }
      
      // Draw rulers
      if (showRulers) {
        drawRulers(ctx, canvas.width, canvas.height)
      }
      
      // Draw annotations
      annotations.forEach(annotation => {
        if (annotation.visible !== false) {
          ctx.strokeStyle = annotation.color
          ctx.fillStyle = annotation.color
          ctx.lineWidth = annotation.size
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          
          switch (annotation.type) {
            case 'circle':
              ctx.beginPath()
              ctx.arc(annotation.x, annotation.y, 20, 0, 2 * Math.PI)
              ctx.stroke()
              break
              
            case 'rect':
              if (annotation.x2 && annotation.y2) {
                const width = annotation.x2 - annotation.x
                const height = annotation.y2 - annotation.y
                ctx.strokeRect(annotation.x, annotation.y, width, height)
              }
              break
              
            case 'arrow':
              if (annotation.x2 && annotation.y2) {
                drawArrow(ctx, annotation.x, annotation.y, annotation.x2, annotation.y2)
              }
              break
              
            case 'line':
              if (annotation.x2 && annotation.y2) {
                ctx.beginPath()
                ctx.moveTo(annotation.x, annotation.y)
                ctx.lineTo(annotation.x2, annotation.y2)
                ctx.stroke()
              }
              break
              
            case 'freehand':
              if (annotation.points && annotation.points.length > 1) {
                ctx.beginPath()
                ctx.moveTo(annotation.points[0].x, annotation.points[0].y)
                for (let i = 1; i < annotation.points.length; i++) {
                  ctx.lineTo(annotation.points[i].x, annotation.points[i].y)
                }
                ctx.stroke()
              }
              break
              
            case 'measurement':
              if (annotation.x2 && annotation.y2) {
                // Draw line
                ctx.beginPath()
                ctx.moveTo(annotation.x, annotation.y)
                ctx.lineTo(annotation.x2, annotation.y2)
                ctx.stroke()
                
                // Draw endpoints
                ctx.beginPath()
                ctx.arc(annotation.x, annotation.y, 5, 0, 2 * Math.PI)
                ctx.arc(annotation.x2, annotation.y2, 5, 0, 2 * Math.PI)
                ctx.fill()
                
                // Calculate and show distance
                const distance = Math.sqrt(
                  Math.pow(annotation.x2 - annotation.x, 2) + 
                  Math.pow(annotation.y2 - annotation.y, 2)
                )
                const midX = (annotation.x + annotation.x2) / 2
                const midY = (annotation.y + annotation.y2) / 2
                
                ctx.font = 'bold 14px Arial'
                ctx.fillStyle = 'white'
                ctx.strokeStyle = 'black'
                ctx.lineWidth = 3
                const text = `${distance.toFixed(0)}px`
                ctx.strokeText(text, midX, midY - 10)
                ctx.fillText(text, midX, midY - 10)
              }
              break
              
            case 'numbered':
              // Draw circle
              ctx.beginPath()
              ctx.arc(annotation.x, annotation.y, 15, 0, 2 * Math.PI)
              ctx.fill()
              
              // Draw number
              ctx.font = 'bold 16px Arial'
              ctx.fillStyle = 'white'
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.fillText(annotation.number?.toString() || '?', annotation.x, annotation.y)
              ctx.textAlign = 'start'
              ctx.textBaseline = 'alphabetic'
              break
              
            case 'text':
              ctx.font = `bold ${annotation.size * 6}px Arial`
              // Add background to text
              const textMetrics = ctx.measureText(annotation.text || '')
              ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
              ctx.fillRect(
                annotation.x - 4, 
                annotation.y - annotation.size * 6, 
                textMetrics.width + 8, 
                annotation.size * 7
              )
              ctx.fillStyle = annotation.color
              ctx.fillText(annotation.text || '', annotation.x, annotation.y)
              break
          }
        }
      })
    }
  }

  const drawGridLines = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 1
    const gridSize = 50
    
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
  }

  const drawRulers = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, width, 20)
    ctx.fillRect(0, 0, 20, height)
    
    ctx.strokeStyle = 'white'
    ctx.fillStyle = 'white'
    ctx.font = '10px Arial'
    ctx.lineWidth = 1
    
    // Top ruler
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 15)
      ctx.lineTo(x, 20)
      ctx.stroke()
      if (x > 0) {
        ctx.fillText(x.toString(), x + 2, 12)
      }
    }
    
    // Left ruler
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(15, y)
      ctx.lineTo(20, y)
      ctx.stroke()
      if (y > 0) {
        ctx.save()
        ctx.translate(10, y - 2)
        ctx.rotate(-Math.PI / 2)
        ctx.fillText(y.toString(), 0, 0)
        ctx.restore()
      }
    }
  }

  const drawArrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    const headLength = 15
    const angle = Math.atan2(y2 - y1, x2 - x1)
    
    // Draw line
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    
    // Draw arrow head
    ctx.beginPath()
    ctx.moveTo(x2, y2)
    ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), y2 - headLength * Math.sin(angle - Math.PI / 6))
    ctx.moveTo(x2, y2)
    ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), y2 - headLength * Math.sin(angle + Math.PI / 6))
    ctx.stroke()
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!activeTool || activeTool === 'select') return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (activeTool === 'text') {
      setTextPosition({ x, y })
      setShowTextInput(true)
      return
    }
    
    if (activeTool === 'circle') {
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        type: 'circle',
        x,
        y,
        color: activeColor,
        size: activePenSize,
        visible: true
      }
      addAnnotation(newAnnotation)
      return
    }
    
    if (activeTool === 'numbered') {
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        type: 'numbered',
        x,
        y,
        number: numberCounter,
        color: activeColor,
        size: activePenSize,
        visible: true
      }
      addAnnotation(newAnnotation)
      setNumberCounter(numberCounter + 1)
      return
    }
    
    // For arrow, line, rect, and measurement - start drawing
    if (!isDrawing) {
      setIsDrawing(true)
      setDrawStart({ x, y })
    } else {
      if (drawStart && (activeTool === 'arrow' || activeTool === 'line' || activeTool === 'rect' || activeTool === 'measurement')) {
        const newAnnotation: Annotation = {
          id: Date.now().toString(),
          type: activeTool,
          x: drawStart.x,
          y: drawStart.y,
          x2: x,
          y2: y,
          color: activeColor,
          size: activePenSize,
          visible: true
        }
        addAnnotation(newAnnotation)
        setIsDrawing(false)
        setDrawStart(null)
      }
    }
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'freehand') return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setIsDrawing(true)
    setCurrentPath([{ x, y }])
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activeTool !== 'freehand') return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setCurrentPath([...currentPath, { x, y }])
    
    // Draw temporary path
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    if (currentPath.length > 0) {
      ctx.strokeStyle = activeColor
      ctx.lineWidth = activePenSize
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(currentPath[currentPath.length - 1].x, currentPath[currentPath.length - 1].y)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const handleCanvasMouseUp = () => {
    if (activeTool === 'freehand' && isDrawing && currentPath.length > 1) {
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        type: 'freehand',
        x: currentPath[0].x,
        y: currentPath[0].y,
        points: currentPath,
        color: activeColor,
        size: activePenSize,
        visible: true
      }
      addAnnotation(newAnnotation)
      setCurrentPath([])
    }
    setIsDrawing(false)
  }

  const addAnnotation = (annotation: Annotation) => {
    const newAnnotations = [...annotations, annotation]
    setAnnotations(newAnnotations)
    
    // Update history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newAnnotations)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleTextSubmit = () => {
    if (!textPosition || !textValue.trim()) return
    
    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      type: 'text',
      x: textPosition.x,
      y: textPosition.y,
      text: textValue,
      color: activeColor,
      size: activePenSize
    }
    addAnnotation(newAnnotation)
    setShowTextInput(false)
    setTextValue('')
    setTextPosition(null)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const loadAvailableCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameras = devices.filter((device) => device.kind === 'videoinput')
      setAvailableCameras(cameras)

      if (!selectedCameraId && cameras.length > 0) {
        setSelectedCameraId(cameras[0].deviceId)
      }
    } catch (error) {
      console.error('No se pudieron listar las cámaras:', error)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setShowCamera(false)
    setVideoReady(false)
    setCameraLoading(false)
  }

  const startCamera = async (deviceId?: string) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('Este navegador no soporta acceso a cámara.')
      return
    }

    try {
      stopCamera()
      setCameraError('')
      setShowCamera(true)
      setVideoReady(false)
      setCameraLoading(true)

      const constraintsList: MediaStreamConstraints[] = [
        {
          video: {
            deviceId: deviceId ? { exact: deviceId } : undefined,
            facingMode: deviceId ? undefined : 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        },
        {
          video: {
            deviceId: deviceId ? { exact: deviceId } : undefined,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        },
        { video: true }
      ]

      let mediaStream: MediaStream | null = null

      for (const constraints of constraintsList) {
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
          break
        } catch {
          // Probar siguiente set de constraints
        }
      }

      if (!mediaStream) {
        throw new Error('No se pudo inicializar la cámara con los constraints disponibles.')
      }

      setStream(mediaStream)
      await loadAvailableCameras()
    } catch (err) {
      console.error('Error accessing camera:', err)
      setShowCamera(false)
      setVideoReady(false)
      setCameraError('No se pudo acceder a la cámara. Revisa permisos del navegador o cambia de dispositivo.')
      alert('No se pudo acceder a la cámara. Por favor, permite el acceso en la configuración del navegador.')
    } finally {
      setCameraLoading(false)
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !videoReady) {
      alert('Esperando a que la cámara esté lista...')
      return
    }
    
    const video = videoRef.current
    const captureWidth = video.videoWidth || 1280
    const captureHeight = video.videoHeight || 720

    if (!captureWidth || !captureHeight) {
      alert('No fue posible capturar la imagen. Intenta nuevamente.')
      return
    }

    const canvas = document.createElement('canvas')
    canvas.width = captureWidth
    canvas.height = captureHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    setImage(canvas.toDataURL('image/jpeg', 0.95))

    stopCamera()
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setAnnotations(history[historyIndex - 1] || [])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setAnnotations(history[historyIndex + 1])
    }
  }

  const handleClearAnnotations = () => {
    if (confirm('¿Desea borrar todas las anotaciones?')) {
      setAnnotations([])
      setHistory([])
      setHistoryIndex(-1)
    }
  }

  const handleSave = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const imageData = canvas.toDataURL('image/png')
    onSave(imageData, annotations)
    onClose()
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = `${photoType}_${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Scissors size={24} />
              Simulador Profesional de Cirugía Estética - {photoType}
            </h2>
            <p className="text-purple-100 text-sm flex items-center gap-2">
              Sistema avanzado de planificación y anotaciones quirúrgicas
              <span className="bg-white/20 border border-white/30 px-2 py-0.5 rounded-full text-xs font-semibold">v2.2 cámara robusta</span>
            </p>
          </div>
          <button
            onClick={() => {
              stopCamera()
              onClose()
            }}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Toolbar */}
          <div className="bg-gray-50 border-r border-gray-200 p-4 space-y-6 overflow-y-auto w-64">
            {/* Upload/Capture */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wider mb-3">Captura</h3>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full btn-secondary flex items-center justify-center gap-2"
              >
                <Upload size={18} />
                Subir Imagen
              </button>
              <button
                onClick={() => startCamera(selectedCameraId || undefined)}
                className="w-full btn-secondary flex items-center justify-center gap-2"
              >
                <Camera size={18} />
                Usar Cámara
              </button>
              {availableCameras.length > 0 && (
                <select
                  value={selectedCameraId}
                  onChange={(e) => setSelectedCameraId(e.target.value)}
                  className="input text-sm"
                >
                  {availableCameras.map((camera, index) => (
                    <option key={camera.deviceId} value={camera.deviceId}>
                      {camera.label || `Cámara ${index + 1}`}
                    </option>
                  ))}
                </select>
              )}
              {cameraError && (
                <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md p-2">
                  {cameraError}
                </div>
              )}
            </div>

            {image && (
              <>
                {/* Tools */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wider mb-3">Herramientas</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveTool('select')}
                      className={`px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm ${
                        activeTool === 'select' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <Move size={16} />
                      Mover
                    </button>
                    <button
                      onClick={() => setActiveTool('freehand')}
                      className={`px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm ${
                        activeTool === 'freehand' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <Pen size={16} />
                      Dibujar
                    </button>
                    <button
                      onClick={() => setActiveTool('circle')}
                      className={`px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm ${
                        activeTool === 'circle' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <Circle size={16} />
                      Círculo
                    </button>
                    <button
                      onClick={() => setActiveTool('rect')}
                      className={`px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm ${
                        activeTool === 'rect' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <Square size={16} />
                      Cuadro
                    </button>
                    <button
                      onClick={() => setActiveTool('arrow')}
                      className={`px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm ${
                        activeTool === 'arrow' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <ArrowRight size={16} />
                      Flecha
                    </button>
                    <button
                      onClick={() => setActiveTool('line')}
                      className={`px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm ${
                        activeTool === 'line' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <Minus size={16} />
                      Línea
                    </button>
                    <button
                      onClick={() => setActiveTool('measurement')}
                      className={`px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm ${
                        activeTool === 'measurement' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <Ruler size={16} />
                      Medir
                    </button>
                    <button
                      onClick={() => setActiveTool('numbered')}
                      className={`px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm ${
                        activeTool === 'numbered' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-current flex items-center justify-center text-xs">
                        {numberCounter}
                      </div>
                      Numerar
                    </button>
                    <button
                      onClick={() => setActiveTool('text')}
                      className={`px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm ${
                        activeTool === 'text' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <Type size={16} />
                      Texto
                    </button>
                  </div>
                  {activeTool === 'numbered' && (
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => setNumberCounter(Math.max(1, numberCounter - 1))}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center py-1 font-semibold">#{numberCounter}</div>
                      <button
                        onClick={() => setNumberCounter(numberCounter + 1)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                {/* Colors */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wider mb-3">Color</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setActiveColor(color.value)}
                        className={`w-10 h-10 rounded-lg border-2 transition ${
                          activeColor === color.value ? 'border-blue-600 scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Pen Size */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wider mb-3">Grosor</h3>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={activePenSize}
                    onChange={(e) => setActivePenSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{activePenSize}px</div>
                </div>

                {/* Zoom */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wider mb-3">Zoom</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setZoom(Math.max(50, zoom - 10))}
                      className="flex-1 btn-secondary p-2"
                    >
                      <ZoomOut size={18} />
                    </button>
                    <button
                      onClick={() => setZoom(Math.min(200, zoom + 10))}
                      className="flex-1 btn-secondary p-2"
                    >
                      <ZoomIn size={18} />
                    </button>
                  </div>
                  <div className="text-center text-sm text-gray-600">{zoom}%</div>
                </div>

                {/* Rotation */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wider mb-3">Rotación</h3>
                  <button
                    onClick={() => setRotation((rotation + 90) % 360)}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <RotateCw size={18} />
                    Rotar 90°
                  </button>
                  <div className="text-center text-sm text-gray-600">{rotation}°</div>
                </div>

                {/* Image Adjustments */}
                <div className="space-y-3 bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-sm text-purple-900 uppercase tracking-wider flex items-center gap-2">
                    <Sun size={16} />
                    Ajustes de Imagen
                  </h3>
                  
                  <div>
                    <label className="text-xs text-gray-700 font-medium flex items-center gap-1 mb-1">
                      <Sun size={14} />
                      Brillo
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-center text-xs text-gray-600">{brightness}%</div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-700 font-medium flex items-center gap-1 mb-1">
                      <Contrast size={14} />
                      Contraste
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-center text-xs text-gray-600">{contrast}%</div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-700 font-medium flex items-center gap-1 mb-1">
                      <Droplet size={14} />
                      Saturación
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-center text-xs text-gray-600">{saturation}%</div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setBrightness(100)
                      setContrast(100)
                      setSaturation(100)
                    }}
                    className="w-full bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition text-sm flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={16} />
                    Restablecer
                  </button>
                </div>

                {/* View Options */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wider mb-3">Vista</h3>
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`w-full px-3 py-2 rounded-lg flex items-center justify-between transition ${
                      showGrid ? 'bg-green-100 border-2 border-green-500 text-green-700' : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Grid3x3 size={16} />
                      <span className="text-sm">Cuadrícula</span>
                    </div>
                    {showGrid ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => setShowRulers(!showRulers)}
                    className={`w-full px-3 py-2 rounded-lg flex items-center justify-between transition ${
                      showRulers ? 'bg-green-100 border-2 border-green-500 text-green-700' : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Ruler size={16} />
                      <span className="text-sm">Reglas</span>
                    </div>
                    {showRulers ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>

                {/* History */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wider mb-3">Historial</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleUndo}
                      disabled={historyIndex <= 0}
                      className="flex-1 btn-secondary p-2 disabled:opacity-50"
                    >
                      <Undo size={18} />
                    </button>
                    <button
                      onClick={handleRedo}
                      disabled={historyIndex >= history.length - 1}
                      className="flex-1 btn-secondary p-2 disabled:opacity-50"
                    >
                      <Redo size={18} />
                    </button>
                  </div>
                </div>

                {/* Clear */}
                <button
                  onClick={handleClearAnnotations}
                  className="w-full bg-red-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition"
                >
                  <Trash2 size={18} />
                  Borrar Todo
                </button>
              </>
            )}
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-gray-900 flex items-center justify-center p-8 relative overflow-hidden">
            {showCamera ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="max-w-full max-h-[70vh] rounded-lg shadow-2xl"
                />
                {!videoReady && (
                  <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
                      <p className="text-lg font-semibold">Iniciando cámara...</p>
                      <p className="text-sm opacity-75 mt-2">
                        {cameraLoading ? 'Solicitando permiso y conectando dispositivo…' : 'Por favor, permite el acceso a la cámara'}
                      </p>
                      {cameraError && (
                        <p className="text-xs text-red-200 mt-3">{cameraError}</p>
                      )}
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <button
                    onClick={capturePhoto}
                    disabled={!videoReady}
                    className={`bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-semibold shadow-lg ${
                      !videoReady ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    📸 Capturar Foto
                  </button>
                  <button
                    onClick={() => startCamera(selectedCameraId || undefined)}
                    className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition font-semibold shadow-lg"
                  >
                    Reintentar
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition font-semibold shadow-lg"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : image ? (
              <canvas
                ref={canvasRef}
                width={1000}
                height={750}
                onClick={handleCanvasClick}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                className="max-w-full max-h-full bg-white rounded-lg shadow-2xl cursor-crosshair"
              />
            ) : (
              <div className="text-center text-gray-400">
                <Camera size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold mb-2">Simulador Profesional de Cirugía Estética</p>
                <p className="text-sm opacity-75">Sube una imagen o usa la cámara para comenzar</p>
              </div>
            )}
          </div>
        </div>

        {/* Text Input Modal */}
        {showTextInput && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Agregar Texto</h3>
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Escriba el texto..."
                className="input mb-4"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowTextInput(false)
                    setTextValue('')
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleTextSubmit}
                  className="flex-1 btn-primary"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {image && (
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Anotaciones: {annotations.length}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="btn-secondary flex items-center gap-2"
              >
                <Download size={18} />
                Descargar
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center gap-2"
              >
                <Save size={18} />
                Guardar y Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
