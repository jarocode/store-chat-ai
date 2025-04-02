import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system:
      "You are an AI assistant for a Shopify store. Help customers with product recommendations, order status, and general inquiries. Be friendly, helpful, and concise.",
  })

  return result.toDataStreamResponse()
}

