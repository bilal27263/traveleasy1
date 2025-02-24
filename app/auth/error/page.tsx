/* eslint-disable @typescript-eslint/no-explicit-any */ 

"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function AuthError() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const error = searchParams?.get("error")
  const errorDescription = searchParams?.get("error_description")
  const email = searchParams?.get("email")

  const handleResendConfirmation = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email address is required. Please sign up again.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      })

      if (error) throw error

      toast({
        title: "Confirmation email sent",
        description: "Please check your email for the new confirmation link.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend confirmation email.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <CardTitle className="text-2xl">Authentication Error</CardTitle>
          </div>
          <CardDescription>
            {errorDescription?.replace(/\+/g, " ") || "An error occurred during authentication"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error === "access_denied" && errorDescription?.includes("expired") && (
            <>
              <p className="text-sm text-muted-foreground">
                Your confirmation link has expired. Would you like us to send you a new one?
              </p>
              <Button onClick={handleResendConfirmation} className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Resend Confirmation Email"}
              </Button>
            </>
          )}
          <div className="text-center text-sm">
            <Link href="/sign-in" className="text-primary hover:underline">
              Return to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

