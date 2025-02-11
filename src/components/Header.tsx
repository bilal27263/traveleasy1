"use client"

import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VerifyButton } from "@/components/VerifyButton"
import { useUser } from "@/hooks/useUser"

export function Header() {
  const { user, verifyUser } = useUser()

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Travel Agency Dashboard</h2>
          <div className="flex items-center">
            <VerifyButton isVerified={user.isVerified} onVerify={verifyUser} />
            <Button variant="ghost" size="icon" className="ml-2">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="ml-2">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

