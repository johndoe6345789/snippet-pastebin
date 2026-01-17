/**
 * Main database module - Re-exports from focused modules
 * This file maintains backward compatibility while delegating to specialized modules
 */

// Re-export core database functions
export { initDB, saveDB, exportDatabase, importDatabase, getDatabaseStats, clearDatabase } from './db-core'

// Re-export snippet operations
export {
  getAllSnippets,
  getSnippet,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  getSnippetsByNamespace,
  moveSnippetToNamespace,
  bulkMoveSnippets,
  getAllTemplates,
  createTemplate,
  syncTemplatesFromJSON,
  seedDatabase
} from './db-snippets'

// Re-export namespace operations
export {
  getAllNamespaces,
  createNamespace,
  deleteNamespace,
  ensureDefaultNamespace,
  getNamespaceById
} from './db-namespaces'

// Re-export schema validation
export { validateDatabaseSchema } from './db-schema'

// Note: saveDB is intentionally not exported as it's used internally by the modules
