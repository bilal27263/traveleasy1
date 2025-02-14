import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://znczwhlreoqbvtzywfmb.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuY3p3aGxyZW9xYnZ0enl3Zm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMTgyMTEsImV4cCI6MjA1NDY5NDIxMX0.iPj-cO-gOXJToaWs6P8X7fdhIUJsB7hByzElySMUBgg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

