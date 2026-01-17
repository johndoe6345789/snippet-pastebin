import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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

  const handleCopy = () => {
    onCopy(snippet.code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const truncatedCode = snippet.code.length > 200 
    ? snippet.code.slice(0, 200) + '...' 
    : snippet.code

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
              {snippet.title}
            </h3>
            {snippet.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {snippet.description}
              </p>
            )}
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "shrink-0 border font-medium text-xs px-2 py-1",
              LANGUAGE_COLORS[snippet.language] || LANGUAGE_COLORS['Other']
            )}
          >
            {snippet.language}
          </Badge>
        </div>

        <div 
          className="relative rounded-md border border-border bg-secondary/30 p-3 overflow-hidden cursor-pointer hover:border-accent/50 transition-colors"
          onClick={() => onView(snippet)}
        >
          <pre className="text-sm text-foreground/90 line-clamp-6">
            <code className="font-mono">{truncatedCode}</code>
          </pre>
          {snippet.code.length > 200 && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-secondary/30 to-transparent" />
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="sm"
              className="h-8 gap-2 bg-background/80 backdrop-blur-sm"
            >
              <ArrowsOut className="h-4 w-4" />
              View
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">
            {new Date(snippet.updatedAt).toLocaleDateString()}
          </span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0 hover:bg-accent/20 hover:text-accent"
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
              onClick={() => onEdit(snippet)}
              className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(snippet.id)}
              className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
