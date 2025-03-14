import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MessageSquare, ThumbsUp } from "lucide-react"

const reviews = [
  {
    id: 1,
    author: "Alice Williams",
    rating: 5,
    content: "Amazing experience! The trip was well-organized and exceeded my expectations.",
    trip: "Amazon Rainforest Adventure",
  },
  {
    id: 2,
    author: "Charlie Brown",
    rating: 4,
    content: "Great trip overall. The guides were knowledgeable and friendly.",
    trip: "Bali Beach Retreat",
  },
  {
    id: 3,
    author: "David Lee",
    rating: 5,
    content: "Unforgettable journey. The views were breathtaking and the team was very professional.",
    trip: "Himalayan Trek",
  },
]

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Reviews</h1>
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{review.author}</h3>
                      <p className="text-sm text-gray-500">{review.trip}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2">{review.content}</p>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" /> Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="mr-2 h-4 w-4" /> Highlight
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

