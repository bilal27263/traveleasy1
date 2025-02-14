import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface TravelAgency {
  id: string
  name: string
  logo: string
  rating: number
  reviewCount: number
  description: string
}

interface CityTravelAgenciesProps {
  city: string
}

const getCityTravelAgencies = (city: string): TravelAgency[] => {
  // This function would typically fetch travel agencies from an API
  // For now, we'll return mock data
  return [
    {
      id: "1",
      name: "Morocco Adventures",
      logo: "/agencies/morocco-adventures.png",
      rating: 4.8,
      reviewCount: 320,
      description: `Specializing in ${city} tours and experiences.`,
    },
    {
      id: "2",
      name: "Sahara Expeditions",
      logo: "/agencies/sahara-expeditions.png",
      rating: 4.9,
      reviewCount: 215,
      description: `Offering unique desert tours from ${city}.`,
    },
    {
      id: "3",
      name: "Atlas Trekking Co.",
      logo: "/agencies/atlas-trekking.png",
      rating: 4.7,
      reviewCount: 189,
      description: `Expert guides for mountain treks near ${city}.`,
    },
  ]
}

export function CityTravelAgencies({ city }: CityTravelAgenciesProps) {
  const agencies = getCityTravelAgencies(city)

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Travel Agencies in {city}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agencies.map((agency) => (
          <Card key={agency.id}>
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <Image src={agency.logo} alt={agency.name} width={64} height={64} className="mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{agency.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1">{agency.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({agency.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{agency.description}</p>
              <Link href={`/travel-agencies/${agency.id}`}>
                <Button variant="outline" className="w-full">
                  View Agency
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link href={`/travel-agencies?city=${city}`}>
          <Button>View All Agencies</Button>
        </Link>
      </div>
    </section>
  )
}

