import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"

export function AdminStats() {
  const stats = [
    {
      label: "Verificadas Hoy",
      value: "24",
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      label: "Pendientes",
      value: "8",
      icon: Clock,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
    },
    {
      label: "Rechazadas",
      value: "2",
      icon: XCircle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
    },
    {
      label: "Alertas",
      value: "3",
      icon: AlertTriangle,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className={`bg-[#0f1f3a] border-2 ${stat.borderColor} ${stat.bgColor} p-6 hover:scale-105 transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <Icon className={`w-10 h-10 ${stat.color}`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
