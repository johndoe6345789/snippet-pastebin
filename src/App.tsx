import { useState, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Code, Plus, MagnifyingGlass, Funnel } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { SnippetCard } from '@/components/SnippetCard'
import { SnippetDialog } from '@/components/SnippetDialog'
import { SnippetViewer } from '@/components/SnippetViewer'
import { EmptyState } from '@/components/EmptyState'
import { Snippet, LANGUAGES } from '@/lib/types'

function App() {
  const [snippets, setSnippets] = useKV<Snippet[]>('snippets', [])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null)
  const [viewingSnippet, setViewingSnippet] = useState<Snippet | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLanguage, setFilterLanguage] = useState<string>('all')

  const filteredSnippets = useMemo(() => {
    let filtered = snippets || []

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (snippet) =>
          snippet.title.toLowerCase().includes(query) ||
          snippet.description.toLowerCase().includes(query) ||
          snippet.code.toLowerCase().includes(query) ||
          snippet.language.toLowerCase().includes(query)
      )
    }

    if (filterLanguage !== 'all') {
      filtered = filtered.filter((snippet) => snippet.language === filterLanguage)
    }

    return filtered.sort((a, b) => b.updatedAt - a.updatedAt)
  }, [snippets, searchQuery, filterLanguage])

  const handleSave = (snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSnippet) {
      setSnippets((current) =>
        (current || []).map((s) =>
          s.id === editingSnippet.id
            ? { ...s, ...snippetData, updatedAt: Date.now() }
            : s
        )
      )
      toast.success('Snippet updated successfully')
    } else {
      const newSnippet: Snippet = {
        ...snippetData,
        id: Date.now().toString(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      setSnippets((current) => [newSnippet, ...(current || [])])
      toast.success('Snippet created successfully')
    }
    setEditingSnippet(null)
  }

  const handleEdit = (snippet: Snippet) => {
    setEditingSnippet(snippet)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      setSnippets((current) => (current || []).filter((s) => s.id !== deleteId))
      toast.success('Snippet deleted')
      setDeleteId(null)
    }
  }

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success('Code copied to clipboard')
  }

  const handleNewSnippet = () => {
    setEditingSnippet(null)
    setDialogOpen(true)
  }

  const handleView = (snippet: Snippet) => {
    setViewingSnippet(snippet)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2">
                <Code className="h-7 w-7 text-accent" weight="bold" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  SnippetVault
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Your personal code snippet library
                </p>
              </div>
            </div>
            <Button onClick={handleNewSnippet} className="gap-2 hidden sm:flex">
              <Plus className="h-5 w-5" weight="bold" />
              New Snippet
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search snippets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1 sm:flex-none sm:w-48">
                <Funnel className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                  <SelectTrigger className="pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {!snippets || snippets.length === 0 ? (
          <EmptyState onCreateClick={handleNewSnippet} />
        ) : filteredSnippets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No snippets match your search.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery('')
                setFilterLanguage('all')
              }}
              className="mt-4"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCopy={handleCopy}
                onView={handleView}
              />
            ))}
          </div>
        )}
      </main>

      <Button
        onClick={handleNewSnippet}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg sm:hidden"
      >
        <Plus className="h-6 w-6" weight="bold" />
      </Button>

      <SnippetDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setEditingSnippet(null)
        }}
        onSave={handleSave}
        editingSnippet={editingSnippet}
      />

      <SnippetViewer
        snippet={viewingSnippet}
        open={!!viewingSnippet}
        onOpenChange={(open) => !open && setViewingSnippet(null)}
        onEdit={handleEdit}
        onCopy={handleCopy}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete snippet?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this code snippet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default App