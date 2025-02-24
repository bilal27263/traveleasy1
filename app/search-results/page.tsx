/* eslint-disable react/no-unescaped-entities */ 

"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchBar } from "@/components/search-bar"
import { Star } from "lucide-react"

// Mock data for search results
const mockResults = {
  trips: [
    { id: 1, title: "Marrakesh City Tour", image: "/placeholder-marrakesh.jpg", price: 75, rating: 4.8, reviews: 120 },
    { id: 2, title: "Sahara Desert Adventure", image: "/placeholder-sahara.jpg", price: 150, rating: 4.9, reviews: 85 },
  ],
  guides: [
    {
      id: 1,
      name: "Mohammed",
      image: "/placeholder-guide.jpg",
      specialty: "Photography",
      location: "Rabat",
      rating: 4.7,
      reviews: 56,
    },
    {
      id: 2,
      name: "Fatima",
      image: "/placeholder-guide.jpg",
      specialty: "History",
      location: "Fes",
      rating: 4.9,
      reviews: 78,
    },
  ],
  destinations: [
    { id: 1, name: "Chefchaouen", image: "/placeholder-chefchaouen.jpg", description: "The Blue Pearl of Morocco" },
    { id: 2, name: "Essaouira", image: "/placeholder-essaouira.jpg", description: "Coastal charm and rich history" },
  ],
  events: [
    {
      id: 1,
      title: "Fes Festival of World Sacred Music",
      image: "/placeholder-fes-festival.jpg",
      date: "2024-06-14",
      location: "Fes",
    },
    {
      id: 2,
      title: "Marrakech International Film Festival",
      image: "/placeholder-marrakech-festival.jpg",
      date: "2024-11-29",
      location: "Marrakech",
    },
  ],
  community: [
    { id: 1, title: "Best restaurants in Casablanca?", author: "TravelLover123", replies: 15, views: 230 },
    { id: 2, title: "Tips for haggling in the souks", author: "MoroccoExplorer", replies: 28, views: 412 },
  ],
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")

  // In a real application, you would fetch results based on the query
  // For now, we'll just use the mock data
  const results = mockResults

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>

      <div className="mb-6">
        <SearchBar />
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="trips">Trips</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price_low">Price: Low to High</SelectItem>
            <SelectItem value="price_high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.trips.map((trip) => (
          <Card key={trip.id}>
            <CardContent className="p-4">
              <Image src={trip.image} alt={trip.title} width={300} height={200} className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1">{trip.rating}</span>
                <span className="ml-1 text-sm text-gray-600">({trip.reviews} reviews)</span>
              </div>
              <p className="text-lg font-bold">${trip.price}</p>
              <Button className="w-full mt-4">View Details</Button>
            </CardContent>
          </Card>
        ))}
        {results.guides.map((guide) => (
          <Card key={guide.id}>
            <CardContent className="p-4">
              <Image src={guide.image} alt={guide.name} width={300} height={200} className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">{guide.name}</h3>
              <p className="text-gray-600 mb-2">
                {guide.specialty} in {guide.location}
              </p>
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1">{guide.rating}</span>
                <span className="ml-1 text-sm text-gray-600">({guide.reviews} reviews)</span>
              </div>
              <Button className="w-full mt-4">View Profile</Button>
            </CardContent>
          </Card>
        ))}
        {results.destinations.map((destination) => (
          <Card key={destination.id}>
            <CardContent className="p-4">
              <Image
                src={destination.image}
                alt={destination.name}
                width={300}
                height={200}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
              <p className="text-gray-600 mb-4">{destination.description}</p>
              <Button className="w-full">Explore</Button>
            </CardContent>
          </Card>
        ))}
        {results.events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4">
              <Image src={event.image} alt={event.title} width={300} height={200} className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">{event.date}</p>
              <p className="text-gray-600 mb-4">{event.location}</p>
              <Button className="w-full">Learn More</Button>
            </CardContent>
          </Card>
        ))}
        {results.community.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-2">Posted by: {post.author}</p>
              <p className="text-gray-600 mb-4">
                {post.replies} replies · {post.views} views
              </p>
              <Button className="w-full">Join Discussion</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

