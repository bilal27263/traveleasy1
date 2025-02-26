// import { NextResponse } from "next/server"
// import together from "@/lib/together-ai"

// export async function POST(req: Request) {
//   try {
//     const { origin, destination } = await req.json()

//     const response = await together.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: `As a travel expert, provide a brief summary of the cheapest ways to travel from ${origin} to ${destination}. Include estimated costs for air, bus, train, and car travel if applicable. Also, give a short piece of advice on how to save money on this trip. Limit your response to 150 words.`,
//         },
//       ],
//       model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
//     })

//     const advice = response.choices[0].message.content

//     return NextResponse.json({ advice })
//   } catch (error) {
//     console.error("Error generating travel advice:", error)
//     return NextResponse.json({ error: "Failed to generate travel advice" }, { status: 500 })
//   }
// }

