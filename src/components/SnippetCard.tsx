import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Pencil, Trash, Check, ArrowsOut, SplitVertical, WarningCircle } from '@phosphor-icons/react'
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

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCopy(snippet.code)
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

  const safeSnippet = useMemo(() => {
    try {
      const title = snippet?.title ?? 'Untitled Snippet'
      const description = snippet?.description ?? ''
      const code = snippet?.code ?? ''
      const language = snippet?.language ?? 'Other'
      const updatedAt = snippet?.updatedAt ?? Date.now()
      
      const truncatedCode = code.length > 200 
        ? code.slice(0, 200) + '...' 
        : code

      return {
        title,
        description,
        code,
        truncatedCode,
        language,
        updatedAt,
        hasPreview: snippet?.hasPreview ?? false,
        isTruncated: code.length > 200
      }
    } catch (err) {
      setHasRenderError(true)
      return {
        title: 'Error Loading Snippet',
        description: 'This snippet contains invalid data',
        code: '',
        truncatedCode: '',
        language: 'Other',
        updatedAt: Date.now(),
        hasPreview: false,
        isTruncated: false
      }
    }
  }, [snippet])

  if (hasRenderError) {
    return (
      <Card className="group relative overflow-hidden border-destructive/50 bg-destructive/5">
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-3 text-destructive">
            <WarningCircle className="h-5 w-5 shrink-0" weight="fill" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">
                {safeSnippet.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                Unable to render this snippet
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="gap-2"
            >
              <Pencil className="h-4 w-4" />
              Try to Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <Trash className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-200",
        "hover:shadow-lg hover:shadow-accent/10 hover:border-accent/30"
      )}
    >
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate mb-1">
              {safeSnippet.title}
            </h3>
            {safeSnippet.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {safeSnippet.description}
              </p>
            )}
          </div>
          <div className="flex gap-2 shrink-0 items-start">
            {safeSnippet.hasPreview && (
              <Badge 
                variant="outline" 
                className="border-accent/30 bg-accent/10 text-accent text-xs px-2 py-1 gap-1"
              >
                <SplitVertical className="h-3 w-3" weight="bold" />
                Preview
              </Badge>
            )}
            <Badge 
              variant="outline" 
              className={cn(
                "border font-medium text-xs px-2 py-1",
                LANGUAGE_COLORS[safeSnippet.language] || LANGUAGE_COLORS['Other']
              )}
            >
              {safeSnippet.language}
            </Badge>
          </div>
        </div>

        <div 
          className="relative rounded-md border border-border bg-secondary/30 p-3 overflow-hidden cursor-pointer hover:border-accent/50 transition-colors"
          onClick={() => onView(snippet)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onView(snippet)
            }
          }}
        >
          <pre className="text-sm text-foreground/90 line-clamp-6 whitespace-pre-wrap break-words">
            <code className="font-mono">{safeSnippet.truncatedCode}</code>
          </pre>
          {safeSnippet.isTruncated && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-secondary/30 to-transparent pointer-events-none" />
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="sm"
              className="h-8 gap-2 bg-background/80 backdrop-blur-sm pointer-events-none"
              tabIndex={-1}
            >
              <ArrowsOut className="h-4 w-4" />
              View
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">
            {new Date(safeSnippet.updatedAt).toLocaleDateString()}
          </span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0 hover:bg-accent/20 hover:text-accent"
              aria-label="Copy code"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-accent" weight="bold" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary"
              aria-label="Edit snippet"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
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
