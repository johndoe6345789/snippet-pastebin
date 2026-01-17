import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Database, Download, Upload, Trash } from '@phosphor-icons/react'
import { getDatabaseStats, exportDatabase, importDatabase, clearDatabase, seedDatabase } from '@/lib/db'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function SettingsPage() {
  const [stats, setStats] = useState<{
    snippetCount: number
    templateCount: number
    storageType: 'indexeddb' | 'localstorage' | 'none'
    databaseSize: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    loadStats()
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
      toast.success('Database cleared successfully')
      await loadStats()
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
