import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Trash, Folder } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Namespace } from '@/lib/types'
import {
  getAllNamespaces,
  createNamespace,
  deleteNamespace,
} from '@/lib/db'

interface NamespaceSelectorProps {
  selectedNamespaceId: string | null
  onNamespaceChange: (namespaceId: string) => void
}

export function NamespaceSelector({ selectedNamespaceId, onNamespaceChange }: NamespaceSelectorProps) {
  const [namespaces, setNamespaces] = useState<Namespace[]>([])
  const [newNamespaceName, setNewNamespaceName] = useState('')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [namespaceToDelete, setNamespaceToDelete] = useState<Namespace | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadNamespaces()
  }, [])

  const loadNamespaces = async () => {
    try {
      const loadedNamespaces = await getAllNamespaces()
      setNamespaces(loadedNamespaces)
      
      if (!selectedNamespaceId && loadedNamespaces.length > 0) {
        const defaultNamespace = loadedNamespaces.find(n => n.isDefault)
        if (defaultNamespace) {
          onNamespaceChange(defaultNamespace.id)
        }
      }
    } catch (error) {
      console.error('Failed to load namespaces:', error)
      toast.error('Failed to load namespaces')
    }
  }

  const handleCreateNamespace = async () => {
    if (!newNamespaceName.trim()) {
      toast.error('Please enter a namespace name')
      return
    }

    setLoading(true)
    try {
      const newNamespace = await createNamespace(newNamespaceName.trim())
      setNamespaces(prev => [...prev, newNamespace])
      setNewNamespaceName('')
      setCreateDialogOpen(false)
      toast.success('Namespace created')
    } catch (error) {
      console.error('Failed to create namespace:', error)
      toast.error('Failed to create namespace')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteNamespace = async () => {
    if (!namespaceToDelete) return

    setLoading(true)
    try {
      await deleteNamespace(namespaceToDelete.id)
      setNamespaces(prev => prev.filter(n => n.id !== namespaceToDelete.id))
      
      if (selectedNamespaceId === namespaceToDelete.id) {
        const defaultNamespace = namespaces.find(n => n.isDefault)
        if (defaultNamespace) {
          onNamespaceChange(defaultNamespace.id)
        }
      }
      
      setDeleteDialogOpen(false)
      setNamespaceToDelete(null)
      toast.success('Namespace deleted, snippets moved to default')
    } catch (error) {
      console.error('Failed to delete namespace:', error)
      toast.error('Failed to delete namespace')
    } finally {
      setLoading(false)
    }
  }

  const selectedNamespace = namespaces.find(n => n.id === selectedNamespaceId)

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Folder weight="fill" className="h-4 w-4" />
        <span className="text-sm font-medium">Namespace:</span>
      </div>
      
      <Select
        value={selectedNamespaceId || undefined}
        onValueChange={onNamespaceChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select namespace">
            {selectedNamespace?.name || 'Select namespace'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {namespaces.map(namespace => (
            <SelectItem key={namespace.id} value={namespace.id}>
              <div className="flex items-center gap-2">
                <span>{namespace.name}</span>
                {namespace.isDefault && (
                  <span className="text-xs text-muted-foreground">(Default)</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
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
              value={newNamespaceName}
              onChange={(e) => setNewNamespaceName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateNamespace()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateNamespace} disabled={loading}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedNamespace && !selectedNamespace.isDefault && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setNamespaceToDelete(selectedNamespace)
            setDeleteDialogOpen(true)
          }}
        >
          <Trash weight="bold" />
        </Button>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Namespace</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{namespaceToDelete?.name}"? All snippets in this namespace will be moved to the default namespace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteNamespace} disabled={loading}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
