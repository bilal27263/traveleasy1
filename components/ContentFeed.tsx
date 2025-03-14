import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react"

const posts = [
  {
    id: 1,
    author: "Adventure Tours",
    content: "Check out our new trip to the Amazon Rainforest!",
    type: "update",
    likes: 15,
    comments: 3,
  },
  {
    id: 2,
    author: "John Doe",
    content: "Just had an amazing experience with Sunset Safaris. Highly recommend!",
    type: "review",
    likes: 24,
    comments: 5,
  },
  {
    id: 3,
    author: "Travel Enthusiast",
    content: "Here are some photos from my recent trip to Bali",
    type: "experience",
    likes: 42,
    comments: 8,
  },
]

export function ContentFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input placeholder="Search content..." />
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="pt-4">
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-gray-500">{post.type}</p>
                <p className="mt-2">{post.content}</p>
                <div className="mt-4 flex space-x-4">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

