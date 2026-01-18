import { initDB } from './initDB'

export async function exportDatabase(): Promise<Uint8Array> {
  const db = await initDB()
  return db.export()
}
