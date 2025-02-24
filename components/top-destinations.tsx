import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const topDestinations = [
  {
    name: "Marrakech",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-taryn-elliott-3889843.jpg-yWgpDEf1xEGoFPCGPBP8jUmh2lq030.jpeg",
    bookings: 245,
    revenue: 18375,
    progress: 85,
  },
  {
    name: "Sahara Desert",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-stijn-dijkstra-2499799.jpg-NfCNfoDbEbPUPMHkSairQbnSZVsmdX.jpeg",
    bookings: 189,
    revenue: 56511,
    progress: 65,
  },
  {
    name: "Fes",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-roger-brown-5125390.jpg-VeKSvdXJUP4rsN2o4o3tafiIDzKiSf.jpeg",
    bookings: 152,
    revenue: 9880,
    progress: 52,
  },
  {
    name: "Atlas Mountains",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-tobi-4003633.jpg-KzSFjLFrUuPrp4dLIgxZoBGpFiPZdd.jpeg",
    bookings: 127,
    revenue: 19050,
    progress: 44,
  },
]

export function TopDestinations() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {topDestinations.map((destination) => (
        <Card key={destination.name}>
          <CardContent className="p-4">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-4">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">{destination.name}</h3>
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between mb-1">
                  <span>{destination.bookings} bookings</span>
                  <span>${destination.revenue.toLocaleString()}</span>
                </div>
                <Progress value={destination.progress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

