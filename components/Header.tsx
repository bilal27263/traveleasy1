"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, User, MessageSquare, Star, UserPlus, AlertCircle, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VerifyButton } from "@/components/VerifyButton"
import { VerificationPromo } from "@/components/VerificationPromo"
import { useUser } from "@/hooks/useUser"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function Header() {
  const { user, verifyUser } = useUser()
  const [showPromo, setShowPromo] = useState(false)

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "new-customer",
      title: "New Customer",
      message: "John Doe has registered for a trip",
      time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
      link: "/dashboard/customers",
    },
    {
      id: "2",
      type: "new-review",
      title: "New Review",
      message: "Sarah Smith left a 5-star review",
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      link: "/dashboard/reviews",
    },
    {
      id: "3",
      type: "like",
      title: "New Like",
      message: 'Your post "Amazon Adventure" received 10 likes',
      time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
      link: "/dashboard/content",
    },
    {
      id: "4",
      type: "comment",
      title: "New Comment",
      message: "Michael Brown commented on your trip",
      time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: true,
      link: "/dashboard/trips",
    },
    {
      id: "5",
      type: "account",
      title: "Account Activity",
      message: "Your account settings were updated",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      link: "/dashboard/settings",
    },
  ])

  // Filter unread notifications
  const unreadNotifications = notifications.filter((notification) => !notification.read)

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + " years ago"

    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"

    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"

    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"

    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + " minutes ago"

    return Math.floor(seconds) + " seconds ago"
  }

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new-customer":
        return <UserPlus className="h-4 w-4 text-white" />
      case "new-review":
        return <Star className="h-4 w-4 text-white" />
      case "like":
        return <ThumbsUp className="h-4 w-4 text-white" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-white" />
      case "account":
        return <AlertCircle className="h-4 w-4 text-white" />
      default:
        return <Bell className="h-4 w-4 text-white" />
    }
  }

  // Get notification background color based on type
  const getNotificationColor = (type: string) => {
    switch (type) {
      case "new-customer":
        return "bg-green-500"
      case "new-review":
        return "bg-yellow-500"
      case "like":
        return "bg-blue-500"
      case "comment":
        return "bg-purple-500"
      case "account":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Handle notification click
  const handleNotificationClick = (notification: any) => {
    // Mark as read
    setNotifications(notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))

    // Navigate to the relevant page (in a real app)
    console.log(`Navigating to: ${notification.link}`)
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleShowPromo = () => {
    setShowPromo(true)
  }

  const handleDismissPromo = () => {
    setShowPromo(false)
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Travel Agency Dashboard</h2>
          <div className="flex items-center">
            <VerifyButton isVerified={user.isVerified} onVerify={verifyUser} onPromoClick={handleShowPromo} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2 relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                      {unreadNotifications.length > 9 ? "9+" : unreadNotifications.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadNotifications.length > 0 && (
                    <Button variant="ghost" size="sm" className="h-auto text-xs px-2 py-1" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-sm text-gray-500">No notifications yet</div>
                ) : (
                  <ScrollArea className="h-[300px]">
                    {notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={cn("flex items-start gap-2 p-3 cursor-pointer", !notification.read && "bg-muted/50")}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                            getNotificationColor(notification.type),
                          )}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{notification.title}</p>
                          <p className="text-xs text-gray-500">{notification.message}</p>
                          <p className="text-xs text-gray-400">{formatTimeAgo(notification.time)}</p>
                        </div>
                        {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                      </DropdownMenuItem>
                    ))}
                  </ScrollArea>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/settings?tab=notifications"
                    className="cursor-pointer justify-center text-center text-sm"
                  >
                    Notification Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="ml-2">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {showPromo && (
        <VerificationPromo isVerified={user.isVerified} onVerify={verifyUser} onDismiss={handleDismissPromo} />
      )}
    </header>
  )
}

