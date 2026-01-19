import { Database, CloudCheck } from '@phosphor-icons/react'
import { getStorageConfig } from '@/lib/storage'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function BackendIndicator() {
  const { backend } = getStorageConfig()
  const isEnvConfigured = Boolean(process.env.NEXT_PUBLIC_FLASK_BACKEND_URL)

  if (backend === 'indexeddb') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
              <Database size={16} className="text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Local</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Using IndexedDB (Local Storage)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
            <CloudCheck size={16} className="text-accent" weight="fill" />
            <span className="text-xs font-medium text-accent">Backend</span>
            {isEnvConfigured && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Using Flask Backend</p>
          {isEnvConfigured && <p className="text-xs text-muted-foreground">Auto-configured</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
