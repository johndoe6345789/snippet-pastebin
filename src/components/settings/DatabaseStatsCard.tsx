'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Database } from '@phosphor-icons/react'

interface DatabaseStatsCardProps {
  loading: boolean
  stats: {
    snippetCount: number
    templateCount: number
    storageType: 'indexeddb' | 'localstorage' | 'none'
    databaseSize: number
  } | null
  formatBytes: (bytes: number) => string
}

export function DatabaseStatsCard({ loading, stats, formatBytes }: DatabaseStatsCardProps) {
  return (
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
  )
}
