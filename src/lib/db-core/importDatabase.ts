import initSqlJs from 'sql.js'
import { saveDB } from './saveDB'
import { dbState } from './state'

export async function importDatabase(data: Uint8Array): Promise<void> {
  if (!dbState.sqlInstance) {
    dbState.sqlInstance = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })
  }

  try {
    dbState.dbInstance = new dbState.sqlInstance.Database(data)
    await saveDB()
  } catch (error) {
    console.error('Failed to import database:', error)
    throw error
  }
}
