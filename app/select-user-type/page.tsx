"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { redirectToDashboard } from "@/utils/auth"

export default function SelectUserType() {
  const [userType, setUserType] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No user found")

      const { error } = await supabase.from("profiles").upsert({ id: user.id, user_type: userType })

      if (error) throw error

      toast({
        title: "User type set successfully",
        description: "Redirecting to your dashboard...",
      })

      redirectToDashboard(userType, router)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto max-w-md mt-20">
      <h1 className="text-2xl font-bold mb-4">Select Your User Type</h1>
      <form onSubmit={handleSubmit}>
        <Select value={userType} onValueChange={setUserType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="agency">Travel Agency</SelectItem>
            <SelectItem value="guide">Tour Guide</SelectItem>
            <SelectItem value="tourist">Tourist</SelectItem>
            <SelectItem value="visitor">Visitor</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full mt-4">
          Continue
        </Button>
      </form>
    </div>
  )
}

