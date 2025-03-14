"use client"

import type { Customer } from "@/app/dashboard/customers/page"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar, Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { formatDistanceToNow } from "date-fns"

interface CustomerCardProps {
  customer: Customer
  onViewDetails: () => void
  onEmail: () => void
  onCall: () => void
  onMessage: () => void
}

export function CustomerCard({ customer, onViewDetails, onEmail, onCall, onMessage }: CustomerCardProps) {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Get the latest trip (if any)
  const latestTrip =
    customer.trips.length > 0
      ? customer.trips.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())[0]
      : null

  // Calculate time since joined
  const timeAgo = formatDistanceToNow(new Date(customer.dateJoined), { addSuffix: true })

  // Status color based on customer status
  const statusColor = customer.status === "active" ? "bg-green-500" : "bg-gray-400"

  return (
    <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="p-6 pb-0">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage src={customer.profileImage} alt={customer.name} />
              <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
            </Avatar>
            <div
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${statusColor} border-2 border-white`}
            ></div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="font-semibold text-lg truncate">{customer.name}</h3>
              <Badge variant={customer.status === "active" ? "default" : "secondary"} className="text-xs">
                {customer.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="text-sm text-gray-500 flex flex-col gap-1 mt-1">
              <div className="flex items-center">
                <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
                <span className="truncate">{customer.email}</span>
              </div>

              {customer.phone && (
                <div className="flex items-center">
                  <Phone className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span>{customer.phone}</span>
                </div>
              )}

              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-2 flex-shrink-0" />
                <span>Joined {timeAgo}</span>
              </div>

              {customer.location && (
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="truncate">{customer.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm font-medium">Trip Information</div>
          {latestTrip ? (
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <div className="font-medium text-sm truncate">{latestTrip.title}</div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>
                  {new Date(latestTrip.startDate).toLocaleDateString()} -{" "}
                  {new Date(latestTrip.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <Badge
                  variant={
                    latestTrip.status === "upcoming"
                      ? "default"
                      : latestTrip.status === "completed"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {latestTrip.status.charAt(0).toUpperCase() + latestTrip.status.slice(1)}
                </Badge>
                <span className="text-sm font-semibold">${latestTrip.price.toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm text-gray-500 text-center">No trips registered</div>
          )}
          <div className="text-xs text-gray-500 mt-2">
            {customer.trips.length} trip{customer.trips.length !== 1 ? "s" : ""} total
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-6">
        <Button variant="outline" size="sm" onClick={onViewDetails}>
          View Details
        </Button>

        <TooltipProvider>
          <div className="flex items-center gap-2">
            {customer.email && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onEmail}>
                    <Mail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Email Customer</p>
                </TooltipContent>
              </Tooltip>
            )}

            {customer.phone && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onCall}>
                    <Phone className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Call Customer</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onMessage}>
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Message Customer</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

