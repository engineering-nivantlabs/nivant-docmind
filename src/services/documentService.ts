import { supabase } from "@/lib/supabase"

interface Document {
  id: string
  name: string
  size: number
  page_count: number
  uploaded_at: string
  status: "processing" | "ready" | "error"
}

export async function uploadDocument(file: File, userId: string): Promise<Document> {
  const path = `${userId}/${crypto.randomUUID()}-${file.name}`
  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(path, file)

  if (uploadError) throw uploadError

  const { data } = await supabase
    .from("documents")
    .insert({
      user_id: userId,
      name: file.name,
      size: file.size,
      storage_path: path,
      status: "processing",
    })
    .select()
    .single()

  return data as Document
}

export async function listDocuments(userId: string): Promise<Document[]> {
  const { data } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", userId)
    .order("uploaded_at", { ascending: false })

  return (data as Document[]) || []
}

export async function deleteDocument(id: string) {
  await supabase.from("documents").delete().eq("id", id)
}
