// app/sign-up/actions.ts (or your server action file)
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const allowedUserTypes = ["agency", "guide", "tourist", "visitor"];

export async function signUpAction(data: {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  userType: string;
}) {
  // console.log('DATA: ', data)
  if (data.password !== data.confirmPassword) {
    return { error: { message: "Passwords do not match" } };
  }

  if (!allowedUserTypes.includes(data.userType)) {
    return { error: { message: "Invalid user type selected" } };
  }

  const supabase = await createClient();

  // Sign up the user via Supabase Auth
  const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        user_type: data.userType,
        full_name: data.fullName,
      },
    },
  });

  if (signUpError) {
    return { error: signUpError };
  }

  const userId = signUpData.user?.id;
  if (!userId) {
    return { error: { message: "User was not created" } };
  }

  // const currentTimestamp = new Date().toISOString();

  // Insert profile data into the "profiles" table
  // const { error: profileError } = await supabase.from("profiles").insert([
  //   {
  //     id: userId,
  //     full_name: data.fullName,
  //     user_type: data.userType,
  //     created_at: currentTimestamp,
  //     updated_at: currentTimestamp,
  //   },
  // ]);

  // if (profileError) {
  //   return { error: profileError };
  // }

  revalidatePath("/sign-up");
  return { success: true };
}
