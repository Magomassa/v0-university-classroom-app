"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, MapPin, Users, Calendar, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

type VerificationStatus = "pendiente" | "verificada" | "rechazada" | "alerta"

interface ClassroomUsage {
  id: string
  gate: string
  building: string
  professor: string
  class: string
  startTime: string
  endTime: string
  date: string
  capacity: number
  studentsReported: number
  status: VerificationStatus
  notes?: string
  timestamp: string
}

const mockUsages: ClassroomUsage[] = [
  {
    id: "1",
    gate: "A101",
    building: "Edificio A",
    professor: "Dr. García",
    class: "Cálculo I",
    startTime: "08:00",
    endTime: "10:00",
    date: "2025-10-15",
    capacity: 40,
    studentsReported: 38,
    status: "pendiente",
    timestamp: "08:05",
  },
  {
    id: "2",
    gate: "B201",
    building: "Edificio B",
    professor: "Dra. Martínez",
    class: "Programación",
    startTime: "10:00",
    endTime: "12:00",
    date: "2025-10-15",
    capacity: 50,
    studentsReported: 52,
    status: "alerta",
    notes: "Excede capacidad",
    timestamp: "10:10",
  },
  {
    id: "3",
    gate: "C301",
    building: "Edificio C",
    professor: "Dr. López",
    class: "Estadística",
    startTime: "12:00",
    endTime: "14:00",
    date: "2025-10-15",
    capacity: 30,
    studentsReported: 28,
    status: "verificada",
    timestamp: "12:05",
  },
  {
    id: "4",
    gate: "D401",
    building: "Edificio D",
    professor: "Dra. Rodríguez",
    class: "Física II",
    startTime: "14:00",
    endTime: "16:00",
    date: "2025-10-15",
    capacity: 45,
    studentsReported: 0,
    status: "alerta",
    notes: "No se reportó uso",
    timestamp: "14:15",
  },
  {
    id: "5",
    gate: "A102",
    building: "Edificio A",
    professor: "Dr. Fernández",
    class: "Química Orgánica",
    startTime: "08:00",
    endTime: "10:00",
    date: "2025-10-15",
    capacity: 35,
    studentsReported: 15,
    status: "rechazada",
    notes: "Uso no autorizado",
    timestamp: "08:20",
  },
  {
    id: "6",
    gate: "B202",
    building: "Edificio B",
    professor: "Dra. Silva",
    class: "Historia del Arte",
    startTime: "16:00",
    endTime: "18:00",
    date: "2025-10-15",
    capacity: 40,
    studentsReported: 35,
    status: "pendiente",
    timestamp: "16:05",
  },
]

const statusConfig = {
  pendiente: {
    color: "bg-yellow-500",
    textColor: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    bgColor: "bg-yellow-500/10",
    label: "PENDIENTE",
    icon: Clock,
  },
  verificada: {
    color: "bg-green-500",
    textColor: "text-green-400",
    borderColor: "border-green-500/30",
    bgColor: "bg-green-500/10",
    label: "VERIFICADA",
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
  alerta: {
    color: "bg-orange-500",
    textColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    bgColor: "bg-orange-500/10",
    label: "ALERTA",
    icon: AlertCircle,
  },
}

export function VerificationBoard() {
  const [usages, setUsages] = useState<ClassroomUsage[]>(mockUsages)
  const [selectedUsage, setSelectedUsage] = useState<ClassroomUsage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [notes, setNotes] = useState("")

  const handleVerify = (id: string, newStatus: VerificationStatus) => {
    setUsages(
      usages.map((usage) =>
        usage.id === id
          ? {
              ...usage,
              status: newStatus,
              notes: notes || usage.notes,
            }
          : usage,
      ),
    )
    setIsDialogOpen(false)
    setNotes("")
    setSelectedUsage(null)
  }

  const openDialog = (usage: ClassroomUsage) => {
    setSelectedUsage(usage)
    setNotes(usage.notes || "")
    setIsDialogOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {usages.map((usage) => {
          const config = statusConfig[usage.status]
          const Icon = config.icon
          const isOverCapacity = usage.studentsReported > usage.capacity

          return (
            <Card
              key={usage.id}
              className={`bg-[#0f1f3a] border-2 ${config.borderColor} hover:scale-105 transition-all duration-300 overflow-hidden`}
            >
              {/* Header */}
              <div className={`${config.bgColor} border-b ${config.borderColor} p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold font-mono text-white">{usage.gate}</div>
                  <Icon className={`w-6 h-6 ${config.textColor}`} />
                </div>
                <Badge className={`${config.bgColor} ${config.textColor} border-0 text-xs font-bold`}>
                  {config.label}
                </Badge>
              </div>

              {/* Details */}
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-white font-semibold text-lg">{usage.class}</div>
                  <div className="text-sm text-gray-400">{usage.professor}</div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{usage.building}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {usage.startTime} - {usage.endTime}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Users className="w-4 h-4" />
                  <span className={isOverCapacity ? "text-orange-400 font-semibold" : ""}>
                    {usage.studentsReported} / {usage.capacity} estudiantes
                  </span>
                </div>

                <div className="text-xs text-gray-500">Reportado: {usage.timestamp}</div>

                {usage.notes && (
                  <div className="pt-2 border-t border-[#1e3a5f]">
                    <p className="text-sm text-gray-400 italic">{usage.notes}</p>
                  </div>
                )}

                {/* Actions */}
                {usage.status === "pendiente" || usage.status === "alerta" ? (
                  <div className="pt-3 border-t border-[#1e3a5f] flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleVerify(usage.id, "verificada")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verificar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openDialog(usage)}
                      className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Rechazar
                    </Button>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-[#1e3a5f]">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openDialog(usage)}
                      className="w-full text-gray-400 hover:text-white"
                    >
                      Ver detalles
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Verification Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#0f1f3a] border-[#1e3a5f] text-white">
          <DialogHeader>
            <DialogTitle>Verificación de Uso - {selectedUsage?.gate}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedUsage?.class} - {selectedUsage?.professor}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Edificio:</span>
                <p className="text-white font-semibold">{selectedUsage?.building}</p>
              </div>
              <div>
                <span className="text-gray-400">Horario:</span>
                <p className="text-white font-semibold">
                  {selectedUsage?.startTime} - {selectedUsage?.endTime}
                </p>
              </div>
              <div>
                <span className="text-gray-400">Capacidad:</span>
                <p className="text-white font-semibold">{selectedUsage?.capacity}</p>
              </div>
              <div>
                <span className="text-gray-400">Estudiantes:</span>
                <p className="text-white font-semibold">{selectedUsage?.studentsReported}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Notas de verificación</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Agregar observaciones..."
                className="bg-[#0a1628] border-[#1e3a5f] text-white placeholder:text-gray-600 min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-[#1e3a5f] text-gray-400 hover:bg-[#1e3a5f]"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => selectedUsage && handleVerify(selectedUsage.id, "rechazada")}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Rechazar
            </Button>
            <Button
              onClick={() => selectedUsage && handleVerify(selectedUsage.id, "verificada")}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Verificar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
