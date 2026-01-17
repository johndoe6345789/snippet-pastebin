import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, MagnifyingGlass, Code } from '@phosphor-icons/react'
import { Snippet } from '@/lib/types'
import { SnippetCard } from '@/components/SnippetCard'
import { SnippetDialog } from '@/components/SnippetDialog'
import { SnippetViewer } from '@/components/SnippetViewer'
import { EmptyState } from '@/components/EmptyState'
import { toast } from 'sonner'

function App() {
  const [snippets, setSnippets] = useKV<Snippet[]>('snippets', [])
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null)
  const [viewingSnippet, setViewingSnippet] = useState<Snippet | null>(null)

  const currentSnippets = snippets ?? []

  const filteredSnippets = currentSnippets.filter((snippet) => {
    const query = searchQuery.toLowerCase()
    return (
      snippet.title.toLowerCase().includes(query) ||
      snippet.description.toLowerCase().includes(query) ||
      snippet.language.toLowerCase().includes(query) ||
      snippet.code.toLowerCase().includes(query)
    )
  })

  const handleSaveSnippet = (snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSnippet) {
      setSnippets((current) =>
        (current ?? []).map((s) =>
          s.id === editingSnippet.id
            ? { ...s, ...snippetData, updatedAt: Date.now() }
            : s
        )
      )
      toast.success('Snippet updated successfully')
    } else {
      const newSnippet: Snippet = {
        ...snippetData,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      setSnippets((current) => [...(current ?? []), newSnippet])
      toast.success('Snippet created successfully')
    }
    setEditingSnippet(null)
  }

  const handleEditSnippet = (snippet: Snippet) => {
    setEditingSnippet(snippet)
    setDialogOpen(true)
  }

  const handleDeleteSnippet = (id: string) => {
    setSnippets((current) => (current ?? []).filter((s) => s.id !== id))
    toast.success('Snippet deleted')
  }

  const handleCopySnippet = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success('Code copied to clipboard')
  }

  const handleViewSnippet = (snippet: Snippet) => {
    setViewingSnippet(snippet)
    setViewerOpen(true)
  }

  const handleCreateNew = () => {
    setEditingSnippet(null)
    setDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, oklch(0.20 0.04 240) 50px, oklch(0.20 0.04 240) 51px)`,
          }}
        />
      </div>

      <div className="relative z-10">
        <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent/20 p-2 border border-accent/30">
                  <Code className="h-6 w-6 text-accent" weight="duotone" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Code Snippets
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {currentSnippets.length} {currentSnippets.length === 1 ? 'snippet' : 'snippets'} saved
                  </p>
                </div>
              </div>
              <Button
                onClick={handleCreateNew}
                size="lg"
                className="gap-2 w-full sm:w-auto"
              >
                <Plus weight="bold" />
                New Snippet
              </Button>
            </div>

            {currentSnippets.length > 0 && (
              <div className="mt-6">
                <div className="relative">
                  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search snippets by title, language, or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {currentSnippets.length === 0 ? (
            <EmptyState onCreateClick={handleCreateNew} />
          ) : filteredSnippets.length === 0 ? (
            <div className="text-center py-20">
              <MagnifyingGlass className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No snippets found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search query
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSnippets.map((snippet) => (
                <SnippetCard
                  key={snippet.id}
                  snippet={snippet}
                  onEdit={handleEditSnippet}
                  onDelete={handleDeleteSnippet}
                  onCopy={handleCopySnippet}
                  onView={handleViewSnippet}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <SnippetDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveSnippet}
        editingSnippet={editingSnippet}
      />

      <SnippetViewer
        snippet={viewingSnippet}
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        onEdit={handleEditSnippet}
        onCopy={handleCopySnippet}
      />
    </div>
  )
}

export default App