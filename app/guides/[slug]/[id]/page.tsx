/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star, Languages, Clock, DollarSign, CheckCircle2, Mail, Phone } from "lucide-react"

// Extended guide data with more details
const guidesData = {
  "1": {
    id: 1,
    name: "Ahmed",
    title: "Professional Guide",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20231211-WA0009%20(1).jpg-S4WRlD8EUsG98Bn2H8h2c904ayPPIb.jpeg",
    location: "Marrakech",
    category: "Guide",
    bio: "Expert in Marrakech history and culture with 5 years of experience. Specialized in historical monuments, local customs, and authentic experiences.",
    rating: 4.9,
    reviewCount: 128,
    price: 50,
    verified: true,
    experience: "Expert",
    languages: ["English", "Arabic", "French"],
    availability: "Weekends only",
    specialties: ["Historical Tours", "Cultural Experiences", "Food Tours"],
    credentials: ["Licensed Tour Guide", "First Aid Certified", "Local Tourism Board Member"],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    reviews: [
      {
        id: 1,
        author: "Sarah",
        rating: 5,
        date: "2023-12-01",
        content: "Ahmed was an excellent guide! His knowledge of Marrakech history is impressive.",
      },
      {
        id: 2,
        author: "Michael",
        rating: 5,
        date: "2023-11-28",
        content: "Great experience! Ahmed showed us hidden gems we would never have found on our own.",
      },
    ],
    tours: [
      {
        id: 1,
        title: "Medina Historical Tour",
        duration: "4 hours",
        price: 80,
        description: "Explore the historic medina and its monuments",
      },
      {
        id: 2,
        title: "Food & Market Tour",
        duration: "3 hours",
        price: 60,
        description: "Discover local cuisine and traditional markets",
      },
    ],
    contact: {
      email: "ahmed@traveleasy.com",
      phone: "+212 6XX-XXXXXX",
      response_time: "Usually responds within 1 hour",
    },
  },
  "2": {
    id: 2,
    name: "Karim",
    title: "Photography Expert",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20240919-WA0002.jpg-L2z6SmExqeOmFdTXcDAu2jHOiv1Gls.jpeg",
    location: "Fes",
    category: "Photographer",
    bio: "Professional photographer specializing in architectural and street photography. Helping visitors capture the beauty of Morocco.",
    rating: 4.8,
    reviewCount: 95,
    price: 75,
    verified: true,
    experience: "Expert",
    languages: ["English", "Arabic"],
    availability: "Available now",
    specialties: ["Architecture Photography", "Street Photography", "Portrait Sessions"],
    credentials: ["Professional Photographer", "Photography Workshop Instructor"],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    reviews: [
      {
        id: 1,
        author: "Emma",
        rating: 5,
        date: "2023-12-05",
        content: "Karim helped me capture amazing photos of Fes. Highly recommended!",
      },
    ],
    tours: [
      {
        id: 1,
        title: "Photography Tour of Fes",
        duration: "4 hours",
        price: 100,
        description: "Capture the best photo opportunities in Fes",
      },
    ],
    contact: {
      email: "karim@traveleasy.com",
      phone: "+212 6XX-XXXXXX",
      response_time: "Usually responds within 2 hours",
    },
  },
  // Add other guides similarly
}

export default function GuideProfilePage() {
  const { id } = useParams<{ id: string }>()
  const guide = guidesData[id as keyof typeof guidesData]
  const [selectedTab, setSelectedTab] = useState("about")

  if (!guide) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
        <Button asChild>
          <Link href="/guides">Return to Guides</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative w-48 h-48">
              <Image src={guide.image} alt={guide.name} fill className="object-cover rounded-lg" />
              {guide.verified && (
                <Badge className="absolute -bottom-3 right-0 bg-green-500">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{guide.name}</h1>
                  <p className="text-xl text-gray-600 mb-2">{guide.title}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-600">{guide.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{guide.rating}</span>
                      <span className="ml-1 text-gray-600">({guide.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <Button>Book Now</Button>
                  <Button variant="outline">Contact</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Experience</p>
                        <p className="font-semibold">{guide.experience}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Starting from</p>
                        <p className="font-semibold">${guide.price}/hour</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Languages</p>
                        <p className="font-semibold">{guide.languages.join(", ")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8">
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="tours">Tours & Services</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>About {guide.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{guide.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Specialties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {guide.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Credentials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {guide.credentials.map((credential) => (
                        <li key={credential} className="text-gray-600">
                          {credential}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{guide.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{guide.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{guide.contact.response_time}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar className="w-full" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tours">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guide.tours.map((tour) => (
                <Card key={tour.id}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{tour.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{tour.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold">${tour.price}</span>
                      <Badge>Per person</Badge>
                    </div>
                    <Button className="w-full">Book This Tour</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              {guide.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{review.author}</h3>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-4 text-gray-600">{review.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guide.gallery.map((image, index) => (
                <div key={index} className="relative aspect-video">
                  <Image src={image} alt={`Gallery image ${index + 1}`} fill className="object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

