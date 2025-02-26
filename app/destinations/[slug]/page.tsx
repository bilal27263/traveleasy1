import { CityTours } from "@/components/city-tours"
import { CityTravelAgencies } from "@/components/city-travel-agencies"
import { RelatedArticles } from "@/components/related-articles"
import { notFound } from "next/navigation"

const destinations = [
  { slug: "paris", name: "Paris", description: "The City of Light", image: "/images/paris.jpg" },
  { slug: "tokyo", name: "Tokyo", description: "Where tradition meets future", image: "/images/tokyo.jpg" },
  { slug: "new-york", name: "New York", description: "The Big Apple", image: "/images/new-york.jpg" },
  { slug: "chefchaouen", name: "Chefchaouen", description: "The Blue Pearl", image: "/images/chefchaouen.jpg" },
]

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = destinations.find((d) => d.slug === params.slug)

  if (!destination) {
    notFound()
  }

  return (
    <div className="space-y-12">
      <header className="relative h-96">
        <img src={destination.image} alt={destination.name} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">{destination.name}</h1>
        </div>
      </header>

      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">About {destination.name}</h2>
        <p className="text-xl">{destination.description}</p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Travel Agencies in {destination.name}</h2>
        <CityTravelAgencies city={destination.name} />
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Popular Tours in {destination.name}</h2>
        <CityTours city={destination.name} />
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Related Articles</h2>
        <RelatedArticles city={destination.name} />
      </section>
    </div>
  )
}

