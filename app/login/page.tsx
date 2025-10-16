import { LoginForm } from "@/components/login-form"
import { Plane } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full border-3 border-blue-500 flex items-center justify-center hover:border-blue-400 transition-colors">
            <Plane className="w-8 h-8 text-blue-400 -rotate-45" />
          </div>
        </Link>

        {/* Boarding Pass Card */}
        <div className="relative">
          {/* Perforated edge effect */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0a1628] rounded-full border-2 border-[#1e3a5f]" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0a1628] rounded-full border-2 border-[#1e3a5f]" />

          <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] border-2 border-[#1e3a5f] rounded-lg p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b border-dashed border-[#1e3a5f]">
              <h1 className="text-3xl font-bold text-white mb-2">PASE DE EMBARQUE</h1>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Boarding Pass</p>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-dashed border-[#1e3a5f]">
              <div className="flex justify-between text-xs text-gray-500">
                <span>GATE</span>
                <span>CURSO AL VUELO</span>
                <span>SEAT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
