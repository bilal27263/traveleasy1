"use client"

import { useState } from "react"
import type { User } from "@/types/user"

export function useUser() {
  const [user, setUser] = useState<User>({
    id: "1",
    name: "",
    email: "",
    profilePicture: "",
    isVerified: false,
  })

  const verifyUser = async () => {
    // In a real application, this would be an API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setUser({
        ...user,
        isVerified: true,
        verificationLink: "https://verification.example.com/" + Math.random().toString(36).substring(7),
      })

      return { success: true }
    } catch (error) {
      console.error("Verification error:", error)
      return { success: false }
    }
  }

  return { user, verifyUser }
}

