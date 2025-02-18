"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmationSuccess() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Account Confirmed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Your account has been successfully confirmed. You will be redirected to the dashboard in 5 seconds.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

