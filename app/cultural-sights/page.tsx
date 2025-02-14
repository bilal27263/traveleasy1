"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search } from "lucide-react"

const culturalSights = [
  {
    id: "hassan-ii-mosque",
    name: "Hassan II Mosque",
    location: "Casablanca",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000035297.jpg-yWgpDEf1xEGoFPCGPBP8jUmh2lq030.jpeg",
    description:
      "One of the largest mosques in the world, featuring stunning Islamic architecture and oceanfront views.",
    activityCount: 25,
    rating: 4.9,
    reviewCount: 1250,
  },
  {
    id: "ait-benhaddou",
    name: "Ait Benhaddou",
    location: "Ouarzazate",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/holidayme_10AmazingReasonsWhyYouShouldVisitMorocco_AitBenHaddou_shutterstock_414437029.jpg-NfCNfoDbEbPUPMHkSairQbnSZVsmdX.jpeg",
    description: "UNESCO World Heritage site featuring remarkable kasbahs made of earthen clay architecture.",
    activityCount: 18,
    rating: 4.8,
    reviewCount: 980,
  },
  {
    id: "majorelle-garden",
    name: "Majorelle Garden",
    location: "Marrakech",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-ekrulila-13794450.jpg-VeKSvdXJUP4rsN2o4o3tafiIDzKiSf.jpeg",
    description: "Stunning botanical garden featuring vibrant blue architecture and exotic plants.",
    activityCount: 15,
    rating: 4.7,
    reviewCount: 2100,
  },
  {
    id: "fez-tanneries",
    name: "Chouara Tannery",
    location: "Fez",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-vlasceanu-19190883.jpg-KzSFjLFrUuPrp4dLIgxZoBGpFiPZdd.jpeg",
    description: "Ancient leather tanneries showcasing traditional dyeing methods dating back to medieval times.",
    activityCount: 20,
    rating: 4.6,
    reviewCount: 1580,
  },
]

export default function CulturalSightsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const filteredSights = culturalSights.filter((sight) => {
    const matchesSearch =
      sight.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sight.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = selectedLocation === "all" || sight.location === selectedLocation
    return matchesSearch && matchesLocation
  })

  const locations = ["all", ...new Set(culturalSights.map((sight) => sight.location))]

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Top Cultural Sights You Can't Miss</h1>
        <p className="text-xl text-gray-600">Discover Morocco's most iconic cultural landmarks and experiences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search cultural sights..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location.charAt(0).toUpperCase() + location.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSights.map((sight) => (
          <Card key={sight.id} className="overflow-hidden">
            <div className="relative h-64">
              <Image src={sight.image} alt={sight.name} fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{sight.name}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{sight.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-orange-500">{sight.activityCount} Activities</div>
                  <div className="text-sm text-gray-600">
                    {sight.rating} ★ ({sight.reviewCount} reviews)
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{sight.description}</p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
              <Link href={`/cultural-sights/${sight.id}`} className="w-full">
                <Button className="w-full">Explore Activities</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

