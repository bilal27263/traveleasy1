"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Mail, UserX, Calendar, Loader2, Handshake, Users } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function PartnersList() {
  // Start with an empty list - no sample data
  const [partners, setPartners] = useState<
    Array<{
      id: string
      name: string
      contactPerson: string
      email: string
      type: string
      expertise: string
      status: string
      avatar: string
    }>
  >([])
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleResendInvite = async (partnerId: string) => {
    setIsLoading(partnerId)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Invitation Resent",
        description: "The invitation has been resent successfully.",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to resend invitation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  const handleRemovePartner = async (partnerId: string) => {
    setIsLoading(partnerId)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setPartners((prev) => prev.filter((partner) => partner.id !== partnerId))

      toast({
        title: "Partner Removed",
        description: "The partner has been removed successfully.",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to remove partner. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  const handleAssignToTrip = async (partnerId: string) => {
    setIsLoading(partnerId)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Success",
        description: "Partner has been assigned to the trip.",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to assign partner to trip. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  if (partners.length === 0) {
    return (
      <div className="text-center py-6">
        <div className="flex flex-col items-center justify-center py-8">
          <Handshake className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No partners or guides yet</h3>
          <p className="text-sm text-gray-500 mb-4">
            Invite external partners and guides to help with your travel experiences
          </p>
          <Button className="mt-2">
            <Users className="mr-2 h-4 w-4" /> Invite First Partner
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {partners.map((partner) => (
        <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={partner.avatar} alt={partner.name} />
              <AvatarFallback>{partner.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{partner.name}</h3>
              <p className="text-sm text-gray-500">{partner.contactPerson}</p>
              <p className="text-sm text-gray-500">{partner.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="capitalize">
                  {partner.type.replace("_", " ")}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {partner.expertise}
                </Badge>
                <Badge variant={partner.status === "active" ? "default" : "secondary"} className="capitalize">
                  {partner.status}
                </Badge>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isLoading === partner.id}>
                {isLoading === partner.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MoreHorizontal className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleResendInvite(partner.id)} disabled={partner.status === "active"}>
                <Mail className="mr-2 h-4 w-4" />
                Resend Invitation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAssignToTrip(partner.id)} disabled={partner.status !== "active"}>
                <Calendar className="mr-2 h-4 w-4" />
                Assign to Trip
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRemovePartner(partner.id)} className="text-red-600">
                <UserX className="mr-2 h-4 w-4" />
                Remove Partner
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}

