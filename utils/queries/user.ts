"use server";

import { createClient } from "../supabase/server";


export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return null;
  }

  return user;
};


export const getProfile = async ({user_id}: {user_id: string}) => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("profiles").select("user_type").eq("id", user_id).single()

    if (error) {
        return null
    }

    return data;

}