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

export default function SaharaDesertPage() {
  const [userLocation, setUserLocation] = useState("")

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative h-[600px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-salahkuro28-2960752.jpg-xczErBZ51AjXzBTuEStlpsdCpbQwHw.jpeg"
          alt="Sahara Desert"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4 text-center">Experience the Magic of the Sahara Desert</h1>
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
                    <p>Fly to Errachidia or Ouarzazate, then take a desert tour</p>
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
                    <p>Take a bus to Merzouga or M'Hamid, gateways to the Sahara</p>
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
                    <p>No direct train. Take a train to Marrakech, then a bus or tour</p>
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
                    <p>Drive to Merzouga (8-10 hours from Marrakech or Fes)</p>
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
                <h3 className="text-xl font-bold mb-4">Desert Express</h3>
                <p className="text-gray-600 mb-4">2 days in the Sahara</p>
                <p className="text-2xl font-bold mb-4">$299</p>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Sahara Adventure</h3>
                <p className="text-gray-600 mb-4">4 days exploring the desert</p>
                <p className="text-2xl font-bold mb-4">$599</p>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Ultimate Desert Experience</h3>
                <p className="text-gray-600 mb-4">7 days immersed in Saharan culture</p>
                <p className="text-2xl font-bold mb-4">$999</p>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Explore Sahara Desert */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Explore Sahara Desert</h2>
          <Tabs defaultValue="articles">
            <TabsList className="mb-6">
              <TabsTrigger value="articles">Related Articles</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>
            <TabsContent value="articles">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Top 10 Experiences in the Sahara</h3>
                    <p className="text-gray-600 mb-4">
                      Discover the must-do activities in the world's largest desert...
                    </p>
                    <Link href="/articles/top-10-sahara-experiences">
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Surviving the Sahara: Essential Tips</h3>
                    <p className="text-gray-600 mb-4">Prepare for your desert adventure with these crucial tips...</p>
                    <Link href="/articles/sahara-survival-tips">
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">The Sahara's Hidden Oases</h3>
                    <p className="text-gray-600 mb-4">Explore the lush sanctuaries nestled within the desert...</p>
                    <Link href="/articles/sahara-hidden-oases">
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
                    <h3 className="text-xl font-bold mb-2">Camel Trek</h3>
                    <Badge>Adventure</Badge>
                    <p className="text-gray-600 my-4">Experience the traditional way of desert travel...</p>
                    <Button className="w-full">Book Now</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Sandboarding</h3>
                    <Badge>Extreme Sport</Badge>
                    <p className="text-gray-600 my-4">Surf the dunes of the Sahara...</p>
                    <Button className="w-full">Book Now</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Stargazing Tour</h3>
                    <Badge>Relaxation</Badge>
                    <p className="text-gray-600 my-4">Witness the clearest night sky you've ever seen...</p>
                    <Button className="w-full">Book Now</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Best Guides in Sahara Desert */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Best Guides in Sahara Desert</h2>
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
                    <h3 className="text-xl font-bold">Omar</h3>
                    <p className="text-gray-600">Berber Desert Expert</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.9 (150 reviews)</span>
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
                    <h3 className="text-xl font-bold">Amina</h3>
                    <p className="text-gray-600">Desert Astronomy Specialist</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.8 (120 reviews)</span>
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
                    <p className="text-gray-600">Desert Survival Expert</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">4.9 (180 reviews)</span>
                </div>
                <Button className="w-full">Contact Guide</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Discussions About Sahara Desert */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Discussions About Sahara Desert</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Best time to visit the Sahara?</h3>
                <p className="text-gray-600 mb-4">
                  Join the discussion about the ideal seasons for desert exploration...
                </p>
                <Button variant="outline">Join Discussion</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Essential gear for a Sahara trek</h3>
                <p className="text-gray-600 mb-4">Share your packing tips and must-have items for the desert...</p>
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
              <h3 className="text-xl font-bold mb-4">Sahara Desert: A Photographer's Guide</h3>
              <p className="text-gray-600 mb-4">Capture the beauty of the Sahara with expert photography tips...</p>
              <div className="flex justify-between items-center">
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Preview E-Book
                </Button>
                <Button variant="outline">Purchase for $9.99</Button>
              </div>
            </CardContent>
          </Card>
          <div className="text-center mt-6">
            <Button variant="outline">View More Resources</Button>
          </div>
        </section>

        {/* Map and Navigation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Map of Sahara Desert</h2>
          <div className="aspect-video relative">
            <Image src="/placeholder-map.jpg" alt="Map of Sahara Desert" fill className="object-cover rounded-lg" />
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

