import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuideDashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Tour Guide Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your tours here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage your schedule</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View customer reviews and ratings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

