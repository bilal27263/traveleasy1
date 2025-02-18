"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { supabase, checkSupabaseConnection } from "@/lib/supabase"

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    fullName: z.string().min(1, "Full name is required"),
    userType: z.enum(["agency", "guide", "tourist", "visitor"], {
      required_error: "Please select a user type",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof formSchema>

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      userType: undefined,
    },
  })

  useEffect(() => {
    const checkConnection = async () => {
      const online = await checkSupabaseConnection()
      setIsOnline(online)
    }
    checkConnection()
  }, [])

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  async function signUpWithRetry(data: FormData, retries = 0): Promise<any> {
    try {
      const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            user_type: data.userType,
            full_name: data.fullName,
          },
        },
      })

      if (signUpError) {
        throw signUpError
      }

      return signUpData
    } catch (error: any) {
      console.error("Sign up attempt error:", error)
      if (retries < MAX_RETRIES && (error.name === "AuthRetryableFetchError" || error.message === "Failed to fetch")) {
        await sleep(RETRY_DELAY * (retries + 1))
        return signUpWithRetry(data, retries + 1)
      }
      throw error
    }
  }

  async function onSubmit(data: FormData) {
    if (!isOnline) {
      toast({
        title: "Error",
        description: "You are currently offline. Please check your internet connection and try again.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const signUpData = await signUpWithRetry(data)

      if (!signUpData?.user) {
        throw new Error("Failed to create account")
      }

      // Create profile entry
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: signUpData.user.id,
          full_name: data.fullName,
          user_type: data.userType,
        },
      ])

      if (profileError) {
        console.error("Error creating profile:", profileError)
        throw new Error("Failed to create profile")
      }

      toast({
        title: "Account created successfully",
        description: "Please check your email to confirm your account.",
      })

      router.push("/sign-in")
    } catch (error: any) {
      console.error("Sign up error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your details below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          {!isOnline && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
              <p className="font-bold">Warning</p>
              <p>You are currently offline. Please check your internet connection before signing up.</p>
            </div>
          )}
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
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>I am a</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your user type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="agency">Travel Agency</SelectItem>
                        <SelectItem value="guide">Tour Guide</SelectItem>
                        <SelectItem value="tourist">Tourist</SelectItem>
                        <SelectItem value="visitor">Visitor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading || !isOnline}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

