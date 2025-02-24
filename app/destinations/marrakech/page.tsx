/* eslint-disable react/no-unescaped-entities */ 

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

export default function MarrakechPage() {
  const [userLocation, setUserLocation] = useState("")

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative h-[600px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-chanwalrus-958545.jpg-b1rsTTRvfIQJyVdUZNYFLMLjmAJqFR.jpeg"
          alt="Marrakech"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4 text-center">
            Discover the Red City: Your Ultimate Guide to Marrakech
          </h1>
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
                    <p>Fly from {userLocation || "your location"} to Marrakech for $X</p>
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
                    <p>Take a bus from {userLocation || "your location"} to Marrakech for $Y</p>
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
                    <p>Travel by train from {userLocation || "your location"} to Marrakech for $Z</p>
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
                    <p>Drive from {userLocation || "your location"} to Marrakech</p>
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
                <h3 className="text-xl font-bold mb-4">Budget Package</h3>
                <p className="text-gray-600 mb-4">3 days in Marrakech</p>
                <p className="text-2xl font-bold mb-4">$299</p>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Standard Package</h3>
                <p className="text-gray-600 mb-4">5 days in Marrakech</p>
                <p className="text-2xl font-bold mb-4">$599</p>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Luxury Package</h3>
                <p className="text-gray-600 mb-4">7 days in Marrakech</p>
                <p className="text-2xl font-bold mb-4">$999</p>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Explore Marrakech */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Explore Marrakech</h2>
          <Tabs defaultValue="articles">
            <TabsList className="mb-6">
              <TabsTrigger value="articles">Related Articles</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>
            <TabsContent value="articles">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Top 10 Things to Do in Marrakech</h3>
                    <p className="text-gray-600 mb-4">Discover the must-see attractions and hidden gems...</p>
                    <Link href="/articles/top-10-things-marrakech">
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Best Hostels for Budget Travelers</h3>
                    <p className="text-gray-600 mb-4">Find affordable and comfortable accommodations...</p>
                    <Link href="/articles/best-hostels-marrakech">
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Must-Visit Restaurants in Marrakech</h3>
                    <p className="text-gray-600 mb-4">Explore the culinary delights of Marrakech...</p>
                    <Link href="/articles/must-visit-restaurants-marrakech">
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
                    <h3 className="text-xl font-bold mb-2">Camel Ride in the Palm Grove</h3>
                    <Badge>Adventure</Badge>
                    <p className="text-gray-600 my-4">Experience the desert landscape on a camel...</p>
                    <Link href="/activities/camel-ride-palm-grove">
                      <Button className="w-full">Book Now</Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Traditional Hammam Experience</h3>
                    <Badge>Relaxation</Badge>
                    <p className="text-gray-600 my-4">Indulge in a luxurious Moroccan spa treatment...</p>
                    <Link href="/activities/traditional-hammam">
                      <Button className="w-full">Book Now</Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Guided Medina Tour</h3>
                    <Badge>Cultural</Badge>
                    <p className="text-gray-600 my-4">Explore the winding streets of the old city...</p>
                    <Link href="/activities/guided-medina-tour">
                      <Button className="w-full">Book Now</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Best Guides in Marrakech */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Best Guides in Marrakech</h2>
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
                    <h3 className="text-xl font-bold">Hassan</h3>
                    <p className="text-gray-600">Medina Expert</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.9 (120 reviews)</span>
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
                    <h3 className="text-xl font-bold">Fatima</h3>
                    <p className="text-gray-600">Food Tour Specialist</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.8 (95 reviews)</span>
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
                    <h3 className="text-xl font-bold">Youssef</h3>
                    <p className="text-gray-600">Historical Sites Expert</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.9 (150 reviews)</span>
                </div>
                <Button className="w-full">Contact Guide</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Discussions About Marrakech */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Discussions About Marrakech</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">What's the best time to visit Marrakech?</h3>
                <p className="text-gray-600 mb-4">Join the discussion about the ideal seasons for visiting...</p>
                <Button variant="outline">Join Discussion</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Hidden gems in the medina</h3>
                <p className="text-gray-600 mb-4">
                  Discover secret spots and local favorites in Marrakech's old city...
                </p>
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
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pwckey2owgvs5a18hjvixjspa3ia-RbShK7xTdipTkF4MCOJjjCSmu7bewH.png"
                  alt="Marrakech Tips and Hacks E-Book Cover"
                  width={200}
                  height={300}
                  className="rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4">Marrakech Tips and Hacks to Avoid Getting Ripped Off</h3>
                  <p className="text-gray-600 mb-4">
                    Learn insider tips to navigate Marrakech like a pro and save money...
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Button asChild>
                      <a href="https://bilalaiyadi.gumroad.com/l/gqwjr" target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Preview E-Book
                      </a>
                    </Button>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-orange-500 mr-2">$5</span>
                      <Button variant="outline">Purchase Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-center mt-6">
            <Button variant="outline">View More Resources</Button>
          </div>
        </section>

        {/* Map and Navigation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Map of Marrakech</h2>
          <div className="aspect-video relative">
            <Image src="/placeholder-map.jpg" alt="Map of Marrakech" fill className="object-cover rounded-lg" />
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

