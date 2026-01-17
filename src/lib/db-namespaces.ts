/**
 * Namespace operations for organizing snippets
 */

import type { Namespace } from './types'
import { initDB, saveDB, getFlaskAdapter } from './db-core'
import { mapRowToObject, mapRowsToObjects } from './db-mapper'

export async function getAllNamespaces(): Promise<Namespace[]> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.getAllNamespaces()
  }

  const db = await initDB()
  const results = db.exec('SELECT * FROM namespaces ORDER BY isDefault DESC, name ASC')
  
  return mapRowsToObjects<Namespace>(results)
}

export async function createNamespace(name: string): Promise<Namespace> {
  const namespace: Namespace = {
    id: Date.now().toString(),
    name,
    createdAt: Date.now(),
    isDefault: false
  }

  const adapter = getFlaskAdapter()
  if (adapter) {
    await adapter.createNamespace(namespace)
    return namespace
  }

  const db = await initDB()
  
  db.run(
    `INSERT INTO namespaces (id, name, createdAt, isDefault)
     VALUES (?, ?, ?, ?)`,
    [namespace.id, namespace.name, namespace.createdAt, namespace.isDefault ? 1 : 0]
  )
  
  await saveDB()
  return namespace
}

export async function deleteNamespace(id: string): Promise<void> {
  const adapter = getFlaskAdapter()
  if (adapter) {
    return await adapter.deleteNamespace(id)
  }

  const db = await initDB()
  
  const defaultNamespace = db.exec('SELECT id FROM namespaces WHERE isDefault = 1')
  if (defaultNamespace.length === 0 || defaultNamespace[0].values.length === 0) {
    throw new Error('Default namespace not found')
  }
  
  const defaultId = defaultNamespace[0].values[0][0] as string
  
  const checkDefault = db.exec('SELECT isDefault FROM namespaces WHERE id = ?', [id])
  if (checkDefault.length > 0 && checkDefault[0].values[0]?.[0] === 1) {
    throw new Error('Cannot delete default namespace')
  }
  
  db.run('UPDATE snippets SET namespaceId = ? WHERE namespaceId = ?', [defaultId, id])
  
  db.run('DELETE FROM namespaces WHERE id = ?', [id])
  
  await saveDB()
}

export async function ensureDefaultNamespace(): Promise<void> {
  const db = await initDB()
  
  const results = db.exec('SELECT COUNT(*) as count FROM namespaces WHERE isDefault = 1')
  const count = results[0]?.values[0]?.[0] as number || 0
  
  if (count === 0) {
    const defaultNamespace: Namespace = {
      id: 'default',
      name: 'Default',
      createdAt: Date.now(),
      isDefault: true
    }
    
    db.run(
      `INSERT INTO namespaces (id, name, createdAt, isDefault)
       VALUES (?, ?, ?, ?)`,
      [defaultNamespace.id, defaultNamespace.name, defaultNamespace.createdAt, 1]
    )
    
    await saveDB()
  }
}

export async function getNamespaceById(id: string): Promise<Namespace | null> {
  const db = await initDB()
  const results = db.exec('SELECT * FROM namespaces WHERE id = ?', [id])
  
  if (results.length === 0 || results[0].values.length === 0) return null
  
  const columns = results[0].columns
  const row = results[0].values[0]
  
  return mapRowToObject<Namespace>(row, columns)
}
