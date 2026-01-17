/**
 * Core database initialization and management
 */

import initSqlJs, { Database } from 'sql.js'
import { loadFromIndexedDB, saveToIndexedDB, openIndexedDB, deleteFromIndexedDB } from './db-indexeddb'
import { loadFromLocalStorage, saveToLocalStorage, deleteFromLocalStorage } from './db-localstorage'
import { validateSchema, createTables } from './db-schema'
import { getStorageConfig, FlaskStorageAdapter, loadStorageConfig } from './storage'

let dbInstance: Database | null = null
let sqlInstance: any = null
let flaskAdapter: FlaskStorageAdapter | null = null
let configLoaded = false

async function wipeAndRecreateDB(): Promise<void> {
  console.warn('Wiping corrupted database and creating fresh schema...')
  
  await saveToIndexedDB(new Uint8Array())
  saveToLocalStorage(new Uint8Array())
  
  await deleteFromIndexedDB()
  deleteFromLocalStorage()
  
  dbInstance = null
}

export async function initDB(): Promise<Database> {
  if (dbInstance) return dbInstance

  if (!sqlInstance) {
    sqlInstance = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`
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
      const testDb = new sqlInstance.Database(loadedData)
      schemaValid = await validateSchema(testDb)
      
      if (schemaValid) {
        dbInstance = testDb
      } else {
        console.warn('Schema validation failed, wiping database')
        testDb.close()
        await wipeAndRecreateDB()
        dbInstance = new sqlInstance.Database()
      }
    } catch (error) {
      console.error('Failed to load saved database, creating new one:', error)
      await wipeAndRecreateDB()
      dbInstance = new sqlInstance.Database()
    }
  } else {
    dbInstance = new sqlInstance.Database()
  }
  
  if (!dbInstance) {
    throw new Error('Failed to initialize database')
  }
  
  createTables(dbInstance)
  await saveDB()

  return dbInstance
}

export async function saveDB() {
  if (!dbInstance) return
  
  try {
    const data = dbInstance.export()
    
    const savedToIDB = await saveToIndexedDB(data)
    
    if (!savedToIDB) {
      saveToLocalStorage(data)
    }
  } catch (error) {
    console.error('Failed to save database:', error)
  }
}

export function getFlaskAdapter(): FlaskStorageAdapter | null {
  if (!configLoaded) {
    loadStorageConfig()
    configLoaded = true
  }
  
  const config = getStorageConfig()
  if (config.backend === 'flask' && config.flaskUrl) {
    try {
      if (!flaskAdapter || flaskAdapter['baseUrl'] !== config.flaskUrl) {
        flaskAdapter = new FlaskStorageAdapter(config.flaskUrl)
      }
      return flaskAdapter
    } catch (error) {
      console.warn('Failed to create Flask adapter:', error)
      return null
    }
  }
  return null
}

export async function exportDatabase(): Promise<Uint8Array> {
  const db = await initDB()
  return db.export()
}

export async function importDatabase(data: Uint8Array): Promise<void> {
  if (!sqlInstance) {
    sqlInstance = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`
    })
  }
  
  try {
    dbInstance = new sqlInstance.Database(data)
    await saveDB()
  } catch (error) {
    console.error('Failed to import database:', error)
    throw error
  }
}

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
  const storageType = hasIDB ? 'indexeddb' : (loadFromLocalStorage() ? 'localstorage' : 'none')
  
  return {
    snippetCount,
    templateCount,
    storageType,
    databaseSize
  }
}

export async function clearDatabase(): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    await adapter.wipeDatabase()
    return
  }

  await deleteFromIndexedDB()
  deleteFromLocalStorage()
  
  dbInstance = null
  await initDB()
}
