"use client";

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { BarChart2 } from "lucide-react"

// Empty data for the charts
const emptyData = [
  { name: "Jan", bookings: 0, revenue: 0 },
  { name: "Feb", bookings: 0, revenue: 0 },
  { name: "Mar", bookings: 0, revenue: 0 },
  { name: "Apr", bookings: 0, revenue: 0 },
  { name: "May", bookings: 0, revenue: 0 },
  { name: "Jun", bookings: 0, revenue: 0 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Analytics</h1>

      {/* Empty state message */}
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <BarChart2 className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No analytics data available yet</h3>
          <p className="text-sm text-gray-500 mb-4">
            Analytics will be displayed once you start receiving bookings and user activity
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bookings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={emptyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={emptyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


