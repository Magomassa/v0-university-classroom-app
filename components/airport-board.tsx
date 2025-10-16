"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, Calendar } from "lucide-react"

type ClassroomStatus = "libre" | "ocupada" | "proxima" | "reservada"

interface Classroom {
  id: string
  gate: string
  building: string
  capacity: number
  currentClass?: string
  professor?: string
  startTime?: string
  endTime?: string
  nextClass?: string
  nextTime?: string
  status: ClassroomStatus
}

// Mock data - simulating real-time classroom data
const mockClassrooms: Classroom[] = [
  {
    id: "1",
    gate: "A101",
    building: "Edificio A",
    capacity: 40,
    currentClass: "Cálculo I",
    professor: "Dr. García",
    startTime: "08:00",
    endTime: "10:00",
    status: "ocupada",
  },
  {
    id: "2",
    gate: "A102",
    building: "Edificio A",
    capacity: 35,
    status: "libre",
  },
  {
    id: "3",
    gate: "B201",
    building: "Edificio B",
    capacity: 50,
    nextClass: "Física II",
    nextTime: "14:00",
    status: "proxima",
  },
  {
    id: "4",
    gate: "B202",
    building: "Edificio B",
    capacity: 45,
    currentClass: "Programación",
    professor: "Dra. Martínez",
    startTime: "10:00",
    endTime: "12:00",
    status: "ocupada",
  },
  {
    id: "5",
    gate: "C301",
    building: "Edificio C",
    capacity: 30,
    nextClass: "Química Orgánica",
    nextTime: "15:00",
    status: "reservada",
  },
  {
    id: "6",
    gate: "C302",
    building: "Edificio C",
    capacity: 25,
    status: "libre",
  },
  {
    id: "7",
    gate: "D401",
    building: "Edificio D",
    capacity: 60,
    currentClass: "Estadística",
    professor: "Dr. López",
    startTime: "12:00",
    endTime: "14:00",
    status: "ocupada",
  },
  {
    id: "8",
    gate: "D402",
    building: "Edificio D",
    capacity: 55,
    status: "libre",
  },
]

const statusConfig = {
  libre: {
    color: "bg-green-500",
    textColor: "text-green-400",
    borderColor: "border-green-500/30",
    bgColor: "bg-green-500/10",
    label: "LIBRE",
  },
  ocupada: {
    color: "bg-red-500",
    textColor: "text-red-400",
    borderColor: "border-red-500/30",
    bgColor: "bg-red-500/10",
    label: "OCUPADA",
  },
  proxima: {
    color: "bg-yellow-500",
    textColor: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    bgColor: "bg-yellow-500/10",
    label: "PRÓXIMA CLASE",
  },
  reservada: {
    color: "bg-blue-500",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
    label: "RESERVADA",
  },
}

export function AirportBoard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [classrooms, setClassrooms] = useState<Classroom[]>(mockClassrooms)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="space-y-6">
      {/* Time Display - Airport Style */}
      <Card className="bg-[#0f1f3a] border-[#1e3a5f] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Clock className="w-6 h-6 text-blue-400" />
            <div>
              <div className="text-3xl font-mono font-bold text-white">{formatTime(currentTime)}</div>
              <div className="text-sm text-gray-400 capitalize">{formatDate(currentTime)}</div>
            </div>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-lg px-4 py-2">EN VIVO</Badge>
        </div>
      </Card>

      {/* Classroom Grid - Airport Board Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {classrooms.map((classroom) => {
          const config = statusConfig[classroom.status]
          return (
            <Card
              key={classroom.id}
              className={`bg-[#0f1f3a] border-2 ${config.borderColor} hover:scale-105 transition-all duration-300 overflow-hidden`}
            >
              {/* Gate Header */}
              <div className={`${config.bgColor} border-b ${config.borderColor} p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold font-mono text-white">{classroom.gate}</div>
                  <div className={`w-3 h-3 rounded-full ${config.color} animate-pulse`} />
                </div>
                <Badge className={`${config.bgColor} ${config.textColor} border-0 text-xs font-bold`}>
                  {config.label}
                </Badge>
              </div>

              {/* Classroom Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{classroom.building}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Users className="w-4 h-4" />
                  <span>Capacidad: {classroom.capacity}</span>
                </div>

                {/* Current Class Info */}
                {classroom.status === "ocupada" && classroom.currentClass && (
                  <div className="pt-3 border-t border-[#1e3a5f] space-y-2">
                    <div className="text-white font-semibold">{classroom.currentClass}</div>
                    <div className="text-sm text-gray-400">{classroom.professor}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>
                        {classroom.startTime} - {classroom.endTime}
                      </span>
                    </div>
                  </div>
                )}

                {/* Next Class Info */}
                {(classroom.status === "proxima" || classroom.status === "reservada") && classroom.nextClass && (
                  <div className="pt-3 border-t border-[#1e3a5f] space-y-2">
                    <div className="text-xs text-gray-500 uppercase">Próxima clase</div>
                    <div className="text-white font-semibold">{classroom.nextClass}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{classroom.nextTime}</span>
                    </div>
                  </div>
                )}

                {/* Available */}
                {classroom.status === "libre" && (
                  <div className="pt-3 border-t border-[#1e3a5f]">
                    <div className="text-green-400 font-semibold text-center py-2">Disponible para reservar</div>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
