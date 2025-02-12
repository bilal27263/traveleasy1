"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Clock, MapPin, Share2 } from "lucide-react"
import { AuthPopup } from "@/components/auth-popup"

interface Trip {
  id: string
  title: string
  image: string
  rating: number
  reviewCount: number
  duration: string
  location: string
  price: number
  activities: string[]
}

const trips: Trip[] = [
  {
    id: "1",
    title: "Marrakech City Tour",
    image: "/trips/marrakech-city-tour.jpg",
    rating: 4.8,
    reviewCount: 120,
    duration: "1 day",
    location: "Marrakech",
    price: 75,
    activities: ["Cultural", "Sightseeing"],
  },
  {
    id: "2",
    title: "Sahara Desert Adventure",
    image: "/trips/sahara-desert-adventure.jpg",
    rating: 4.9,
    reviewCount: 85,
    duration: "3 days",
    location: "Merzouga",
    price: 299,
    activities: ["Adventure", "Nature"],
  },
  {
    id: "3",
    title: "Fes Medina Explorer",
    image: "/trips/fes-medina-explorer.jpg",
    rating: 4.7,
    reviewCount: 95,
    duration: "1 day",
    location: "Fes",
    price: 65,
    activities: ["Cultural", "Shopping"],
  },
  // Add more trips as needed
]

export default function TripListingsPage() {
  const { slug } = useParams<{ slug: string }>()
  const [filteredTrips, setFilteredTrips] = useState(trips)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showAuthPopup, setShowAuthPopup] = useState(false)

  const handleFilterChange = (filterType: string, value: string) => {
    let newFilteredTrips = trips

    if (filterType === "duration") {
      newFilteredTrips = newFilteredTrips.filter((trip) => trip.duration === value)
    } else if (filterType === "activity") {
      newFilteredTrips = newFilteredTrips.filter((trip) => trip.activities.includes(value))
    }

    newFilteredTrips = newFilteredTrips.filter((trip) => trip.price >= priceRange[0] && trip.price <= priceRange[1])

    setFilteredTrips(newFilteredTrips)
  }

  const handlePriceRangeChange = (newRange: number[]) => {
    setPriceRange(newRange)
    setFilteredTrips(trips.filter((trip) => trip.price >= newRange[0] && trip.price <= newRange[1]))
  }

  const handleBookNow = () => {
    // Check if user is authenticated (you'll need to implement this check)
    const isAuthenticated = false // Replace with actual authentication check
    if (!isAuthenticated) {
      setShowAuthPopup(true)
    } else {
      // Proceed with booking
      console.log("Booking trip")
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-gray-100 p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">Morocco Adventures</h1>
        <p className="text-xl text-gray-600">Discover the magic of Morocco</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <Select onValueChange={(value) => handleFilterChange("duration", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1 day">1 Day</SelectItem>
            <SelectItem value="3 days">3 Days</SelectItem>
            <SelectItem value="5 days">5 Days</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("activity", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Activity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cultural">Cultural</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Nature">Nature</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-4">
          <span>Price Range:</span>
          <Slider
            min={0}
            max={500}
            step={10}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="w-[200px]"
          />
          <span>
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTrips.map((trip) => (
          <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
              <Image src={trip.image || "/placeholder.svg"} alt={trip.title} layout="fill" objectFit="cover" />
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{trip.title}</h2>
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{trip.rating}</span>
                <span className="ml-1 text-sm text-gray-600">({trip.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span>{trip.location}</span>
              </div>
              <div className="text-2xl font-bold text-orange-500 mb-4">${trip.price}</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {trip.activities.map((activity, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    {activity}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
              <Button onClick={handleBookNow}>Book Now</Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <AuthPopup open={showAuthPopup} onOpenChange={setShowAuthPopup} />
    </div>
  )
}

