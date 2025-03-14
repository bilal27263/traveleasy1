import React from "react"
import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { VerificationPromo } from "@/components/VerificationPromo"
import { useUser } from "@/hooks/useUser"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-400 via-blue-500 to-green-500">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
        <DashboardPromo />
      </div>
    </div>
  )
}

// Client component to handle the promo
function DashboardPromo() {
  "use client"

  const { user, verifyUser } = useUser()
  const [dismissed, setDismissed] = React.useState(false)

  const handleDismiss = () => {
    setDismissed(true)
  }

  if (dismissed || user.isVerified) return null

  return <VerificationPromo isVerified={user.isVerified} onVerify={verifyUser} onDismiss={handleDismiss} />
}

