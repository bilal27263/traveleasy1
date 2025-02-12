"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChromeIcon as Google, Apple } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

interface AuthPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthPopup({ open, onOpenChange }: AuthPopupProps) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        toast({
          title: "Sign up successful",
          description: "Please check your email for verification.",
        })
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        toast({
          title: "Login successful",
          description: "Welcome back!",
        })
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
      })
      if (error) throw error
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
          <DialogTitle>{isSignUp ? "Sign Up" : "Log In"}</DialogTitle>
          <DialogDescription>
            {isSignUp ? "Create an account to access all features." : "Welcome back! Please log in to your account."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => handleSocialAuth("google")} variant="outline" className="w-full">
            <Google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button onClick={() => handleSocialAuth("apple")} variant="outline" className="w-full">
            <Apple className="mr-2 h-4 w-4" />
            Continue with Apple
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
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
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
            </Button>
          </form>
        </div>
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-gray-600 hover:text-orange-500"
          >
            {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

