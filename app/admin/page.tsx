import { AdminHeader } from "@/components/admin-header"
import { VerificationBoard } from "@/components/verification-board"
import { AdminStats } from "@/components/admin-stats"
import { AddClassroomForm } from "@/components/add-classroom-form"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">PANEL DE VERIFICACIÓN</h1>
            <p className="text-gray-400">Control y verificación de uso de aulas</p>
          </div>
          <AdminStats />
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Gestión de Aulas</h2>
            <AddClassroomForm />
          </div>
          <VerificationBoard />
        </div>
      </main>
    </div>
  )
}
