"use client"

import { Plane, LogOut, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function AdminHeader() {
  const router = useRouter()
  const [adminName, setAdminName] = useState("Administrador")

  useEffect(() => {
    const fetchUserProfile = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase.from("profiles").select("nombre").eq("id", user.id).single()

        if (profile?.nombre) {
          setAdminName(profile.nombre)
        }
      }
    }

    fetchUserProfile()
  }, [])

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <header className="border-b border-[#1e3a5f] bg-[#0f1f3a]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center">
              <Plane className="w-5 h-5 text-blue-400 -rotate-45" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">CURSO AL VUELO</h1>
              <p className="text-xs text-gray-400">Panel de Administración</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">{adminName}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-400 hover:text-white hover:bg-[#1e3a5f]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
