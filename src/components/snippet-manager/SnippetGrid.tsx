import { SnippetCard } from '@/components/SnippetCard'
import { Snippet } from '@/lib/types'

interface SnippetGridProps {
  snippets: Snippet[]
  onView: (snippet: Snippet) => void
  onEdit: (snippet: Snippet) => void
  onDelete: (id: string) => void
  onCopy: (code: string) => void
  onMove: () => void
  selectionMode: boolean
  selectedIds: string[]
  onToggleSelect: (id: string) => void
}

export function SnippetGrid({
  snippets,
  onView,
  onEdit,
  onDelete,
  onCopy,
  onMove,
  selectionMode,
  selectedIds,
  onToggleSelect,
}: SnippetGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {snippets.map((snippet) => (
        <SnippetCard
          key={snippet.id}
          snippet={snippet}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onCopy={onCopy}
          onMove={onMove}
          selectionMode={selectionMode}
          isSelected={selectedIds.includes(snippet.id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  )
}
