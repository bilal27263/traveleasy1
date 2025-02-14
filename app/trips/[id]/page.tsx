"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewCarousel } from "@/components/review-carousel"
import { BookingForm } from "@/components/booking-form"
import { Star, Clock, MapPin, Users, CalendarDays, Building } from "lucide-react"

// Mock data for the trip
const tripData = {
  id: "1",
  title: "Marrakech City Tour",
  images: ["/trips/marrakech-1.jpg", "/trips/marrakech-2.jpg", "/trips/marrakech-3.jpg"],
  rating: 4.8,
  reviewCount: 120,
  duration: "1 day",
  location: "Marrakech, Morocco",
  groupSize: "2-15 people",
  startDates: "Daily",
  description:
    "Explore the vibrant city of Marrakech on this full-day tour. Visit iconic landmarks, wander through the bustling souks, and immerse yourself in the rich culture and history of this ancient city.",
  price: 75,
  currency: "USD",
  organizer: {
    id: "morocco-adventures",
    name: "Morocco Adventures",
    logo: "/logos/morocco-adventures.png",
  },
}

const reviews = [
  {
    id: "1",
    user: { name: "John Doe", avatar: "/avatars/john.jpg" },
    rating: 5,
    text: "Amazing tour! The guide was knowledgeable and friendly. Highly recommend!",
  },
  {
    id: "2",
    user: { name: "Jane Smith", avatar: "/avatars/jane.jpg" },
    rating: 4,
    text: "Great experience overall. The medina was fascinating, but it was a bit rushed.",
  },
  {
    id: "3",
    user: { name: "Mike Johnson", avatar: "/avatars/mike.jpg" },
    rating: 5,
    text: "Unforgettable day in Marrakech. The colors, smells, and sounds were incredible!",
  },
]

const relatedTrips = [
  { id: "2", title: "Atlas Mountains Day Trip", image: "/trips/atlas-mountains.jpg", price: 89 },
  { id: "3", title: "Essaouira Beach Getaway", image: "/trips/essaouira.jpg", price: 95 },
  { id: "4", title: "Sahara Desert Adventure", image: "/trips/sahara-desert.jpg", price: 150 },
]

export default function TripDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <Link href="/trips" className="text-orange-500 hover:underline">
          ← Back to All Trips
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="relative h-96 mb-4">
            <Image
              src={tripData.images[currentImageIndex]}
              alt={tripData.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-center">
              {tripData.images.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 ${index === currentImageIndex ? "bg-white" : "bg-gray-400"}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">{tripData.title}</h1>

          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold">{tripData.rating}</span>
            <span className="ml-1 text-gray-600">({tripData.reviewCount} reviews)</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span>{tripData.duration}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <span>{tripData.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-2" />
              <span>{tripData.groupSize}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 text-gray-400 mr-2" />
              <span>{tripData.startDates}</span>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <Building className="h-5 w-5 text-gray-400 mr-2" />
            <span className="mr-2">Organized by:</span>
            <Link href={`/travel-agencies/${tripData.organizer.id}`} className="flex items-center">
              <Image
                src={tripData.organizer.logo}
                alt={tripData.organizer.name}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
              <span className="text-orange-500 hover:underline">{tripData.organizer.name}</span>
            </Link>
          </div>

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="included">What's Included</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p>{tripData.description}</p>
            </TabsContent>
            <TabsContent value="itinerary">
              <p>Detailed itinerary information would go here...</p>
            </TabsContent>
            <TabsContent value="included">
              <p>Information about what's included in the trip would go here...</p>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Book This Trip</h2>
              <p className="text-3xl font-bold mb-6">
                {tripData.currency} {tripData.price} <span className="text-sm font-normal">per person</span>
              </p>
              <BookingForm basePrice={tripData.price} />
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="my-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        <ReviewCarousel reviews={reviews} />
        <div className="text-center mt-4">
          <Button variant="outline">Read All Reviews</Button>
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold mb-4">Related Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedTrips.map((trip) => (
            <Card key={trip.id}>
              <CardContent className="p-4">
                <Image src={trip.image} alt={trip.title} width={300} height={200} className="rounded-lg mb-4" />
                <h3 className="text-lg font-semibold mb-2">{trip.title}</h3>
                <p className="text-xl font-bold text-orange-500">
                  {tripData.currency} {trip.price}
                </p>
                <Button className="w-full mt-4">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

