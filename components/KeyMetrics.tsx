import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metrics = [
  { name: "Total Trips", value: "0" },
  { name: "Total Bookings", value: "0" },
  { name: "Revenue Earned", value: "$0" },
  { name: "Trust Score", value: "—" },
  { name: "Total Reviews", value: "0" },
]

export function KeyMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {metrics.map((metric) => (
        <Card key={metric.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

