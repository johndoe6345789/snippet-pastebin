import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Pencil, Trash, Check, ArrowsOut } from '@phosphor-icons/react'
import { Snippet, LANGUAGE_COLORS } from '@/lib/types'
import { cn } from '@/lib/utils'

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
      const description = snippet?.description || ''
      const code = snippet?.code || ''
      const language = snippet?.language || 'Other'
      const isTruncated = code.length > 200

      return {
        title,
        description,
        code: isTruncated ? code.slice(0, 200) + '...' : code,
        fullCode: code,
        language,
        isTruncated,
        hasPreview: snippet?.hasPreview ?? false,
      }
    } catch {
      setHasRenderError(true)
      return {
        title: 'Error Loading Snippet',
        description: '',
        code: '',
        fullCode: '',
        language: 'Other',
        isTruncated: false,
        hasPreview: false,
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
      <Card className="group relative overflow-hidden border-destructive/50 p-6">
        <div className="flex items-center gap-3 text-destructive mb-4">
          <h3 className="font-semibold text-lg">Error Loading Snippet</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          This snippet could not be loaded properly.
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
        "group relative overflow-hidden transition-all duration-300 cursor-pointer",
        "hover:shadow-lg hover:shadow-accent/10 hover:border-accent/50"
      )}
      onClick={() => onView(snippet)}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 truncate">
              {safeSnippet.title}
            </h3>
            {safeSnippet.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {safeSnippet.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {safeSnippet.hasPreview && (
            <Badge variant="outline" className="border-accent/50 text-accent text-xs">
              Preview
            </Badge>
          )}
          <Badge
            variant="outline"
            className={cn(
              "border font-medium text-xs",
              LANGUAGE_COLORS[safeSnippet.language] || LANGUAGE_COLORS['Other']
            )}
          >
            {safeSnippet.language}
          </Badge>
        </div>

        <div
          className="relative rounded-md bg-muted/50 p-4 border border-border"
          role="button"
          tabIndex={0}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
            }
          }}
        >
          <code className="text-xs font-mono text-foreground/80 whitespace-pre-wrap break-all block">
            {safeSnippet.code}
          </code>
          {safeSnippet.isTruncated && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-2 right-2 h-8 gap-2 bg-background/90 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation()
                onView(snippet)
              }}
              tabIndex={-1}
            >
              <ArrowsOut className="h-4 w-4" />
              View Full
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {new Date(snippet.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0"
              aria-label="Copy code"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" weight="bold" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-8 w-8 p-0"
              aria-label="Edit snippet"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              aria-label="Delete snippet"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
