"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Star, CheckCircle2, Calendar, DollarSign, SlidersHorizontal, X } from "lucide-react"

// Mock data for guides
const guides = [
  {
    id: 1,
    name: "Ahmed",
    title: "Professional Guide",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20231211-WA0009%20(1).jpg-S4WRlD8EUsG98Bn2H8h2c904ayPPIb.jpeg",
    location: "Marrakech",
    category: "Guide",
    bio: "Expert in Marrakech history and culture with 5 years of experience",
    rating: 4.9,
    reviewCount: 128,
    price: 50,
    verified: true,
    experience: "Expert",
    languages: ["English", "Arabic", "French"],
    availability: "Weekends only",
  },
  {
    id: 2,
    name: "Karim",
    title: "Photography Expert",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20240919-WA0002.jpg-L2z6SmExqeOmFdTXcDAu2jHOiv1Gls.jpeg",
    location: "Fes",
    category: "Photographer",
    bio: "Professional photographer specializing in architectural and street photography",
    rating: 4.8,
    reviewCount: 95,
    price: 75,
    verified: true,
    experience: "Expert",
    languages: ["English", "Arabic"],
    availability: "Available now",
  },
  {
    id: 3,
    name: "Youssef",
    title: "Local Host & Guide",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-justin-shaifer-501272-1222271.jpg-IEgpsJWBfJA1FdnmOTSU6xXz1vhiIf.jpeg",
    location: "Casablanca",
    category: "Host",
    bio: "Passionate about sharing authentic Moroccan experiences",
    rating: 4.7,
    reviewCount: 82,
    price: 40,
    verified: true,
    experience: "Intermediate",
    languages: ["English", "Arabic", "Spanish"],
    availability: "Custom dates",
  },
  {
    id: 4,
    name: "Omar",
    title: "Cultural Expert",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-italo-melo-881954-2379004.jpg-7EJ1kWaKfgOF8BcgKwt4yPbS2Wfodu.jpeg",
    location: "Tangier",
    category: "Guide",
    bio: "Specialized in Moroccan art and cultural heritage",
    rating: 4.9,
    reviewCount: 156,
    price: 60,
    verified: true,
    experience: "Expert",
    languages: ["English", "Arabic", "French"],
    availability: "Available now",
  },
  {
    id: 5,
    name: "Sofia",
    title: "Local Friend & Host",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-olly-733872.jpg-OZtJubvFos3j26MrC69wIsEpNwyjkk.jpeg",
    location: "Rabat",
    category: "Friend",
    bio: "Here to help you discover the authentic side of Rabat",
    rating: 4.8,
    reviewCount: 73,
    price: 30,
    verified: true,
    experience: "Intermediate",
    languages: ["English", "Arabic", "French"],
    availability: "Weekends only",
  },
]

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [minRating, setMinRating] = useState(0)
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.bio.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || guide.location === selectedLocation
    const matchesExperience = selectedExperience === "all" || guide.experience === selectedExperience
    const matchesAvailability = selectedAvailability === "all" || guide.availability === selectedAvailability
    const matchesPrice = guide.price >= priceRange[0] && guide.price <= priceRange[1]
    const matchesRating = guide.rating >= minRating
    const matchesVerified = !showVerifiedOnly || guide.verified

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesExperience &&
      matchesAvailability &&
      matchesPrice &&
      matchesRating &&
      matchesVerified
    )
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="relative h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400">
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Find Your Perfect Guide, Photographer, Host, or Friend
            </h1>
            <p className="text-xl mb-8 text-center">
              Connect with trusted locals who will make your Moroccan experience unforgettable
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-4xl relative">
              <Input
                type="text"
                placeholder="Search by location, activity, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-lg text-gray-900"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {/* Filter Panel */}
        {showFilters && (
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Filters</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Guide">Guide</SelectItem>
                      <SelectItem value="Photographer">Photographer</SelectItem>
                      <SelectItem value="Host">Host</SelectItem>
                      <SelectItem value="Friend">Friend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Marrakech">Marrakech</SelectItem>
                      <SelectItem value="Fes">Fes</SelectItem>
                      <SelectItem value="Casablanca">Casablanca</SelectItem>
                      <SelectItem value="Rabat">Rabat</SelectItem>
                      <SelectItem value="Tangier">Tangier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Experience Level</label>
                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Availability</label>
                  <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Time</SelectItem>
                      <SelectItem value="Available now">Available Now</SelectItem>
                      <SelectItem value="Weekends only">Weekends Only</SelectItem>
                      <SelectItem value="Custom dates">Custom Dates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Price Range ($ per hour)</label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={1} className="mt-2" />
                  <div className="flex justify-between mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
                  <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select minimum rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.8">4.8+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={showVerifiedOnly}
                    onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="verified" className="text-sm font-medium">
                    Show Verified Only
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-64">
                <Image src={guide.image} alt={guide.name} fill className="object-cover" />
                {guide.verified && (
                  <Badge className="absolute top-4 right-4 bg-green-500">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{guide.name}</h3>
                    <p className="text-gray-600">{guide.title}</p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {guide.category}
                  </Badge>
                </div>

                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-gray-600">{guide.location}</span>
                </div>

                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{guide.rating}</span>
                  <span className="ml-1 text-gray-600">({guide.reviewCount} reviews)</span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{guide.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.languages.map((language) => (
                    <Badge key={language} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="font-bold">{guide.price}</span>
                    <span className="text-gray-600">/hour</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-gray-600">{guide.availability}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Book Now</Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/guides/${guide.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <section className="bg-orange-50 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community of Local Experts</h2>
          <p className="text-xl text-gray-600 mb-8">
            Share your knowledge and earn while meeting people from around the world
          </p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
            Become a Guide
          </Button>
        </div>
      </section>
    </div>
  )
}

