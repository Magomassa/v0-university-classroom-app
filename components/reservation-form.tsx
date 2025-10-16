"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, BookOpen, Plane } from "lucide-react"
import { useRouter } from "next/navigation"

const buildings = ["Edificio A", "Edificio B", "Edificio C", "Edificio D"]

const classrooms = {
  "Edificio A": [
    { gate: "A101", capacity: 40 },
    { gate: "A102", capacity: 35 },
    { gate: "A103", capacity: 30 },
  ],
  "Edificio B": [
    { gate: "B201", capacity: 50 },
    { gate: "B202", capacity: 45 },
    { gate: "B203", capacity: 40 },
  ],
  "Edificio C": [
    { gate: "C301", capacity: 30 },
    { gate: "C302", capacity: 25 },
    { gate: "C303", capacity: 35 },
  ],
  "Edificio D": [
    { gate: "D401", capacity: 60 },
    { gate: "D402", capacity: 55 },
    { gate: "D403", capacity: 50 },
  ],
}

const timeSlots = ["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00"]

export function ReservationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    className: "",
    building: "",
    classroom: "",
    date: "",
    timeSlot: "",
    expectedStudents: "",
    notes: "",
  })

  const availableClassrooms = formData.building ? classrooms[formData.building as keyof typeof classrooms] : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success and redirect
    alert("Reserva solicitada exitosamente. Recibirás confirmación pronto.")
    setIsSubmitting(false)
    router.push("/dashboard")
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
            value={formData.building}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                building: value,
                classroom: "",
              })
            }
          >
            <SelectTrigger className="bg-[#0a1628] border-[#1e3a5f] text-white focus:border-blue-500">
              <SelectValue placeholder="Selecciona un edificio" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1f3a] border-[#1e3a5f] text-white">
              {buildings.map((building) => (
                <SelectItem key={building} value={building} className="focus:bg-[#1e3a5f] focus:text-white">
                  {building}
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
            value={formData.classroom}
            onValueChange={(value) => setFormData({ ...formData, classroom: value })}
            disabled={!formData.building}
          >
            <SelectTrigger className="bg-[#0a1628] border-[#1e3a5f] text-white focus:border-blue-500 disabled:opacity-50">
              <SelectValue placeholder={formData.building ? "Selecciona un aula" : "Primero selecciona un edificio"} />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1f3a] border-[#1e3a5f] text-white">
              {availableClassrooms.map((classroom) => (
                <SelectItem key={classroom.gate} value={classroom.gate} className="focus:bg-[#1e3a5f] focus:text-white">
                  {classroom.gate} - Capacidad: {classroom.capacity}
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
