"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Gift, Clock, Trophy, Users } from "lucide-react"

const featuredContests = [
  {
    id: 1,
    title: "Win a Trip to Marrakesh",
    image: "/placeholder-marrakesh.jpg",
    sponsor: "TravelEasy",
    daysLeft: 3,
    category: "Trending",
  },
  {
    id: 2,
    title: "Discounted Flights to Casablanca",
    image: "/placeholder-casablanca.jpg",
    sponsor: "Royal Air Maroc",
    daysLeft: 5,
    category: "New",
  },
  {
    id: 3,
    title: "Luxury Stay in Fes",
    image: "/placeholder-fes.jpg",
    sponsor: "Riad Fes",
    daysLeft: 7,
    category: "Exclusive",
  },
]

const allContests = [
  ...featuredContests,
  {
    id: 4,
    title: "Sahara Desert Adventure",
    image: "/placeholder-sahara.jpg",
    sponsor: "Morocco Excursions",
    daysLeft: 10,
    category: "Adventure",
  },
  {
    id: 5,
    title: "Chefchaouen Photography Tour",
    image: "/placeholder-chefchaouen.jpg",
    sponsor: "Blue City Tours",
    daysLeft: 6,
    category: "Cultural",
  },
]

const sponsors = [
  { id: 1, name: "TravelEasy", logo: "/logos/traveleasy.png" },
  { id: 2, name: "Royal Air Maroc", logo: "/logos/royal-air-maroc.png" },
  { id: 3, name: "Riad Fes", logo: "/logos/riad-fes.png" },
  { id: 4, name: "Morocco Excursions", logo: "/logos/morocco-excursions.png" },
  { id: 5, name: "Blue City Tours", logo: "/logos/blue-city-tours.png" },
]

export default function WinTripPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDestination, setSelectedDestination] = useState("all")
  const [selectedPrizeType, setSelectedPrizeType] = useState("all")
  const [selectedSponsor, setSelectedSponsor] = useState("all")

  const filteredContests = allContests.filter((contest) => {
    const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDestination =
      selectedDestination === "all" || contest.title.toLowerCase().includes(selectedDestination.toLowerCase())
    const matchesPrizeType =
      selectedPrizeType === "all" || contest.category.toLowerCase() === selectedPrizeType.toLowerCase()
    const matchesSponsor = selectedSponsor === "all" || contest.sponsor === selectedSponsor
    return matchesSearch && matchesDestination && matchesPrizeType && matchesSponsor
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="relative h-[400px]">
        <Image
          src="/placeholder-win-trip-banner.jpg"
          alt="Win Your Dream Trip"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Win Your Dream Trip Today!</h1>
          <p className="text-xl mb-8">Discover amazing contests and exclusive deals</p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
            Enter Now
          </Button>
        </div>
      </div>

      <div className="container mx-auto py-12">
        {/* Featured Contests Carousel */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Contests</h2>
          <Carousel>
            <CarouselContent>
              {featuredContests.map((contest) => (
                <CarouselItem key={contest.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={contest.image} alt={contest.title} layout="fill" objectFit="cover" />
                      <Badge className="absolute top-2 right-2 bg-orange-500">{contest.category}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{contest.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">Sponsored by {contest.sponsor}</p>
                      <div className="flex items-center text-orange-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{contest.daysLeft} days left</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Enter Contest</Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* How It Works */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Gift className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2">1. Choose a Contest</h3>
              <p className="text-gray-600">Browse and select a trip or prize that excites you.</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2">2. Sign Up & Participate</h3>
              <p className="text-gray-600">Log in or follow the contest rules to enter.</p>
            </div>
            <div className="text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2">3. Win & Travel</h3>
              <p className="text-gray-600">Winners are announced and contacted. Get ready for your adventure!</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="text-orange-500 hover:underline">
              Frequently Asked Questions
            </Link>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Input
                  type="text"
                  placeholder="Search contests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Destinations</SelectItem>
                  <SelectItem value="marrakesh">Marrakesh</SelectItem>
                  <SelectItem value="casablanca">Casablanca</SelectItem>
                  <SelectItem value="fes">Fes</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPrizeType} onValueChange={setSelectedPrizeType}>
                <SelectTrigger>
                  <SelectValue placeholder="Prize Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="flights">Flights</SelectItem>
                  <SelectItem value="hotels">Hotels</SelectItem>
                  <SelectItem value="tours">Tours</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSponsor} onValueChange={setSelectedSponsor}>
                <SelectTrigger>
                  <SelectValue placeholder="Sponsor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sponsors</SelectItem>
                  {sponsors.map((sponsor) => (
                    <SelectItem key={sponsor.id} value={sponsor.name}>
                      {sponsor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* All Contests */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">All Contests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContests.map((contest) => (
              <Card key={contest.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={contest.image} alt={contest.title} layout="fill" objectFit="cover" />
                  <Badge className="absolute top-2 right-2 bg-orange-500">{contest.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{contest.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Sponsored by {contest.sponsor}</p>
                  <div className="flex items-center text-orange-500 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{contest.daysLeft} days left</span>
                  </div>
                  <Button className="w-full">Enter Contest</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sponsor Spotlights */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Sponsors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center"
              >
                <Image src={sponsor.logo} alt={sponsor.name} width={100} height={100} objectFit="contain" />
                <p className="mt-2 text-center text-sm">{sponsor.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">Become a Sponsor</Button>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-orange-100 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Win Your Dream Trip?</h2>
          <p className="text-xl mb-6">
            Don't miss out on these amazing opportunities. Enter now and start your adventure!
          </p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
            Explore All Contests
          </Button>
        </section>
      </div>
    </div>
  )
}

