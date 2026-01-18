import type { Snippet } from '../types'
import { initDB } from '../db-core/initDB'
import { mapRowsToObjects } from '../db-mapper'

export async function getSnippetsByNamespace(namespaceId: string): Promise<Snippet[]> {
  const db = await initDB()
  const results = db.exec(
    'SELECT * FROM snippets WHERE namespaceId = ? OR (namespaceId IS NULL AND ? = (SELECT id FROM namespaces WHERE isDefault = 1)) ORDER BY updatedAt DESC',
    [namespaceId, namespaceId]
  )

  return mapRowsToObjects<Snippet>(results)
}
