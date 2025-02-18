import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RelatedArticlesProps {
  city: string
}

export function RelatedArticles({ city }: RelatedArticlesProps) {
  const articles = [
    { id: 1, title: `Top 10 Attractions in ${city}`, slug: "top-10-attractions" },
    { id: 2, title: `Best Restaurants in ${city}`, slug: "best-restaurants" },
    { id: 3, title: `Hidden Gems of ${city}`, slug: "hidden-gems" },
  ]

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{article.title}</h3>
              <Link href={`/articles/${city}/${article.slug}`}>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link href={`/articles?city=${city}`}>
          <Button>Explore More Articles</Button>
        </Link>
      </div>
    </section>
  )
}

