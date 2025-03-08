
"use server";

import { createClient } from "@/utils/supabase/server";

export async function signInWithEmailPassword(email: string, password: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

  if (error) {
    throw error
  }

  return data
}
