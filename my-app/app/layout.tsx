import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TravelEasy Morocco",
  description: "Discover the magic of Morocco with TravelEasy",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="pt-16">{children}</main>
        <footer className="bg-gray-800 text-white py-12">{/* Footer content */}</footer>
        <Toaster />
      </body>
    </html>
  )
}

