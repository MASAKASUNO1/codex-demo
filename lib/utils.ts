import { openai } from './openai'

/**
 * Split text into chunks by paragraphs.
 */
export function chunkText(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
}

/**
 * Get embedding vector for given text using OpenAI API.
 */
export async function getEmbedding(text: string): Promise<number[]> {
  const resp = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  })
  return resp.data[0].embedding
}