import { DashboardHeader } from "@/components/dashboard-header"
import { ReservationForm } from "@/components/reservation-form"
import { MyReservations } from "@/components/my-reservations"

export default function ReservarPage() {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">RESERVAR AULA</h1>
              <p className="text-gray-400">Solicita el uso de un aula para tu clase</p>
            </div>
            <ReservationForm />
          </div>

          {/* My Reservations Sidebar */}
          <div>
            <MyReservations />
          </div>
        </div>
      </main>
    </div>
  )
}
