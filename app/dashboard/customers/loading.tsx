import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CustomerCardSkeleton } from "@/components/customers/CustomerCardSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-24 mt-2" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center gap-4">
            <Skeleton className="h-10 w-full max-w-md" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-[160px]" />
              <Skeleton className="h-10 w-[160px]" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CustomerCardSkeleton key={i} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

