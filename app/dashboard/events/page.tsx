import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Calendar, MapPin, DollarSign } from "lucide-react"

const events = [
  { id: 1, name: "Travel Expo 2023", date: "2023-09-15", location: "New York", price: "$50" },
  { id: 2, name: "Photography Workshop", date: "2023-10-01", location: "Paris", price: "$100" },
  { id: 3, name: "Adventure Travel Seminar", date: "2023-10-20", location: "Online", price: "Free" },
]

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-900">Events</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="font-semibold">{event.name}</h3>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" /> {event.date}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" /> {event.location}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4" /> {event.price}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

