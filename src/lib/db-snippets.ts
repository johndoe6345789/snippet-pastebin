/**
 * Snippet CRUD operations and templates management
 */

import type { Snippet, SnippetTemplate } from './types'
import { initDB, saveDB, getFlaskAdapter } from './db-core'
import { mapRowToObject, mapRowsToObjects } from './db-mapper'
import { ensureDefaultNamespace } from './db-namespaces'
import seedSnippetsData from '@/data/seed-snippets.json'
import seedTemplatesData from '@/data/seed-templates.json'

export async function getAllSnippets(): Promise<Snippet[]> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.getAllSnippets()
  }

  const db = await initDB()
  const results = db.exec('SELECT * FROM snippets ORDER BY updatedAt DESC')
  
  return mapRowsToObjects<Snippet>(results)
}

export async function getSnippet(id: string): Promise<Snippet | null> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.getSnippet(id)
  }

  const db = await initDB()
  const results = db.exec('SELECT * FROM snippets WHERE id = ?', [id])
  
  if (results.length === 0 || results[0].values.length === 0) return null
  
  const columns = results[0].columns
  const row = results[0].values[0]
  
  return mapRowToObject<Snippet>(row, columns)
}

export async function createSnippet(snippet: Snippet): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.createSnippet(snippet)
  }

  const db = await initDB()
  
  db.run(
    `INSERT INTO snippets (id, title, description, code, language, category, namespaceId, hasPreview, functionName, inputParameters, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      snippet.id,
      snippet.title,
      snippet.description,
      snippet.code,
      snippet.language,
      snippet.category,
      snippet.namespaceId || null,
      snippet.hasPreview ? 1 : 0,
      snippet.functionName || null,
      snippet.inputParameters ? JSON.stringify(snippet.inputParameters) : null,
      snippet.createdAt,
      snippet.updatedAt
    ]
  )
  
  await saveDB()
}

export async function updateSnippet(snippet: Snippet): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.updateSnippet(snippet)
  }

  const db = await initDB()
  
  db.run(
    `UPDATE snippets 
     SET title = ?, description = ?, code = ?, language = ?, category = ?, namespaceId = ?, hasPreview = ?, functionName = ?, inputParameters = ?, updatedAt = ?
     WHERE id = ?`,
    [
      snippet.title,
      snippet.description,
      snippet.code,
      snippet.language,
      snippet.category,
      snippet.namespaceId || null,
      snippet.hasPreview ? 1 : 0,
      snippet.functionName || null,
      snippet.inputParameters ? JSON.stringify(snippet.inputParameters) : null,
      snippet.updatedAt,
      snippet.id
    ]
  )
  
  await saveDB()
}

export async function deleteSnippet(id: string): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.deleteSnippet(id)
  }

  const db = await initDB()
  
  db.run('DELETE FROM snippets WHERE id = ?', [id])
  
  await saveDB()
}

export async function getSnippetsByNamespace(namespaceId: string): Promise<Snippet[]> {
  const db = await initDB()
  const results = db.exec('SELECT * FROM snippets WHERE namespaceId = ? OR (namespaceId IS NULL AND ? = (SELECT id FROM namespaces WHERE isDefault = 1)) ORDER BY updatedAt DESC', [namespaceId, namespaceId])
  
  return mapRowsToObjects<Snippet>(results)
}

export async function moveSnippetToNamespace(snippetId: string, targetNamespaceId: string): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    const snippet = await adapter.getSnippet(snippetId)
    if (snippet) {
      snippet.namespaceId = targetNamespaceId
      snippet.updatedAt = Date.now()
      await adapter.updateSnippet(snippet)
    }
    return
  }

  const db = await initDB()
  
  db.run(
    'UPDATE snippets SET namespaceId = ?, updatedAt = ? WHERE id = ?',
    [targetNamespaceId, Date.now(), snippetId]
  )
  
  await saveDB()
}

export async function bulkMoveSnippets(snippetIds: string[], targetNamespaceId: string): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    await adapter.bulkMoveSnippets(snippetIds, targetNamespaceId)
    return
  }

  const db = await initDB()
  const now = Date.now()
  
  for (const snippetId of snippetIds) {
    db.run(
      'UPDATE snippets SET namespaceId = ?, updatedAt = ? WHERE id = ?',
      [targetNamespaceId, now, snippetId]
    )
  }
  
  await saveDB()
}

export async function getAllTemplates(): Promise<SnippetTemplate[]> {
  const db = await initDB()
  const results = db.exec('SELECT * FROM snippet_templates')
  
  return mapRowsToObjects<SnippetTemplate>(results)
}

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
      template.inputParameters ? JSON.stringify(template.inputParameters) : null
    ]
  )
  
  await saveDB()
}

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
      updatedAt: timestamp
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
