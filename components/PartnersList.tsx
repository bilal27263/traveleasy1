"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Loader2, MoreHorizontal, Send, Trash2, Languages, Map, Calendar } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// This would come from your API in a real application
const initialPartners = [
  {
    id: "1",
    email: "maria@local-guides.com",
    name: "Maria Rodriguez",
    role: "guide",
    region: "Barcelona, Spain",
    languages: ["English", "Spanish", "Catalan"],
    status: "active",
    joinedAt: "2023-02-10T00:00:00Z",
    trips: 12,
  },
  {
    id: "2",
    email: "jean@parisian-tours.fr",
    name: "Jean Dupont",
    role: "local-expert",
    region: "Paris, France",
    languages: ["English", "French"],
    status: "pending",
    joinedAt: null,
    trips: 0,
  },
]

type Partner = {
  id: string
  email: string
  name: string
  role: string
  region: string
  languages: string[]
  status: "active" | "pending"
  joinedAt: string | null
  trips: number
}

interface PartnersListProps {
  onActionSuccess: (message: string) => void
  onActionError: (message: string) => void
}

export function PartnersList({ onActionSuccess, onActionError }: PartnersListProps) {
  const [partners, setPartners] = useState<Partner[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [loading, setLoading] = useState(false)
  const [actionInProgress, setActionInProgress] = useState<string | null>(null)

  // Simulating data fetch on component mount
  useState(() => {
    setPartners([])
  })

  const filteredPartners = partners.filter(
    (partner) =>
      (partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.region.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (roleFilter === "all" || partner.role === roleFilter),
  )

  const resendInvitation = async (partner: Partner) => {
    setActionInProgress(partner.id)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onActionSuccess(`Invitation resent to ${partner.name}`)
    } catch (error) {
      onActionError("Failed to resend invitation")
    } finally {
      setActionInProgress(null)
    }
  }

  const removePartner = async (partner: Partner) => {
    setActionInProgress(partner.id)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setPartners(partners.filter((p) => p.id !== partner.id))
      onActionSuccess(`${partner.name} has been removed`)
    } catch (error) {
      onActionError("Failed to remove partner")
    } finally {
      setActionInProgress(null)
    }
  }

  const assignTrip = async (partner: Partner) => {
    setActionInProgress(partner.id)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onActionSuccess(`${partner.name} has been assigned to the trip`)
    } catch (error) {
      onActionError("Failed to assign partner to trip")
    } finally {
      setActionInProgress(null)
    }
  }

  const formatRole = (role: string) => {
    return role
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 w-full md:w-auto">
          <Input
            placeholder="Search partners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="guide">Tour Guide</SelectItem>
              <SelectItem value="local-expert">Local Expert</SelectItem>
              <SelectItem value="accommodation-partner">Accommodation Partner</SelectItem>
              <SelectItem value="transportation-partner">Transportation Partner</SelectItem>
              <SelectItem value="experience-provider">Experience Provider</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm text-gray-500">
            {partners.length} partner{partners.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : partners.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-1">No partners yet</h3>
          <p className="text-gray-500 mb-4">Invite partners and guides to collaborate on your travel agency.</p>
          <div className="flex justify-center">
            <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Invite Partner</Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name & Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Languages</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trips</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {partner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{partner.name}</div>
                        <div className="text-sm text-gray-500">{partner.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {formatRole(partner.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Map className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                      {partner.region}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Languages className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                      {partner.languages.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={partner.status === "active" ? "default" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      {partner.status === "active" ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                      )}
                      {partner.status === "active" ? "Active" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                      {partner.trips}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {partner.status === "active" && (
                          <DropdownMenuItem
                            onClick={() => assignTrip(partner)}
                            disabled={actionInProgress === partner.id}
                          >
                            {actionInProgress === partner.id ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Calendar className="h-4 w-4 mr-2" />
                            )}
                            Assign to Trip
                          </DropdownMenuItem>
                        )}

                        {partner.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() => resendInvitation(partner)}
                            disabled={actionInProgress === partner.id}
                          >
                            {actionInProgress === partner.id ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4 mr-2" />
                            )}
                            Resend Invitation
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove partner</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove {partner.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => removePartner(partner)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                {actionInProgress === partner.id ? (
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : null}
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

