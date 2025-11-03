"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface Professor {
  id: string
  email: string
  nombre: string
  created_at: string
}

export function ProfessorsList() {
  const [professors, setProfessors] = useState<Professor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const supabase = createClient()

        const { data, error: fetchError } = await supabase
          .from("profiles")
          .select("id, email, nombre, created_at")
          .eq("role", "profesor")
          .order("created_at", { ascending: false })

        if (fetchError) {
          console.error("[v0] Error fetching professors:", fetchError)
          throw fetchError
        }

        console.log("[v0] Professors loaded:", data?.length || 0)
        setProfessors(data || [])
      } catch (err) {
        console.error("[v0] Exception loading professors:", err)
        setError(err instanceof Error ? err.message : "Error al cargar profesores")
      } finally {
        setLoading(false)
      }
    }

    fetchProfessors()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este profesor?")) return

    try {
      const response = await fetch("/api/admin/delete-professor", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      setProfessors(professors.filter((p) => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar")
    }
  }

  if (loading) return <p className="text-gray-400">Cargando profesores...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="bg-[#0f1f35] border border-[#1e3a5f] rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#0a1628] border-b border-[#1e3a5f]">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Nombre</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Creado</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((prof) => (
            <tr key={prof.id} className="border-b border-[#1e3a5f] hover:bg-[#152a45] transition">
              <td className="px-6 py-3 text-white">{prof.nombre || "Sin nombre"}</td>
              <td className="px-6 py-3 text-gray-400">{prof.email}</td>
              <td className="px-6 py-3 text-gray-400 text-sm">{new Date(prof.created_at).toLocaleDateString()}</td>
              <td className="px-6 py-3">
                <Button
                  onClick={() => handleDelete(prof.id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition"
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {professors.length === 0 && (
        <div className="px-6 py-8 text-center text-gray-400">No hay profesores registrados</div>
      )}
    </div>
  )
}
