import { initDB } from '../db-core/initDB'
import { saveDB } from '../db-core/saveDB'
import { getFlaskAdapter } from '../db-core/getFlaskAdapter'

export async function moveSnippetToNamespace(snippetId: string, targetNamespaceId: string): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    const snippet = await adapter.getSnippet(snippetId)
    if (snippet) {
      snippet.namespaceId = targetNamespaceId
      snippet.updatedAt = Date.now()
      await adapter.updateSnippet(snippet)
    }
    return
  }

  const db = await initDB()

  db.run(
    'UPDATE snippets SET namespaceId = ?, updatedAt = ? WHERE id = ?',
    [targetNamespaceId, Date.now(), snippetId]
  )

  await saveDB()
}
