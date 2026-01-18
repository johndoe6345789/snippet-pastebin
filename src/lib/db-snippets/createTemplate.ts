import type { SnippetTemplate } from '../types'
import { initDB } from '../db-core/initDB'
import { saveDB } from '../db-core/saveDB'

export async function createTemplate(template: SnippetTemplate): Promise<void> {
  const db = await initDB()

  db.run(
    `INSERT INTO snippet_templates (id, title, description, code, language, category, hasPreview, functionName, inputParameters)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      template.id,
      template.title,
      template.description,
      template.code,
      template.language,
      template.category,
      template.hasPreview ? 1 : 0,
      template.functionName || null,
      template.inputParameters ? JSON.stringify(template.inputParameters) : null,
    ]
  )

  await saveDB()
}
