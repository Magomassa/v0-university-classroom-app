"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Loader2, Plane } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "profesor" as "profesor" | "admin",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nombre: formData.nombre,
            role: formData.role,
          },
        },
      })

      if (signUpError) throw signUpError

      router.push("/login")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Boarding Pass Card */}
        <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1f3a] rounded-2xl shadow-2xl overflow-hidden border border-[#1e3a5f]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="grid grid-cols-8 gap-2 h-full">
                {[...Array(32)].map((_, i) => (
                  <div key={i} className="bg-white rounded-full" />
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Registro</h1>
              <p className="text-blue-100 text-sm mt-1">Curso al Vuelo</p>
            </div>
          </div>

          {/* Perforated Edge */}
          <div className="h-6 bg-[#1a2942] relative">
            <div className="absolute top-0 left-0 w-full flex justify-between px-2">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-[#0a1628] rounded-full -translate-y-1/2" />
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300 text-sm uppercase tracking-wide">
                  Tipo de Usuario
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "profesor" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === "profesor"
                        ? "border-blue-500 bg-blue-500/10 text-blue-400"
                        : "border-[#1e3a5f] bg-[#0a1628] text-gray-400 hover:border-blue-500/50"
                    }`}
                  >
                    Profesor
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "admin" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === "admin"
                        ? "border-blue-500 bg-blue-500/10 text-blue-400"
                        : "border-[#1e3a5f] bg-[#0a1628] text-gray-400 hover:border-blue-500/50"
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-gray-300 text-sm uppercase tracking-wide">
                  Nombre Completo
                </Label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Juan Pérez"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                  className="bg-[#0a1628] border-[#1e3a5f] text-white placeholder:text-gray-600 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 text-sm uppercase tracking-wide">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@universidad.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-[#0a1628] border-[#1e3a5f] text-white placeholder:text-gray-600 focus:border-blue-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 text-sm uppercase tracking-wide">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-[#0a1628] border-[#1e3a5f] text-white placeholder:text-gray-600 focus:border-blue-500"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300 text-sm uppercase tracking-wide">
                  Confirmar Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="bg-[#0a1628] border-[#1e3a5f] text-white placeholder:text-gray-600 focus:border-blue-500"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-base uppercase tracking-wider"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  "Registrarse"
                )}
              </Button>

              {/* Login Link */}
              <div className="text-center text-sm text-gray-400">
                ¿Ya tienes cuenta?{" "}
                <a href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Inicia sesión aquí
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
