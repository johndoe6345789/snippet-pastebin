import { Button } from '@/components/ui/button'
import { FolderOpen } from '@phosphor-icons/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Namespace } from '@/lib/types'

interface SelectionControlsProps {
  selectedIds: string[]
  totalFilteredCount: number
  namespaces: Namespace[]
  currentNamespaceId: string | null
  onSelectAll: () => void
  onBulkMove: (namespaceId: string) => void
}

export function SelectionControls({
  selectedIds,
  totalFilteredCount,
  namespaces,
  currentNamespaceId,
  onSelectAll,
  onBulkMove,
}: SelectionControlsProps) {
  return (
    <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
      <Button variant="outline" size="sm" onClick={onSelectAll}>
        {selectedIds.length === totalFilteredCount ? 'Deselect All' : 'Select All'}
      </Button>
      {selectedIds.length > 0 && (
        <>
          <span className="text-sm text-muted-foreground">
            {selectedIds.length} selected
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <FolderOpen weight="bold" className="h-4 w-4" />
                Move to...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {namespaces.map((namespace) => (
                <DropdownMenuItem
                  key={namespace.id}
                  onClick={() => onBulkMove(namespace.id)}
                  disabled={namespace.id === currentNamespaceId}
                >
                  {namespace.name} {namespace.isDefault && '(Default)'}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  )
}
