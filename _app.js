import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }) {
  console.log("Vercel Analytics component rendered")
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp

