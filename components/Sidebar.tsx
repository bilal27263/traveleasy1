"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Map, FileText, Calendar, Users, Star, BarChart2, Settings, ChevronRight, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Trips", href: "/dashboard/trips", icon: Map },
  { name: "Content", href: "/dashboard/content", icon: FileText },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Team & Partners", href: "/dashboard/team", icon: Users },
  { name: "Reviews", href: "/dashboard/reviews", icon: Star },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16",
      )}
    >
      <div className="flex items-center justify-center h-16 border-b">
        {isExpanded ? (
          <span className="text-2xl font-semibold text-gray-800">TravelAgency</span>
        ) : (
          <Menu className="w-6 h-6 text-gray-800" />
        )}
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center p-2 text-gray-700 rounded hover:bg-gray-100 transition-all duration-300 ease-in-out",
                  isExpanded ? "justify-start" : "justify-center",
                )}
              >
                <item.icon className="w-5 h-5" />
                {isExpanded && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Button variant="ghost" size="icon" className="m-2" onClick={() => setIsExpanded(!isExpanded)}>
        <ChevronRight className={cn("w-4 h-4 transition-transform", isExpanded ? "transform rotate-180" : "")} />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </div>
  )
}

