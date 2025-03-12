import Image from "next/image"
import { CheckCircle } from "lucide-react"

interface UserProfilePictureProps {
  src: string
  alt: string
  isVerified: boolean
}

export function UserProfilePicture({ src, alt, isVerified }: UserProfilePictureProps) {
  return (
    <div className="relative">
      <Image src={src} alt={alt} width={40} height={40} className="rounded-full" />
      {isVerified && <CheckCircle className="absolute bottom-0 right-0 w-4 h-4 text-blue-500 bg-white rounded-full" />}
    </div>
  )
}

