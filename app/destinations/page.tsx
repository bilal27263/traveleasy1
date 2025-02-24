/* eslint-disable react/no-unescaped-entities */ 

import { TravelCostCalculator } from "@/components/travel-cost-calculator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const destinations = [
  {
    id: "marrakech",
    name: "Marrakech",
    description: "The Red City with vibrant souks and gardens",
    image: "/images/marrakech.jpg",
  },
  {
    id: "fes",
    name: "Fes",
    description: "Ancient city with the world's largest car-free urban area",
    image: "/images/fes.jpg",
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    description: "The Blue Pearl of Morocco",
    image: "/images/chefchaouen.jpg",
  },
]

export default function DestinationsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Explore Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Tabs defaultValue="destinations">
            <TabsList>
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
              <TabsTrigger value="how-to-get-there">How to Get There</TabsTrigger>
            </TabsList>
            <TabsContent value="destinations">
              <div className="grid gap-6">
                {destinations.map((destination) => (
                  <Card key={destination.id}>
                    <CardHeader>
                      <CardTitle>{destination.name}</CardTitle>
                      <CardDescription>{destination.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="how-to-get-there">
              <TravelCostCalculator />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Featured Destination: Marrakech</CardTitle>
              <CardDescription>Discover the magic of Marrakech</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/images/marrakech-featured.jpg"
                alt="Marrakech"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <p>
                Marrakech, the vibrant Red City, is a feast for the senses. Explore the winding alleys of the medina,
                bargain in the bustling souks, and relax in lush gardens. Don't miss the iconic Jardin Majorelle and the
                historic Koutoubia Mosque.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

