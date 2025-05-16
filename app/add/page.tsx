'use client'
import { useState } from 'react'

export default function AddPage() {
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [result, setResult] = useState<{ memoId: string; chunkCount: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/memo/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, content }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Error')
      setResult(json)
      setCategory('')
      setContent('')
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <section className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Memo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Category</label>
          <input
            className="w-full border px-2 py-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Content</label>
          <textarea
            className="w-full border px-2 py-1"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {result && (
        <p className="mt-4 text-green-600">
          Memo added (ID: {result.memoId}), chunks: {result.chunkCount}
        </p>
      )}
    </section>
  )
}