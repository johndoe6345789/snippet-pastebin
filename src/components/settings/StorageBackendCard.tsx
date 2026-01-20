'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Database, CloudArrowUp, CloudCheck, CloudSlash, Upload, Download } from '@phosphor-icons/react'
import { type StorageBackend } from '@/lib/storage'

interface StorageBackendCardProps {
  storageBackend: StorageBackend
  flaskUrl: string
  flaskConnectionStatus: 'unknown' | 'connected' | 'failed'
  testingConnection: boolean
  envVarSet: boolean
  onStorageBackendChange: (backend: StorageBackend) => void
  onFlaskUrlChange: (url: string) => void
  onTestConnection: () => Promise<void>
  onSaveConfig: () => Promise<void>
  onMigrateToFlask: () => Promise<void>
  onMigrateToIndexedDB: () => Promise<void>
}

export function StorageBackendCard({
  storageBackend,
  flaskUrl,
  flaskConnectionStatus,
  testingConnection,
  envVarSet,
  onStorageBackendChange,
  onFlaskUrlChange,
  onTestConnection,
  onSaveConfig,
  onMigrateToFlask,
  onMigrateToIndexedDB,
}: StorageBackendCardProps) {
  return (
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
                Storage backend is configured via <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">NEXT_PUBLIC_FLASK_BACKEND_URL</code> environment variable and cannot be changed here.
              </span>
            </AlertDescription>
          </Alert>
        )}
        
        <RadioGroup 
          value={storageBackend} 
          onValueChange={(value) => onStorageBackendChange(value as StorageBackend)}
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
                  onChange={(e) => onFlaskUrlChange(e.target.value)}
                  disabled={envVarSet}
                />
                <Button 
                  onClick={onTestConnection} 
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
                onClick={onMigrateToFlask} 
                variant="outline" 
                size="sm"
                className="w-full gap-2"
              >
                <Upload weight="bold" size={16} />
                Migrate IndexedDB Data to Flask
              </Button>
              <Button 
                onClick={onMigrateToIndexedDB} 
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
          <Button onClick={onSaveConfig} className="gap-2" disabled={envVarSet}>
            <Database weight="bold" size={16} />
            Save Storage Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
