import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Snippet, LANGUAGE_COLORS } from '@/lib/types'
import { Copy, Pencil, Trash, Eye } from '@phosphor-icons/react'

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

  if (hasRenderError) {
    return (
      <Card className="p-6 border-destructive/50 bg-destructive/5">
        <h3 className="font-semibold text-destructive mb-2">Error Loading Snippet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This snippet could not be loaded properly
        </p>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
        >
          Delete
        </Button>
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
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            {safeSnippet.title}
          </h3>
          {safeSnippet.description && (
            <p className="text-sm text-muted-foreground mb-3">
              {safeSnippet.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="outline"
            className={cn(
              'font-mono text-xs',
              LANGUAGE_COLORS[safeSnippet.language]
            )}
          >
            {safeSnippet.language}
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs"
          >
            {safeSnippet.isTruncated ? `${safeSnippet.fullCode.length} chars` : `${safeSnippet.fullCode.length} chars`}
          </Badge>
        </div>

        <div
          className="relative rounded-md bg-muted/50 p-3 border border-border overflow-hidden cursor-pointer hover:bg-muted/80 transition-colors"
          onClick={(e) => {
            e.preventDefault()
            onView(snippet)
          }}
        >
          <code className="text-xs font-mono text-foreground/80 whitespace-pre-wrap break-all">
            {safeSnippet.displayCode}
          </code>
          {safeSnippet.isTruncated && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-2 right-2"
              onClick={(e) => {
                e.stopPropagation()
                onView(snippet)
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
            {isCopied ? 'Copied!' : 'Copy'}
          </Button>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              aria-label="Edit snippet"
              className="h-8 w-8 p-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              aria-label="Delete snippet"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
