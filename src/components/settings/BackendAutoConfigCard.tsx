import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CloudCheck, CloudSlash } from '@phosphor-icons/react'

interface BackendAutoConfigCardProps {
  envVarSet: boolean
  flaskUrl: string
  flaskConnectionStatus: 'unknown' | 'connected' | 'failed'
  testingConnection: boolean
  onTestConnection: () => Promise<void>
}

export function BackendAutoConfigCard({ 
  envVarSet, 
  flaskUrl, 
  flaskConnectionStatus, 
  testingConnection, 
  onTestConnection 
}: BackendAutoConfigCardProps) {
  if (!envVarSet) return null

  return (
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
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded">NEXT_PUBLIC_FLASK_BACKEND_URL</code>
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
                onClick={onTestConnection} 
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
  )
}
