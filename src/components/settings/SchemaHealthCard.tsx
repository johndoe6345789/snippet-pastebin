'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Warning, FirstAid, CheckCircle } from '@phosphor-icons/react'

interface SchemaHealthCardProps {
  schemaHealth: 'unknown' | 'healthy' | 'corrupted'
  checkingSchema: boolean
  onClear: () => Promise<void>
  onCheckSchema: () => Promise<void>
}

export function SchemaHealthCard({ 
  schemaHealth, 
  checkingSchema, 
  onClear, 
  onCheckSchema 
}: SchemaHealthCardProps) {
  if (schemaHealth === 'unknown') return null

  if (schemaHealth === 'corrupted') {
    return (
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
            <Button onClick={onClear} variant="destructive" className="gap-2">
              <FirstAid weight="bold" size={16} />
              Repair Database (Wipe & Recreate)
            </Button>
            <Button onClick={onCheckSchema} variant="outline" disabled={checkingSchema}>
              {checkingSchema ? 'Checking...' : 'Re-check Schema'}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
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
  )
}
