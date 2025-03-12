import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Calendar } from "lucide-react"

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
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Calendar className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No events scheduled</h3>
            <p className="text-sm text-gray-500 mb-4">Create your first event to see it here</p>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

