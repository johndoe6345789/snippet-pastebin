import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Copy, Pencil, Trash, Eye } from '@phosphor-icons/react'
import { Snippet, LANGUAGE_COLORS } from '@/lib/types'

interface SnippetCardProps {
  snippet: Snippet
  onEdit: (snippet: Snippet) => void
  onDelete: (id: string) => void
  onCopy: (code: string) => void
  onView: (snippet: Snippet) => void
}

export function SnippetCard({ snippet, onEdit, onDelete, onCopy, onView }: SnippetCardProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [hasRenderError, setHasRenderError] = useState(false)

  const safeSnippet = useMemo(() => {
    try {
      const title = snippet?.title || 'Untitled Snippet'
      const code = snippet?.code || ''
      const description = snippet?.description || ''
      const maxCodeLength = 100
      const isTruncated = code.length > maxCodeLength
      const displayCode = isTruncated ? code.slice(0, maxCodeLength) + '...' : code

      return {
        title,
        description,
        displayCode,
        fullCode: code,
        isTruncated,
        language: snippet?.language || 'Other',
        hasPreview: snippet?.hasPreview || false
      }
    } catch {
      setHasRenderError(true)
      return {
        title: 'Error Loading Snippet',
        description: 'This snippet could not be loaded properly',
        displayCode: '',
        fullCode: '',
        isTruncated: false,
        language: 'Other',
        hasPreview: false
      }
    }
  }, [snippet])

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCopy(safeSnippet.fullCode)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(snippet)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(snippet.id)
  }

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation()
    onView(snippet)
  }

  if (hasRenderError) {
    return (
      <Card className="p-6 border-destructive">
        <p className="text-destructive">Error rendering snippet</p>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all hover:shadow-lg hover:border-accent/50',
        'flex flex-col h-full'
      )}
    >
      <div className="p-6 flex-1 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-2 text-foreground truncate">
              {safeSnippet.title}
            </h3>
            {safeSnippet.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {safeSnippet.description}
              </p>
            )}
          </div>
          <Badge
            variant="outline"
            className={cn(
              'font-mono text-xs shrink-0',
              LANGUAGE_COLORS[safeSnippet.language] || LANGUAGE_COLORS['Other']
            )}
          >
            {safeSnippet.language}
          </Badge>
        </div>

        <div className="flex-1 bg-card border border-border rounded-md p-3 overflow-hidden">
          <pre className="text-xs text-muted-foreground font-mono overflow-hidden">
            {safeSnippet.displayCode}
          </pre>
          {safeSnippet.isTruncated && (
            <p className="text-xs text-muted-foreground/60 mt-2 italic">
              Click to view full code
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-border bg-muted/20 px-6 py-3 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2">
          {safeSnippet.isTruncated && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleView}
              className="h-8 w-8 p-0"
              aria-label="View full snippet"
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="h-8 w-8 p-0"
            aria-label="Copy code"
          >
            <Copy className="h-4 w-4" weight={isCopied ? 'fill' : 'regular'} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleEdit}
            className="h-8 w-8 p-0"
            aria-label="Edit snippet"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            aria-label="Delete snippet"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
