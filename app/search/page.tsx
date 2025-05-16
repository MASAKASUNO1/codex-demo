'use client'
import { useState } from 'react'

type Result = { memoId: string; chunkText: string; score: number }

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResults([])
    try {
      const res = await fetch('/api/memo/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Error')
      setResults(json.results)
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <section className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Search Memo</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          className="w-full border px-2 py-1"
          placeholder="Search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
      {error && <p className="text-red-500">Error: {error}</p>}
      {results.length > 0 && (
        <ul className="space-y-2">
          {results.map((r, i) => (
            <li key={i} className="border p-2">
              <p className="font-medium">Memo ID: {r.memoId}</p>
              <p>{r.chunkText}</p>
              <p className="text-sm text-gray-500">Score: {r.score.toFixed(4)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}