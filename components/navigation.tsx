"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"
import { AuthPopup } from "./auth-popup"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

export function Navigation() {
  const pathname = usePathname()
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const [user, setUser] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const isActive = (path: string) => {
    return pathname === path ? "text-orange-500 underline" : "text-gray-600 hover:text-orange-500"
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          TravelEasy
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/destinations" className={isActive("/destinations")}>
            Destinations
          </Link>
          <Link href="/travel-agencies" className={isActive("/travel-agencies")}>
            Travel Agencies
          </Link>
          <Link href="/guides" className={isActive("/guides")}>
            Guides
          </Link>
          <Link href="/your-trip" className={isActive("/your-trip")}>
            Your Trip
          </Link>
          <Link href="/win-trip" className={isActive("/win-trip")}>
            <Gift className="w-4 h-4 mr-1 inline-block" />
            Win Trip
          </Link>
          <Link href="/events" className={isActive("/events")}>
            Events
          </Link>
          <Link href="/community" className={isActive("/community")}>
            Community
          </Link>
          <div className="space-x-2">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Button onClick={handleLogout}>Log Out</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowAuthPopup(true)}>
                  Sign Up
                </Button>
                <Button onClick={() => setShowAuthPopup(true)}>Log In</Button>
              </>
            )}
          </div>
        </div>
      </div>
      <AuthPopup open={showAuthPopup} onOpenChange={setShowAuthPopup} />
    </nav>
  )
}

