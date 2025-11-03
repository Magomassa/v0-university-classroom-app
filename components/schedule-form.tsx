"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

const DIAS_SEMANA = [
  { value: "1", label: "Lunes" },
  { value: "2", label: "Martes" },
  { value: "3", label: "Miércoles" },
  { value: "4", label: "Jueves" },
  { value: "5", label: "Viernes" },
  { value: "6", label: "Sábado" },
]

export function ScheduleForm() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    dia_semana: "",
    hora_inicio: "",
    hora_fin: "",
    materia: "",
    aula: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createBrowserClient()

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        alert("Debes iniciar sesión")
        return
      }

      // Get aula_id from aula number
      const { data: aulas } = await supabase.from("aulas").select("id").eq("numero", formData.aula).single()

      if (!aulas) {
        alert("Aula no encontrada")
        return
      }

      // Insert schedule
      const { error } = await supabase.from("horarios").insert({
        profesor_id: user.id,
        aula_id: aulas.id,
        dia_semana: Number.parseInt(formData.dia_semana),
        hora_inicio: formData.hora_inicio,
        hora_fin: formData.hora_fin,
        materia: formData.materia,
      })

      if (error) throw error

      alert("Horario agregado exitosamente")
      setFormData({
        dia_semana: "",
        hora_inicio: "",
        hora_fin: "",
        materia: "",
        aula: "",
      })

      // Trigger refresh of calendar
      window.dispatchEvent(new Event("scheduleUpdated"))
    } catch (error) {
      console.error("Error:", error)
      alert("Error al agregar horario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-[#0f1f3a] border-blue-900/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-blue-400" />
          Agregar Horario
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="dia_semana" className="text-gray-300">
              Día de la Semana
            </Label>
            <Select
              value={formData.dia_semana}
              onValueChange={(value) => setFormData({ ...formData, dia_semana: value })}
            >
              <SelectTrigger className="bg-[#0a1628] border-blue-900/50 text-white">
                <SelectValue placeholder="Seleccionar día" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1f3a] border-blue-900/50">
                {DIAS_SEMANA.map((dia) => (
                  <SelectItem key={dia.value} value={dia.value} className="text-white">
                    {dia.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="materia" className="text-gray-300">
              Materia
            </Label>
            <Input
              id="materia"
              value={formData.materia}
              onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
              className="bg-[#0a1628] border-blue-900/50 text-white"
              placeholder="Ej: Matemáticas I"
              required
            />
          </div>

          <div>
            <Label htmlFor="aula" className="text-gray-300">
              Aula
            </Label>
            <Input
              id="aula"
              value={formData.aula}
              onChange={(e) => setFormData({ ...formData, aula: e.target.value })}
              className="bg-[#0a1628] border-blue-900/50 text-white"
              placeholder="Ej: 101"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hora_inicio" className="text-gray-300">
                Hora Inicio
              </Label>
              <Input
                id="hora_inicio"
                type="time"
                value={formData.hora_inicio}
                onChange={(e) => setFormData({ ...formData, hora_inicio: e.target.value })}
                className="bg-[#0a1628] border-blue-900/50 text-white [color-scheme:dark]"
                required
              />
            </div>
            <div>
              <Label htmlFor="hora_fin" className="text-gray-300">
                Hora Fin
              </Label>
              <Input
                id="hora_fin"
                type="time"
                value={formData.hora_fin}
                onChange={(e) => setFormData({ ...formData, hora_fin: e.target.value })}
                className="bg-[#0a1628] border-blue-900/50 text-white [color-scheme:dark]"
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {loading ? "Guardando..." : "Agregar Horario"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
