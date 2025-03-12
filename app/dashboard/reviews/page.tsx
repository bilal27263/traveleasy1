import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Reviews</h1>
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Star className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No reviews received yet</h3>
            <p className="text-sm text-gray-500 mb-4">Reviews will appear here once customers rate their experiences</p>
            <Button variant="outline">Request Reviews from Customers</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

