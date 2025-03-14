"use client"

import { useState, useEffect } from "react"
import { SearchIcon, UserPlus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CustomerDetailsDialog } from "@/components/customers/CustomerDetailsDialog"
import { CustomerCard } from "@/components/customers/CustomerCard"
import { CustomerCardSkeleton } from "@/components/customers/CustomerCardSkeleton"
import { EmptyCustomers } from "@/components/customers/EmptyCustomers"
import { useToast } from "@/hooks/use-toast"
import type { Customer } from "@/types/customers"

export function CustomersPage() {
  // State for customers (will be empty initially)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<string>("nameAsc")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { toast } = useToast()

  // Simulate loading data (in a real application, this would be an API call)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // In a real app, we'd fetch customers here
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort customers based on search, status, and sort
  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (customer.phone && customer.phone.includes(debouncedSearchTerm))

      const matchesStatus =
        statusFilter === "all" ||
        customer.status === statusFilter ||
        (statusFilter === "withTrips" && customer.trips.length > 0) ||
        (statusFilter === "noTrips" && customer.trips.length === 0)

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "nameAsc":
          return a.name.localeCompare(b.name)
        case "nameDesc":
          return b.name.localeCompare(a.name)
        case "dateJoinedDesc":
          return new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime()
        case "dateJoinedAsc":
          return new Date(a.dateJoined).getTime() - new Date(b.dateJoined).getTime()
        case "tripCountDesc":
          return b.trips.length - a.trips.length
        case "tripCountAsc":
          return a.trips.length - b.trips.length
        default:
          return 0
      }
    })

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer)
  }

  const handleEmailCustomer = (email: string) => {
    window.location.href = `mailto:${email}`
    toast({
      title: "Email Client Opened",
      description: `Email drafted to ${email}`,
    })
  }

  const handleCallCustomer = (phone: string) => {
    window.location.href = `tel:${phone}`
    toast({
      title: "Phone Call Initiated",
      description: `Calling ${phone}`,
    })
  }

  const handleMessageCustomer = (customer: Customer) => {
    toast({
      title: "Message Feature",
      description: "This feature will be available soon.",
    })
  }

  const addCustomer = () => {
    toast({
      title: "Add Customer",
      description: "New customer form will be available soon.",
    })
  }

  // Display empty state if no customers and not loading
  if (!isLoading && customers.length === 0) {
    return <EmptyCustomers onAddCustomer={addCustomer} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Customers</h1>
          <p className="text-gray-500 mt-1">
            {filteredCustomers.length} of {customers.length} customers
          </p>
        </div>
        <Button onClick={addCustomer} size="sm">
          <UserPlus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name, email, or phone..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="withTrips">With Trips</SelectItem>
                  <SelectItem value="noTrips">No Trips</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nameAsc">Name (A-Z)</SelectItem>
                  <SelectItem value="nameDesc">Name (Z-A)</SelectItem>
                  <SelectItem value="dateJoinedDesc">Newest First</SelectItem>
                  <SelectItem value="dateJoinedAsc">Oldest First</SelectItem>
                  <SelectItem value="tripCountDesc">Most Trips</SelectItem>
                  <SelectItem value="tripCountAsc">Least Trips</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <CustomerCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <SearchIcon className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No customers found</h3>
              <p className="text-gray-500 text-center max-w-sm mt-1">
                We couldn't find any customers that match your search and filters. Try adjusting your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredCustomers.map((customer) => (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CustomerCard
                      customer={customer}
                      onViewDetails={() => handleViewDetails(customer)}
                      onEmail={() => handleEmailCustomer(customer.email)}
                      onCall={() => handleCallCustomer(customer.phone)}
                      onMessage={() => handleMessageCustomer(customer)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedCustomer && (
        <CustomerDetailsDialog
          customer={selectedCustomer}
          open={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onEmail={() => handleEmailCustomer(selectedCustomer.email)}
          onCall={() => handleCallCustomer(selectedCustomer.phone)}
          onMessage={() => handleMessageCustomer(selectedCustomer)}
        />
      )}
    </div>
  )
}

