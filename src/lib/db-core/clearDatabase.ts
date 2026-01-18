import { deleteFromIndexedDB } from '../db-indexeddb'
import { deleteFromLocalStorage } from '../db-localstorage'
import { getFlaskAdapter } from './getFlaskAdapter'
import { initDB } from './initDB'
import { dbState } from './state'

export async function clearDatabase(): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    await adapter.wipeDatabase()
    return
  }

  await deleteFromIndexedDB()
  deleteFromLocalStorage()

  dbState.dbInstance = null
  await initDB()
}
