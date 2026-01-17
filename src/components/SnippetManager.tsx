import { useState, useMemo, useCallback, useEffect } from 'react'
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
import { Snippet, SnippetTemplate, Namespace } from '@/lib/types'
import { toast } from 'sonner'
import { strings } from '@/lib/config'
import templatesData from '@/data/templates.json'
import { 
  getAllSnippets, 
  createSnippet, 
  updateSnippet, 
  deleteSnippet as deleteSnippetDB,
  seedDatabase,
  syncTemplatesFromJSON,
  getSnippetsByNamespace,
  ensureDefaultNamespace,
  getAllNamespaces,
  bulkMoveSnippets
} from '@/lib/db'

const templates = templatesData as SnippetTemplate[]

export function SnippetManager() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null)
  const [viewingSnippet, setViewingSnippet] = useState<Snippet | null>(null)
  const [selectedNamespaceId, setSelectedNamespaceId] = useState<string | null>(null)
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedSnippetIds, setSelectedSnippetIds] = useState<Set<string>>(new Set())
  const [namespaces, setNamespaces] = useState<Namespace[]>([])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        await seedDatabase()
        await syncTemplatesFromJSON(templates)
        
        const loadedNamespaces = await getAllNamespaces()
        setNamespaces(loadedNamespaces)
        
        const defaultNamespace = loadedNamespaces.find(n => n.isDefault)
        if (defaultNamespace) {
          setSelectedNamespaceId(defaultNamespace.id)
          const loadedSnippets = await getSnippetsByNamespace(defaultNamespace.id)
          setSnippets(loadedSnippets)
        }
      } catch (error) {
        console.error('Failed to load data:', error)
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    const loadSnippetsForNamespace = async () => {
      if (!selectedNamespaceId) return
      
      try {
        const loadedSnippets = await getSnippetsByNamespace(selectedNamespaceId)
        setSnippets(loadedSnippets)
      } catch (error) {
        console.error('Failed to load snippets:', error)
        toast.error('Failed to load snippets')
      }
    }

    loadSnippetsForNamespace()
  }, [selectedNamespaceId])

  const filteredSnippets = useMemo(() => {
    const allSnippets = snippets || []
    if (!searchQuery.trim()) return allSnippets

    const query = searchQuery.toLowerCase()
    return allSnippets.filter(
      (snippet) =>
        snippet.title.toLowerCase().includes(query) ||
        snippet.description.toLowerCase().includes(query) ||
        snippet.language.toLowerCase().includes(query) ||
        snippet.code.toLowerCase().includes(query)
    )
  }, [snippets, searchQuery])

  const handleSaveSnippet = useCallback(async (snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingSnippet?.id) {
        const updatedSnippet = {
          ...editingSnippet,
          ...snippetData,
          updatedAt: Date.now(),
        }
        await updateSnippet(updatedSnippet)
        setSnippets((current) => 
          current.map((s) => s.id === editingSnippet.id ? updatedSnippet : s)
        )
        toast.success(strings.toast.snippetUpdated)
      } else {
        const newSnippet: Snippet = {
          ...snippetData,
          id: Date.now().toString(),
          namespaceId: selectedNamespaceId || undefined,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        await createSnippet(newSnippet)
        setSnippets((current) => [newSnippet, ...current])
        toast.success(strings.toast.snippetCreated)
      }
      setEditingSnippet(null)
    } catch (error) {
      console.error('Failed to save snippet:', error)
      toast.error('Failed to save snippet')
    }
  }, [editingSnippet, selectedNamespaceId])

  const handleEditSnippet = useCallback((snippet: Snippet) => {
    setEditingSnippet(snippet)
    setDialogOpen(true)
  }, [])

  const handleDeleteSnippet = useCallback(async (id: string) => {
    try {
      await deleteSnippetDB(id)
      setSnippets((current) => current.filter((s) => s.id !== id))
      toast.success(strings.toast.snippetDeleted)
    } catch (error) {
      console.error('Failed to delete snippet:', error)
      toast.error('Failed to delete snippet')
    }
  }, [])

  const handleCopyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code)
    toast.success(strings.toast.codeCopied)
  }, [])

  const handleViewSnippet = useCallback((snippet: Snippet) => {
    setViewingSnippet(snippet)
    setViewerOpen(true)
  }, [])

  const handleMoveSnippet = useCallback(async () => {
    if (!selectedNamespaceId) return
    
    try {
      const loadedSnippets = await getSnippetsByNamespace(selectedNamespaceId)
      setSnippets(loadedSnippets)
    } catch (error) {
      console.error('Failed to reload snippets:', error)
      toast.error('Failed to reload snippets')
    }
  }, [selectedNamespaceId])

  const handleCreateNew = useCallback(() => {
    setEditingSnippet(null)
    setDialogOpen(true)
  }, [])

  const handleCreateFromTemplate = useCallback((templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (!template) return

    const templateSnippet = {
      title: template.title,
      description: template.description,
      language: template.language,
      code: template.code,
      category: template.category,
      hasPreview: template.hasPreview,
      functionName: template.functionName,
    } as Partial<Snippet>
    
    setEditingSnippet(templateSnippet as Snippet)
    setDialogOpen(true)
  }, [])

  const handleDialogClose = useCallback((open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setEditingSnippet(null)
    }
  }, [])

  const handleToggleSelectionMode = useCallback(() => {
    setSelectionMode(!selectionMode)
    setSelectedSnippetIds(new Set())
  }, [selectionMode])

  const handleToggleSnippetSelection = useCallback((snippetId: string) => {
    setSelectedSnippetIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(snippetId)) {
        newSet.delete(snippetId)
      } else {
        newSet.add(snippetId)
      }
      return newSet
    })
  }, [])

  const handleSelectAll = useCallback(() => {
    if (selectedSnippetIds.size === filteredSnippets.length) {
      setSelectedSnippetIds(new Set())
    } else {
      setSelectedSnippetIds(new Set(filteredSnippets.map(s => s.id)))
    }
  }, [filteredSnippets, selectedSnippetIds.size])

  const handleBulkMove = useCallback(async (targetNamespaceId: string) => {
    if (selectedSnippetIds.size === 0) {
      toast.error('No snippets selected')
      return
    }

    try {
      await bulkMoveSnippets(Array.from(selectedSnippetIds), targetNamespaceId)
      const targetNamespace = namespaces.find(n => n.id === targetNamespaceId)
      toast.success(`Moved ${selectedSnippetIds.size} snippet${selectedSnippetIds.size > 1 ? 's' : ''} to ${targetNamespace?.name || 'namespace'}`)
      
      setSelectedSnippetIds(new Set())
      setSelectionMode(false)
      
      if (selectedNamespaceId) {
        const loadedSnippets = await getSnippetsByNamespace(selectedNamespaceId)
        setSnippets(loadedSnippets)
      }
    } catch (error) {
      console.error('Failed to bulk move snippets:', error)
      toast.error('Failed to move snippets')
    }
  }, [selectedSnippetIds, namespaces, selectedNamespaceId])

  const allSnippets = snippets || []

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Loading snippets...</p>
      </div>
    )
  }

  if (allSnippets.length === 0) {
    return (
      <>
        <div className="mb-6">
          <NamespaceSelector
            selectedNamespaceId={selectedNamespaceId}
            onNamespaceChange={setSelectedNamespaceId}
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
        onNamespaceChange={setSelectedNamespaceId}
      />
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-md">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={strings.app.search.placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              <DropdownMenuLabel>JavaScript / TypeScript</DropdownMenuLabel>
              {templates.filter((t) => ['api', 'basics', 'async', 'types'].includes(t.category)).map((template) => (
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
              <DropdownMenuLabel>CSS Layouts</DropdownMenuLabel>
              {templates.filter((t) => t.category === 'layout').map((template) => (
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
              <DropdownMenuLabel>Python - Project Euler</DropdownMenuLabel>
              {templates.filter((t) => t.category === 'euler').map((template) => (
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
              <DropdownMenuLabel>Python - Algorithms</DropdownMenuLabel>
              {templates.filter((t) => t.category === 'algorithms' && t.language === 'Python').map((template) => (
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
              <DropdownMenuLabel>Python - Interactive Programs</DropdownMenuLabel>
              {templates.filter((t) => t.category === 'interactive').map((template) => (
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
        <div className="flex items-center justify-between gap-4 p-4 bg-accent/10 border border-accent/30 rounded-lg">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
            >
              {selectedSnippetIds.size === filteredSnippets.length ? 'Deselect All' : 'Select All'}
            </Button>
            <span className="text-sm text-muted-foreground">
              {selectedSnippetIds.size} of {filteredSnippets.length} selected
            </span>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  disabled={selectedSnippetIds.size === 0}
                  className="gap-2"
                >
                  <FolderOpen className="h-4 w-4" />
                  Move to...
                  <CaretDown weight="bold" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {namespaces
                  .filter(n => n.id !== selectedNamespaceId)
                  .map((namespace) => (
                    <DropdownMenuItem
                      key={namespace.id}
                      onClick={() => handleBulkMove(namespace.id)}
                    >
                      {namespace.name}
                      {namespace.isDefault && (
                        <span className="ml-2 text-xs text-muted-foreground">(Default)</span>
                      )}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {filteredSnippets.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold mb-2">{strings.noResults.title}</h3>
          <p className="text-muted-foreground">{strings.noResults.description}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onEdit={handleEditSnippet}
              onDelete={handleDeleteSnippet}
              onCopy={handleCopyCode}
              onView={handleViewSnippet}
              onMove={handleMoveSnippet}
              selectionMode={selectionMode}
              isSelected={selectedSnippetIds.has(snippet.id)}
              onToggleSelect={handleToggleSnippetSelection}
            />
          ))}
        </div>
      )}

      <SnippetDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        onSave={handleSaveSnippet}
        editingSnippet={editingSnippet}
      />

      <SnippetViewer
        snippet={viewingSnippet}
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        onEdit={handleEditSnippet}
        onCopy={handleCopyCode}
      />
    </div>
  )
}
