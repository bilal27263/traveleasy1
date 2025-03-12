import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export function UserSearch() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input placeholder="Search users..." />
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Users className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No users to display</h3>
          <p className="text-sm text-gray-500 mb-4">Users will appear here once they register</p>
        </div>
      </CardContent>
    </Card>
  )
}

