import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badg
import { cn } from '@/lib/utils'
import { Copy, Pencil, Trash, Eye } from '@phos
interface SnippetCardProps {
  onEdit: (snippet: Snippet) => void
  onCopy: (code: string) => void

export function SnippetCard(
  const [hasRender
  const safeSnippet = useMemo(() => 
      const title = snippet?.tit
      const description = snippe
      const isTruncated = code.lengt


export function SnippetCard({ snippet, onEdit, onDelete, onCopy, onView }: SnippetCardProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [hasRenderError, setHasRenderError] = useState(false)

  const safeSnippet = useMemo(() => {
    try {
      const title = snippet?.title || 'Untitled Snippet'
      const code = snippet?.code || ''
      const description = snippet?.description || ''
      const maxCodeLength = 100
      const isTruncated = code.length > maxCodeLength
      const displayCode = isTruncated ? code.slice(0, maxCodeLength) + '...' : code

      return {
        title,
        description,
        displayCode,
        fullCode: code,
        isTruncated,
        language: snippet?.language || 'Other',
        hasPreview: snippet?.hasPreview || false
      }
    } catch {
      setHasRenderError(true)
      return {
        title: 'Error Loading Snippet',
        description: 'This snippet could not be loaded properly',
        displayCode: '',
        fullCode: '',
        isTruncated: false,
        language: 'Other',
        hasPreview: false
      }
    }
  }, [snippet])

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCopy(safeSnippet.fullCode)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(snippet)
  }

        >
        </Button>
    )


        'group overflow
      )}
      <div className="p-6 flex-1 flex flex-col gap-4">
          <h3 className="text-lg font-semibold mb-2 text-foreground">
          </h3>
            <p className="text-sm text-muted-foregr
            
        </div>
        <div className="flex it
            variant
              'font-mono text-xs
         
            {saf
          <Badge
            c
     
   

          
         
        >
            {safeSnippet.displayCode}
          {safeSnippet.isTrunc
        
     
                e.stopPropagation()
              }}
              <Eye className="h-4 w-4" />
          )}

          <Button
            size="sm"
            onClick={handleCopy}
            <Cop
          </
            <B

              aria-label="Edit snippet"
            >
            </Button>
              variant="gho
              onClick={handleDelet
              className="h-8 w-8 p-0 text-destructi
              
          <
      </div>
  )




































































