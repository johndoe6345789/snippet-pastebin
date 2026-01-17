import { useEffect, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, MagnifyingGlass, CaretDown, CheckSquare, FolderOpen, X } from '@phosphor-icons/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { SnippetCard } from '@/components/SnippetCard'
import { SnippetDialog } from '@/components/SnippetDialog'
import { SnippetViewer } from '@/components/SnippetViewer'
import { EmptyState } from '@/components/EmptyState'
import { NamespaceSelector } from '@/components/NamespaceSelector'
import { Snippet, SnippetTemplate } from '@/lib/types'
import { toast } from 'sonner'
import { strings } from '@/lib/config'
import templatesData from '@/data/templates.json'
import { seedDatabase, syncTemplatesFromJSON } from '@/lib/db'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  fetchSnippetsByNamespace,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  toggleSelectionMode,
  toggleSnippetSelection,
  selectAllSnippets as selectAllSnippetsAction,
  clearSelection,
  bulkMoveSnippets,
} from '@/store/slices/snippetsSlice'
import {
  fetchNamespaces,
  setSelectedNamespace,
} from '@/store/slices/namespacesSlice'
import {
  openDialog,
  closeDialog,
  openViewer,
  closeViewer,
  setSearchQuery,
} from '@/store/slices/uiSlice'
import {
  selectFilteredSnippets,
  selectSnippetsLoading,
  selectSelectionMode,
  selectSelectedIds,
  selectNamespaces,
  selectSelectedNamespaceId,
  selectDialogOpen,
  selectViewerOpen,
  selectEditingSnippet,
  selectViewingSnippet,
  selectSearchQuery,
  selectSnippets,
} from '@/store/selectors'

const templates = templatesData as SnippetTemplate[]

export function SnippetManagerRedux() {
  const dispatch = useAppDispatch()
  
  const snippets = useAppSelector(selectSnippets)
  const filteredSnippets = useAppSelector(selectFilteredSnippets)
  const loading = useAppSelector(selectSnippetsLoading)
  const selectionMode = useAppSelector(selectSelectionMode)
  const selectedIds = useAppSelector(selectSelectedIds)
  const namespaces = useAppSelector(selectNamespaces)
  const selectedNamespaceId = useAppSelector(selectSelectedNamespaceId)
  const dialogOpen = useAppSelector(selectDialogOpen)
  const viewerOpen = useAppSelector(selectViewerOpen)
  const editingSnippet = useAppSelector(selectEditingSnippet)
  const viewingSnippet = useAppSelector(selectViewingSnippet)
  const searchQuery = useAppSelector(selectSearchQuery)

  useEffect(() => {
    const loadData = async () => {
      try {
        await seedDatabase()
        await syncTemplatesFromJSON(templates)
        await dispatch(fetchNamespaces()).unwrap()
      } catch (error) {
        console.error('Failed to load data:', error)
        toast.error('Failed to load data')
      }
    }

    loadData()
  }, [dispatch])

  useEffect(() => {
    if (selectedNamespaceId) {
      dispatch(fetchSnippetsByNamespace(selectedNamespaceId))
    }
  }, [dispatch, selectedNamespaceId])

  const handleSaveSnippet = useCallback(async (snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingSnippet?.id) {
        await dispatch(updateSnippet({ ...editingSnippet, ...snippetData })).unwrap()
        toast.success(strings.toast.snippetUpdated)
      } else {
        await dispatch(createSnippet({
          ...snippetData,
          namespaceId: selectedNamespaceId || undefined,
        })).unwrap()
        toast.success(strings.toast.snippetCreated)
      }
      dispatch(closeDialog())
    } catch (error) {
      console.error('Failed to save snippet:', error)
      toast.error('Failed to save snippet')
    }
  }, [dispatch, editingSnippet, selectedNamespaceId])

  const handleEditSnippet = useCallback((snippet: Snippet) => {
    dispatch(openDialog(snippet))
  }, [dispatch])

  const handleDeleteSnippet = useCallback(async (id: string) => {
    try {
      await dispatch(deleteSnippet(id)).unwrap()
      toast.success(strings.toast.snippetDeleted)
    } catch (error) {
      console.error('Failed to delete snippet:', error)
      toast.error('Failed to delete snippet')
    }
  }, [dispatch])

  const handleCopyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code)
    toast.success(strings.toast.codeCopied)
  }, [])

  const handleViewSnippet = useCallback((snippet: Snippet) => {
    dispatch(openViewer(snippet))
  }, [dispatch])

  const handleCreateNew = useCallback(() => {
    dispatch(openDialog(null))
  }, [dispatch])

  const handleCreateFromTemplate = useCallback((templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (!template) return

    const templateSnippet = {
      id: '',
      title: template.title,
      description: template.description,
      language: template.language,
      code: template.code,
      category: template.category,
      hasPreview: template.hasPreview,
      functionName: template.functionName,
      inputParameters: template.inputParameters,
      createdAt: 0,
      updatedAt: 0,
    } as Snippet
    
    dispatch(openDialog(templateSnippet))
  }, [dispatch])

  const handleDialogClose = useCallback((open: boolean) => {
    if (!open) {
      dispatch(closeDialog())
    }
  }, [dispatch])

  const handleToggleSelectionMode = useCallback(() => {
    dispatch(toggleSelectionMode())
  }, [dispatch])

  const handleToggleSnippetSelection = useCallback((snippetId: string) => {
    dispatch(toggleSnippetSelection(snippetId))
  }, [dispatch])

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === filteredSnippets.length) {
      dispatch(clearSelection())
    } else {
      dispatch(selectAllSnippetsAction())
    }
  }, [dispatch, filteredSnippets.length, selectedIds.size])

  const handleBulkMove = useCallback(async (targetNamespaceId: string) => {
    if (selectedIds.size === 0) {
      toast.error('No snippets selected')
      return
    }

    try {
      await dispatch(bulkMoveSnippets({
        snippetIds: Array.from(selectedIds),
        targetNamespaceId
      })).unwrap()
      
      const targetNamespace = namespaces.find(n => n.id === targetNamespaceId)
      toast.success(`Moved ${selectedIds.size} snippet${selectedIds.size > 1 ? 's' : ''} to ${targetNamespace?.name || 'namespace'}`)
      
      if (selectedNamespaceId) {
        dispatch(fetchSnippetsByNamespace(selectedNamespaceId))
      }
    } catch (error) {
      console.error('Failed to bulk move snippets:', error)
      toast.error('Failed to move snippets')
    }
  }, [dispatch, selectedIds, namespaces, selectedNamespaceId])

  const handleNamespaceChange = useCallback((namespaceId: string | null) => {
    if (namespaceId) {
      dispatch(setSelectedNamespace(namespaceId))
    }
  }, [dispatch])

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Loading snippets...</p>
      </div>
    )
  }

  if (snippets.length === 0) {
    return (
      <>
        <div className="mb-6">
          <NamespaceSelector
            selectedNamespaceId={selectedNamespaceId}
            onNamespaceChange={handleNamespaceChange}
          />
        </div>
        <EmptyState 
          onCreateClick={handleCreateNew}
          onCreateFromTemplate={handleCreateFromTemplate}
        />
        <SnippetDialog
          open={dialogOpen}
          onOpenChange={handleDialogClose}
          onSave={handleSaveSnippet}
          editingSnippet={editingSnippet}
        />
      </>
    )
  }

  return (
    <div className="space-y-6">
      <NamespaceSelector
        selectedNamespaceId={selectedNamespaceId}
        onNamespaceChange={handleNamespaceChange}
      />
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-md">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={strings.app.search.placeholder}
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant={selectionMode ? "default" : "outline"}
            onClick={handleToggleSelectionMode}
            className="gap-2"
          >
            {selectionMode ? (
              <>
                <X weight="bold" />
                Cancel
              </>
            ) : (
              <>
                <CheckSquare weight="bold" />
                Select
              </>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 w-full sm:w-auto">
                <Plus weight="bold" />
                {strings.app.header.newSnippetButton}
                <CaretDown weight="bold" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 max-h-[500px] overflow-y-auto">
              <DropdownMenuItem onClick={handleCreateNew}>
                <Plus className="mr-2 h-4 w-4" weight="bold" />
                Blank Snippet
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>React Components</DropdownMenuLabel>
              {templates.filter((t) => t.category === 'react').map((template) => (
                <DropdownMenuItem
                  key={template.id}
                  onClick={() => handleCreateFromTemplate(template.id)}
                >
                  <div className="flex flex-col gap-1 py-1">
                    <span className="font-medium">{template.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {template.description}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Python Scripts</DropdownMenuLabel>
              {templates.filter((t) => t.category === 'python').map((template) => (
                <DropdownMenuItem
                  key={template.id}
                  onClick={() => handleCreateFromTemplate(template.id)}
                >
                  <div className="flex flex-col gap-1 py-1">
                    <span className="font-medium">{template.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {template.description}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>JavaScript Utils</DropdownMenuLabel>
              {templates.filter((t) => t.category === 'javascript').map((template) => (
                <DropdownMenuItem
                  key={template.id}
                  onClick={() => handleCreateFromTemplate(template.id)}
                >
                  <div className="flex flex-col gap-1 py-1">
                    <span className="font-medium">{template.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {template.description}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {selectionMode && (
        <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSelectAll}
          >
            {selectedIds.size === filteredSnippets.length ? 'Deselect All' : 'Select All'}
          </Button>
          {selectedIds.size > 0 && (
            <>
              <span className="text-sm text-muted-foreground">
                {selectedIds.size} selected
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
                      onClick={() => handleBulkMove(namespace.id)}
                      disabled={namespace.id === selectedNamespaceId}
                    >
                      {namespace.name} {namespace.isDefault && '(Default)'}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      )}

      {filteredSnippets.length === 0 && searchQuery && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No snippets found matching "{searchQuery}"</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSnippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onView={handleViewSnippet}
            onEdit={handleEditSnippet}
            onDelete={handleDeleteSnippet}
            onCopy={handleCopyCode}
            selectionMode={selectionMode}
            isSelected={selectedIds.has(snippet.id)}
            onToggleSelect={handleToggleSnippetSelection}
          />
        ))}
      </div>

      <SnippetDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSave={handleSaveSnippet}
        editingSnippet={editingSnippet}
      />

      <SnippetViewer
        open={viewerOpen}
        onOpenChange={(open) => !open && dispatch(closeViewer())}
        snippet={viewingSnippet}
        onEdit={handleEditSnippet}
        onCopy={handleCopyCode}
      />
    </div>
  )
}
