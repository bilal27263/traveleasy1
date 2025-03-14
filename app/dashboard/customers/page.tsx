import { CustomersPage } from "@/components/customers/CustomersPage"

export type CustomerStatus = "active" | "inactive"
export type TripStatus = "upcoming" | "completed" | "cancelled"

export interface Trip {
  id: string
  title: string
  startDate: string
  endDate: string
  status: TripStatus
  price: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  profileImage?: string
  dateJoined: string
  location?: string
  preferredLanguage?: string
  status: CustomerStatus
  trips: Trip[]
}

export default function Page() {
  return <CustomersPage />
}

