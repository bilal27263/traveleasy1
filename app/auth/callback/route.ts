import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)

    // Fetch user data
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      // Check if user type exists
      const { data, error } = await supabase.from("profiles").select("user_type").eq("id", user.id).single()

      if (error || !data?.user_type) {
        // User type doesn't exist, redirect to a page to select user type
        return NextResponse.redirect(`${requestUrl.origin}/select-user-type`)
      }

      // User type exists, redirect to appropriate dashboard
      switch (data.user_type) {
        case "agency":
          return NextResponse.redirect(`${requestUrl.origin}/dashboard/agency`)
        case "guide":
          return NextResponse.redirect(`${requestUrl.origin}/dashboard/guide`)
        case "tourist":
        case "visitor":
          return NextResponse.redirect(`${requestUrl.origin}/dashboard/user`)
        default:
          return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
      }
    }
  }

  // Something went wrong, redirect to home page
  return NextResponse.redirect(requestUrl.origin)
}

