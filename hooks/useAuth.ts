"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"
import { getProfile, getUser } from "@/utils/queries/user"


export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [userType, setUserType] = useState<string>("tourist")

  const fetchUserData = async (onLogin?: () => void) => {
    const user = await getUser()
    if (user) {
      setUser(user)
      const data = await getProfile({ user_id: user.id })
      setUserType(data?.user_type || "tourist")

    } else {
      setUser(null)
      setUserType("tourist")
    }
  }  

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchUserData()
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error logging out:", error.message)
      return false
    }
    return true
  }

  return { user, userType, logout, refreshUser: () => fetchUserData() }
}
