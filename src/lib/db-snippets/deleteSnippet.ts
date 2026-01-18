import { initDB } from '../db-core/initDB'
import { saveDB } from '../db-core/saveDB'
import { getFlaskAdapter } from '../db-core/getFlaskAdapter'

export async function deleteSnippet(id: string): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.deleteSnippet(id)
  }

  const db = await initDB()

  db.run('DELETE FROM snippets WHERE id = ?', [id])

  await saveDB()
}
