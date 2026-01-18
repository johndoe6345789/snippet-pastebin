import initSqlJs, { Database } from 'sql.js'
import { loadFromIndexedDB } from '../db-indexeddb'
import { loadFromLocalStorage } from '../db-localstorage'
import { createTables, validateSchema } from '../db-schema'
import { saveDB } from './saveDB'
import { dbState } from './state'
import { wipeAndRecreateDB } from './wipeAndRecreateDB'

export async function initDB(): Promise<Database> {
  if (dbState.dbInstance) return dbState.dbInstance

  if (!dbState.sqlInstance) {
    dbState.sqlInstance = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })
  }

  let loadedData: Uint8Array | null = null
  let schemaValid = false

  loadedData = await loadFromIndexedDB()

  if (!loadedData) {
    loadedData = loadFromLocalStorage()
  }

  if (loadedData && loadedData.length > 0) {
    try {
      const testDb = new dbState.sqlInstance.Database(loadedData)
      schemaValid = await validateSchema(testDb)

      if (schemaValid) {
        dbState.dbInstance = testDb
      } else {
        console.warn('Schema validation failed, wiping database')
        testDb.close()
        await wipeAndRecreateDB()
        dbState.dbInstance = new dbState.sqlInstance.Database()
      }
    } catch (error) {
      console.error('Failed to load saved database, creating new one:', error)
      await wipeAndRecreateDB()
      dbState.dbInstance = new dbState.sqlInstance.Database()
    }
  } else {
    dbState.dbInstance = new dbState.sqlInstance.Database()
  }

  if (!dbState.dbInstance) {
    throw new Error('Failed to initialize database')
  }

  createTables(dbState.dbInstance)
  await saveDB()

  return dbState.dbInstance
}
