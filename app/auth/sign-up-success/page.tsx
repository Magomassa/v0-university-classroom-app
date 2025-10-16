import { Plane, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1f3a] rounded-2xl shadow-2xl overflow-hidden border border-[#1e3a5f] text-center p-8">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6 backdrop-blur-sm border-2 border-green-500/50">
            <Mail className="w-10 h-10 text-green-400" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-3">¡Registro Exitoso!</h1>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Plane className="w-5 h-5 text-blue-400" />
            <p className="text-blue-400 font-semibold">Curso al Vuelo</p>
          </div>

          {/* Message */}
          <div className="bg-[#0a1628] rounded-lg p-6 mb-6 border border-[#1e3a5f]">
            <p className="text-gray-300 leading-relaxed">
              Hemos enviado un correo de confirmación a tu dirección de email. Por favor, revisa tu bandeja de entrada y
              haz clic en el enlace de verificación para activar tu cuenta.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-300">
              <strong>Nota:</strong> Si no ves el correo, revisa tu carpeta de spam o correo no deseado.
            </p>
          </div>

          {/* Back to Login Button */}
          <Link href="/login">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-base uppercase tracking-wider">
              Volver al Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
