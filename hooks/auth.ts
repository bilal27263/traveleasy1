"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data, error } = await supabase.from("profiles").select("user_type").eq("id", user.id).single()
        if (!error) {
          setUserType(data.user_type)
        }
      }
    }

    fetchUserData()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const { data, error } = await supabase.from("profiles").select("user_type").eq("id", session.user.id).single()
        if (!error) {
          setUserType(data.user_type)
        }
      } else {
        setUserType(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error logging out:", error.message)
      return false
    }
    return true
  }

  return { user, userType, logout }
}

