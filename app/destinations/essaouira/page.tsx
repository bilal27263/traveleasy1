"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Download, Plane, Bus, Train, Car } from "lucide-react"

export default function EssaouiraPage() {
  const [userLocation, setUserLocation] = useState("")

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative h-[600px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-yuliya-kosolapova-1535772-3184563.jpg-ZdNK0KcVeUPvQeYtD4OkW4KlwFMRiz.jpeg"
          alt="Essaouira"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4 text-center">Discover Essaouira: Morocco's Coastal Gem</h1>
        </div>
      </div>

      <div className="container mx-auto py-12">
        {/* Travel Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">How to Get There</h2>
          <Card>
            <CardContent className="p-6">
              <Input
                placeholder="Enter your location"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                className="mb-4"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Plane className="w-5 h-5 mr-2" />
                      By Air
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Fly to Marrakech, then take a shuttle to Essaouira (2.5 hours)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bus className="w-5 h-5 mr-2" />
                      By Bus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Take a bus from Marrakech or Casablanca to Essaouira</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Train className="w-5 h-5 mr-2" />
                      By Train
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>No direct train. Take a train to Marrakech, then a bus to Essaouira</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Car className="w-5 h-5 mr-2" />
                      By Car
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Drive from Marrakech (2.5 hours) or Casablanca (5 hours) to Essaouira</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Plan Your Trip */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Plan Your Trip</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Beach Getaway</h3>
                <p className="text-gray-600 mb-4">3 days in Essaouira</p>
                <p className="text-2xl font-bold mb-4">$249</p>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Surf & Culture Package</h3>
                <p className="text-gray-600 mb-4">5 days in Essaouira</p>
                <p className="text-2xl font-bold mb-4">$499</p>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Coastal Explorer</h3>
                <p className="text-gray-600 mb-4">7 days in Essaouira & surroundings</p>
                <p className="text-2xl font-bold mb-4">$799</p>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Explore Essaouira */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Explore Essaouira</h2>
          <Tabs defaultValue="articles">
            <TabsList className="mb-6">
              <TabsTrigger value="articles">Related Articles</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>
            <TabsContent value="articles">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Top 10 Things to Do in Essaouira</h3>
                    <p className="text-gray-600 mb-4">
                      Discover the best attractions and activities in this coastal paradise...
                    </p>
                    <Link href="/articles/top-10-things-essaouira">
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Essaouira's Best Seafood Restaurants</h3>
                    <p className="text-gray-600 mb-4">Indulge in the freshest catches at these top-rated eateries...</p>
                    <Link href="/articles/best-seafood-essaouira">
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">A Guide to Essaouira's Medina</h3>
                    <p className="text-gray-600 mb-4">Navigate the charming streets of Essaouira's old town...</p>
                    <Link href="/articles/essaouira-medina-guide">
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center mt-6">
                <Button>Explore More Articles</Button>
              </div>
            </TabsContent>
            <TabsContent value="activities">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Surfing Lessons</h3>
                    <Badge>Adventure</Badge>
                    <p className="text-gray-600 my-4">Catch the waves at Essaouira's famous beaches...</p>
                    <Button className="w-full">Book Now</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Medina Walking Tour</h3>
                    <Badge>Cultural</Badge>
                    <p className="text-gray-600 my-4">Explore the historic streets and artisan workshops...</p>
                    <Button className="w-full">Book Now</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Sunset Camel Ride</h3>
                    <Badge>Relaxation</Badge>
                    <p className="text-gray-600 my-4">Experience the magic of Essaouira's coastline at dusk...</p>
                    <Button className="w-full">Book Now</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Best Guides in Essaouira */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Best Guides in Essaouira</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Guide"
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold">Aisha</h3>
                    <p className="text-gray-600">Local History Expert</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.9 (85 reviews)</span>
                </div>
                <Button className="w-full">Contact Guide</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Guide"
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold">Karim</h3>
                    <p className="text-gray-600">Surf Instructor</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.8 (110 reviews)</span>
                </div>
                <Button className="w-full">Contact Guide</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Guide"
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold">Laila</h3>
                    <p className="text-gray-600">Food Tour Specialist</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.9 (95 reviews)</span>
                </div>
                <Button className="w-full">Contact Guide</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Discussions About Essaouira */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Discussions About Essaouira</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Best time for windsurfing in Essaouira?</h3>
                <p className="text-gray-600 mb-4">Join the discussion about the ideal seasons for water sports...</p>
                <Button variant="outline">Join Discussion</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Hidden gems in Essaouira's medina</h3>
                <p className="text-gray-600 mb-4">Discover secret spots and local favorites in the old city...</p>
                <Button variant="outline">Join Discussion</Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-6">
            <Button>View All Discussions</Button>
          </div>
        </section>

        {/* E-Books and Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">E-Books and Resources</h2>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Essaouira: A Traveler's Guide to Morocco's Windy City</h3>
              <p className="text-gray-600 mb-4">
                Discover the best of Essaouira with insider tips and local secrets...
              </p>
              <div className="flex justify-between items-center">
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Preview E-Book
                </Button>
                <Button variant="outline">Purchase for $7.99</Button>
              </div>
            </CardContent>
          </Card>
          <div className="text-center mt-6">
            <Button variant="outline">View More Resources</Button>
          </div>
        </section>

        {/* Map and Navigation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Map of Essaouira</h2>
          <div className="aspect-video relative">
            <Image src="/placeholder-map.jpg" alt="Map of Essaouira" fill className="object-cover rounded-lg" />
          </div>
        </section>

        {/* Call-to-Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Button size="lg" className="w-full">
            Plan Your Journey
          </Button>
          <Button size="lg" className="w-full">
            Join the Discussion
          </Button>
          <Button size="lg" className="w-full">
            Read the Guide
          </Button>
          <Button size="lg" className="w-full">
            Book a Guide
          </Button>
        </section>
      </div>
    </div>
  )
}

