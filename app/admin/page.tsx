"use client"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { supabase } from "@/lib/supabase"

const ADMIN_IDS = ["user_32eYd7pqQxnIuqXgXwUCEvBbkGz", "user_456"]

export default function AdminPage() {
  const { user, isLoaded } = useUser()
  const [categories, setCategories] = useState<any[]>([])
  const [themrs, setThemrs] = useState<any[]>([])
  const [catName, setCatName] = useState("")
  const [themrTitle, setThemrTitle] = useState("")
  const [themrDesc, setThemrDesc] = useState("")
  const [themrImg, setThemrImg] = useState("")
  const [themrCat, setThemrCat] = useState("")
  const [themrCreator, setThemrCreator] = useState("")

  useEffect(() => {
    if (isLoaded) {
      fetchCategories()
      fetchThemrs()
    }
  }, [isLoaded])

  async function fetchCategories() {
    const { data } = await supabase.from("categories").select("*")
    setCategories(data || [])
  }

  async function fetchThemrs() {
    const { data } = await supabase
      .from("themrs")
      .select("*, categories(name)")
      .order("created_at", { ascending: false })
    setThemrs(data || [])
  }

  async function addCategory() {
    if (!catName) return
    await supabase.from("categories").insert({ name: catName })
    setCatName("")
    fetchCategories()
  }

  async function addThemr() {
    if (!themrTitle || !themrCat) return
    await supabase.from("themrs").insert({
      title: themrTitle,
      description: themrDesc,
      image_url: themrImg,
      category_id: themrCat,
      created_by: themrCreator || user?.id,
    })
    setThemrTitle("")
    setThemrDesc("")
    setThemrImg("")
    setThemrCat("")
    setThemrCreator("")
    fetchThemrs()
  }

  async function updateThemrTitle(id: string, oldTitle: string) {
    const newTitle = prompt("Enter new title:", oldTitle)
    if (!newTitle) return
    await supabase.from("themrs").update({ title: newTitle }).eq("id", id)
    fetchThemrs()
  }

  if (!isLoaded) return <p>Loading...</p>
  if (!user || !ADMIN_IDS.includes(user.id)) {
    return <p className="p-6 text-red-500">Not allowed.</p>
  }

  return (
    <div className="p-6 space-y-10 text-white">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Add Category */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Add Category</h2>
        <div className="flex gap-2">
          <input
            className="px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
            placeholder="Category name..."
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
          />
          <button onClick={addCategory} className="bg-blue-600 px-4 py-2 rounded-md">
            Add
          </button>
        </div>
        <ul className="mt-2 text-sm text-gray-300">
          {categories.map((c) => (
            <li key={c.id}>• {c.name}</li>
          ))}
        </ul>
      </section>

      {/* Add Themr */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Add Themr</h2>
        <div className="grid gap-2 max-w-md">
          <input
            className="px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
            placeholder="Title..."
            value={themrTitle}
            onChange={(e) => setThemrTitle(e.target.value)}
          />
          <textarea
            className="px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
            placeholder="Description..."
            value={themrDesc}
            onChange={(e) => setThemrDesc(e.target.value)}
          />
          <input
            className="px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
            placeholder="Image URL..."
            value={themrImg}
            onChange={(e) => setThemrImg(e.target.value)}
          />
          <input
            className="px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
            placeholder="Created by..."
            value={themrCreator}
            onChange={(e) => setThemrCreator(e.target.value)}
          />
          <select
            className="px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700"
            value={themrCat}
            onChange={(e) => setThemrCat(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button onClick={addThemr} className="bg-green-600 px-4 py-2 rounded-md">
            Create
          </button>
        </div>
      </section>

      {/* Existing Themrs */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Existing Themrs</h2>
        <div className="grid gap-4">
          {themrs.map((t: any) => (
            <div
              key={t.id}
              className="border border-neutral-700 rounded-md p-4 bg-neutral-900"
            >
              {t.image_url && (
                <img
                  src={t.image_url}
                  alt={t.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h3 className="text-lg font-semibold">{t.title}</h3>
              <p className="text-sm text-gray-400">{t.description}</p>
              <p className="text-sm mt-1">
                Category: <span className="text-blue-400">{t.categories?.name || "None"}</span>
              </p>
              <p className="text-xs text-gray-500">Created by: {t.created_by}</p>
              <button
                onClick={() => updateThemrTitle(t.id, t.title)}
                className="mt-2 bg-blue-600 px-2 py-1 rounded text-xs"
              >
                Edit Title
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
