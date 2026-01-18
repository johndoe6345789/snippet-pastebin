import { openIndexedDB } from '../db-indexeddb'
import { DB_KEY } from '../db-constants'
import { initDB } from './initDB'

export async function getDatabaseStats(): Promise<{
  snippetCount: number
  templateCount: number
  storageType: 'indexeddb' | 'localstorage' | 'none'
  databaseSize: number
}> {
  const db = await initDB()

  const snippetResult = db.exec('SELECT COUNT(*) as count FROM snippets')
  const templateResult = db.exec('SELECT COUNT(*) as count FROM snippet_templates')

  const snippetCount = snippetResult[0]?.values[0]?.[0] as number || 0
  const templateCount = templateResult[0]?.values[0]?.[0] as number || 0

  const data = db.export()
  const databaseSize = data.length

  const hasIDB = await openIndexedDB()
  const hasLocalStorage = typeof localStorage !== 'undefined' && localStorage.getItem(DB_KEY) !== null
  const storageType = hasIDB ? 'indexeddb' : (hasLocalStorage ? 'localstorage' : 'none')

  return {
    snippetCount,
    templateCount,
    storageType,
    databaseSize,
  }
}
