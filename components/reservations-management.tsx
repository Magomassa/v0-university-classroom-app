"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, MapPin, Users, Calendar, BookOpen } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

interface Reservation {
  id: string
  fecha: string
  hora_inicio: string
  hora_fin: string
  materia: string
  estudiantes_esperados: number
  notas: string | null
  estado: string
  created_at: string
  aula: {
    numero: string
    capacidad: number
    edificio: {
      nombre: string
    }
  }
  profesor: {
    nombre: string
    email: string
  }
}

const statusConfig = {
  pendiente: {
    color: "bg-yellow-500",
    textColor: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    bgColor: "bg-yellow-500/10",
    label: "PENDIENTE",
    icon: Clock,
  },
  aprobada: {
    color: "bg-green-500",
    textColor: "text-green-400",
    borderColor: "border-green-500/30",
    bgColor: "bg-green-500/10",
    label: "APROBADA",
    icon: CheckCircle,
  },
  rechazada: {
    color: "bg-red-500",
    textColor: "text-red-400",
    borderColor: "border-red-500/30",
    bgColor: "bg-red-500/10",
    label: "RECHAZADA",
    icon: XCircle,
  },
}

export function ReservationsManagement() {
  const supabase = createBrowserClient()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReservations = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("reservas")
        .select(
          `
          *,
          aula:aulas(numero, capacidad, edificio:edificios(nombre)),
          profesor:profiles(nombre, email)
        `,
        )
        .order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching reservations:", error)
        setError("Error al cargar reservas")
      } else {
        setReservations(data || [])
        setError(null)
      }
    } catch (err) {
      console.error("[v0] Error:", err)
      setError("Error al cargar reservas")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase.from("reservas").update({ estado: newStatus }).eq("id", id)

      if (error) {
        console.error("[v0] Error updating reservation:", error)
        alert("Error al actualizar la reserva")
      } else {
        // Refresh the list
        fetchReservations()
      }
    } catch (err) {
      console.error("[v0] Error:", err)
      alert("Error al actualizar la reserva")
    }
  }

  if (loading) {
    return (
      <Card className="bg-[#0f1f3a] border-[#1e3a5f] p-8">
        <p className="text-gray-400 text-center">Cargando reservas...</p>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-[#0f1f3a] border-[#1e3a5f] p-8">
        <p className="text-red-400 text-center">{error}</p>
      </Card>
    )
  }

  if (reservations.length === 0) {
    return (
      <Card className="bg-[#0f1f3a] border-[#1e3a5f] p-8">
        <p className="text-gray-400 text-center">No hay reservas registradas</p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {reservations.map((reservation) => {
        const config = statusConfig[reservation.estado as keyof typeof statusConfig] || statusConfig.pendiente
        const Icon = config.icon

        return (
          <Card
            key={reservation.id}
            className={`bg-[#0f1f3a] border-2 ${config.borderColor} hover:scale-105 transition-all duration-300 overflow-hidden`}
          >
            {/* Header */}
            <div className={`${config.bgColor} border-b ${config.borderColor} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold font-mono text-white">{reservation.aula.numero}</div>
                <Icon className={`w-6 h-6 ${config.textColor}`} />
              </div>
              <Badge className={`${config.bgColor} ${config.textColor} border-0 text-xs font-bold`}>
                {config.label}
              </Badge>
            </div>

            {/* Details */}
            <div className="p-4 space-y-3">
              <div>
                <div className="text-white font-semibold text-lg flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {reservation.materia}
                </div>
                <div className="text-sm text-blue-400 font-semibold mt-1">Profesor: {reservation.profesor.nombre}</div>
                <div className="text-xs text-gray-500">{reservation.profesor.email}</div>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{reservation.aula.edificio.nombre}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(reservation.fecha).toLocaleDateString("es-ES")} | {reservation.hora_inicio} -{" "}
                  {reservation.hora_fin}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Users className="w-4 h-4" />
                <span>
                  {reservation.estudiantes_esperados} estudiantes (Cap: {reservation.aula.capacidad})
                </span>
              </div>

              {reservation.notas && (
                <div className="pt-2 border-t border-[#1e3a5f]">
                  <p className="text-sm text-gray-400 italic">{reservation.notas}</p>
                </div>
              )}

              {/* Actions */}
              {reservation.estado === "pendiente" && (
                <div className="pt-3 border-t border-[#1e3a5f] flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleUpdateStatus(reservation.id, "aprobada")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Aprobar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateStatus(reservation.id, "rechazada")}
                    className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Rechazar
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
