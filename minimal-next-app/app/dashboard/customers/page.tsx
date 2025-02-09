import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MessageSquare } from 'lucide-react'

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8901', bookings: 3 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 987 654 3210', bookings: 2 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 555 123 4567', bookings: 1 },
]

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Customers</h1>
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <Card key={customer.id}>
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <p className="text-sm text-gray-500">Bookings: {customer.bookings}</p>
                    <div className="flex space-x-4 mt-2">
                      <Button variant="outline" size="sm">
                        <Mail className="mr-2 h-4 w-4" /> Email
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="mr-2 h-4 w-4" /> Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

