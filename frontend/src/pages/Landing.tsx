import { Link } from 'react-router-dom'
import { FileText, Zap, Shield, BarChart3, Brain, CheckCircle } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">E</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Esthetic App
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Características</a>
            <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition">Beneficios</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">Precios</a>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Iniciar Sesión</Link>
            <Link to="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
              Comenzar Gratis
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ficha Clínica Electrónica
            <br />
            para Medicina Estética
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Automatiza diagnósticos, planes de tratamiento y presupuestos con IA. 
            Sistema completo, legal y diseñado por médicos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition transform hover:-translate-y-1">
              Probar Gratis 30 Días
            </Link>
            <a href="#demo" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition">
              Ver Demo
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-500" />
              <span>Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-500" />
              <span>Cumple normativa MINSAL</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-500" />
              <span>Soporte en español</span>
            </div>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-200">
            <div className="bg-white rounded-lg shadow-lg p-6 text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-24"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Todo lo que necesitas en un solo lugar</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sistema completo que transforma tu forma de trabajar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Brain className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Diagnóstico con IA</h3>
              <p className="text-gray-700">
                GPT-4 analiza anamnesis, fotos y evaluación física para generar diagnósticos clínicos automáticamente.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Ficha Clínica Legal</h3>
              <p className="text-gray-700">
                Cumple 100% con normativa chilena (MINSAL, DS41, Ley 20.584). Trazabilidad completa.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Presupuesto Automático</h3>
              <p className="text-gray-700">
                Genera presupuestos al instante desde el plan de tratamiento. Calcula márgenes automáticamente.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Consentimientos Digitales</h3>
              <p className="text-gray-700">
                Firma digital de consentimientos. Almacenamiento seguro con validez legal.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Analytics & Reportes</h3>
              <p className="text-gray-700">
                Dashboard completo con métricas de negocio, rendimiento y análisis financiero.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Portal del Paciente</h3>
              <p className="text-gray-700">
                Tus pacientes acceden a su historial, fotos antes/después y documentos desde cualquier lugar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ahorra tiempo, aumenta ingresos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Médicos que usan Esthetic App reportan resultados tangibles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-5xl font-bold text-blue-600 mb-2">60%</div>
              <p className="text-gray-700 font-semibold mb-2">Menos tiempo</p>
              <p className="text-sm text-gray-600">en documentación clínica</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-5xl font-bold text-purple-600 mb-2">35%</div>
              <p className="text-gray-700 font-semibold mb-2">Más conversión</p>
              <p className="text-sm text-gray-600">de presupuestos aceptados</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-5xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-700 font-semibold mb-2">Compliance</p>
              <p className="text-sm text-gray-600">con normativa legal</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Comienza a transformar tu práctica hoy
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a cientos de médicos estéticos que ya confían en Esthetic App
          </p>
          <Link to="/login" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transition transform hover:-translate-y-1">
            Comenzar Prueba Gratuita
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="text-white font-bold text-lg">Esthetic App</span>
              </div>
              <p className="text-sm text-gray-400">
                Sistema de ficha clínica electrónica para medicina estética.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Características</a></li>
                <li><a href="#" className="hover:text-white transition">Precios</a></li>
                <li><a href="#" className="hover:text-white transition">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Términos</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>contacto@estheticapp.com</li>
                <li>+56 9 1234 5678</li>
                <li>Santiago, Chile</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            © 2026 Esthetic App. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
