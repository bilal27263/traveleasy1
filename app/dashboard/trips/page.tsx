"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, Eye, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function TripsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-900">Trips</h1>
        <Link href="/dashboard/trips/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Trip
          </Button>
        </Link>
      </div>
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <span className="text-lg font-semibold">Overall Page Views</span>
          <span className="text-2xl font-bold flex items-center">
            <Eye className="w-6 h-6 mr-2 text-blue-500" />0
          </span>
        </CardContent>
      </Card>
      <div className="flex space-x-4">
        <Input
          placeholder="Search trips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="popular">Most Booked</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="views">Most Viewed</SelectItem>
            <SelectItem value="clicks">Most Clicked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Map className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">No trips to display</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-md">
          Start adding trips to see them here. Create your first trip to begin attracting bookings.
        </p>
        <Link href="/dashboard/trips/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Trip
          </Button>
        </Link>
      </div>
    </div>
  )
}

