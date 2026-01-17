import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Snippet } from '@/lib/types'
import { LANGUAGE_COLORS } from '@/lib/config'

interface SnippetCardHeaderProps {
  snippet: Snippet
  description: string
  selectionMode: boolean
  isSelected: boolean
  onToggleSelect: () => void
}

export function SnippetCardHeader({ 
  snippet, 
  description, 
  selectionMode, 
  isSelected, 
  onToggleSelect 
}: SnippetCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        {selectionMode && (
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggleSelect}
            onClick={(e) => e.stopPropagation()}
            className="mt-1"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
            {snippet.title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
      <Badge
        className={`shrink-0 ${LANGUAGE_COLORS[snippet.language] || LANGUAGE_COLORS['Other']}`}
      >
        {snippet.language}
      </Badge>
    </div>
  )
}
