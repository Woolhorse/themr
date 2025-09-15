"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

export default function SubmitThemr() {
  const { user } = useUser()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])
  const [loading, setLoading] = useState(false)

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*')
      if (data) setCategories(data)
    }
    fetchCategories()
  }, [])

  const handleSubmit = async () => {
    if (!title || !description || !file || !categoryId) return toast.error("Fill everything")
    if (!user) return toast.error("You must be signed in")

    setLoading(true)
    
    // upload file to Supabase storage
    const fileName = `${crypto.randomUUID()}-${file.name}` // unique name
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("themr-images")
      .upload(`pending/${fileName}`, file)

    if (uploadError) {
      toast.error("Upload failed")
      setLoading(false)
      return
    }

    const fileUrl = supabase.storage.from("themr-images").getPublicUrl(uploadData.path).data.publicUrl

    // insert into pending table
    const { error } = await supabase.from("themrs_user_uploaded").insert({
      title,
      description,
      image_url: fileUrl,
      user_id: user.id,
      category_id: categoryId
    })

    if (error) toast.error("Something went wrong")
    else {
      toast.success("Themr submitted!")
      setTitle(""); setDescription(""); setFile(null); setCategoryId("")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Submit a Themr</h1>
      <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <Textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <select
        className="border rounded p-2 w-full"
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
      >
        <option value="">Select a category</option>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <Button onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
    </div>
  )
}
