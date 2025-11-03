"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, BookOpen, Plane } from "lucide-react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"

const timeSlots = ["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00"]

export function ReservationForm() {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [buildings, setBuildings] = useState<any[]>([])
  const [classrooms, setClassrooms] = useState<any[]>([])
  const [availableClassrooms, setAvailableClassrooms] = useState<any[]>([])
  const [formData, setFormData] = useState({
    className: "",
    buildingId: "",
    classroomId: "",
    date: "",
    timeSlot: "",
    expectedStudents: "",
    notes: "",
  })

  useEffect(() => {
    const fetchBuildings = async () => {
      const { data, error } = await supabase.from("edificios").select("*").order("nombre")

      if (!error && data) {
        setBuildings(data)
      }
    }

    fetchBuildings()
  }, [])

  useEffect(() => {
    const fetchClassrooms = async () => {
      const { data, error } = await supabase.from("aulas").select("*").order("numero")

      if (!error && data) {
        setClassrooms(data)
      }
    }

    fetchClassrooms()
  }, [])

  useEffect(() => {
    if (formData.buildingId) {
      const filtered = classrooms.filter((c) => c.edificio_id === formData.buildingId)
      setAvailableClassrooms(filtered)
    } else {
      setAvailableClassrooms([])
    }
  }, [formData.buildingId, classrooms])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        alert("Debes iniciar sesión para hacer una reserva")
        setIsSubmitting(false)
        return
      }

      const [startTime, endTime] = formData.timeSlot.split(" - ")

      const { error } = await supabase.from("reservas").insert({
        profesor_id: user.id,
        aula_id: formData.classroomId,
        fecha: formData.date,
        hora_inicio: startTime,
        hora_fin: endTime,
        materia: formData.className,
        estudiantes_esperados: Number.parseInt(formData.expectedStudents),
        notas: formData.notes || null,
        estado: "pendiente",
      })

      if (error) {
        console.error("[v0] Error creating reservation:", error)
        alert("Error al crear la reserva: " + error.message)
      } else {
        alert("Reserva creada exitosamente. Los administradores la revisarán pronto.")
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("[v0] Error:", error)
      alert("Error al crear la reserva")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-[#0f1f3a] border-[#1e3a5f] p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Class Name */}
        <div className="space-y-2">
          <Label htmlFor="className" className="text-gray-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Nombre de la Clase
          </Label>
          <Input
            id="className"
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            placeholder="Ej: Cálculo I, Programación Avanzada"
            required
            className="bg-[#0a1628] border-[#1e3a5f] text-white placeholder:text-gray-600 focus:border-blue-500"
          />
        </div>

        {/* Building Selection */}
        <div className="space-y-2">
          <Label htmlFor="building" className="text-gray-300 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Edificio
          </Label>
          <Select
            value={formData.buildingId}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                buildingId: value,
                classroomId: "",
              })
            }
          >
            <SelectTrigger className="bg-[#0a1628] border-[#1e3a5f] text-white focus:border-blue-500">
              <SelectValue placeholder="Selecciona un edificio" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1f3a] border-[#1e3a5f] text-white">
              {buildings.map((building) => (
                <SelectItem key={building.id} value={building.id} className="focus:bg-[#1e3a5f] focus:text-white">
                  {building.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Classroom Selection */}
        <div className="space-y-2">
          <Label htmlFor="classroom" className="text-gray-300 flex items-center gap-2">
            <Plane className="w-4 h-4 -rotate-45" />
            Aula (Gate)
          </Label>
          <Select
            value={formData.classroomId}
            onValueChange={(value) => setFormData({ ...formData, classroomId: value })}
            disabled={!formData.buildingId}
          >
            <SelectTrigger className="bg-[#0a1628] border-[#1e3a5f] text-white focus:border-blue-500 disabled:opacity-50">
              <SelectValue
                placeholder={formData.buildingId ? "Selecciona un aula" : "Primero selecciona un edificio"}
              />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1f3a] border-[#1e3a5f] text-white">
              {availableClassrooms.map((classroom) => (
                <SelectItem key={classroom.id} value={classroom.id} className="focus:bg-[#1e3a5f] focus:text-white">
                  {classroom.numero} - Capacidad: {classroom.capacidad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fecha
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              min={new Date().toISOString().split("T")[0]}
              className="bg-[#0a1628] border-[#1e3a5f] text-white focus:border-blue-500 [color-scheme:dark]"
              style={{
                colorScheme: "dark",
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeSlot" className="text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Horario
            </Label>
            <Select value={formData.timeSlot} onValueChange={(value) => setFormData({ ...formData, timeSlot: value })}>
              <SelectTrigger className="bg-[#0a1628] border-[#1e3a5f] text-white focus:border-blue-500">
                <SelectValue placeholder="Selecciona horario" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1f3a] border-[#1e3a5f] text-white">
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot} className="focus:bg-[#1e3a5f] focus:text-white">
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Expected Students */}
        <div className="space-y-2">
          <Label htmlFor="expectedStudents" className="text-gray-300 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Número Estimado de Estudiantes
          </Label>
          <Input
            id="expectedStudents"
            type="number"
            value={formData.expectedStudents}
            onChange={(e) => setFormData({ ...formData, expectedStudents: e.target.value })}
            placeholder="Ej: 35"
            required
            min="1"
            className="bg-[#0a1628] border-[#1e3a5f] text-white placeholder:text-gray-600 focus:border-blue-500"
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-gray-300">
            Notas Adicionales (Opcional)
          </Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Requisitos especiales, equipamiento necesario, etc."
            className="bg-[#0a1628] border-[#1e3a5f] text-white placeholder:text-gray-600 focus:border-blue-500 min-h-[100px]"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-[#1e3a5f]">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-base uppercase tracking-wider"
          >
            {isSubmitting ? "Procesando Reserva..." : "Solicitar Reserva"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
