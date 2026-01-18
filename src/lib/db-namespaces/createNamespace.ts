import type { Namespace } from '../types'
import { initDB } from '../db-core/initDB'
import { saveDB } from '../db-core/saveDB'
import { getFlaskAdapter } from '../db-core/getFlaskAdapter'

export async function createNamespace(name: string): Promise<Namespace> {
  const namespace: Namespace = {
    id: Date.now().toString(),
    name,
    createdAt: Date.now(),
    isDefault: false,
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
