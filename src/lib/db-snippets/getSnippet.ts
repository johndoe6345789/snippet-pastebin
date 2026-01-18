import type { Snippet } from '../types'
import { initDB } from '../db-core/initDB'
import { getFlaskAdapter } from '../db-core/getFlaskAdapter'
import { mapRowToObject } from '../db-mapper'

export async function getSnippet(id: string): Promise<Snippet | null> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.getSnippet(id)
  }

  const db = await initDB()
  const results = db.exec('SELECT * FROM snippets WHERE id = ?', [id])

  if (results.length === 0 || results[0].values.length === 0) return null

  const columns = results[0].columns
  const row = results[0].values[0]

  return mapRowToObject<Snippet>(row, columns)
}
