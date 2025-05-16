# データベースセットアップ

このドキュメントでは、LibSQL Vector のデータベースを準備する手順を説明します。

## テーブル作成

以下の SQL を実行して、メモとチャンクのテーブルおよびベクトルインデックスを作成してください。

```sql
-- メモのメタ情報
CREATE TABLE IF NOT EXISTS memos (
  id TEXT PRIMARY KEY,
  category TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- メモのチャンクと埋め込みベクトル
CREATE TABLE IF NOT EXISTS memo_chunks (
  id TEXT PRIMARY KEY,
  memo_id TEXT REFERENCES memos(id),
  chunk_text TEXT,
  embedding VECTOR(1536)
);

-- 埋め込みベクトルのインデックス (L2距離)
CREATE INDEX IF NOT EXISTS idx_memo_chunks_embedding ON memo_chunks USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);
```

## ENV 設定

プロジェクトルートに `.env.local` を作成し、`.env.local.example` を参考に環境変数を設定してください。