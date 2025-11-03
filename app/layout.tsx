import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Curso al Vuelo - Gestión de Aulas Universitarias",
  description: "Panel tipo aeropuerto para organizar aulas universitarias en tiempo real",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="h-full">
      <body className={`font-sans antialiased min-h-full`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
