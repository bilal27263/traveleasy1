import { useRouter } from "next/router"

export default function ItemPage() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div>
      <h1>Item {slug}</h1>
      {/* Rest of your component */}
    </div>
  )
}

