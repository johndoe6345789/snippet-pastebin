import { initDB } from '../db-core/initDB'
import { saveDB } from '../db-core/saveDB'
import { getFlaskAdapter } from '../db-core/getFlaskAdapter'

export async function bulkMoveSnippets(snippetIds: string[], targetNamespaceId: string): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    await adapter.bulkMoveSnippets(snippetIds, targetNamespaceId)
    return
  }

  const db = await initDB()
  const now = Date.now()

  for (const snippetId of snippetIds) {
    db.run(
      'UPDATE snippets SET namespaceId = ?, updatedAt = ? WHERE id = ?',
      [targetNamespaceId, now, snippetId]
    )
  }

  await saveDB()
}
