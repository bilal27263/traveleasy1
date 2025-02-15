import { useRouter } from "next/router"

export default function ItemPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Item {id}</h1>
      {/* Rest of your component */}
    </div>
  )
}

