import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuestDashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Guest Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View your booked trips</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Wishlist</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your travel wishlist</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Write reviews for your past trips</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

