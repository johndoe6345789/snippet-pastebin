import { deleteFromIndexedDB, saveToIndexedDB } from '../db-indexeddb'
import { deleteFromLocalStorage, saveToLocalStorage } from '../db-localstorage'
import { dbState } from './state'

export async function wipeAndRecreateDB(): Promise<void> {
  console.warn('Wiping corrupted database and creating fresh schema...')

  await saveToIndexedDB(new Uint8Array())
  saveToLocalStorage(new Uint8Array())

  await deleteFromIndexedDB()
  deleteFromLocalStorage()

  dbState.dbInstance = null
}
