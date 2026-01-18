import type { Namespace } from '../types'
import { initDB } from '../db-core/initDB'
import { getFlaskAdapter } from '../db-core/getFlaskAdapter'
import { mapRowsToObjects } from '../db-mapper'

export async function getAllNamespaces(): Promise<Namespace[]> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.getAllNamespaces()
  }

  const db = await initDB()
  const results = db.exec('SELECT * FROM namespaces ORDER BY isDefault DESC, name ASC')

  return mapRowsToObjects<Namespace>(results)
}
