import { KeyMetrics } from "@/components/KeyMetrics"
import { QuickActions } from "@/components/QuickActions"
import { ContentFeed } from "@/components/ContentFeed"
import { UserSearch } from "@/components/UserSearch"

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Dashboard Overview</h1>
      <KeyMetrics />
      <QuickActions />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentFeed />
        <UserSearch />
      </div>
    </div>
  )
}

