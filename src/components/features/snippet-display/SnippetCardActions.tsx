import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Copy, Pencil, Trash, Eye, DotsThree, FolderOpen } from '@phosphor-icons/react'
import { Namespace } from '@/lib/types'
import { strings } from '@/lib/config'

interface SnippetCardActionsProps {
  isCopied: boolean
  isMoving: boolean
  availableNamespaces: Namespace[]
  onView: (e: React.MouseEvent) => void
  onCopy: (e: React.MouseEvent) => void
  onEdit: (e: React.MouseEvent) => void
  onDelete: (e: React.MouseEvent) => void
  onMoveToNamespace: (namespaceId: string) => void
}

export function SnippetCardActions({
  isCopied,
  isMoving,
  availableNamespaces,
  onView,
  onCopy,
  onEdit,
  onDelete,
  onMoveToNamespace,
}: SnippetCardActionsProps) {
  return (
    <div className="flex items-center justify-between gap-2 pt-2">
      <div className="flex-1 flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onView}
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          {strings.snippetCard.viewButton}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="gap-2"
          aria-label={strings.snippetCard.ariaLabels.copy}
        >
          <Copy className="h-4 w-4" />
          {isCopied ? strings.snippetCard.copiedButton : strings.snippetCard.copyButton}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          aria-label={strings.snippetCard.ariaLabels.edit}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => e.stopPropagation()}
              aria-label="More options"
            >
              <DotsThree className="h-4 w-4" weight="bold" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger disabled={isMoving || availableNamespaces.length === 0}>
                <FolderOpen className="h-4 w-4 mr-2" />
                <span>Move to...</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {availableNamespaces.length === 0 ? (
                  <DropdownMenuItem disabled>
                    No other namespaces
                  </DropdownMenuItem>
                ) : (
                  availableNamespaces.map((namespace) => (
                    <DropdownMenuItem
                      key={namespace.id}
                      onClick={() => onMoveToNamespace(namespace.id)}
                    >
                      {namespace.name}
                      {namespace.isDefault && (
                        <span className="ml-2 text-xs text-muted-foreground">(Default)</span>
                      )}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
