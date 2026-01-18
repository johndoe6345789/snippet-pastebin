import { saveToIndexedDB } from '../db-indexeddb'
import { saveToLocalStorage } from '../db-localstorage'
import { dbState } from './state'

export async function saveDB() {
  if (!dbState.dbInstance) return

  try {
    const data = dbState.dbInstance.export()

    const savedToIDB = await saveToIndexedDB(data)

    if (!savedToIDB) {
      saveToLocalStorage(data)
    }
  } catch (error) {
    console.error('Failed to save database:', error)
  }
}
