"use client"

import type { Customer, Trip } from "@/app/dashboard/customers/page"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Mail, MapPin, MessageSquare, Phone, Globe } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CustomerDetailsDialogProps {
  customer: Customer
  open: boolean
  onClose: () => void
  onEmail: () => void
  onCall: () => void
  onMessage: () => void
}

export function CustomerDetailsDialog({
  customer,
  open,
  onClose,
  onEmail,
  onCall,
  onMessage,
}: CustomerDetailsDialogProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const upcomingTrips = customer.trips.filter((trip) => trip.status === "upcoming")
  const completedTrips = customer.trips.filter((trip) => trip.status === "completed")
  const cancelledTrips = customer.trips.filter((trip) => trip.status === "cancelled")

  // Calculate total spent
  const totalSpent = completedTrips.reduce((sum, trip) => sum + trip.price, 0)

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>View complete customer information and trip history</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {/* Customer profile section */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={customer.profileImage} alt={customer.name} />
                <AvatarFallback className="text-3xl">{getInitials(customer.name)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{customer.name}</h2>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                      {customer.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-gray-500">
                    Customer since {format(new Date(customer.dateJoined), "MMMM d, yyyy")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <a href={`mailto:${customer.email}`} className="text-blue-600 hover:underline">
                        {customer.email}
                      </a>
                    </div>

                    {customer.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <a href={`tel:${customer.phone}`} className="hover:underline">
                          {customer.phone}
                        </a>
                      </div>
                    )}

                    {customer.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{customer.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    {customer.preferredLanguage && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Speaks {customer.preferredLanguage}</span>
                      </div>
                    )}

                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>
                        {customer.trips.length} Trip{customer.trips.length !== 1 ? "s" : ""} Total
                      </span>
                    </div>

                    {completedTrips.length > 0 && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Total Spent: ${totalSpent.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Trip history section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Trip Information</h3>

              <Tabs defaultValue="all">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="all">All ({customer.trips.length})</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming ({upcomingTrips.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedTrips.length})</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled ({cancelledTrips.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <TripsList trips={customer.trips} />
                </TabsContent>

                <TabsContent value="upcoming">
                  <TripsList trips={upcomingTrips} />
                </TabsContent>

                <TabsContent value="completed">
                  <TripsList trips={completedTrips} />
                </TabsContent>

                <TabsContent value="cancelled">
                  <TripsList trips={cancelledTrips} />
                </TabsContent>
              </Tabs>
            </div>

            <Separator />

            {/* Notes section - could be expanded in the future */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Notes & Additional Information</h3>
              <Card>
                <CardContent className="p-4 text-gray-500 italic text-center">No customer notes available</CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-between items-center pt-4 gap-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>

          <div className="flex gap-2">
            {customer.email && (
              <Button onClick={onEmail} variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            )}

            {customer.phone && (
              <Button onClick={onCall} variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            )}

            <Button onClick={onMessage}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface TripsListProps {
  trips: Trip[]
}

function TripsList({ trips }: TripsListProps) {
  if (trips.length === 0) {
    return <div className="text-center py-8 text-gray-500">No trips in this category</div>
  }

  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <Card key={trip.id}>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <h4 className="font-semibold">{trip.title}</h4>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {format(new Date(trip.startDate), "MMM d, yyyy")} - {format(new Date(trip.endDate), "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              <div className="flex items-start mt-2 sm:mt-0 gap-3">
                <Badge
                  variant={
                    trip.status === "upcoming" ? "default" : trip.status === "completed" ? "secondary" : "destructive"
                  }
                >
                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                </Badge>
                <span className="font-semibold">${trip.price.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

