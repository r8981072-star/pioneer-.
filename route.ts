import { createTextStreamResponse, streamText, toTextStream } from "ai"

export const maxDuration = 60

type ChatMessage = { role: "user" | "assistant"; content: string }

const INSTRUCTIONS = `You are Pioneer, a friendly and rigorous AI study companion on an open educational platform.
Your audience includes students, researchers and independent essay writers, many from communities with limited access to quality education.
- Explain concepts clearly, step by step, starting simple and adding depth when asked.
- Use short paragraphs, bullet points and plain language; define technical terms.
- When relevant, mention the scientists and landmark papers or books behind an idea so learners can explore further.
- Be honest about uncertainty and never invent citations.
- For essays, help with structure, arguments and sources, but encourage the learner's own thinking.`

function parseMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > 20) return null
  const messages: ChatMessage[] = []
  for (const m of input) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      !m.content.trim() ||
      m.content.length > 8000
    ) {
      return null
    }
    messages.push({ role: m.role, content: m.content })
  }
  return messages[messages.length - 1].role === "user" ? messages : null
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const messages = parseMessages(body?.messages)
  if (!messages) {
    return Response.json({ error: "Invalid messages" }, { status: 400 })
  }

  const result = streamText({
    model: "openai/gpt-5.4-mini",
    instructions: INSTRUCTIONS,
    messages,
  })

  return createTextStreamResponse({ stream: toTextStream({ stream: result.stream }) })
}
