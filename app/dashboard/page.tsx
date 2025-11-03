import { DashboardHeader } from "@/components/dashboard-header"
import { AirportBoard } from "@/components/airport-board"
import { StatusLegend } from "@/components/status-legend"
import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">TABLERO DE AULAS</h1>
              <p className="text-gray-400">Estado en tiempo real de las aulas universitarias</p>
            </div>
            <div className="flex items-center gap-4">
              <StatusLegend />
              <Link href="/dashboard/horarios">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Mi Horario
                </Button>
              </Link>
              <Link href="/dashboard/reservar">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Nueva Reserva
                </Button>
              </Link>
            </div>
          </div>
          <AirportBoard />
        </div>
      </main>
    </div>
  )
}
