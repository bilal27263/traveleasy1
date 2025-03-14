"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2, Send, TestTubes } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const roleDescriptions = {
  administrator: "Full access to all dashboard features",
  manager: "Can manage trips, content, events, and view analytics",
  editor: "Can create and edit content, trips, and events",
  support: "Can manage customers and respond to reviews",
  analyst: "Can view analytics and reports",
  viewer: "Read-only access to the dashboard",
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  role: z.enum(["administrator", "manager", "editor", "support", "analyst", "viewer"]),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface TeamMemberInviteProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export function TeamMemberInvite({ onSuccess, onError }: TeamMemberInviteProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      role: undefined,
      message: "",
    },
  })

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call
      console.log("Inviting team member:", values)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clear the form
      form.reset()
      setSelectedRole(null)

      onSuccess(`Invitation sent to ${values.fullName} (${values.email})`)
    } catch (error) {
      onError("Failed to send invitation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTest = async () => {
    setIsTesting(true)
    try {
      const values = form.getValues()
      const isValid = await form.trigger()

      if (!isValid) {
        onError("Please fill in all required fields correctly before testing")
        return
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onSuccess(`Test passed. Invitation to ${values.fullName} (${values.email}) is valid and ready to send`)
    } catch (error) {
      onError("Test failed. Please check the form for errors.")
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="colleague@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  setSelectedRole(value)
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="support">Support Agent</SelectItem>
                  <SelectItem value="analyst">Analyst</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {selectedRole && roleDescriptions[selectedRole as keyof typeof roleDescriptions]}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Message (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Add a personal message to your invitation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-6" />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleTest} disabled={isTesting || isSubmitting}>
            {isTesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <TestTubes className="mr-2 h-4 w-4" />
                Test Invitation
              </>
            )}
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Invitation
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

