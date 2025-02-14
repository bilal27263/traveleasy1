"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { UserProfilePicture } from "@/components/UserProfilePicture"

interface SearchUser extends User {
  relevanceScore: number
}

const sampleUsers: SearchUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    profilePicture: "/placeholder-user.jpg",
    isVerified: true,
    relevanceScore: 0.9,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    profilePicture: "/placeholder-user.jpg",
    isVerified: false,
    relevanceScore: 0.8,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    profilePicture: "/placeholder-user.jpg",
    isVerified: true,
    relevanceScore: 0.7,
  },
]

export function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = sampleUsers
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      // Prioritize verified users
      if (a.isVerified && !b.isVerified) return -1
      if (!a.isVerified && b.isVerified) return 1
      // If verification status is the same, sort by relevance score
      return b.relevanceScore - a.relevanceScore
    })

  return (
    <div className="space-y-4">
      <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <ul className="space-y-2">
        {filteredUsers.map((user) => (
          <li key={user.id} className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow">
            <UserProfilePicture src={user.profilePicture} alt={user.name} isVerified={user.isVerified} />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

