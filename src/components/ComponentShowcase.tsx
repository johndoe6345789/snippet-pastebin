import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FloppyDisk } from '@phosphor-icons/react'
import { SnippetDialog } from '@/components/SnippetDialog'
import { Snippet } from '@/lib/types'

interface ComponentShowcaseProps {
  children: React.ReactNode
  code: string
  title: string
  description?: string
  language?: string
  category: string
  onSaveSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void
}

export function ComponentShowcase({
  children,
  code,
  title,
  description = '',
  language = 'tsx',
  category,
  onSaveSnippet,
}: ComponentShowcaseProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [prefilledData, setPrefilledData] = useState<{
    title: string
    description: string
    code: string
    language: string
    category: string
  } | null>(null)

  const handleSaveClick = () => {
    setPrefilledData({
      title,
      description,
      code,
      language,
      category,
    })
    setDialogOpen(true)
  }

  const handleSave = (snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    onSaveSnippet(snippetData)
    setDialogOpen(false)
    setPrefilledData(null)
  }

  return (
    <>
      <Card className="relative group">
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSaveClick}
            className="gap-2 shadow-lg"
          >
            <FloppyDisk weight="bold" />
            Save as Snippet
          </Button>
        </div>
        {children}
      </Card>
      {prefilledData && (
        <SnippetDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSave}
          editingSnippet={{
            id: '',
            title: prefilledData.title,
            description: prefilledData.description,
            code: prefilledData.code,
            language: prefilledData.language,
            category: prefilledData.category,
            createdAt: 0,
            updatedAt: 0,
          }}
        />
      )}
    </>
  )
}
