/* eslint-disable react/no-unescaped-entities */ 

"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { AuthPopup } from "@/components/auth-popup"
import { SearchBar } from "@/components/search-bar"

const destinations = [
  {
    slug: "chefchaouen",
    name: "Chefchaouen",
    image: "/placeholder-chefchaouen.jpg",
    shortDescription: "Discover the blue pearl of Morocco",
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    image: "/placeholder-marrakech.jpg",
    shortDescription: "Experience the vibrant heart of Morocco",
  },
  {
    slug: "essaouira",
    name: "Essaouira",
    image: "/placeholder-essaouira.jpg",
    shortDescription: "Relax in this charming coastal town",
  },
]

export default function Home() {
  const [showAuthPopup, setShowAuthPopup] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="relative h-screen flex items-center justify-center">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3015519-hd_1920_1080_24fps-K4K1Qj67dFTBVJVSQz9E2i8u0NHCO1.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Travel Easy Morocco</h1>
          <p className="text-xl mb-8">Discover the magic of Morocco with us</p>
          <div className="flex justify-center items-center space-x-4">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Start Your Journey
            </Button>
            <div className="relative">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      {/* Accommodation Options */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Find Your Perfect Stay</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-taryn-elliott-3889843.jpg-X3AcortzL3eFnAtmI7hvD3TPuJVGMi.jpeg"
                  alt="Riad"
                  width={400}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Traditional Riads</h3>
                <p className="text-gray-600 mb-4">Experience authentic Moroccan hospitality</p>
                <Link href="/accommodations/riads" className="text-orange-500 hover:underline">
                  Explore Riads
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tour.jpg-lwOaIq0WUltXp3BdXGPOF6fsP20OCj.jpeg"
                  alt="Luxury Hotel"
                  width={400}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Luxury Hotels</h3>
                <p className="text-gray-600 mb-4">Indulge in world-class comfort and amenities</p>
                <Link href="/accommodations/hotels" className="text-orange-500 hover:underline">
                  Discover Hotels
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/holidayme_10AmazingReasonsWhyYouShouldVisitMorocco_AitBenHaddou_shutterstock_414437029.jpg-4XRwohlDfwhEbgEWiPeLJ7XHDPd4hn.jpeg"
                  alt="Desert Camp"
                  width={400}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Desert Camps</h3>
                <p className="text-gray-600 mb-4">Sleep under the stars in the Sahara</p>
                <Link href="/accommodations/desert-camps" className="text-orange-500 hover:underline">
                  Book Desert Experience
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Find a Guide */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Find Your Perfect Guide</h2>
          <div className="relative w-full h-[400px] bg-gray-200 rounded-lg mb-8">
            <Image src="/morocco-map.jpg" alt="Map of Morocco" layout="fill" objectFit="cover" className="rounded-lg" />
            {/* Add guide markers here */}
          </div>
          <div className="text-center">
            <Link href="/guides">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Explore All Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Find Travel Agencies */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Find Travel Agencies</h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover the best travel agencies in Morocco and book your dream trip.
          </p>
          <Link href="/travel-agencies">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Explore Travel Agencies
            </Button>
          </Link>
        </div>
      </section>

      {/* New Advertisement Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Join Travel Easy Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="🧑‍💼"
              title="Join as a Travel Agency"
              description="Create your profile & showcase your services."
            />
            <FeatureCard
              icon="🧭"
              title="Become a Trusted Tour Guide"
              description="Build your follower base & offer unique experiences."
            />
            <FeatureCard
              icon="🌍"
              title="Share Your Inspiring Travel Story"
              description="Join our community & inspire other travelers."
            />
            <FeatureCard
              icon="🤝"
              title="Find Your Travel Buddy"
              description="Connect with fellow travelers heading to your next destination."
            />
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => setShowAuthPopup(true)}
              className="bg-white text-orange-500 hover:bg-gray-100"
            >
              Register Now
            </Button>
          </div>
        </div>
      </section>

      {/* Destinations and Discussions */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Card key={destination.slug}>
                <CardContent className="p-6">
                  <Link href={`/destinations/${destination.slug}`} className="block">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      width={400}
                      height={300}
                      className="rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                    <p className="text-gray-600 mb-4">{destination.shortDescription}</p>
                    <span className="text-orange-500 hover:underline flex items-center">
                      Explore <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Agency Service */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Dream Trip with Our Travel Agencies</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Let our expert travel agencies create the perfect Moroccan adventure for you. From desert expeditions to
            coastal retreats, we've got you covered.
          </p>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-orange-500">
            Find Travel Agencies
          </Button>
        </div>
      </section>

      {/* Shop Artisana */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop Moroccan Artisana</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6">
                <Image
                  src="/placeholder-artisana-1.jpg"
                  alt="Moroccan Rug"
                  width={200}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Handwoven Rugs</h3>
                <p className="text-gray-600 mb-4">Authentic Berber designs</p>
                <Link href="/shop/rugs" className="text-orange-500 hover:underline">
                  Shop Now
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Image
                  src="/placeholder-artisana-2.jpg"
                  alt="Moroccan Pottery"
                  width={200}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Ceramic Pottery</h3>
                <p className="text-gray-600 mb-4">Traditional Moroccan ceramics</p>
                <Link href="/shop/pottery" className="text-orange-500 hover:underline">
                  Shop Now
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Image
                  src="/placeholder-artisana-3.jpg"
                  alt="Moroccan Lamps"
                  width={200}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Ornate Lamps</h3>
                <p className="text-gray-600 mb-4">Intricate metalwork lamps</p>
                <Link href="/shop/lamps" className="text-orange-500 hover:underline">
                  Shop Now
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Image
                  src="/placeholder-artisana-4.jpg"
                  alt="Moroccan Textiles"
                  width={200}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Luxurious Textiles</h3>
                <p className="text-gray-600 mb-4">Handmade blankets and cushions</p>
                <Link href="/shop/textiles" className="text-orange-500 hover:underline">
                  Shop Now
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <AuthPopup open={showAuthPopup} onOpenChange={setShowAuthPopup} />
    </div>
  )
}

function FeatureCard({ icon, title, description}: {icon: string, title:string, description: string}) {
  return (
    <Card className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

