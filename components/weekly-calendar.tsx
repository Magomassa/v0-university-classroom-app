"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Trash2 } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const HORAS = Array.from({ length: 14 }, (_, i) => i + 7) // 7:00 to 20:00

interface Horario {
  id: string
  dia_semana: number
  hora_inicio: string
  hora_fin: string
  materia: string
  aula_numero: string
}

export function WeeklyCalendar() {
  const [horarios, setHorarios] = useState<Horario[]>([])
  const [loading, setLoading] = useState(true)

  const loadSchedules = async () => {
    try {
      const supabase = createBrowserClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("horarios")
        .select(`
          id,
          dia_semana,
          hora_inicio,
          hora_fin,
          materia,
          aulas (numero)
        `)
        .eq("profesor_id", user.id)
        .order("dia_semana")
        .order("hora_inicio")

      if (error) throw error

      const formattedData =
        data?.map((h: any) => ({
          id: h.id,
          dia_semana: h.dia_semana,
          hora_inicio: h.hora_inicio,
          hora_fin: h.hora_fin,
          materia: h.materia,
          aula_numero: h.aulas?.numero || "N/A",
        })) || []

      setHorarios(formattedData)
    } catch (error) {
      console.error("Error loading schedules:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSchedules()

    // Listen for schedule updates
    const handleUpdate = () => loadSchedules()
    window.addEventListener("scheduleUpdated", handleUpdate)
    return () => window.removeEventListener("scheduleUpdated", handleUpdate)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este horario?")) return

    try {
      const supabase = createBrowserClient()
      const { error } = await supabase.from("horarios").delete().eq("id", id)

      if (error) throw error

      loadSchedules()
    } catch (error) {
      console.error("Error deleting schedule:", error)
      alert("Error al eliminar horario")
    }
  }

  const getScheduleForSlot = (dia: number, hora: number) => {
    return horarios.filter((h) => {
      const inicio = Number.parseInt(h.hora_inicio.split(":")[0])
      const fin = Number.parseInt(h.hora_fin.split(":")[0])
      return h.dia_semana === dia && hora >= inicio && hora < fin
    })
  }

  if (loading) {
    return (
      <Card className="bg-[#0f1f3a] border-blue-900/30">
        <CardContent className="p-8 text-center text-gray-400">Cargando horarios...</CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#0f1f3a] border-blue-900/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Cronograma Semanal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-blue-900/30 bg-[#0a1628] p-2 text-gray-300 text-sm">Hora</th>
                {DIAS.map((dia, idx) => (
                  <th key={idx} className="border border-blue-900/30 bg-[#0a1628] p-2 text-gray-300 text-sm">
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HORAS.map((hora) => (
                <tr key={hora}>
                  <td className="border border-blue-900/30 bg-[#0a1628] p-2 text-gray-400 text-xs text-center">
                    {hora}:00
                  </td>
                  {[1, 2, 3, 4, 5, 6].map((dia) => {
                    const schedules = getScheduleForSlot(dia, hora)
                    return (
                      <td key={dia} className="border border-blue-900/30 p-1 align-top min-h-[60px]">
                        {schedules.map((schedule) => {
                          // Only show on first hour slot
                          const inicio = Number.parseInt(schedule.hora_inicio.split(":")[0])
                          if (hora !== inicio) return null

                          return (
                            <div
                              key={schedule.id}
                              className="bg-blue-600/20 border border-blue-500/50 rounded p-2 mb-1 group relative"
                            >
                              <div className="text-white text-xs font-semibold">{schedule.materia}</div>
                              <div className="text-gray-400 text-xs">Aula {schedule.aula_numero}</div>
                              <div className="text-gray-500 text-xs">
                                {schedule.hora_inicio.slice(0, 5)} - {schedule.hora_fin.slice(0, 5)}
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(schedule.id)}
                                className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="w-3 h-3 text-red-400" />
                              </Button>
                            </div>
                          )
                        })}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
