import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { 
  getDatabaseStats, 
  exportDatabase, 
  importDatabase, 
  clearDatabase, 
  seedDatabase,
  validateDatabaseSchema
} from '@/lib/db'

export function useDatabaseOperations() {
  const [stats, setStats] = useState<{
    snippetCount: number
    templateCount: number
    storageType: 'indexeddb' | 'localstorage' | 'none'
    databaseSize: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [schemaHealth, setSchemaHealth] = useState<'unknown' | 'healthy' | 'corrupted'>('unknown')
  const [checkingSchema, setCheckingSchema] = useState(false)

  const loadStats = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getDatabaseStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
      toast.error('Failed to load database statistics')
    } finally {
      setLoading(false)
    }
  }, [])

  const checkSchemaHealth = useCallback(async () => {
    setCheckingSchema(true)
    try {
      const result = await validateDatabaseSchema()
      setSchemaHealth(result.valid ? 'healthy' : 'corrupted')
      
      if (!result.valid) {
        console.warn('Schema validation failed:', result.issues)
      }
    } catch (error) {
      console.error('Schema check failed:', error)
      setSchemaHealth('corrupted')
    } finally {
      setCheckingSchema(false)
    }
  }, [])

  const handleExport = useCallback(async () => {
    try {
      const data = await exportDatabase()
      const blob = new Blob([new Uint8Array(data)], { type: 'application/octet-stream' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `codesnippet-backup-${Date.now()}.db`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Database exported successfully')
    } catch (error) {
      console.error('Failed to export:', error)
      toast.error('Failed to export database')
    }
  }, [])

  const handleImport = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const arrayBuffer = await file.arrayBuffer()
      const data = new Uint8Array(arrayBuffer)
      await importDatabase(data)
      toast.success('Database imported successfully')
      await loadStats()
    } catch (error) {
      console.error('Failed to import:', error)
      toast.error('Failed to import database')
    }

    event.target.value = ''
  }, [loadStats])

  const handleClear = useCallback(async () => {
    if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      return
    }

    try {
      await clearDatabase()
      toast.success('Database cleared and schema recreated successfully')
      await loadStats()
      await checkSchemaHealth()
    } catch (error) {
      console.error('Failed to clear:', error)
      toast.error('Failed to clear database')
    }
  }, [loadStats, checkSchemaHealth])

  const handleSeed = useCallback(async () => {
    try {
      await seedDatabase()
      toast.success('Sample data added successfully')
      await loadStats()
    } catch (error) {
      console.error('Failed to seed:', error)
      toast.error('Failed to add sample data')
    }
  }, [loadStats])

  const formatBytes = useCallback((bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }, [])

  return {
    stats,
    loading,
    schemaHealth,
    checkingSchema,
    loadStats,
    checkSchemaHealth,
    handleExport,
    handleImport,
    handleClear,
    handleSeed,
    formatBytes,
  }
}
