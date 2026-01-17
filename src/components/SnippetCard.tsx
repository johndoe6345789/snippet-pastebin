import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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

  const snippetData = useMemo(() => {
    try {
      const code = snippet?.code || ''
      const description = snippet?.description || ''
      const maxLength = 150
      const isTruncated = code.length > maxLength
      const displayCode = isTruncated ? code.slice(0, maxLength) + '...' : code

      return {
        description,
        displayCode,
        fullCode: code,
        isTruncated,
        hasPreview: snippet?.hasPreview || false
      }
    } catch (error) {
      return {
        description: '',
        displayCode: '',
        fullCode: '',
        isTruncated: false,
        hasPreview: false
      }
    }
  }, [snippet])

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCopy(snippetData.fullCode)
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
    onView(snippet)
  }

  if (!snippet) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">Error loading snippet</p>
      </Card>
    )
  }

  return (
    <Card 
      className="group overflow-hidden hover:border-accent/50 transition-all cursor-pointer"
      onClick={handleView}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
              {snippet.title}
            </h3>
            {snippetData.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {snippetData.description}
              </p>
            )}
          </div>
          <Badge
            className={`shrink-0 ${LANGUAGE_COLORS[snippet.language] || LANGUAGE_COLORS['Other']}`}
          >
            {snippet.language}
          </Badge>
        </div>

        <div className="rounded-md bg-secondary/30 p-3 border border-border">
          <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap break-words font-mono">
            {snippetData.displayCode}
          </pre>
          {snippetData.isTruncated && (
            <p className="text-xs text-accent mt-2">
              Click to view full code...
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex-1 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleView}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
              aria-label="Copy code"
            >
              <Copy className="h-4 w-4" />
              {isCopied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              aria-label="Edit snippet"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
