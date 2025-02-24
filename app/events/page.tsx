"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Search, Star, Users } from "lucide-react"

// Mock data for events
const events = [
  {
    id: 1,
    name: "Marrakech International Film Festival",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-wendy-wei-1190297.jpg-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5",
    date: "2024-11-24",
    time: "18:00",
    location: "Marrakech",
    price: "Paid",
    category: "Cultural",
    organizer: "Marrakech Film Foundation",
    description: "Annual film festival showcasing international and Moroccan cinema.",
    rating: 4.8,
    reviewCount: 320,
  },
  {
    id: 2,
    name: "Fes Festival of World Sacred Music",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-wendy-wei-1190298.jpg-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5",
    date: "2024-06-14",
    time: "20:00",
    location: "Fes",
    price: "Paid",
    category: "Music",
    organizer: "Fes-Saiss Association",
    description: "A celebration of diverse spiritual and sacred music traditions from around the world.",
    rating: 4.9,
    reviewCount: 450,
  },
  {
    id: 3,
    name: "Tafraoute Almond Blossom Festival",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-wendy-wei-1190299.jpg-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5",
    date: "2025-02-10",
    time: "10:00",
    location: "Tafraoute",
    price: "Free",
    category: "Cultural",
    organizer: "Tafraoute Tourism Office",
    description: "Annual festival celebrating the blooming of almond trees in the Anti-Atlas mountains.",
    rating: 4.7,
    reviewCount: 180,
  },
  {
    id: 4,
    name: "Essaouira Gnaoua and World Music Festival",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-wendy-wei-1190300.jpg-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5",
    date: "2024-06-27",
    time: "19:00",
    location: "Essaouira",
    price: "Paid",
    category: "Music",
    organizer: "A3 Communication",
    description: "Four-day festival featuring Gnaoua music and world music artists.",
    rating: 4.9,
    reviewCount: 600,
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    const matchesPrice = selectedPrice === "all" || event.price === selectedPrice
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="relative h-[400px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-wendy-wei-1190297.jpg-Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy5"
          alt="Events Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Discover Amazing Events in Morocco</h1>
          <p className="text-xl mb-8 text-center">Find and attend the best events happening near you</p>

          {/* Search Bar */}
          <div className="w-full max-w-4xl px-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search events by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-lg text-gray-900"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Cultural">Cultural</SelectItem>
              <SelectItem value="Music">Music</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPrice} onValueChange={setSelectedPrice}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image src={event.image} alt={event.name} layout="fill" objectFit="cover" />
                <Badge className={`absolute top-2 right-2 ${event.price === "Free" ? "bg-green-500" : "bg-blue-500"}`}>
                  {event.price}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center mb-4">
                  <Users className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{event.organizer}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{event.rating}</span>
                    <span className="ml-1 text-sm text-gray-600">({event.reviewCount} reviews)</span>
                  </div>
                  <Button>View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action for Organizers */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Are you an event organizer?</h2>
          <p className="text-xl text-gray-600 mb-8">Create and promote your events with our powerful tools</p>
          <Link href="/events/create">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Create Your Event
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

