# API リファレンス

- **OpenAI API デフォルトモデル**: gpt-4.1

## メモ追加 API

- **URL**: `/api/memo/add`
- **Method**: `POST`
- **Content-Type**: `application/json`

### リクエストボディ

```json
{
  "category": "カテゴリー名",
  "content": "メモ本文"
}
```

### レスポンス

```json
{
  "memoId": "生成されたメモの ID",
  "chunkCount": チャンク数
}
```

## メモ検索 API

- **URL**: `/api/memo/search`
- **Method**: `POST`
- **Content-Type**: `application/json`

### リクエストボディ

```json
{
  "query": "検索クエリ",
  "topK": 5  // 取得件数 (省略時は5)
}
```

### レスポンス

```json
{
  "results": [
    {
      "memoId": "メモの ID",
      "chunkText": "該当チャンク",
      "score": 類似度スコア
    }
  ]
}
```