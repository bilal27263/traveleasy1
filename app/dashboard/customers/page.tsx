import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Users } from "lucide-react"

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Customers</h1>
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Users className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No customers yet</h3>
            <p className="text-sm text-gray-500 mb-4">
              Customers will appear here once they make bookings on your trips
            </p>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Customer Manually
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

