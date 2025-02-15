"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Map, FileText, Calendar, Users, Star, BarChart2, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/auth"

const commonSidebarItems = [
  { name: "Overview", icon: Home, href: "/dashboard" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

const agencySidebarItems = [
  { name: "Trips", icon: Map, href: "/dashboard/trips" },
  { name: "Content", icon: FileText, href: "/dashboard/content" },
  { name: "Events", icon: Calendar, href: "/dashboard/events" },
  { name: "Customers", icon: Users, href: "/dashboard/customers" },
  { name: "Reviews", icon: Star, href: "/dashboard/reviews" },
  { name: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
]

const guideSidebarItems = [
  { name: "My Tours", icon: Map, href: "/dashboard/tours" },
  { name: "Bookings", icon: Calendar, href: "/dashboard/bookings" },
  { name: "Reviews", icon: Star, href: "/dashboard/reviews" },
]

const userSidebarItems = [
  { name: "My Trips", icon: Map, href: "/dashboard/trips" },
  { name: "Bookings", icon: Calendar, href: "/dashboard/bookings" },
  { name: "Reviews", icon: Star, href: "/dashboard/reviews" },
]

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [userType, setUserType] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        router.push("/")
      } else {
        const { data, error } = await supabase.from("profiles").select("user_type").eq("id", user.id).single()
        if (error) {
          console.error("Error fetching user type:", error)
          router.push("/")
        } else {
          setUserType(data.user_type)
        }
      }
    }
    fetchUserData()
  }, [router, user])

  const handleSignOut = async () => {
    const success = await logout()
    if (success) {
      router.push("/")
    } else {
      // Handle error
      console.error("Failed to log out")
    }
  }

  if (!user || !userType) {
    return <div>Loading...</div>
  }

  const getSidebarItems = () => {
    switch (userType) {
      case "agency":
        return [...commonSidebarItems, ...agencySidebarItems]
      case "guide":
        return [...commonSidebarItems, ...guideSidebarItems]
      case "tourist":
      case "visitor":
        return [...commonSidebarItems, ...userSidebarItems]
      default:
        return commonSidebarItems
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Travel Easy</h1>
        </div>
        <nav className="mt-6">
          {getSidebarItems().map((item) => (
            <Link key={item.name} href={item.href}>
              <span className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.user_metadata.avatar_url} />
              <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{user.email}</span>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}

