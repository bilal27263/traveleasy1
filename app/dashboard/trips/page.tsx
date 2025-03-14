"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TripCard } from "@/components/TripCard"
import { Card, CardContent } from "@/components/ui/card"

// Sample data (replace with actual data fetching in a real application)
const trips = [
  {
    id: 1,
    title: "Amazon Rainforest Adventure",
    description: "Explore the lush Amazon rainforest and discover its incredible biodiversity.",
    thumbnail: "/placeholder.svg",
    price: 1200,
    duration: "7 Days",
    location: "Brazil",
    views: 1500,
    clicks: 300,
    bookings: 25,
    rating: 4.8,
    status: "published" as const,
  },
  {
    id: 2,
    title: "Bali Beach Retreat",
    description: "Relax on pristine beaches and immerse yourself in Balinese culture.",
    thumbnail: "/placeholder.svg",
    price: 800,
    duration: "5 Days",
    location: "Indonesia",
    views: 1200,
    clicks: 250,
    bookings: 18,
    rating: 4.6,
    status: "published" as const,
  },
  {
    id: 3,
    title: "Himalayan Trek",
    description: "Challenge yourself with a breathtaking trek through the Himalayas.",
    thumbnail: "/placeholder.svg",
    price: 1500,
    duration: "10 Days",
    location: "Nepal",
    views: 980,
    clicks: 200,
    bookings: 12,
    rating: 4.9,
    status: "draft" as const,
  },
]

// Sample overall page views (replace with actual data in a real application)
const overallPageViews = 5000

export default function TripsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const filteredTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === "recent") return b.id - a.id
    if (sortBy === "popular") return b.bookings - a.bookings
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "views") return b.views - a.views
    if (sortBy === "clicks") return b.clicks - a.clicks
    return 0
  })

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
            <Eye className="w-6 h-6 mr-2 text-blue-500" />
            {overallPageViews.toLocaleString()}
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedTrips.map((trip) => (
          <TripCard key={trip.id} {...trip} />
        ))}
      </div>
    </div>
  )
}

