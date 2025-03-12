import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, PlusCircle } from "lucide-react"

export function ContentFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input placeholder="Search content..." />
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <FileText className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No content to show yet</h3>
          <p className="text-sm text-gray-500 mb-4">Start posting content to see it here</p>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Content
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

