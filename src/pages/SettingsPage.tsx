import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Database, Download, Upload, Trash, CloudArrowUp, CloudCheck, CloudSlash, FirstAid, CheckCircle, Warning } from '@phosphor-icons/react'
import { getDatabaseStats, exportDatabase, importDatabase, clearDatabase, seedDatabase, getAllSnippets, validateDatabaseSchema } from '@/lib/db'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  getStorageConfig, 
  saveStorageConfig, 
  loadStorageConfig, 
  FlaskStorageAdapter,
  type StorageBackend 
} from '@/lib/storage'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

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
        {schemaHealth === 'corrupted' && (
          <Card className="border-destructive bg-destructive/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Warning weight="fill" size={24} />
                Schema Corruption Detected
              </CardTitle>
              <CardDescription>
                Your database schema is outdated or corrupted and needs to be repaired
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-destructive">
                <AlertDescription>
                  The database schema is missing required tables or columns (likely due to namespace feature addition).
                  This can cause errors when loading or saving snippets. Click the button below to wipe and recreate the database with the correct schema.
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Button onClick={handleClear} variant="destructive" className="gap-2">
                  <FirstAid weight="bold" size={16} />
                  Repair Database (Wipe & Recreate)
                </Button>
                <Button onClick={checkSchemaHealth} variant="outline" disabled={checkingSchema}>
                  {checkingSchema ? 'Checking...' : 'Re-check Schema'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {schemaHealth === 'healthy' && (
          <Card className="border-green-600 bg-green-600/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle weight="fill" size={24} />
                Schema Healthy
              </CardTitle>
              <CardDescription>
                Your database schema is up to date and functioning correctly
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {envVarSet && (
          <Card className="border-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <CloudCheck weight="fill" size={24} />
                Backend Auto-Configured
              </CardTitle>
              <CardDescription>
                Flask backend is configured via environment variable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Backend URL</span>
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">{flaskUrl}</code>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Configuration Source</span>
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">VITE_FLASK_BACKEND_URL</code>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {flaskConnectionStatus === 'connected' && (
                    <span className="flex items-center gap-2 text-sm text-green-600">
                      <CloudCheck weight="fill" size={16} />
                      Connected
                    </span>
                  )}
                  {flaskConnectionStatus === 'failed' && (
                    <span className="flex items-center gap-2 text-sm text-destructive">
                      <CloudSlash weight="fill" size={16} />
                      Connection Failed
                    </span>
                  )}
                  {flaskConnectionStatus === 'unknown' && (
                    <Button 
                      onClick={handleTestConnection} 
                      variant="outline"
                      size="sm"
                      disabled={testingConnection}
                    >
                      {testingConnection ? 'Testing...' : 'Test Connection'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudArrowUp weight="duotone" size={24} />
              Storage Backend
            </CardTitle>
            <CardDescription>
              Choose where your snippets are stored
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {envVarSet && (
              <Alert className="border-accent bg-accent/10">
                <AlertDescription className="flex items-center gap-2">
                  <CloudCheck weight="fill" size={16} className="text-accent" />
                  <span>
                    Storage backend is configured via <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">VITE_FLASK_BACKEND_URL</code> environment variable and cannot be changed here.
                  </span>
                </AlertDescription>
              </Alert>
            )}
            
            <RadioGroup 
              value={storageBackend} 
              onValueChange={(value) => setStorageBackend(value as StorageBackend)}
              disabled={envVarSet}
            >
              <div className="flex items-start space-x-3 space-y-0">
                <RadioGroupItem value="indexeddb" id="storage-indexeddb" disabled={envVarSet} />
                <div className="flex-1">
                  <Label htmlFor="storage-indexeddb" className={`font-semibold ${envVarSet ? 'opacity-50' : 'cursor-pointer'}`}>
                    IndexedDB (Local Browser Storage)
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Store snippets locally in your browser. Data persists on this device only.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-y-0 mt-4">
                <RadioGroupItem value="flask" id="storage-flask" disabled={envVarSet} />
                <div className="flex-1">
                  <Label htmlFor="storage-flask" className={`font-semibold ${envVarSet ? 'opacity-50' : 'cursor-pointer'}`}>
                    Flask Backend (Remote Server)
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Store snippets on a Flask backend server. Data is accessible from any device.
                  </p>
                </div>
              </div>
            </RadioGroup>

            {storageBackend === 'flask' && (
              <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/50">
                <div>
                  <Label htmlFor="flask-url">Flask Backend URL</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="flask-url"
                      type="url"
                      placeholder="http://localhost:5000"
                      value={flaskUrl}
                      onChange={(e) => {
                        setFlaskUrl(e.target.value)
                        setFlaskConnectionStatus('unknown')
                      }}
                      disabled={envVarSet}
                    />
                    <Button 
                      onClick={handleTestConnection} 
                      variant="outline"
                      disabled={testingConnection || !flaskUrl}
                    >
                      {testingConnection ? 'Testing...' : 'Test'}
                    </Button>
                  </div>
                  {flaskConnectionStatus === 'connected' && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <CloudCheck weight="fill" size={16} />
                      Connected successfully
                    </div>
                  )}
                  {flaskConnectionStatus === 'failed' && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                      <CloudSlash weight="fill" size={16} />
                      Connection failed
                    </div>
                  )}
                </div>

                <div className="pt-2 space-y-2">
                  <Button 
                    onClick={handleMigrateToFlask} 
                    variant="outline" 
                    size="sm"
                    className="w-full gap-2"
                  >
                    <Upload weight="bold" size={16} />
                    Migrate IndexedDB Data to Flask
                  </Button>
                  <Button 
                    onClick={handleMigrateToIndexedDB} 
                    variant="outline" 
                    size="sm"
                    className="w-full gap-2"
                  >
                    <Download weight="bold" size={16} />
                    Migrate Flask Data to IndexedDB
                  </Button>
                </div>
              </div>
            )}

            <div className="pt-2">
              <Button onClick={handleSaveStorageConfig} className="gap-2" disabled={envVarSet}>
                <Database weight="bold" size={16} />
                Save Storage Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database weight="duotone" size={24} />
              Database Statistics
            </CardTitle>
            <CardDescription>
              Information about your local database storage
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : stats ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Snippets</span>
                  <span className="font-semibold">{stats.snippetCount}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Templates</span>
                  <span className="font-semibold">{stats.templateCount}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Storage Type</span>
                  <span className="font-semibold capitalize">{stats.storageType}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Database Size</span>
                  <span className="font-semibold">{formatBytes(stats.databaseSize)}</span>
                </div>
              </div>
            ) : (
              <p className="text-destructive">Failed to load statistics</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Information</CardTitle>
            <CardDescription>
              How your data is stored
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                {stats?.storageType === 'indexeddb' ? (
                  <>
                    <strong>IndexedDB</strong> is being used for storage. This provides better performance and
                    larger storage capacity compared to localStorage. Your data persists locally in your browser.
                  </>
                ) : stats?.storageType === 'localstorage' ? (
                  <>
                    <strong>localStorage</strong> is being used for storage. IndexedDB is not available in your
                    browser. Note that localStorage has a smaller storage limit (typically 5-10MB).
                  </>
                ) : (
                  <>
                    No persistent storage detected. Your data will be lost when you close the browser.
                  </>
                )}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Actions</CardTitle>
            <CardDescription>
              Backup, restore, or reset your database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Export Database</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Download your database as a file for backup or transfer to another device
              </p>
              <Button onClick={handleExport} variant="outline" className="gap-2">
                <Download weight="bold" size={16} />
                Export Database
              </Button>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold mb-2">Import Database</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Restore a previously exported database file
              </p>
              <label>
                <input
                  type="file"
                  accept=".db"
                  onChange={handleImport}
                  className="hidden"
                  id="import-db"
                />
                <Button variant="outline" className="gap-2" asChild>
                  <span>
                    <Upload weight="bold" size={16} />
                    Import Database
                  </span>
                </Button>
              </label>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold mb-2">Sample Data</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Add sample code snippets to get started (only if database is empty)
              </p>
              <Button onClick={handleSeed} variant="outline" className="gap-2">
                <Database weight="bold" size={16} />
                Add Sample Data
              </Button>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold mb-2 text-destructive">Clear All Data</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Permanently delete all snippets and templates. This cannot be undone.
              </p>
              <Button onClick={handleClear} variant="destructive" className="gap-2">
                <Trash weight="bold" size={16} />
                Clear Database
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
