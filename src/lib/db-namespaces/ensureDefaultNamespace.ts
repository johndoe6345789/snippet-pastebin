import type { Namespace } from '../types'
import { initDB } from '../db-core/initDB'
import { saveDB } from '../db-core/saveDB'

export async function ensureDefaultNamespace(): Promise<void> {
  const db = await initDB()

  const results = db.exec('SELECT COUNT(*) as count FROM namespaces WHERE isDefault = 1')
  const count = results[0]?.values[0]?.[0] as number || 0

  if (count === 0) {
    const defaultNamespace: Namespace = {
      id: 'default',
      name: 'Default',
      createdAt: Date.now(),
      isDefault: true,
    }

    db.run(
      `INSERT INTO namespaces (id, name, createdAt, isDefault)
       VALUES (?, ?, ?, ?)`,
      [defaultNamespace.id, defaultNamespace.name, defaultNamespace.createdAt, 1]
    )

    await saveDB()
  }
}
