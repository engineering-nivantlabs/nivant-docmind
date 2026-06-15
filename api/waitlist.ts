import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

export default async function handler(req: Request) {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 })

  const { email } = await req.json()
  if (!email) return Response.json({ error: "Email required" }, { status: 400 })

  const { error } = await supabase.from("waitlist").upsert(
    { email, source: req.headers.get("referer") || "direct" },
    { onConflict: "email" }
  )

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
