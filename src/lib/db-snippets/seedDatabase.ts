import type { Snippet, SnippetTemplate } from '../types'
import { initDB } from '../db-core/initDB'
import { createSnippet } from './createSnippet'
import { createTemplate } from './createTemplate'
import { ensureDefaultNamespace } from '../db-namespaces/ensureDefaultNamespace'
import seedSnippetsData from '@/data/seed-snippets.json'
import seedTemplatesData from '@/data/seed-templates.json'

export async function seedDatabase(): Promise<void> {
  const db = await initDB()

  await ensureDefaultNamespace()

  const checkSnippets = db.exec('SELECT COUNT(*) as count FROM snippets')
  const snippetCount = checkSnippets[0]?.values[0]?.[0] as number

  if (snippetCount > 0) {
    return
  }

  const now = Date.now()

  const seedSnippets: Snippet[] = seedSnippetsData.map((snippet, index) => {
    const timestamp = now - index * 1000
    return {
      ...snippet,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
  })

  for (const snippet of seedSnippets) {
    await createSnippet(snippet)
  }

  const seedTemplates: SnippetTemplate[] = seedTemplatesData

  for (const template of seedTemplates) {
    await createTemplate(template)
  }
}
