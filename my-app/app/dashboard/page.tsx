"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Map, FileText, Calendar, Users, Star, BarChart2, Settings } from "lucide-react"

const dashboardButtons = [
  { name: "Home", icon: Home, href: "/dashboard" },
  { name: "Trips", icon: Map, href: "/dashboard/trips" },
  { name: "Content", icon: FileText, href: "/dashboard/content" },
  { name: "Events", icon: Calendar, href: "/dashboard/events" },
  { name: "Customers", icon: Users, href: "/dashboard/customers" },
  { name: "Reviews", icon: Star, href: "/dashboard/reviews" },
  { name: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [activeButton, setActiveButton] = useState("Home")

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        router.push("/")
      }
    }
    fetchUser()
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p>Email: {user.email}</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {dashboardButtons.map((button) => (
          <Link key={button.name} href={button.href}>
            <Button
              variant={activeButton === button.name ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setActiveButton(button.name)}
            >
              <button.icon className="mr-2 h-4 w-4" />
              {button.name}
            </Button>
          </Link>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Select a section from the buttons above to manage your travel agency.</p>
        </CardContent>
      </Card>
      <Button className="mt-4" onClick={() => router.push("/")}>
        Back to Home
      </Button>
    </div>
  )
}

