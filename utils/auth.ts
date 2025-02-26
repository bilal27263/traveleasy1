import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const redirectToDashboard = (userType: string, router: AppRouterInstance) => {
  switch (userType) {
    case "agency":
      router.push("/dashboard/agency")
      break
    case "guide":
      router.push("/dashboard/guide")
      break
    case "tourist":
    case "visitor":
      router.push("/dashboard/user")
      break
    default:
      router.push("/select-user-type")
  }
}

