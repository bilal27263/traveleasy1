import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CityGuidesProps {
  city: string
}

export function CityGuides({ city }: CityGuidesProps) {
  const guides = [
    { id: 1, name: "Mohammed", avatar: "/avatars/mohammed.jpg", specialty: "History Expert" },
    { id: 2, name: "Fatima", avatar: "/avatars/fatima.jpg", specialty: "Food Connoisseur" },
    { id: 3, name: "Youssef", avatar: "/avatars/youssef.jpg", specialty: "Adventure Guide" },
  ]

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Explore Guides in {city}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guides.map((guide) => (
          <Card key={guide.id}>
            <CardContent className="p-4 flex flex-col items-center">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src={guide.avatar} alt={guide.name} />
                <AvatarFallback>{guide.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">{guide.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{guide.specialty}</p>
              <Link href={`/guides/${guide.id}`}>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link href={`/guides?city=${city}`}>
          <Button>View All Guides</Button>
        </Link>
      </div>
    </section>
  )
}

