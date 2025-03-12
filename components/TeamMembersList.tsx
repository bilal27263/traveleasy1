"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Mail, UserX, Loader2, Users, UserPlus } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function TeamMembersList() {
  // Start with an empty list - no sample data
  const [members, setMembers] = useState<
    Array<{
      id: string
      name: string
      email: string
      role: string
      status: string
      avatar: string
    }>
  >([])
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleResendInvite = async (memberId: string) => {
    setIsLoading(memberId)

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

  const handleRemoveMember = async (memberId: string) => {
    setIsLoading(memberId)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setMembers((prev) => prev.filter((member) => member.id !== memberId))

      toast({
        title: "Member Removed",
        description: "The team member has been removed successfully.",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to remove member. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-6">
        <div className="flex flex-col items-center justify-center py-8">
          <Users className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No team members yet</h3>
          <p className="text-sm text-gray-500 mb-4">Invite team members to collaborate on your agency dashboard</p>
          <Button className="mt-2">
            <UserPlus className="mr-2 h-4 w-4" /> Invite First Team Member
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="capitalize">
                  {member.role}
                </Badge>
                <Badge variant={member.status === "active" ? "default" : "secondary"} className="capitalize">
                  {member.status}
                </Badge>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isLoading === member.id}>
                {isLoading === member.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MoreHorizontal className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleResendInvite(member.id)} disabled={member.status === "active"}>
                <Mail className="mr-2 h-4 w-4" />
                Resend Invitation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRemoveMember(member.id)} className="text-red-600">
                <UserX className="mr-2 h-4 w-4" />
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}

