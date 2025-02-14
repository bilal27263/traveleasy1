import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, FileText, Calendar } from 'lucide-react'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex space-x-4">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Trip
        </Button>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" /> Post Content
        </Button>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" /> View Upcoming Trips
        </Button>
      </CardContent>
    </Card>
  )
}

