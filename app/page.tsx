import { Card } from "@/components/ui/card"
import { Plane, CheckSquare, Lock, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Plane Icon */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center">
              <Plane className="w-10 h-10 text-blue-400 -rotate-45" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-blue-400">CURSO</span>
              <br />
              <span className="text-white">AL VUELO</span>
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" />
          </div>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl text-gray-300 font-light tracking-wide uppercase">
            Panel tipo aeropuerto para organizar aulas
          </h2>

          {/* Description */}
          <p className="max-w-3xl text-base md:text-lg text-gray-400 leading-relaxed">
            Nuestra aplicación MVP simula un tablero de vuelos digital para la gestión eficiente de aulas
            universitarias. Con una interfaz inspirada en los sistemas aeroportuarios, podrás monitorear y controlar el
            estado de las aulas en tiempo real, optimizando el uso de espacios académicos de manera intuitiva y moderna.
          </p>

          {/* Features Section */}
          <div className="w-full pt-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-12 flex items-center justify-center gap-3">
              <span className="text-2xl">🚀</span>
              <span>Próximas Funcionalidades</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Card 1: Confirmación del uso de aula */}
              <Card className="bg-[#0f1f3a] border-[#1e3a5f] p-8 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckSquare className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Confirmación del uso de aula</h4>
                  <p className="text-sm text-gray-400">Sistema de verificación en tiempo real</p>
                </div>
              </Card>

              {/* Card 2: Iniciar Sesión - Highlighted and Clickable */}
              <Link href="/login">
                <Card className="bg-[#0f2f2f] border-teal-500/60 p-8 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Lock className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white">Iniciar Sesión</h4>
                    <p className="text-sm text-gray-400">Accede al panel de control</p>
                  </div>
                </Card>
              </Link>

              {/* Card 3: Visualización del estado */}
              <Card className="bg-[#0f1f3a] border-[#1e3a5f] p-8 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-blue-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Visualización del estado de las aulas</h4>
                  <p className="text-sm text-gray-400">Dashboard en tiempo real tipo aeropuerto</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
