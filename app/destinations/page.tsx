"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Bus, Hotel, Info, Download, Star } from "lucide-react"

const bannerImages = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-salahkuro28-2960752.jpg-xczErBZ51AjXzBTuEStlpsdCpbQwHw.jpeg",
    caption: "Experience the magic of the Sahara",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-yuliya-kosolapova-1535772-3184563.jpg-ZdNK0KcVeUPvQeYtD4OkW4KlwFMRiz.jpeg",
    caption: "Discover coastal adventures",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-wender-junior-souza-vieira-9757411-14267617.jpg-2A3rPQqjc2tyHAe78hyuMBE5DLEpM9.jpeg",
    caption: "Explore ancient kasbahs",
  },
]

const destinations = [
  {
    id: "marrakech",
    name: "Marrakech",
    type: "city",
    region: "Central Morocco",
    image: "/placeholder-marrakech.jpg",
    description: "The Red City with vibrant souks and gardens",
    activities: 45,
    culturalSites: 30,
    startingPrice: 299,
  },
  {
    id: "essaouira",
    name: "Essaouira",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-yuliya-kosolapova-1535772-3184563.jpg-ZdNK0KcVeUPvQeYtD4OkW4KlwFMRiz.jpeg",
    description: "Coastal charm with perfect waves",
    activities: 25,
    culturalSites: 15,
    startingPrice: 199,
  },
  {
    id: "sahara",
    name: "Sahara Desert",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-salahkuro28-2960752.jpg-xczErBZ51AjXzBTuEStlpsdCpbQwHw.jpeg",
    description: "Endless dunes and starlit nights",
    activities: 20,
    culturalSites: 5,
    startingPrice: 399,
  },
]

const attractions = [
  {
    id: 1,
    name: "Hassan II Mosque",
    location: "Casablanca",
    image: "/placeholder.svg?height=200&width=300",
    activities: 25,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Jardin Majorelle",
    location: "Marrakech",
    image: "/placeholder.svg?height=200&width=300",
    activities: 10,
    rating: 4.9,
  },
]

const guides = [
  {
    id: 1,
    name: "Hassan",
    expertise: "Photography Expert",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    languages: ["English", "Arabic", "French"],
  },
  {
    id: 2,
    name: "Fatima",
    expertise: "Historical Guide",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    languages: ["English", "Arabic", "Spanish"],
  },
]

const events = [
  {
    id: 1,
    name: "Fes Festival of World Sacred Music",
    date: "2024-06-14",
    location: "Fes",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Marrakech International Film Festival",
    date: "2024-11-29",
    location: "Marrakech",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function DestinationsPage() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [searchParams, setSearchParams] = useState({
    destination: "",
    activity: "",
    date: "",
    budget: "",
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[600px]">
        <Image
          src={bannerImages[currentBannerIndex].url}
          alt={bannerImages[currentBannerIndex].caption}
          fill
          className="object-cover transition-opacity duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4 text-center">Discover Morocco: Where Every Journey Begins</h1>
          <p className="text-xl mb-8">{bannerImages[currentBannerIndex].caption}</p>

          {/* Search Section */}
          <div className="w-full max-w-4xl mx-auto px-4">
            <Card className="bg-white/95 backdrop-blur">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marrakech">Marrakech</SelectItem>
                        <SelectItem value="fes">Fes</SelectItem>
                        <SelectItem value="casablanca">Casablanca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Activity Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="relaxation">Relaxation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input type="date" className="w-full" />
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Under $500</SelectItem>
                        <SelectItem value="mid">$500 - $1000</SelectItem>
                        <SelectItem value="luxury">$1000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full mt-4">Search Destinations</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        {/* Explore Destinations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Explore Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-all">
                <Link href={`/destinations/${destination.id}`}>
                  <div className="relative h-64">
                    <Image src={destination.image} alt={destination.name} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">{destination.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {destination.activities} activities
                        </Badge>
                        <Badge variant="secondary" className="ml-2">
                          {destination.culturalSites} cultural sites
                        </Badge>
                      </div>
                      <p className="text-lg font-bold">From ${destination.startingPrice}</p>
                    </div>
                    <Button className="w-full">Learn More</Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Plan Your Journey */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Plan Your Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bus className="w-5 h-5 mr-2" />
                  Transportation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>CTM Bus (Marrakech-Fes)</span>
                    <span>120 MAD</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Train (Casablanca-Tangier)</span>
                    <span>200 MAD</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Local Taxi (per km)</span>
                    <span>2-3 MAD</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hotel className="w-5 h-5 mr-2" />
                  Accommodation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Budget Hostels</span>
                    <span>100-200 MAD</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Mid-range Hotels</span>
                    <span>500-800 MAD</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Luxury Riads</span>
                    <span>1000+ MAD</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Local Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Use local buses for just 4 MAD per trip</li>
                  <li>• Negotiate prices in souks (start at 40% less)</li>
                  <li>• Get a local SIM card for better rates</li>
                  <li>• Book riads directly for better prices</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Must-See Attractions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Must-See Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attractions.map((attraction) => (
              <Card key={attraction.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={attraction.image} alt={attraction.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-gray-600">{attraction.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{attraction.rating}</span>
                    </div>
                  </div>
                  <Badge className="mt-4">{attraction.activities} activities available</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Local Guides and Events */}
        <section className="mb-16">
          <Tabs defaultValue="guides">
            <TabsList className="mb-6">
              <TabsTrigger value="guides">Local Guides</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            </TabsList>
            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((guide) => (
                  <Card key={guide.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Image src={guide.image} alt={guide.name} width={80} height={80} className="rounded-full" />
                        <div>
                          <h3 className="text-xl font-bold">{guide.name}</h3>
                          <p className="text-gray-600">{guide.expertise}</p>
                          <div className="flex items-center mt-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span>{guide.rating}</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            {guide.languages.map((lang) => (
                              <Badge key={lang} variant="secondary">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <Card key={event.id}>
                    <div className="relative h-48">
                      <Image src={event.image} alt={event.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mt-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* E-Books and Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Travel Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Marrakech Tips & Hacks</h3>
                <p className="text-gray-600 mb-4">Your complete guide to navigating the Red City like a local.</p>
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download E-Book
                </Button>
              </CardContent>
            </Card>
            {/* Add more e-books/resources as needed */}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="bg-orange-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for exclusive travel insights and deals</p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" type="email" />
            <Button>Subscribe</Button>
          </div>
        </section>
      </div>
    </div>
  )
}

