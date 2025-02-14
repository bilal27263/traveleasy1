"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return { user }
}

