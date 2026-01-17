/**
 * Database schema management and validation
 */

import type { Database } from 'sql.js'

export async function validateSchema(db: Database): Promise<boolean> {
  try {
    const snippetsCheck = db.exec("PRAGMA table_info(snippets)")
    if (snippetsCheck.length === 0) return true
    
    const columns = snippetsCheck[0].values.map(row => row[1] as string)
    const requiredColumns = ['id', 'title', 'code', 'language', 'category', 'namespaceId', 'createdAt', 'updatedAt']
    
    for (const col of requiredColumns) {
      if (!columns.includes(col)) {
        console.warn(`Schema validation failed: missing column '${col}'`)
        return false
      }
    }
    
    const namespacesCheck = db.exec("PRAGMA table_info(namespaces)")
    if (namespacesCheck.length === 0) {
      console.warn('Schema validation failed: namespaces table missing')
      return false
    }
    
    return true
  } catch (error) {
    console.error('Schema validation error:', error)
    return false
  }
}

export function createTables(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS namespaces (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      createdAt INTEGER NOT NULL,
      isDefault INTEGER DEFAULT 0
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS snippets (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      code TEXT NOT NULL,
      language TEXT NOT NULL,
      category TEXT NOT NULL,
      namespaceId TEXT,
      hasPreview INTEGER DEFAULT 0,
      functionName TEXT,
      inputParameters TEXT,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL,
      FOREIGN KEY (namespaceId) REFERENCES namespaces(id)
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS snippet_templates (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      code TEXT NOT NULL,
      language TEXT NOT NULL,
      category TEXT NOT NULL,
      hasPreview INTEGER DEFAULT 0,
      functionName TEXT,
      inputParameters TEXT
    )
  `)
}

export async function validateDatabaseSchema(db: Database): Promise<{ valid: boolean; issues: string[] }> {
  try {
    const issues: string[] = []
    
    const snippetsCheck = db.exec("PRAGMA table_info(snippets)")
    if (snippetsCheck.length === 0) {
      issues.push('Snippets table missing')
      return { valid: false, issues }
    }
    
    const columns = snippetsCheck[0].values.map(row => row[1] as string)
    const requiredColumns = ['id', 'title', 'code', 'language', 'category', 'namespaceId', 'createdAt', 'updatedAt']
    
    for (const col of requiredColumns) {
      if (!columns.includes(col)) {
        issues.push(`Missing column '${col}' in snippets table`)
      }
    }
    
    const namespacesCheck = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='namespaces'")
    if (namespacesCheck.length === 0) {
      issues.push('Namespaces table missing')
    }
    
    return { valid: issues.length === 0, issues }
  } catch (error) {
    return { valid: false, issues: ['Failed to validate schema: ' + (error as Error).message] }
  }
}
