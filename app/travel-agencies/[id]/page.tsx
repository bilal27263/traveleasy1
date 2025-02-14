"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react"
import { ReviewCarousel } from "@/components/review-carousel"

// Mock data for the agency
const agencyData = {
  id: "morocco-adventures",
  name: "Morocco Adventures",
  logo: "/logos/morocco-adventures.png",
  tagline: "Discover the Magic of Morocco",
  description:
    "Morocco Adventures is your gateway to experiencing the rich culture, stunning landscapes, and warm hospitality of Morocco. With over a decade of expertise, we craft unforgettable journeys that blend adventure, culture, and comfort.",
  phone: "+212 5XX-XXXXXX",
  email: "info@morocco-adventures.com",
  website: "https://www.morocco-adventures.com",
  socialMedia: {
    facebook: "https://www.facebook.com/moroccoAdventures",
    twitter: "https://www.twitter.com/moroccoAdventures",
    instagram: "https://www.instagram.com/moroccoAdventures",
  },
  stats: {
    totalTrips: 150,
    totalCustomers: 5000,
    satisfactionRate: 98,
  },
  rating: 4.8,
  reviewCount: 320,
  followers: 1200,
  certifications: ["IATA Accredited", "Morocco Tourism Board Certified"],
  awards: ["Best Adventure Tour Operator 2022", "Sustainable Tourism Award 2023"],
  analytics: {
    pageVisits: 15000,
    tripViews: 75000,
    inquiries: 2500,
  },
}

// Mock data for trips
const trips = [
  {
    id: "1",
    title: "Marrakech City Tour",
    image: "/trips/marrakech-city-tour.jpg",
    rating: 4.8,
    reviewCount: 120,
    price: 75,
    currency: "USD",
    highlights: "1 day of cultural immersion",
    dates: "Daily departures",
  },
  {
    id: "2",
    title: "Sahara Desert Adventure",
    image: "/trips/sahara-desert-adventure.jpg",
    rating: 4.9,
    reviewCount: 85,
    price: 299,
    currency: "USD",
    highlights: "3 days in the majestic Sahara",
    dates: "Every Monday and Thursday",
  },
  {
    id: "3",
    title: "Fes Medina Explorer",
    image: "/trips/fes-medina-explorer.jpg",
    rating: 4.7,
    reviewCount: 95,
    price: 65,
    currency: "USD",
    highlights: "Full day in the ancient Medina",
    dates: "Tuesday, Friday, Sunday",
  },
]

// Mock data for gallery content
const galleryContent = [
  { id: "1", type: "image", url: "/gallery/morocco-1.jpg", likes: 45, caption: "Sunset over the Sahara" },
  {
    id: "2",
    type: "video",
    url: "/gallery/morocco-video-1.mp4",
    thumbnail: "/gallery/morocco-video-1-thumb.jpg",
    likes: 78,
    caption: "Exploring the vibrant souks",
  },
  { id: "3", type: "image", url: "/gallery/morocco-2.jpg", likes: 32, caption: "Traditional Moroccan tea ceremony" },
  { id: "4", type: "image", url: "/gallery/morocco-3.jpg", likes: 56, caption: "Chefchaouen, the Blue Pearl" },
  {
    id: "5",
    type: "video",
    url: "/gallery/morocco-video-2.mp4",
    thumbnail: "/gallery/morocco-video-2-thumb.jpg",
    likes: 92,
    caption: "Camel trek through the dunes",
  },
  { id: "6", type: "image", url: "/gallery/morocco-4.jpg", likes: 41, caption: "Ancient ruins of Volubilis" },
]

// Mock data for guides
const guides = [
  {
    id: "1",
    name: "Hassan",
    image: "/guides/hassan.jpg",
    specialization: "Cultural Expert",
    bio: "With 15 years of experience, Hassan brings Morocco's rich history to life.",
  },
  {
    id: "2",
    name: "Amina",
    image: "/guides/amina.jpg",
    specialization: "Adventure Guide",
    bio: "Amina leads our most thrilling desert and mountain expeditions.",
  },
  {
    id: "3",
    name: "Youssef",
    image: "/guides/youssef.jpg",
    specialization: "Culinary Specialist",
    bio: "Youssef introduces travelers to the delicious world of Moroccan cuisine.",
  },
]

// Mock data for reviews
const reviews = [
  {
    id: "1",
    user: { name: "Sarah T.", avatar: "/avatars/sarah.jpg" },
    rating: 5,
    text: "An unforgettable journey through Morocco. Every detail was perfect!",
  },
  {
    id: "2",
    user: { name: "Michael R.", avatar: "/avatars/michael.jpg" },
    rating: 4,
    text: "Great mix of culture and adventure. Highly recommend the desert tour.",
  },
  {
    id: "3",
    user: { name: "Emma L.", avatar: "/avatars/emma.jpg" },
    rating: 5,
    text: "Morocco Adventures made our family trip magical. The kids loved it!",
  },
]

export default function TravelAgencyProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [followersCount, setFollowersCount] = useState(agencyData.followers)
  const [isFollowing, setIsFollowing] = useState(false)
  const [email, setEmail] = useState("")
  const [showSubscribe, setShowSubscribe] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [likedContent, setLikedContent] = useState<string[]>([])
  const itemsPerPage = 6

  const handleAddReview = () => {
    console.log("Adding review")
  }

  const handleFollow = () => {
    if (isFollowing) {
      setFollowersCount((prev) => prev - 1)
    } else {
      setFollowersCount((prev) => prev + 1)
    }
    setIsFollowing(!isFollowing)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribing with email:", email)
    setShowSubscribe(false)
    setEmail("")
  }

  const handleLike = (contentId: string) => {
    setLikedContent((prev) => (prev.includes(contentId) ? prev.filter((id) => id !== contentId) : [...prev, contentId]))
  }

  const handleShare = (contentId: string) => {
    console.log("Sharing content:", contentId)
    // Implement share functionality here
  }

  const sortedContent = [...galleryContent].sort((a, b) => {
    if (sortBy === "newest") {
      return Number.parseInt(b.id) - Number.parseInt(a.id)
    } else if (sortBy === "mostLiked") {
      return b.likes - a.likes
    }
    return 0
  })

  const paginatedContent = sortedContent.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(sortedContent.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src={agencyData.logo}
                alt={agencyData.name}
                width={100}
                height={100}
                className="rounded-full mr-6"
              />
              <div>
                <h1 className="text-3xl font-bold">{agencyData.name}</h1>
                <p className="text-gray-600">{agencyData.tagline}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{agencyData.rating}</span>
                  <span className="ml-1 text-sm text-gray-600">({agencyData.reviewCount} reviews)</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">{followersCount} followers</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button onClick={() => console.log("Contact Us clicked")}>Contact Us</Button>
              <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"}>
                {isFollowing ? "Unfollow" : "Follow"} Agency
              </Button>
              <Button onClick={handleAddReview}>Write a Review</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">About {agencyData.name}</h2>
          <p className="text-gray-700 mb-6">{agencyData.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-500 mr-2" />
              <span>{agencyData.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-2" />
              <a href={`mailto:${agencyData.email}`} className="text-orange-500 hover:underline">
                {agencyData.email}
              </a>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-gray-500 mr-2" />
              <a
                href={agencyData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                {agencyData.website}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={agencyData.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-orange-500"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={agencyData.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-orange-500"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={agencyData.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-orange-500"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Certifications & Awards</h3>
            <ul className="list-disc list-inside">
              {agencyData.certifications.map((cert, index) => (
                <li key={`cert-${index}`}>{cert}</li>
              ))}
              {agencyData.awards.map((award, index) => (
                <li key={`award-${index}`}>{award}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Featured Trips Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Trips</h2>
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
                  <p className="text-sm text-gray-600 mb-2">{trip.highlights}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    <Calendar className="inline-block w-4 h-4 mr-1" />
                    {trip.dates}
                  </p>
                  <p className="text-2xl font-bold text-orange-500">
                    {trip.currency} {trip.price}
                  </p>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                  <Link href={`/trips/${trip.id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline">View All Trips</Button>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Gallery</h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="mostLiked">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedContent.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative">
                  {item.type === "video" ? (
                    <div className="relative h-48">
                      <Image src={item.thumbnail} alt="Video thumbnail" layout="fill" objectFit="cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="secondary" size="sm">
                          Play Video
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={item.url}
                      alt="Gallery image"
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-2">{item.caption}</p>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(item.id)}
                      className={likedContent.includes(item.id) ? "text-red-500" : ""}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${likedContent.includes(item.id) ? "fill-current" : ""}`} />
                      {item.likes + (likedContent.includes(item.id) ? 1 : 0)}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare(item.id)}>
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="py-2 px-4 bg-white rounded-md">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Analytics Overview */}
        <section className="mb-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Agency Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-orange-500">{agencyData.analytics.pageVisits.toLocaleString()}</p>
              <p className="text-gray-700">Page Visits</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-500">{agencyData.analytics.tripViews.toLocaleString()}</p>
              <p className="text-gray-700">Trip Views</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-500">{agencyData.analytics.inquiries.toLocaleString()}</p>
              <p className="text-gray-700">Inquiries</p>
            </div>
          </div>
        </section>

        {/* Reviews and Testimonials */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <ReviewCarousel reviews={reviews} />
          <div className="text-center mt-6">
            <Button variant="outline" onClick={handleAddReview}>
              Write a Review
            </Button>
          </div>
        </section>

        {/* Guides and Experts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Expert Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Card key={guide.id}>
                <CardContent className="p-6 text-center">
                  <Image
                    src={guide.image}
                    alt={guide.name}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{guide.name}</h3>
                  <p className="text-orange-500 mb-2">{guide.specialization}</p>
                  <p className="text-sm text-gray-600">{guide.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Policies and Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Policies and Services</h2>
          <Tabs defaultValue="policies">
            <TabsList>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>
            <TabsContent value="policies">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Our Policies</h3>

                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Cancellation: Free cancellation up to 48 hours before the trip start date. After that, a 50% fee
                      applies.
                    </li>
                    <li>
                      Refunds: Full refund for cancellations made more than 7 days before the trip. 50% refund for
                      cancellations made 3-7 days before the trip.
                    </li>
                    <li>Changes: One free date change allowed per booking, subject to availability.</li>
                    <li>
                      Group Size: Minimum of 4 participants required for a trip to proceed. Maximum group size varies by
                      tour.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="services">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Our Services</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Custom Itineraries: Tailor-made trips designed to your preferences and schedule.</li>
                    <li>Airport Transfers: Comfortable and reliable transportation to and from the airport.</li>
                    <li>Multilingual Guides: Expert local guides fluent in English, French, Spanish, and Arabic.</li>
                    <li>Travel Insurance: Optional comprehensive travel insurance available for all our trips.</li>
                    <li>24/7 Support: Round-the-clock assistance throughout your journey.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Interactive Map */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Destinations</h2>
          <div className="aspect-w-16 aspect-h-9">
            {/* Replace with an actual interactive map component */}
            <div className="bg-gray-200 w-full h-96 flex items-center justify-center">
              <p className="text-gray-500">Interactive Map Placeholder</p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Travel Tips & Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Top 10 Must-Visit Places in Morocco</h3>
                <p className="text-gray-600 mb-4">
                  Discover the hidden gems and iconic locations that make Morocco a traveler's paradise.
                </p>
                <Button variant="outline">Read More</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Moroccan Cuisine: A Culinary Journey</h3>
                <p className="text-gray-600 mb-4">Explore the flavors and spices that define Moroccan gastronomy.</p>
                <Button variant="outline">Read More</Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Preparing for Your Sahara Desert Adventure</h3>
                <p className="text-gray-600 mb-4">
                  Essential tips and packing list for an unforgettable desert experience.
                </p>
                <Button variant="outline">Read More</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="bg-orange-100 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Morocco?</h2>
          <p className="text-xl mb-6">Book your dream trip now and experience the magic of Morocco with us!</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" onClick={() => console.log("Book Now clicked")}>
              Book Now
            </Button>
            <Button size="lg" variant="outline" onClick={handleFollow}>
              {isFollowing ? "Unfollow" : "Follow for Updates"}
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{agencyData.name}</h3>
              <p>{agencyData.tagline}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-500">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500">
                    Our Trips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="mb-4">Subscribe to our newsletter for exclusive deals and travel tips.</p>
              <form onSubmit={handleSubscribe} className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-r-none"
                  required
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 {agencyData.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showSubscribe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Subscribe for Updates</h2>
            <form onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
                required
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowSubscribe(false)}>
                  Cancel
                </Button>
                <Button type="submit">Subscribe</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

