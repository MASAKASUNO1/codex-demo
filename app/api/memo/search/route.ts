import { NextRequest, NextResponse } from 'next/server'
import { vectorClient } from '../../../../lib/db'
import { getEmbedding } from '../../../../lib/utils'

export async function POST(req: NextRequest) {
  const { query, topK = 5 } = await req.json()
  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 })
  }
  // 検索クエリの埋め込みを取得
  const embedding = await getEmbedding(query)

  // ベクトル検索を実行
  const { rows } = await vectorClient.execute({
    sql: `
      SELECT memo_id AS memoId, chunk_text AS chunkText,
             embedding <=> ? AS score
      FROM memo_chunks
      ORDER BY embedding <=> ?
      LIMIT ?
    `,
    args: [embedding, embedding, topK],
  })

  return NextResponse.json({ results: rows })
}