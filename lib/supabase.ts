/* eslint-disable @typescript-eslint/no-unused-vars */

import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// For server components
export const createServerClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// For client components
export const createBrowserClient = () => {
  return createClientComponentClient<Database>({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })
}

// Singleton instance for client-side usage
export const supabase = createBrowserClient()

// Function to check if the Supabase connection is working
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from("profiles").select("id").limit(1)
    if (error) throw error
    return true
  } catch (error) {
    console.error("Supabase connection error:", error)
    return false
  }
}
