/* eslint-disable react/no-unescaped-entities */ 

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, ThumbsUp, MessageSquare, Share2 } from "lucide-react"

export default function AvoidScamsMoroccoArticle() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="relative h-[400px]">
        <Image src="/images/morocco-market.jpg" alt="Moroccan Market" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">How to Avoid Scams in Morocco</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-2">
            <article className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 mb-4">Published on May 15, 2023 • 10 min read</p>
              <p className="mb-4">
                Morocco is a beautiful country with rich culture and warm hospitality. However, like any popular tourist
                destination, it's important to be aware of common scams to ensure a safe and enjoyable trip. Here are
                some tips to help you avoid scams in Morocco:
              </p>
              <h2 className="text-2xl font-bold mb-2">1. Be Cautious of "Friendly" Guides</h2>
              <p className="mb-4">
                One of the most common scams in Morocco involves locals offering to be your guide or show you around.
                While many are genuine, some may lead you to shops where they receive commissions or overcharge you for
                their services. Always use licensed guides or book through reputable agencies.
              </p>
              <h2 className="text-2xl font-bold mb-2">2. Negotiate Prices in Advance</h2>
              <p className="mb-4">
                Whether it's for a taxi ride, a souvenir, or a service, always negotiate and agree on a price before
                accepting. This helps avoid misunderstandings and overcharging later.
              </p>
              <h2 className="text-2xl font-bold mb-2">3. Be Wary of "Free" Gifts</h2>
              <p className="mb-4">
                Some vendors may offer you a "gift" and then demand payment. Politely decline any unsolicited items or
                services to avoid this situation.
              </p>
              <h2 className="text-2xl font-bold mb-2">4. Use Official Taxis</h2>
              <p className="mb-4">
                In major cities, use official taxis (usually red in Marrakech or blue in Rabat) and insist on using the
                meter or agree on a price before starting the journey.
              </p>
              <h2 className="text-2xl font-bold mb-2">5. Be Careful with Money Exchanges</h2>
              <p className="mb-4">
                Always exchange money at official bureaus or banks. Street money changers may use sleight of hand tricks
                or counterfeit bills.
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
                    src="/images/author-avatar.jpg"
                    alt="Author"
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-600">Travel Expert</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  John is a seasoned traveler with over 10 years of experience exploring Morocco. He's passionate about
                  helping others discover the beauty of this country while staying safe.
                </p>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">Quick Tips</h3>
                <ul className="list-disc list-inside">
                  <li>Always use licensed guides</li>
                  <li>Negotiate prices in advance</li>
                  <li>Be cautious of "free" gifts</li>
                  <li>Use official taxis</li>
                  <li>Exchange money at banks or official bureaus</li>
                </ul>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">Related Articles</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/articles/best-time-visit-atlas-mountains" className="text-blue-600 hover:underline">
                      Best Time to Visit the Atlas Mountains
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Top 10 Must-Visit Places in Morocco
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline">
                      Moroccan Cuisine: A Culinary Journey
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

