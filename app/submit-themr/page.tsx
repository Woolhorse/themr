"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

export default function SubmitThemr() {
  const { user } = useUser()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!user) return toast.error("You must be signed in!")
    if (!title || !description || !file) return toast.error("Fill out everything")

    setLoading(true)

    try {
      // generate a unique file name
      const uniqueName = `pending/${crypto.randomUUID()}-${file.name}`

      // upload the file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("themr-images")
        .upload(uniqueName, file)

      if (uploadError || !uploadData?.path) throw uploadError || new Error("Upload failed")

      // get public URL
      const { data: publicUrlData } = supabase
        .storage
        .from("themr-images")
        .getPublicUrl(uploadData.path)

      if (!publicUrlData?.publicUrl) throw new Error("Failed to get file URL")

      // insert into pending table (updated table name)
      const { error: insertError } = await supabase.from("themrs_user_uploaded").insert({
        title,
        description,
        image_url: publicUrlData.publicUrl,
        user_id: user.id
      })

      if (insertError) throw insertError

      toast.success("Themr submitted!")
      setTitle("")
      setDescription("")
      setFile(null)
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Submit a Themr</h1>
      <Input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files?.[0] || null)}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  )
}
