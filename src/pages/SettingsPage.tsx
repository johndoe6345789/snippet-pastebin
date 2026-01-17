import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getDatabaseStats, exportDatabase, importDatabase, clearDatabase, seedDatabase, getAllSnippets, validateDatabaseSchema } from '@/lib/db'
import { toast } from 'sonner'
import { 
  saveStorageConfig, 
  loadStorageConfig, 
  FlaskStorageAdapter,
  type StorageBackend 
} from '@/lib/storage'
import { PersistenceSettings } from '@/components/demo/PersistenceSettings'
import { SchemaHealthCard } from '@/components/settings/SchemaHealthCard'
import { BackendAutoConfigCard } from '@/components/settings/BackendAutoConfigCard'
import { StorageBackendCard } from '@/components/settings/StorageBackendCard'
import { DatabaseStatsCard } from '@/components/settings/DatabaseStatsCard'
import { StorageInfoCard } from '@/components/settings/StorageInfoCard'
import { DatabaseActionsCard } from '@/components/settings/DatabaseActionsCard'

export function SettingsPage() {
  const [stats, setStats] = useState<{
    snippetCount: number
    templateCount: number
    storageType: 'indexeddb' | 'localstorage' | 'none'
    databaseSize: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [storageBackend, setStorageBackend] = useState<StorageBackend>('indexeddb')
  const [flaskUrl, setFlaskUrl] = useState('')
  const [flaskConnectionStatus, setFlaskConnectionStatus] = useState<'unknown' | 'connected' | 'failed'>('unknown')
  const [testingConnection, setTestingConnection] = useState(false)
  const [envVarSet, setEnvVarSet] = useState(false)
  const [schemaHealth, setSchemaHealth] = useState<'unknown' | 'healthy' | 'corrupted'>('unknown')
  const [checkingSchema, setCheckingSchema] = useState(false)

  const loadStats = async () => {
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
  }

  const testFlaskConnection = async (url: string) => {
    setTestingConnection(true)
    try {
      const adapter = new FlaskStorageAdapter(url)
      const connected = await adapter.testConnection()
      setFlaskConnectionStatus(connected ? 'connected' : 'failed')
      return connected
    } catch (error) {
      console.error('Connection test failed:', error)
      setFlaskConnectionStatus('failed')
      return false
    } finally {
      setTestingConnection(false)
    }
  }

  const checkSchemaHealth = async () => {
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
  }

  useEffect(() => {
    loadStats()
    checkSchemaHealth()
    const config = loadStorageConfig()
    
    const envFlaskUrl = import.meta.env.VITE_FLASK_BACKEND_URL
    const isEnvSet = Boolean(envFlaskUrl)
    setEnvVarSet(isEnvSet)
    
    setStorageBackend(config.backend)
    setFlaskUrl(config.flaskUrl || envFlaskUrl || 'http://localhost:5000')
  }, [])

  const handleExport = async () => {
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
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  const handleClear = async () => {
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
  }

  const handleSeed = async () => {
    try {
      await seedDatabase()
      toast.success('Sample data added successfully')
      await loadStats()
    } catch (error) {
      console.error('Failed to seed:', error)
      toast.error('Failed to add sample data')
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handleTestConnection = async () => {
    await testFlaskConnection(flaskUrl)
  }

  const handleSaveStorageConfig = async () => {
    if (storageBackend === 'flask') {
      if (!flaskUrl) {
        toast.error('Please enter a Flask backend URL')
        return
      }
      
      const connected = await testFlaskConnection(flaskUrl)
      if (!connected) {
        toast.error('Cannot connect to Flask backend. Please check the URL and ensure the server is running.')
        return
      }
    }

    saveStorageConfig({
      backend: storageBackend,
      flaskUrl: storageBackend === 'flask' ? flaskUrl : undefined
    })
    
    toast.success('Storage backend updated successfully')
    await loadStats()
  }

  const handleMigrateToFlask = async () => {
    if (!flaskUrl) {
      toast.error('Please enter a Flask backend URL')
      return
    }

    try {
      const adapter = new FlaskStorageAdapter(flaskUrl)
      const connected = await adapter.testConnection()
      
      if (!connected) {
        toast.error('Cannot connect to Flask backend')
        return
      }

      const snippets = await getAllSnippets()
      
      if (snippets.length === 0) {
        toast.info('No snippets to migrate')
        return
      }

      await adapter.migrateFromIndexedDB(snippets)
      
      saveStorageConfig({
        backend: 'flask',
        flaskUrl
      })
      
      toast.success(`Successfully migrated ${snippets.length} snippets to Flask backend`)
      await loadStats()
    } catch (error) {
      console.error('Migration failed:', error)
      toast.error('Failed to migrate data to Flask backend')
    }
  }

  const handleMigrateToIndexedDB = async () => {
    if (!flaskUrl) {
      toast.error('Please enter a Flask backend URL')
      return
    }

    try {
      const adapter = new FlaskStorageAdapter(flaskUrl)
      const snippets = await adapter.migrateToIndexedDB()
      
      if (snippets.length === 0) {
        toast.info('No snippets to migrate')
        return
      }

      saveStorageConfig({
        backend: 'indexeddb'
      })
      
      window.location.reload()
      
      toast.success(`Successfully migrated ${snippets.length} snippets to IndexedDB`)
    } catch (error) {
      console.error('Migration failed:', error)
      toast.error('Failed to migrate data from Flask backend')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage your database and application settings</p>
      </div>

      <div className="grid gap-6 max-w-3xl">
        <PersistenceSettings />

        <SchemaHealthCard 
          schemaHealth={schemaHealth}
          checkingSchema={checkingSchema}
          onClear={handleClear}
          onCheckSchema={checkSchemaHealth}
        />

        <BackendAutoConfigCard 
          envVarSet={envVarSet}
          flaskUrl={flaskUrl}
          flaskConnectionStatus={flaskConnectionStatus}
          testingConnection={testingConnection}
          onTestConnection={handleTestConnection}
        />
        
        <StorageBackendCard 
          storageBackend={storageBackend}
          flaskUrl={flaskUrl}
          flaskConnectionStatus={flaskConnectionStatus}
          testingConnection={testingConnection}
          envVarSet={envVarSet}
          onStorageBackendChange={setStorageBackend}
          onFlaskUrlChange={(url) => {
            setFlaskUrl(url)
            setFlaskConnectionStatus('unknown')
          }}
          onTestConnection={handleTestConnection}
          onSaveConfig={handleSaveStorageConfig}
          onMigrateToFlask={handleMigrateToFlask}
          onMigrateToIndexedDB={handleMigrateToIndexedDB}
        />

        <DatabaseStatsCard 
          loading={loading}
          stats={stats}
          formatBytes={formatBytes}
        />

        <StorageInfoCard storageType={stats?.storageType} />

        <DatabaseActionsCard 
          onExport={handleExport}
          onImport={handleImport}
          onSeed={handleSeed}
          onClear={handleClear}
        />
      </div>
    </motion.div>
  )
}
