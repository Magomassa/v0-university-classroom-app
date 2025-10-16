"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Plus } from "lucide-react"

export function AddClassroomForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    edificio: "",
    numero: "",
    capacidad: "",
    equipamiento: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()

      const { error: insertError } = await supabase.from("aulas").insert({
        edificio: formData.edificio,
        numero: formData.numero,
        capacidad: Number.parseInt(formData.capacidad),
        equipamiento: formData.equipamiento || null,
      })

      if (insertError) throw insertError

      setSuccess(true)
      setFormData({ edificio: "", numero: "", capacidad: "", equipamiento: "" })
      setTimeout(() => {
        setIsOpen(false)
        setSuccess(false)
        window.location.reload()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al añadir aula")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
        <Plus className="w-4 h-4 mr-2" />
        Añadir Aula
      </Button>
    )
  }

  return (
    <div className="bg-[#1a2942] rounded-lg border border-[#1e3a5f] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Añadir Nueva Aula</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
          Cancelar
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edificio" className="text-gray-300 text-sm">
              Edificio
            </Label>
            <Input
              id="edificio"
              type="text"
              placeholder="Ej: A, B, Central"
              value={formData.edificio}
              onChange={(e) => setFormData({ ...formData, edificio: e.target.value })}
              required
              className="bg-[#0a1628] border-[#1e3a5f] text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numero" className="text-gray-300 text-sm">
              Número de Aula
            </Label>
            <Input
              id="numero"
              type="text"
              placeholder="Ej: 101, A-205"
              value={formData.numero}
              onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
              required
              className="bg-[#0a1628] border-[#1e3a5f] text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacidad" className="text-gray-300 text-sm">
            Capacidad
          </Label>
          <Input
            id="capacidad"
            type="number"
            placeholder="Ej: 30"
            value={formData.capacidad}
            onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
            required
            min="1"
            className="bg-[#0a1628] border-[#1e3a5f] text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="equipamiento" className="text-gray-300 text-sm">
            Equipamiento (Opcional)
          </Label>
          <Textarea
            id="equipamiento"
            placeholder="Ej: Proyector, Pizarra digital, Aire acondicionado"
            value={formData.equipamiento}
            onChange={(e) => setFormData({ ...formData, equipamiento: e.target.value })}
            className="bg-[#0a1628] border-[#1e3a5f] text-white min-h-[80px]"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">{error}</div>
        )}

        {success && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 text-sm">
            ¡Aula añadida exitosamente!
          </div>
        )}

        <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Añadiendo...
            </>
          ) : (
            "Añadir Aula"
          )}
        </Button>
      </form>
    </div>
  )
}
