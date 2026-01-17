import { Code } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onCreateClick: () => void
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="rounded-full bg-accent/10 p-6 mb-6">
        <Code className="h-16 w-16 text-accent" weight="duotone" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">No snippets yet</h3>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Start building your code snippet library. Save reusable code for quick access anytime.
      </p>
      <Button onClick={onCreateClick} size="lg" className="gap-2">
        <Code className="h-5 w-5" weight="bold" />
        Create Your First Snippet
      </Button>
    </div>
  )
}
