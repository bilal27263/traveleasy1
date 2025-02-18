"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Star, MapPin } from "lucide-react"

interface TravelAgency {
  id: string
  name: string
  logo: string
  tagline: string
  rating: number
  reviewCount: number
}

interface Trip {
  id: string
  title: string
  image: string
  rating: number
  reviewCount: number
  price: number
  currency: string
}

interface SuggestedActivity {
  id: string
  name: string
  activityCount: number
  image: string
}

const agencies: TravelAgency[] = [
  {
    id: "1",
    name: "Morocco Adventures",
    logo: "/logos/morocco-adventures.png",
    tagline: "Discover the magic of Morocco",
    rating: 4.8,
    reviewCount: 320,
  },
  {
    id: "2",
    name: "Sahara Expeditions",
    logo: "/logos/sahara-expeditions.png",
    tagline: "Journey through the golden dunes",
    rating: 4.9,
    reviewCount: 215,
  },
  {
    id: "3",
    name: "Atlas Trekking Co.",
    logo: "/logos/atlas-trekking.png",
    tagline: "Conquer the peaks of Morocco",
    rating: 4.7,
    reviewCount: 189,
  },
]

const trips: Trip[] = [
  {
    id: "1",
    title: "Marrakech City Tour",
    image: "/trips/marrakech-city-tour.jpg",
    rating: 4.8,
    reviewCount: 120,
    price: 75,
    currency: "USD",
  },
  {
    id: "2",
    title: "Sahara Desert Adventure",
    image: "/trips/sahara-desert-adventure.jpg",
    rating: 4.9,
    reviewCount: 85,
    price: 299,
    currency: "USD",
  },
  {
    id: "3",
    title: "Fes Medina Explorer",
    image: "/trips/fes-medina-explorer.jpg",
    rating: 4.7,
    reviewCount: 95,
    price: 65,
    currency: "USD",
  },
]

const suggestedActivities: SuggestedActivity[] = [
  { id: "1", name: "Hassan II Mosque", activityCount: 25, image: "/activities/hassan-ii-mosque.jpg" },
  { id: "2", name: "Jardin Majorelle", activityCount: 18, image: "/activities/jardin-majorelle.jpg" },
  { id: "3", name: "Fes el Bali", activityCount: 30, image: "/activities/fes-el-bali.jpg" },
  { id: "4", name: "Ait Ben Haddou", activityCount: 15, image: "/activities/ait-ben-haddou.jpg" },
]

// Updated cultural sights section with proper images and links
const culturalSights = [
  {
    id: "hassan-ii-mosque",
    name: "Hassan II Mosque",
    location: "Casablanca",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000035297.jpg-yWgpDEf1xEGoFPCGPBP8jUmh2lq030.jpeg",
    activityCount: 25,
  },
  {
    id: "ait-benhaddou",
    name: "Ait Benhaddou",
    location: "Ouarzazate",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/holidayme_10AmazingReasonsWhyYouShouldVisitMorocco_AitBenHaddou_shutterstock_414437029.jpg-NfCNfoDbEbPUPMHkSairQbnSZVsmdX.jpeg",
    activityCount: 18,
  },
  {
    id: "majorelle-garden",
    name: "Majorelle Garden",
    location: "Marrakech",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-ekrulila-13794450.jpg-VeKSvdXJUP4rsN2o4o3tafiIDzKiSf.jpeg",
    activityCount: 15,
  },
  {
    id: "chouara-tannery",
    name: "Chouara Tannery",
    location: "Fez",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-vlasceanu-19190883.jpg-KzSFjLFrUuPrp4dLIgxZoBGpFiPZdd.jpeg",
    activityCount: 20,
  },
]

export default function TravelAgenciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const router = useRouter()

  const filteredAgencies = agencies.filter(
    (agency) =>
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.tagline.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearch = () => {
    // In a real application, you would use these values to fetch filtered results
    console.log("Search term:", searchTerm)
    console.log("Selected date:", selectedDate)
    // For now, we'll just scroll to the results section
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          TravelEasy
        </Link>
        <div className="flex items-center space-x-4">
          <Input type="text" placeholder="Where do you want to go? What do you want to do?" className="w-96" />
          <span className="text-sm text-gray-500">Time: {new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      {/* Hero Section with Filters */}
      <section className="bg-orange-100 py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Find Your Next Adventure with TravelEasy!</h1>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Where to Go?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morocco">Morocco</SelectItem>
                  <SelectItem value="casablanca">Casablanca</SelectItem>
                  <SelectItem value="marrakech">Marrakech</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="What to Do?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cultural">Cultural Sights</SelectItem>
                  <SelectItem value="outdoor">Outdoor Adventures</SelectItem>
                  <SelectItem value="family">Family Activities</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Start Location" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={handleSearch}>
              Search Trips
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{trip.rating}</span>
                    <span className="ml-1 text-sm text-gray-600">({trip.reviewCount} reviews)</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-500">
                    {trip.currency} {trip.price}
                  </p>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                  <Button className="w-full" onClick={() => router.push(`/trips/${trip.id}`)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Cultural Sights Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Cultural Sights You Can't Miss</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturalSights.map((sight) => (
              <Link href={`/cultural-sights/${sight.id}`} key={sight.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
                  <div className="relative h-48">
                    <Image src={sight.image} alt={sight.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{sight.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{sight.location}</span>
                      </div>
                      <span className="text-orange-500 font-semibold">{sight.activityCount} Activities</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Agencies Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Travel Agencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredAgencies.map((agency) => (
              <Card key={agency.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Image src={agency.logo} alt={agency.name} width={64} height={64} className="rounded-full" />
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">{agency.name}</h3>
                      <p className="text-sm text-gray-600">{agency.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{agency.rating}</span>
                    <span className="ml-1 text-sm text-gray-600">({agency.reviewCount} reviews)</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                  <Button className="w-full" onClick={() => router.push(`/travel-agencies/${agency.id}/trips`)}>
                    View Trips
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

