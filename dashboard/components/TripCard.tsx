import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, BarChart2, Trash2, Star, Eye, MousePointer } from 'lucide-react'

interface TripCardProps {
  id: number
  title: string
  description: string
  thumbnail: string
  price: number
  duration: string
  location: string
  views: number
  clicks: number
  bookings: number
  rating: number
  status: 'draft' | 'published' | 'archived'
}

export function TripCard({
  id,
  title,
  description,
  thumbnail,
  price,
  duration,
  location,
  views,
  clicks,
  bookings,
  rating,
  status
}: TripCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-48">
        <Image
          src={thumbnail}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={status === 'published' ? 'default' : 'secondary'}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">{duration} | {location}</span>
          <span className="text-lg font-bold">${price}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Eye className="w-4 h-4 mr-1" />
          <span className="mr-2">Views: {views}</span>
          <MousePointer className="w-4 h-4 mr-1" />
          <span className="mr-2">Clicks: {clicks}</span>
          <BarChart2 className="w-4 h-4 mr-1" />
          <span className="mr-2">Bookings: {bookings}</span>
          <Star className="w-4 h-4 mr-1 text-yellow-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 flex justify-between">
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm">
          <BarChart2 className="w-4 h-4 mr-2" />
          Analytics
        </Button>
        <Button variant="outline" size="sm">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
        <Button variant="outline" size="sm">
          Promote
        </Button>
      </CardFooter>
    </Card>
  )
}

