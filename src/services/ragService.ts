import { supabase } from "@/lib/supabase"

const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY

export async function embedText(text: string): Promise<number[]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "text-embedding-3-small", input: text }),
  })
  const data = await res.json()
  return data.data[0].embedding
}

export async function searchDocuments(query: string, documentId?: string) {
  const embedding = await embedText(query)

  let rpcParams: Record<string, unknown> = {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: 5,
  }
  if (documentId) rpcParams.filter_document_id = documentId

  const { data } = await supabase.rpc("match_chunks", rpcParams)
  return data || []
}

export async function chatWithContext(
  messages: { role: string; content: string }[],
  context: string
): Promise<string> {
  if (!OPENAI_KEY) {
    return `[Mock] Based on the document context, here's a simulated answer. In production, this uses GPT-4o with retrieved document chunks as context.`
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: `Answer based on these document excerpts:\n\n${context}\n\nIf the answer isn't in the documents, say so.` },
        ...messages,
      ],
      temperature: 0.3,
    }),
  })

  const data = await res.json()
  return data.choices[0].message.content
}
