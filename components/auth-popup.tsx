"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChromeIcon as Google, Apple } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { redirectToDashboard } from "@/utils/auth"

interface AuthPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: "signup" | "login"
}

export function AuthPopup({ open, onOpenChange, initialMode = "signup" }: AuthPopupProps) {
  const [mode, setMode] = useState<"signup" | "login">(initialMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              user_type: userType,
            },
          },
        })
        if (error) throw error
        toast({
          title: "Sign up successful",
          description: "Please check your email for verification.",
        })
        redirectToDashboard(userType, router)
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        const { data: userData, error: userError } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", data.user.id)
          .single()
        if (userError) throw userError
        toast({
          title: "Login successful",
          description: "Welcome back!",
        })
        redirectToDashboard(userData.user_type, router)
      }
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSocialAuth = async (provider: "google" | "apple") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      // Redirection will be handled in the callback route
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "signup" ? "Sign Up" : "Log In"}</DialogTitle>
          <DialogDescription>
            {mode === "signup"
              ? "Create an account to access all features."
              : "Welcome back! Please log in to your account."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {mode === "signup" && (
              <div className="grid gap-2">
                <Label htmlFor="userType">User Type</Label>
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
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : mode === "signup" ? "Sign Up" : "Log In"}
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" onClick={() => handleSocialAuth("google")}>
            <Google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" onClick={() => handleSocialAuth("apple")}>
            <Apple className="mr-2 h-4 w-4" />
            Apple
          </Button>
        </div>
        <div className="text-center mt-4">
          <Button
            variant="link"
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="text-sm text-gray-600 hover:text-orange-500"
          >
            {mode === "signup" ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

