"use client";

import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', bookings: 40, revenue: 2400 },
  { name: 'Feb', bookings: 30, revenue: 1398 },
  { name: 'Mar', bookings: 50, revenue: 9800 },
  { name: 'Apr', bookings: 27, revenue: 3908 },
  { name: 'May', bookings: 18, revenue: 4800 },
  { name: 'Jun', bookings: 23, revenue: 3800 },
];

export default function AnalyticsPage() {
  const containerRef = useRef(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300} ref={containerRef}>
              {/* Your chart component here */}
              <div />
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            <CardDescription>Bookings data for the last 6 months</CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}