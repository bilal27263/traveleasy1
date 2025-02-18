import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, ThumbsUp, MessageSquare, Share2 } from "lucide-react"

export default function BestTimeVisitAtlasMountainsArticle() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="relative h-[400px]">
        <Image src="/images/atlas-mountains.jpg" alt="Atlas Mountains" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Best Time to Visit the Atlas Mountains
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-2">
            <article className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 mb-4">Published on June 1, 2023 • 8 min read</p>
              <p className="mb-4">
                The Atlas Mountains, stretching across Morocco, Algeria, and Tunisia, offer breathtaking landscapes and
                unique experiences. But when is the best time to visit this majestic mountain range? Let's explore the
                seasons and what each has to offer:
              </p>
              <h2 className="text-2xl font-bold mb-2">Spring (March to May)</h2>
              <p className="mb-4">
                Spring is one of the best times to visit the Atlas Mountains. The weather is mild, with temperatures
                ranging from 15°C to 25°C (59°F to 77°F). The landscape comes alive with blooming wildflowers, and the
                snow-capped peaks provide a stunning backdrop. It's an ideal time for hiking and exploring the mountain
                villages.
              </p>
              <h2 className="text-2xl font-bold mb-2">Summer (June to August)</h2>
              <p className="mb-4">
                Summer can be quite hot in the lower regions, with temperatures reaching up to 35°C (95°F). However, the
                higher altitudes offer a cool respite. This is a great time for high-altitude treks and camping. Be
                prepared for occasional afternoon thunderstorms.
              </p>
              <h2 className="text-2xl font-bold mb-2">Autumn (September to November)</h2>
              <p className="mb-4">
                Autumn is another excellent season to visit. The weather is stable, and the temperatures are
                comfortable, ranging from 15°C to 25°C (59°F to 77°F). The changing colors of the foliage create a
                beautiful landscape. It's perfect for photography and outdoor activities.
              </p>
              <h2 className="text-2xl font-bold mb-2">Winter (December to February)</h2>
              <p className="mb-4">
                Winter brings snow to the higher elevations, transforming the mountains into a winter wonderland. It's
                an excellent time for winter sports enthusiasts, with skiing available at Oukaïmeden. However, some
                passes may be closed due to snow, and temperatures can drop below freezing at night.
              </p>
              <h2 className="text-2xl font-bold mb-2">Conclusion</h2>
              <p className="mb-4">
                While the Atlas Mountains are beautiful year-round, the best time to visit depends on your interests and
                the activities you want to do. Spring and autumn offer the most pleasant weather for general sightseeing
                and hiking, summer is great for high-altitude adventures, and winter is perfect for snow activities.
              </p>
            </article>

            {/* Engagement Features */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <ThumbsUp className="mr-2 h-4 w-4" /> Like
                </Button>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" /> Comment
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="#" className="text-blue-600 hover:text-blue-800">
                  <Facebook />
                </Link>
                <Link href="#" className="text-blue-400 hover:text-blue-600">
                  <Twitter />
                </Link>
                <Link href="#" className="text-pink-600 hover:text-pink-800">
                  <Instagram />
                </Link>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Comments</h3>
              {/* Add your comments component here */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Author Info */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">About the Author</h3>
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/author-avatar-2.jpg"
                    alt="Author"
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">Sarah Smith</p>
                    <p className="text-sm text-gray-600">Mountain Guide</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Sarah is a certified mountain guide with a deep love for the Atlas Mountains. She has been leading
                  tours and treks in the region for over 8 years, experiencing the mountains in all seasons.
                </p>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">Quick Tips</h3>
                <ul className="list-disc list-inside">
                  <li>Spring and autumn offer the best overall weather</li>
                  <li>Summer is ideal for high-altitude treks</li>
                  <li>Winter is perfect for snow sports</li>
                  <li>Always check weather forecasts before your trip</li>
                  <li>Pack layers for varying temperatures</li>
                </ul>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">Related Articles</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/articles/avoid-scams-morocco" className="text-blue-600 hover:underline">
                      How to Avoid Scams in Morocco
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Top 5 Treks in the Atlas Mountains
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Berber Culture in the Atlas Mountains
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Newsletter Subscription */}
      <section className="bg-orange-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Subscribe to Our Newsletter</h2>
          <p className="text-center mb-6">Get the latest travel tips and updates delivered to your inbox.</p>
          <form className="max-w-md mx-auto flex">
            <Input type="email" placeholder="Enter your email" className="flex-grow" />
            <Button type="submit" className="ml-2">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}

