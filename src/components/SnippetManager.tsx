import { useState, useMemo, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, MagnifyingGlass, CaretDown } from '@phosphor-icons/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { SnippetCard } from '@/components/SnippetCard'
import { SnippetDialog } from '@/components/SnippetDialog'
import { SnippetViewer } from '@/components/SnippetViewer'
import { EmptyState } from '@/components/EmptyState'
import { Snippet, SnippetTemplate } from '@/lib/types'
import { toast } from 'sonner'
import { strings } from '@/lib/config'
import templatesData from '@/data/templates.json'

const templates = templatesData as SnippetTemplate[]

export function SnippetManager() {
  const [snippets, setSnippets] = useKV<Snippet[]>('snippets', [])
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null)
  const [viewingSnippet, setViewingSnippet] = useState<Snippet | null>(null)

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

  const handleSaveSnippet = useCallback((snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSnippet) {
      setSnippets((currentSnippets) => {
        const allSnippets = currentSnippets || []
        return allSnippets.map((s) =>
          s.id === editingSnippet.id
            ? {
                ...s,
                ...snippetData,
                updatedAt: Date.now(),
              }
            : s
        )
      })
      toast.success(strings.toast.snippetUpdated)
    } else {
      const newSnippet: Snippet = {
        ...snippetData,
        id: Date.now().toString(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      setSnippets((currentSnippets) => [newSnippet, ...(currentSnippets || [])])
      toast.success(strings.toast.snippetCreated)
    }
    setEditingSnippet(null)
  }, [editingSnippet, setSnippets])

  const handleEditSnippet = useCallback((snippet: Snippet) => {
    setEditingSnippet(snippet)
    setDialogOpen(true)
  }, [])

  const handleDeleteSnippet = useCallback((id: string) => {
    setSnippets((currentSnippets) => {
      const allSnippets = currentSnippets || []
      return allSnippets.filter((s) => s.id !== id)
    })
    toast.success(strings.toast.snippetDeleted)
  }, [setSnippets])

  const handleCopyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code)
    toast.success(strings.toast.codeCopied)
  }, [])

  const handleViewSnippet = useCallback((snippet: Snippet) => {
    setViewingSnippet(snippet)
    setViewerOpen(true)
  }, [])

  const handleCreateNew = useCallback(() => {
    setEditingSnippet(null)
    setDialogOpen(true)
  }, [])

  const handleCreateFromTemplate = useCallback((templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (!template) return

    const templateSnippet: Snippet = {
      id: Date.now().toString(),
      title: template.title,
      description: template.description,
      language: template.language,
      code: template.code,
      category: template.category,
      hasPreview: template.hasPreview,
      functionName: template.functionName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    
    setEditingSnippet(templateSnippet)
    setDialogOpen(true)
  }, [])

  const handleDialogClose = useCallback((open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setEditingSnippet(null)
    }
  }, [])

  const allSnippets = snippets || []

  if (allSnippets.length === 0) {
    return (
      <>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
