import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Clock } from "lucide-react"

interface Tour {
  id: string
  title: string
  image: string
  duration: string
  rating: number
  reviewCount: number
  price: number
}

interface CityToursProps {
  city: string
}

const getCityTours = (city: string): Tour[] => {
  // This function would typically fetch tours from an API
  // For now, we'll return mock data
  return [
    {
      id: "1",
      title: `${city} City Tour`,
      image: `/tours/${city.toLowerCase()}-city-tour.jpg`,
      duration: "4 hours",
      rating: 4.8,
      reviewCount: 120,
      price: 50,
    },
    {
      id: "2",
      title: `${city} Food Tour`,
      image: `/tours/${city.toLowerCase()}-food-tour.jpg`,
      duration: "3 hours",
      rating: 4.9,
      reviewCount: 85,
      price: 65,
    },
    {
      id: "3",
      title: `${city} Historical Sites Tour`,
      image: `/tours/${city.toLowerCase()}-historical-tour.jpg`,
      duration: "5 hours",
      rating: 4.7,
      reviewCount: 95,
      price: 75,
    },
  ]
}

export function CityTours({ city }: CityToursProps) {
  const tours = getCityTours(city)

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Popular Tours in {city}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card key={tour.id}>
            <CardContent className="p-4">
              <Image src={tour.image} alt={tour.title} width={300} height={200} className="rounded-lg mb-4" />
              <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-sm text-gray-500">{tour.duration}</span>
              </div>
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1">{tour.rating}</span>
                <span className="ml-1 text-sm text-gray-500">({tour.reviewCount} reviews)</span>
              </div>
              <p className="text-lg font-bold mb-4">${tour.price}</p>
              <Link href={`/tours/${tour.id}`}>
                <Button variant="outline" className="w-full">
                  View Tour
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link href={`/tours?city=${city}`}>
          <Button>Browse All Tours</Button>
        </Link>
      </div>
    </section>
  )
}

