/* eslint-disable react/no-unescaped-entities */ 

"use client"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Star, Share2 } from "lucide-react"

const sightsData = {
  "hassan-ii-mosque": {
    name: "Hassan II Mosque",
    location: "Casablanca",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000035297.jpg-yWgpDEf1xEGoFPCGPBP8jUmh2lq030.jpeg",
    description:
      "One of the largest mosques in the world, featuring stunning Islamic architecture and oceanfront views.",
    rating: 4.9,
    reviewCount: 1250,
    activities: [
      {
        id: 1,
        name: "Guided Mosque Tour",
        duration: "1.5 hours",
        price: 45,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000035297.jpg-yWgpDEf1xEGoFPCGPBP8jUmh2lq030.jpeg",
        rating: 4.8,
        reviewCount: 320,
      },
      {
        id: 2,
        name: "Sunset Photography Session",
        duration: "2 hours",
        price: 65,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000035297.jpg-yWgpDEf1xEGoFPCGPBP8jUmh2lq030.jpeg",
        rating: 4.9,
        reviewCount: 180,
      },
    ],
  },
  "ait-benhaddou": {
    name: "Ait Benhaddou",
    location: "Ouarzazate",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/holidayme_10AmazingReasonsWhyYouShouldVisitMorocco_AitBenHaddou_shutterstock_414437029.jpg-NfCNfoDbEbPUPMHkSairQbnSZVsmdX.jpeg",
    description: "UNESCO World Heritage site featuring remarkable kasbahs made of earthen clay architecture.",
    rating: 4.8,
    reviewCount: 980,
    activities: [
      {
        id: 1,
        name: "Historical Walking Tour",
        duration: "2 hours",
        price: 35,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/holidayme_10AmazingReasonsWhyYouShouldVisitMorocco_AitBenHaddou_shutterstock_414437029.jpg-NfCNfoDbEbPUPMHkSairQbnSZVsmdX.jpeg",
        rating: 4.7,
        reviewCount: 245,
      },
    ],
  },
  "majorelle-garden": {
    name: "Majorelle Garden",
    location: "Marrakech",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-ekrulila-13794450.jpg-VeKSvdXJUP4rsN2o4o3tafiIDzKiSf.jpeg",
    description: "Stunning botanical garden featuring vibrant blue architecture and exotic plants.",
    rating: 4.7,
    reviewCount: 2100,
    activities: [
      {
        id: 1,
        name: "Garden Tour & Photography",
        duration: "1.5 hours",
        price: 40,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-ekrulila-13794450.jpg-VeKSvdXJUP4rsN2o4o3tafiIDzKiSf.jpeg",
        rating: 4.8,
        reviewCount: 380,
      },
    ],
  },
  "chouara-tannery": {
    name: "Chouara Tannery",
    location: "Fez",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-vlasceanu-19190883.jpg-KzSFjLFrUuPrp4dLIgxZoBGpFiPZdd.jpeg",
    description: "Ancient leather tanneries showcasing traditional dyeing methods dating back to medieval times.",
    rating: 4.6,
    reviewCount: 1580,
    activities: [
      {
        id: 1,
        name: "Tannery Tour & Workshop",
        duration: "2 hours",
        price: 50,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-vlasceanu-19190883.jpg-KzSFjLFrUuPrp4dLIgxZoBGpFiPZdd.jpeg",
        rating: 4.7,
        reviewCount: 290,
      },
    ],
  },
}

export default function CulturalSightPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const sight = sightsData[id as keyof typeof sightsData]

  if (!sight) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Cultural Sight Not Found</h1>
        <Button onClick={() => router.push("/cultural-sights")}>Return to Cultural Sights</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <nav className="flex mb-8 text-sm">
        <Link href="/cultural-sights" className="text-gray-500 hover:text-gray-700">
          Cultural Sights
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900">{sight.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-[500px] mb-6 rounded-xl overflow-hidden">
            <Image src={sight.image} alt={sight.name} fill className="object-cover" priority />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{sight.name}</h1>
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">{sight.location}</span>
              <div className="ml-6 flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{sight.rating}</span>
                <span className="ml-1 text-gray-600">({sight.reviewCount} reviews)</span>
              </div>
            </div>
            <p className="text-gray-700">{sight.description}</p>
          </div>

          <Tabs defaultValue="activities">
            <TabsList>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="activities" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sight.activities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={activity.image} alt={activity.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{activity.name}</h3>
                      <div className="flex items-center mb-2">
                        <Clock className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">{activity.duration}</span>
                      </div>
                      <div className="flex items-center mb-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1">{activity.rating}</span>
                        <span className="ml-1 text-sm text-gray-600">({activity.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">${activity.price}</span>
                        <Button onClick={() => router.push(`/activities/${activity.id}/book`)}>Book Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Reviews Coming Soon</h3>
                <p className="text-gray-600">We're working on gathering reviews for this cultural sight.</p>
              </div>
            </TabsContent>

            <TabsContent value="gallery">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Gallery Coming Soon</h3>
                <p className="text-gray-600">We're working on collecting more photos of this amazing place.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Plan Your Visit</h2>
              <p className="text-gray-600 mb-6">
                Get personalized recommendations and book your experience with our local experts.
              </p>
              <Button className="w-full mb-4">Contact a Local Guide</Button>
              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

