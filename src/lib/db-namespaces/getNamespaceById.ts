import type { Namespace } from '../types'
import { initDB } from '../db-core/initDB'
import { mapRowToObject } from '../db-mapper'

export async function getNamespaceById(id: string): Promise<Namespace | null> {
  const db = await initDB()
  const results = db.exec('SELECT * FROM namespaces WHERE id = ?', [id])

  if (results.length === 0 || results[0].values.length === 0) return null

  const columns = results[0].columns
  const row = results[0].values[0]

  return mapRowToObject<Namespace>(row, columns)
}
