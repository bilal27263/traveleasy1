"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Plane, Train, Car, Star, Share2, BookmarkPlus } from "lucide-react"

const destinationsData = {
  fez: {
    name: "Fez",
    tagline: "The cultural heart of Morocco",
    mainImage: "/placeholder-fez.jpg",
    description:
      "Discover the ancient medina of Fez, a UNESCO World Heritage site and the world's largest car-free urban area. Famous for its traditional tanneries, medieval architecture, and vibrant souks.",
    location: {
      lat: 34.0181,
      lng: -5.0078,
    },
    transport: {
      airports: ["Fès–Saïs Airport (FEZ)"],
      trains: ["Fez Railway Station - connections to Casablanca, Rabat, and Tangier"],
      road: ["4 hours drive from Casablanca", "7 hours from Marrakech"],
    },
    trips: [
      {
        id: 1,
        title: "Medina Walking Tour",
        duration: "4 hours",
        price: 45,
        rating: 4.8,
        reviews: 124,
      },
      {
        id: 2,
        title: "Traditional Crafts Workshop",
        duration: "3 hours",
        price: 65,
        rating: 4.9,
        reviews: 89,
      },
    ],
    events: [
      {
        id: 1,
        title: "Fez Festival of World Sacred Music",
        date: "2024-06-14",
        category: "Cultural",
      },
      {
        id: 2,
        title: "Traditional Pottery Exhibition",
        date: "2024-07-01",
        category: "Art",
      },
    ],
    articles: [
      {
        id: 1,
        title: "Top 10 Hidden Gems in Fez Medina",
        image: "/placeholder-fez-article1.jpg",
        excerpt: "Discover the secret corners and lesser-known attractions...",
      },
      {
        id: 2,
        title: "A Food Lover's Guide to Fez",
        image: "/placeholder-fez-article2.jpg",
        excerpt: "Explore the culinary delights of Morocco's gastronomic capital...",
      },
    ],
    guides: [
      {
        id: 1,
        name: "Hassan",
        expertise: "Cultural Heritage Expert",
        rating: 4.9,
        reviews: 156,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "Fatima",
        expertise: "Local Food Specialist",
        rating: 4.8,
        reviews: 132,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  // Add other destinations similarly
}

export default function DestinationPage() {
  const params = useParams<{ id?: string }>()
  const id = params?.id ?? "default-id"
  const [isSaved, setIsSaved] = useState(false)

  const destination = destinationsData[id as keyof typeof destinationsData]

  if (!destination) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Destination Not Found</h1>
        <Button asChild>
          <Link href="/destinations">Return to Destinations</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <Image src={destination.mainImage} alt={destination.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto h-full flex flex-col justify-end pb-12 text-white">
            <h1 className="text-5xl font-bold mb-4">Explore {destination.name}</h1>
            <p className="text-2xl">{destination.tagline}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{destination.name}</h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>Morocco</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsSaved(!isSaved)}>
                    <BookmarkPlus className={`w-5 h-5 mr-2 ${isSaved ? "fill-current" : ""}`} />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 text-lg">{destination.description}</p>
            </div>

            <Tabs defaultValue="trips" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="trips">Trips</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
              </TabsList>

              <TabsContent value="trips" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.trips.map((trip) => (
                    <Card key={trip.id}>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-gray-600">{trip.duration}</span>
                        </div>
                        <div className="flex items-center mb-4">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1">{trip.rating}</span>
                          <span className="ml-1 text-sm text-gray-600">({trip.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">${trip.price}</span>
                          <Button>Book Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.events.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-gray-600">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <span className="inline-block bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded">
                          {event.category}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="articles" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destination.articles.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image src={article.image} alt={article.title} fill className="object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-4">{article.excerpt}</p>
                        <Button variant="outline">Read More</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="guides" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.guides.map((guide) => (
                    <Card key={guide.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Image src={guide.image} alt={guide.name} width={60} height={60} className="rounded-full" />
                          <div>
                            <h3 className="text-xl font-semibold">{guide.name}</h3>
                            <p className="text-gray-600">{guide.expertise}</p>
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1">{guide.rating}</span>
                              <span className="ml-1 text-sm text-gray-600">({guide.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full mt-4">Contact Guide</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">How to Get There</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Plane className="w-5 h-5 mt-1 text-gray-500" />
                    <div>
                      <h4 className="font-semibold mb-1">By Air</h4>
                      <ul className="text-gray-600 space-y-1">
                        {destination.transport.airports.map((airport, index) => (
                          <li key={index}>{airport}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Train className="w-5 h-5 mt-1 text-gray-500" />
                    <div>
                      <h4 className="font-semibold mb-1">By Train</h4>
                      <ul className="text-gray-600 space-y-1">
                        {destination.transport.trains.map((train, index) => (
                          <li key={index}>{train}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 mt-1 text-gray-500" />
                    <div>
                      <h4 className="font-semibold mb-1">By Road</h4>
                      <ul className="text-gray-600 space-y-1">
                        {destination.transport.road.map((route, index) => (
                          <li key={index}>{route}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6">Plan Your Trip</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

