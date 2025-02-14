import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Review {
  id: string
  authorName: string
  authorAvatar: string
  rating: number
  content: string
  date: string
}

interface ReviewsSectionProps {
  guideId: string
}

const reviews: Record<string, Review[]> = {
  "1": [
    {
      id: "1",
      authorName: "John Doe",
      authorAvatar: "/avatar-1.jpg",
      rating: 5,
      content:
        "Ahmed was an excellent guide! His knowledge of Marrakech is impressive and he made our tour unforgettable.",
      date: "2023-05-15",
    },
    {
      id: "2",
      authorName: "Jane Smith",
      authorAvatar: "/avatar-2.jpg",
      rating: 4,
      content: "Great tour of the city. Ahmed showed us some hidden gems that we would have never found on our own.",
      date: "2023-06-02",
    },
  ],
  "2": [
    {
      id: "3",
      authorName: "Alice Johnson",
      authorAvatar: "/avatar-3.jpg",
      rating: 5,
      content:
        "Mohammed's adventure tour was the highlight of our trip to Rabat! His enthusiasm and knowledge made the experience truly special.",
      date: "2023-05-20",
    },
    {
      id: "4",
      authorName: "Bob Williams",
      authorAvatar: "/avatar-4.jpg",
      rating: 5,
      content:
        "Incredible food tour with Mohammed. We tasted amazing local dishes and learned so much about Moroccan cuisine.",
      date: "2023-06-10",
    },
  ],
  "3": [
    {
      id: "5",
      authorName: "Emma Davis",
      authorAvatar: "/avatar-5.jpg",
      rating: 4,
      content:
        "Karim showed us the best of Marrakech nightlife. His insider knowledge made for an unforgettable evening.",
      date: "2023-05-25",
    },
    {
      id: "6",
      authorName: "Michael Brown",
      authorAvatar: "/avatar-6.jpg",
      rating: 5,
      content:
        "Amazing shopping tour with Karim. He knows all the best spots and helped us negotiate great deals in the souks.",
      date: "2023-06-15",
    },
  ],
}

export function ReviewsSection({ guideId }: ReviewsSectionProps) {
  const guideReviews = reviews[guideId] || []

  return (
    <div className="space-y-6">
      {guideReviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={review.authorAvatar} alt={review.authorName} />
                <AvatarFallback>{review.authorName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{review.authorName}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{review.content}</p>
                <p className="text-sm text-gray-400 mt-2">{review.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

