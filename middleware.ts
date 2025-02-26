/* eslint-disable @typescript-eslint/no-unused-vars */

// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
// import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"


export async function middleware(req: NextRequest) {
  // const res = NextResponse.next()
  //const supabase = createMiddlewareClient({ req, res })

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()

  // Add your middleware logic here
  // For example, you can redirect unauthenticated users trying to access protected routes

  // return res
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

