"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Gift, Menu } from "lucide-react"
import { AuthPopup } from "./auth-popup"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { redirectToDashboard } from "@/utils/auth"
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog"
import SignIn from "./SignIn"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, userType, refreshUser } = useAuth()
  const { toast } = useToast()
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoginDialogOpen(false)
    refreshUser()
    router.refresh()
  }
  
  const [showAuthPopup, setShowAuthPopup] = useState(false)

  const isActive = (path: string) =>
    pathname === path ? "text-orange-500 underline" : "text-gray-600 hover:text-orange-500"

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
  
      toast({ title: "Logged out successfully", description: "Come back soon!" })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }
  

  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <div>

        {/* Mobile Navigation with Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden rounded-full p-2 w-10 h-10">
              <Menu className="w-8 h-8 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col space-y-4">
              <Link href="/destinations" className={isActive("/destinations")}>Destinations</Link>
              <Link href="/travel-agencies" className={isActive("/travel-agencies")}>Travel Agencies</Link>
              <Link href="/guides" className={isActive("/guides")}>Guides</Link>
              <Link href="/your-trip" className={isActive("/your-trip")}>Your Trip</Link>
              <Link href="/win-trip" className={isActive("/win-trip")}>
                <Gift className="w-4 h-4 mr-1 inline-block" /> Win Trip
              </Link>
              <Link href="/events" className={isActive("/events")}>Events</Link>
              <Link href="/community" className={isActive("/community")}>Community</Link>

              {/* Authentication on Mobile */}
              {/* {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center justify-center w-10 h-10 rounded-full">
                      <Avatar>
                        <AvatarFallback className="bg-orange-600 text-white font-bold">
                          {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => redirectToDashboard(userType, router)}>Dashboard</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Log In</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <SignIn />
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              )} */}
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="text-2xl font-bold text-orange-500">TravelEasy</Link>
        </div>


        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link href="/destinations" className={isActive("/destinations")}>Destinations</Link>
          <Link href="/travel-agencies" className={isActive("/travel-agencies")}>Travel Agencies</Link>
          <Link href="/guides" className={isActive("/guides")}>Guides</Link>
          <Link href="/your-trip" className={isActive("/your-trip")}>Your Trip</Link>
          <Link href="/win-trip" className={isActive("/win-trip")}>
            <Gift className="w-4 h-4 mr-1 inline-block" /> Win Trip
          </Link>
          <Link href="/events" className={isActive("/events")}>Events</Link>
          <Link href="/community" className={isActive("/community")}>Community</Link>
      </div>
          {/* Authentication on Desktop */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center justify-center w-10 h-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-orange-600 text-white font-bold">
                      {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => redirectToDashboard(userType, router)}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setIsLoginDialogOpen(true)}>Log In</Button>
                </DialogTrigger>
                <DialogContent>
                  <SignIn onLoginSuccess={handleLoginSuccess} />
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

      <AuthPopup open={showAuthPopup} onOpenChange={setShowAuthPopup} />
    </nav>
  )
}
