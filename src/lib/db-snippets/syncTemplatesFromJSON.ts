import type { SnippetTemplate } from '../types'
import { initDB } from '../db-core/initDB'
import { createTemplate } from './createTemplate'

export async function syncTemplatesFromJSON(templates: SnippetTemplate[]): Promise<void> {
  const db = await initDB()

  const existingTemplates = db.exec('SELECT id FROM snippet_templates')
  const existingIds = new Set(
    existingTemplates[0]?.values.map(row => row[0] as string) || []
  )

  let addedCount = 0
  for (const template of templates) {
    if (!existingIds.has(template.id)) {
      await createTemplate(template)
      addedCount++
    }
  }
}
