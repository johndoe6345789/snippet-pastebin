import type { Snippet } from '../types'
import { initDB } from '../db-core/initDB'
import { getFlaskAdapter } from '../db-core/getFlaskAdapter'
import { mapRowsToObjects } from '../db-mapper'

export async function getAllSnippets(): Promise<Snippet[]> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.getAllSnippets()
  }

  const db = await initDB()
  const results = db.exec('SELECT * FROM snippets ORDER BY updatedAt DESC')

  return mapRowsToObjects<Snippet>(results)
}
