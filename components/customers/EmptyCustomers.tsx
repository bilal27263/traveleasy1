"use client"

import { UserPlus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface EmptyCustomersProps {
  onAddCustomer: () => void
}

export function EmptyCustomers({ onAddCustomer }: EmptyCustomersProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-gray-500" />
          </div>
          <CardTitle className="text-xl">No customers registered yet</CardTitle>
          <CardDescription>Once customers register for trips or events, they will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 text-center">
            Your customers page displays comprehensive profiles with contact information and trip history. Track
            registrations, manage customer details, and enable quick communication.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onAddCustomer}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Your First Customer
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

