import type { Snippet } from '../types'
import { initDB } from '../db-core/initDB'
import { saveDB } from '../db-core/saveDB'
import { getFlaskAdapter } from '../db-core/getFlaskAdapter'

export async function updateSnippet(snippet: Snippet): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.updateSnippet(snippet)
  }

  const db = await initDB()

  db.run(
    `UPDATE snippets 
     SET title = ?, description = ?, code = ?, language = ?, category = ?, namespaceId = ?, hasPreview = ?, functionName = ?, inputParameters = ?, updatedAt = ?
     WHERE id = ?`,
    [
      snippet.title,
      snippet.description,
      snippet.code,
      snippet.language,
      snippet.category,
      snippet.namespaceId || null,
      snippet.hasPreview ? 1 : 0,
      snippet.functionName || null,
      snippet.inputParameters ? JSON.stringify(snippet.inputParameters) : null,
      snippet.updatedAt,
      snippet.id,
    ]
  )

  await saveDB()
}
