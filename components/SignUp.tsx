"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof formSchema>

interface SignUpProps {
  onClose: () => void
}

export function SignUp({ onClose }: SignUpProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })
      if (error) throw error
      toast({
        title: "Sign up successful",
        description: "Please check your email to confirm your account.",
      })
      onClose()
      router.push("/select-user-type")
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto border-none shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your email below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0 text-primary font-bold underline hover:text-primary/80 transition-colors"
            onClick={onClose}
          >
            Sign In
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

