import type { SnippetTemplate } from '../types'
import { initDB } from '../db-core/initDB'
import { mapRowsToObjects } from '../db-mapper'

export async function getAllTemplates(): Promise<SnippetTemplate[]> {
  const db = await initDB()
  const results = db.exec('SELECT * FROM snippet_templates')

  return mapRowsToObjects<SnippetTemplate>(results)
}
