import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentBookings = [
  {
    id: "1",
    customer: {
      name: "Sarah Thompson",
      email: "sarah.t@example.com",
      image: "/avatars/sarah.jpg",
    },
    destination: "Marrakech City Tour",
    amount: "$75.00",
    status: "completed",
  },
  {
    id: "2",
    customer: {
      name: "Michael Chen",
      email: "m.chen@example.com",
      image: "/avatars/michael.jpg",
    },
    destination: "Sahara Desert Adventure",
    amount: "$299.00",
    status: "processing",
  },
  {
    id: "3",
    customer: {
      name: "Emma Davis",
      email: "emma.d@example.com",
      image: "/avatars/emma.jpg",
    },
    destination: "Fes Medina Explorer",
    amount: "$65.00",
    status: "pending",
  },
  {
    id: "4",
    customer: {
      name: "James Wilson",
      email: "j.wilson@example.com",
      image: "/avatars/james.jpg",
    },
    destination: "Atlas Mountains Trek",
    amount: "$150.00",
    status: "completed",
  },
  {
    id: "5",
    customer: {
      name: "Sofia Garcia",
      email: "s.garcia@example.com",
      image: "/avatars/sofia.jpg",
    },
    destination: "Essaouira Day Trip",
    amount: "$85.00",
    status: "processing",
  },
]

export function RecentBookings() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentBookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={booking.customer.image} alt={booking.customer.name} />
                  <AvatarFallback>{booking.customer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{booking.customer.name}</span>
                  <span className="text-xs text-muted-foreground">{booking.customer.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{booking.destination}</TableCell>
            <TableCell>{booking.amount}</TableCell>
            <TableCell>
              <Badge
                variant={
                  booking.status === "completed" ? "default" : booking.status === "processing" ? "destructive" : "outline"
                }
              >
                {booking.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

