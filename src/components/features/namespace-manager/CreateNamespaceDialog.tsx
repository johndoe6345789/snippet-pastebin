import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from '@phosphor-icons/react'

interface CreateNamespaceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  namespaceName: string
  onNamespaceNameChange: (name: string) => void
  onCreateNamespace: () => void
  loading: boolean
}

export function CreateNamespaceDialog({
  open,
  onOpenChange,
  namespaceName,
  onNamespaceNameChange,
  onCreateNamespace,
  loading,
}: CreateNamespaceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus weight="bold" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Namespace</DialogTitle>
          <DialogDescription>
            Create a new namespace to organize your snippets
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Namespace name"
            value={namespaceName}
            onChange={(e) => onNamespaceNameChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onCreateNamespace()}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onCreateNamespace} disabled={loading}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
