"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "profesor" as "profesor" | "admin",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      console.log("[v0] Attempting login with email:", formData.email)

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (signInError) {
        console.log("[v0] Sign in error:", signInError)
        throw signInError
      }

      console.log("[v0] Sign in successful, user ID:", data.user.id)

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        console.log("[v0] Profile query error:", profileError)
        // If profile doesn't exist, show helpful error
        if (profileError.code === "PGRST116") {
          throw new Error("Tu perfil no está configurado. Por favor contacta al administrador.")
        }
        throw new Error(`Error al obtener perfil: ${profileError.message}`)
      }

      console.log("[v0] Profile found, role:", profile.role)

      if (profile.role === "admin") {
        console.log("[v0] Redirecting to admin dashboard")
        window.location.href = "/admin"
      } else {
        console.log("[v0] Redirecting to professor dashboard")
        window.location.href = "/dashboard"
      }
    } catch (err) {
      console.log("[v0] Login error:", err)
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
      setIsLoading(false)
    }
  }

  return (
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

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">{error}</div>
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
            Embarcando...
          </>
        ) : (
          "Embarcar"
        )}
      </Button>

      <div className="text-center space-y-2">
        <button type="button" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
          ¿Olvidaste tu contraseña?
        </button>
        <div className="text-sm text-gray-400">
          ¿No tienes cuenta?{" "}
          <a href="/auth/sign-up" className="text-blue-400 hover:text-blue-300 transition-colors">
            Regístrate aquí
          </a>
        </div>
      </div>
    </form>
  )
}
