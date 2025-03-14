"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TeamMembersList } from "@/components/TeamMembersList"
import { PartnersList } from "@/components/PartnersList"
import { TeamMemberInvite } from "@/components/TeamMemberInvite"
import { PartnerInvite } from "@/components/PartnerInvite"
import { AlertCircle, CheckCircle, Users, UserPlus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("team-members")
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification({ type: null, message: "" })
    }, 5000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Team & Partners</h1>
        {notification.type && (
          <Alert
            variant={notification.type === "success" ? "default" : "destructive"}
            className={notification.type === "success" ? "bg-green-100 border-green-500" : undefined}
          >
            {notification.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>{notification.type === "success" ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        )}
      </div>

      <Tabs defaultValue="team-members" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="team-members" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="partners" className="flex items-center">
            <UserPlus className="mr-2 h-4 w-4" />
            Partners & Guides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team-members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invite Team Member</CardTitle>
              <CardDescription>
                Invite internal team members to manage different aspects of your travel agency.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TeamMemberInvite
                onSuccess={(message) => showNotification("success", message)}
                onError={(message) => showNotification("error", message)}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <TeamMembersList
                onActionSuccess={(message) => showNotification("success", message)}
                onActionError={(message) => showNotification("error", message)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invite Partner or Guide</CardTitle>
              <CardDescription>
                Invite external partners or guides to collaborate with your travel agency.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PartnerInvite
                onSuccess={(message) => showNotification("success", message)}
                onError={(message) => showNotification("error", message)}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Partners & Guides</CardTitle>
              <CardDescription>Manage your external partners and guides.</CardDescription>
            </CardHeader>
            <CardContent>
              <PartnersList
                onActionSuccess={(message) => showNotification("success", message)}
                onActionError={(message) => showNotification("error", message)}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

