"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamInviteForm } from "@/components/TeamInviteForm"
import { PartnerInviteForm } from "@/components/PartnerInviteForm"
import { TeamMembersList } from "@/components/TeamMembersList"
import { PartnersList } from "@/components/PartnersList"

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("team")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-900">Team & Partners</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="team">Internal Team</TabsTrigger>
          <TabsTrigger value="partners">Partners & Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invite Team Member</CardTitle>
              <CardDescription>Add new members to your team and assign their roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <TeamInviteForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <TeamMembersList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invite Partner or Guide</CardTitle>
              <CardDescription>Add external partners and guides to collaborate with.</CardDescription>
            </CardHeader>
            <CardContent>
              <PartnerInviteForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partners & Guides</CardTitle>
              <CardDescription>Manage your external partners and guides.</CardDescription>
            </CardHeader>
            <CardContent>
              <PartnersList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

