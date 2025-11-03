import { DashboardHeader } from "@/components/dashboard-header"
import { ScheduleForm } from "@/components/schedule-form"
import { WeeklyCalendar } from "@/components/weekly-calendar"

export default function HorariosPage() {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">MI HORARIO</h1>
            <p className="text-gray-400">Gestiona tu cronograma semanal de clases</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Schedule Form */}
            <div className="lg:col-span-1">
              <ScheduleForm />
            </div>

            {/* Weekly Calendar */}
            <div className="lg:col-span-2">
              <WeeklyCalendar />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
