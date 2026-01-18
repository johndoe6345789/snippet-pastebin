import { initDB } from '../db-core/initDB'
import { saveDB } from '../db-core/saveDB'
import { getFlaskAdapter } from '../db-core/getFlaskAdapter'

export async function deleteNamespace(id: string): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.deleteNamespace(id)
  }

  const db = await initDB()

  const defaultNamespace = db.exec('SELECT id FROM namespaces WHERE isDefault = 1')
  if (defaultNamespace.length === 0 || defaultNamespace[0].values.length === 0) {
    throw new Error('Default namespace not found')
  }

  const defaultId = defaultNamespace[0].values[0][0] as string

  const checkDefault = db.exec('SELECT isDefault FROM namespaces WHERE id = ?', [id])
  if (checkDefault.length > 0 && checkDefault[0].values[0]?.[0] === 1) {
    throw new Error('Cannot delete default namespace')
  }

  db.run('UPDATE snippets SET namespaceId = ? WHERE namespaceId = ?', [defaultId, id])

  db.run('DELETE FROM namespaces WHERE id = ?', [id])

  await saveDB()
}
