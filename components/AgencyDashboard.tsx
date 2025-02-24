/* eslint-disable react/no-unescaped-entities */ 

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgencyDashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Travel Agency Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your trips here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View your agency's performance metrics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

