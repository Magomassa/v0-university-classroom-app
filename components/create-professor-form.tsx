"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function CreateProfessorForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const response = await fetch("/api/admin/create-professor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, full_name: fullName }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear profesor")
      }

      setMessage(`Profesor ${fullName} creado exitosamente`)
      setEmail("")
      setPassword("")
      setFullName("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0f1f35] border border-[#1e3a5f] rounded-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 bg-[#0a1628] border border-[#1e3a5f] rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          placeholder="Ej: Juan Pérez"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-[#0a1628] border border-[#1e3a5f] rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          placeholder="profesor@email.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-[#0a1628] border border-[#1e3a5f] rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          placeholder="••••••••"
          required
        />
      </div>
      {message && <p className="text-green-500 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
      >
        {loading ? "Creando..." : "Crear Profesor"}
      </Button>
    </form>
  )
}
