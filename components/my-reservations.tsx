"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, X } from "lucide-react"

type ReservationStatus = "pendiente" | "confirmada" | "rechazada"

interface Reservation {
  id: string
  className: string
  gate: string
  building: string
  date: string
  timeSlot: string
  status: ReservationStatus
}

const mockReservations: Reservation[] = [
  {
    id: "1",
    className: "Cálculo I",
    gate: "A101",
    building: "Edificio A",
    date: "2025-10-16",
    timeSlot: "08:00 - 10:00",
    status: "confirmada",
  },
  {
    id: "2",
    className: "Programación",
    gate: "B201",
    building: "Edificio B",
    date: "2025-10-17",
    timeSlot: "10:00 - 12:00",
    status: "pendiente",
  },
  {
    id: "3",
    className: "Estadística",
    gate: "C301",
    building: "Edificio C",
    date: "2025-10-18",
    timeSlot: "14:00 - 16:00",
    status: "confirmada",
  },
]

const statusConfig = {
  pendiente: {
    color: "bg-yellow-500/20",
    textColor: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    label: "PENDIENTE",
  },
  confirmada: {
    color: "bg-green-500/20",
    textColor: "text-green-400",
    borderColor: "border-green-500/30",
    label: "CONFIRMADA",
  },
  rechazada: {
    color: "bg-red-500/20",
    textColor: "text-red-400",
    borderColor: "border-red-500/30",
    label: "RECHAZADA",
  },
}

export function MyReservations() {
  const handleCancel = (id: string) => {
    if (confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
      // Handle cancellation
      console.log("[v0] Cancelling reservation:", id)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Mis Reservas</h2>
        <p className="text-sm text-gray-400">Tus próximas clases programadas</p>
      </div>

      <div className="space-y-3">
        {mockReservations.map((reservation) => {
          const config = statusConfig[reservation.status]
          return (
            <Card
              key={reservation.id}
              className={`bg-[#0f1f3a] border-2 ${config.borderColor} p-4 hover:scale-105 transition-all duration-300`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-bold text-white">{reservation.gate}</div>
                    <div className="text-sm text-gray-400">{reservation.className}</div>
                  </div>
                  <Badge className={`${config.color} ${config.textColor} border-0 text-xs`}>{config.label}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{reservation.building}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(reservation.date).toLocaleDateString("es-ES")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{reservation.timeSlot}</span>
                  </div>
                </div>

                {reservation.status === "pendiente" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCancel(reservation.id)}
                    className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cancelar
                  </Button>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
