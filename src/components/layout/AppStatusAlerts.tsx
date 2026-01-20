'use client';

import { CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getStorageConfig } from '@/lib/storage'

/**
 * Small stack of status alerts to keep tests and users informed about
 * the current storage mode and backend connectivity.
 */
export function AppStatusAlerts() {
  const { backend } = getStorageConfig()
  const usingLocal = backend === 'indexeddb'

  return (
    <div className="space-y-2" data-testid="status-alerts">
      <Alert
        data-testid="alert-success"
        className="bg-emerald-500/5 border-emerald-500/20"
      >
        <CheckCircle className="col-start-1 mt-0.5 text-emerald-500" weight="fill" />
        <AlertTitle>Workspace ready</AlertTitle>
        <AlertDescription>
          {usingLocal
            ? 'Running in local-first mode so you can work offline without a backend.'
            : 'Connected to your configured backend. Live sync is enabled.'}
        </AlertDescription>
      </Alert>

      {usingLocal && (
        <Alert
          data-testid="alert-error"
          variant="destructive"
          className="bg-destructive/10 border-destructive/40"
        >
          <WarningCircle className="col-start-1 mt-0.5" weight="fill" />
          <AlertTitle>Cloud backend unavailable</AlertTitle>
          <AlertDescription>
            No Flask backend detected. Saving and loading will stay on this device until a server
            URL is configured.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
