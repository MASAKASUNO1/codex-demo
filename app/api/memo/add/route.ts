import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { sqlClient, vectorClient } from '../../../../lib/db'
import { chunkText, getEmbedding } from '../../../../lib/utils'

export async function POST(req: NextRequest) {
  const { category, content } = await req.json()
  if (!category || !content) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }
  const memoId = uuidv4()
  const chunks = chunkText(content)

  // メタ情報を保存
  await sqlClient.execute({
    sql: 'INSERT INTO memos (id, category) VALUES (?, ?)',
    args: [memoId, category],
  })

  // チャンクごとに埋め込みを生成して保存
  for (const text of chunks) {
    const embedding = await getEmbedding(text)
    const chunkId = uuidv4()
    await vectorClient.execute({
      sql: 'INSERT INTO memo_chunks (id, memo_id, chunk_text, embedding) VALUES (?, ?, ?, ?)',
      args: [chunkId, memoId, text, embedding],
    })
  }

  return NextResponse.json({ memoId, chunkCount: chunks.length })
}