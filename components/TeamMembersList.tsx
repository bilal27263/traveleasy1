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
import { Check, Loader2, MoreHorizontal, Send, Trash2 } from "lucide-react"
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

// This would come from your API in a real application
const initialTeamMembers = [
  {
    id: "1",
    email: "jane@example.com",
    name: "Jane Cooper",
    role: "administrator",
    status: "active",
    joinedAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "2",
    email: "alex@example.com",
    name: "Alex Smith",
    role: "editor",
    status: "pending",
    joinedAt: null,
  },
]

type TeamMember = {
  id: string
  email: string
  name: string
  role: string
  status: "active" | "pending"
  joinedAt: string | null
}

interface TeamMembersListProps {
  onActionSuccess: (message: string) => void
  onActionError: (message: string) => void
}

export function TeamMembersList({ onActionSuccess, onActionError }: TeamMembersListProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [actionInProgress, setActionInProgress] = useState<string | null>(null)

  // Simulating data fetch on component mount
  useState(() => {
    setTeamMembers([])
  })

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const resendInvitation = async (member: TeamMember) => {
    setActionInProgress(member.id)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onActionSuccess(`Invitation resent to ${member.name}`)
    } catch (error) {
      onActionError("Failed to resend invitation")
    } finally {
      setActionInProgress(null)
    }
  }

  const removeMember = async (member: TeamMember) => {
    setActionInProgress(member.id)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setTeamMembers(teamMembers.filter((m) => m.id !== member.id))
      onActionSuccess(`${member.name} has been removed`)
    } catch (error) {
      onActionError("Failed to remove team member")
    } finally {
      setActionInProgress(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center text-sm text-gray-500">
          {teamMembers.length} team member{teamMembers.length !== 1 ? "s" : ""}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : teamMembers.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-1">No team members yet</h3>
          <p className="text-gray-500 mb-4">Invite team members to collaborate on your travel agency.</p>
          <div className="flex justify-center">
            <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Invite Team Member</Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={member.status === "active" ? "default" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      {member.status === "active" ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                      )}
                      {member.status === "active" ? "Active" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {member.joinedAt ? (
                      new Date(member.joinedAt).toLocaleDateString()
                    ) : (
                      <span className="text-gray-500">Not joined yet</span>
                    )}
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
                        {member.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() => resendInvitation(member)}
                            disabled={actionInProgress === member.id}
                          >
                            {actionInProgress === member.id ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4 mr-2" />
                            )}
                            Resend Invitation
                          </DropdownMenuItem>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove team member</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove {member.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => removeMember(member)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                {actionInProgress === member.id ? (
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

