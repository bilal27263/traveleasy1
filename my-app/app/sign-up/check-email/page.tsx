import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckEmail() {
  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            We've sent a confirmation link to your email address. Please check your inbox and click on the link to
            confirm your account.
          </p>
          <p className="text-center mt-4">If you don't see the email, please check your spam folder.</p>
        </CardContent>
      </Card>
    </div>
  )
}

