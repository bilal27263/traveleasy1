"use client"

import { useState } from "react"
import type { User } from "@/types/user"

export function useUser() {
  const [user, setUser] = useState<User>({
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    profilePicture: "/placeholder-user.jpg",
    isVerified: false,
  })

  const verifyUser = async () => {
    // In a real application, this would be an API call
    const response = await fetch("/api/verify-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    })
    const data = await response.json()
    if (data.success) {
      setUser({ ...user, isVerified: true, verificationLink: data.verificationLink })
    }
  }

  return { user, verifyUser }
}

