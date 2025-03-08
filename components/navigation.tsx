"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"
import { AuthPopup } from "./auth-popup"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { redirectToDashboard } from "@/utils/auth"
import { useRouter } from "next/navigation"
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog"
import SignIn from "./SignIn"

export function Navigation() {
  const pathname = usePathname()
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const router = useRouter()
  const { user, userType } = useAuth()
  const { toast } = useToast()

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
      router.push("/")
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      }
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
                <Button variant="outline" onClick={() => redirectToDashboard(userType, router)}>
                  Dashboard
                </Button>
                <Button onClick={handleLogout}>Log Out</Button>
              </>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger>
                    <Button>Log In</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <SignIn />
                  </DialogContent>
                </Dialog>

                <Button variant={'outline'}>
                  <Link href={'/sign-up'}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <AuthPopup open={showAuthPopup} onOpenChange={setShowAuthPopup} />
    </nav>
  )
}

