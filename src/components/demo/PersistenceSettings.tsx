'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { usePersistenceConfig } from '@/store/hooks'
import { FloppyDisk, Timer, Bug } from '@phosphor-icons/react'

export function PersistenceSettings() {
  const { config, togglePersistence, toggleLogging, updateDebounceDelay } = usePersistenceConfig()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FloppyDisk className="h-5 w-5 text-primary" weight="duotone" />
          </div>
          <div>
            <CardTitle>Redux Persistence</CardTitle>
            <CardDescription>
              Automatic database synchronization for Redux state
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="persistence-enabled" className="text-base font-medium">
              Auto-Save Enabled
            </Label>
            <p className="text-sm text-muted-foreground">
              Automatically sync Redux state changes to database
            </p>
          </div>
          <Switch
            id="persistence-enabled"
            checked={config.enabled}
            onCheckedChange={togglePersistence}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="logging-enabled" className="text-base font-medium flex items-center gap-2">
              Debug Logging
              <Bug className="h-4 w-4 text-muted-foreground" />
            </Label>
            <p className="text-sm text-muted-foreground">
              Log persistence operations to console
            </p>
          </div>
          <Switch
            id="logging-enabled"
            checked={config.logging}
            onCheckedChange={toggleLogging}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="debounce-delay" className="text-base font-medium flex items-center gap-2">
              Save Delay
              <Timer className="h-4 w-4 text-muted-foreground" />
            </Label>
            <Badge variant="secondary">{config.debounceMs}ms</Badge>
          </div>
          <div className="space-y-2">
            <Slider
              id="debounce-delay"
              min={0}
              max={1000}
              step={50}
              value={[config.debounceMs]}
              onValueChange={([value]) => updateDebounceDelay(value)}
              disabled={!config.enabled}
            />
            <p className="text-xs text-muted-foreground">
              Delay between rapid actions and database save (0-1000ms)
            </p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Monitored Actions</span>
            <Badge>{config.actions.length}</Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {config.actions.map((action) => (
              <Badge key={action} variant="outline" className="text-xs font-mono">
                {action.split('/').pop()}
              </Badge>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="text-sm font-medium">Retry Settings</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Retry on Failure</div>
              <div className="font-medium">{config.retryOnFailure ? 'Yes' : 'No'}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Max Retries</div>
              <div className="font-medium">{config.maxRetries}</div>
            </div>
            <div className="col-span-2">
              <div className="text-muted-foreground">Retry Delay</div>
              <div className="font-medium">{config.retryDelayMs}ms</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
