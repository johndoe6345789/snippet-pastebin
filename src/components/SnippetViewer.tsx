import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Pencil, X, Check, SplitVertical } from '@phosphor-icons/react'
import { Snippet } from '@/lib/types'
import { MonacoEditor } from '@/components/MonacoEditor'
import { ReactPreview } from '@/components/ReactPreview'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { strings, appConfig, LANGUAGE_COLORS } from '@/lib/config'

interface SnippetViewerProps {
  snippet: Snippet | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (snippet: Snippet) => void
  onCopy: (code: string) => void
}

export function SnippetViewer({ snippet, open, onOpenChange, onEdit, onCopy }: SnippetViewerProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  if (!snippet) return null

  const handleCopy = () => {
    onCopy(snippet.code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), appConfig.copiedTimeout)
  }

  const handleEdit = () => {
    onOpenChange(false)
    onEdit(snippet)
  }
  
  const canPreview = snippet.hasPreview && appConfig.previewEnabledLanguages.includes(snippet.language)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[95vw] sm:max-h-[95vh] h-[95vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-2xl font-bold truncate">
                  {snippet.title}
                </DialogTitle>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "shrink-0 border font-medium text-xs px-2 py-1",
                    LANGUAGE_COLORS[snippet.language] || LANGUAGE_COLORS['Other']
                  )}
                >
                  {snippet.language}
                </Badge>
              </div>
              {snippet.description && (
                <p className="text-sm text-muted-foreground">
                  {snippet.description}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {strings.snippetViewer.lastUpdated}: {new Date(snippet.updatedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              {canPreview && (
                <Button
                  variant={showPreview ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="gap-2"
                >
                  <SplitVertical className="h-4 w-4" />
                  {showPreview ? strings.snippetViewer.buttons.hidePreview : strings.snippetViewer.buttons.showPreview}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4" weight="bold" />
                    {strings.snippetViewer.buttons.copied}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {strings.snippetViewer.buttons.copy}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                {strings.snippetViewer.buttons.edit}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-9 w-9 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex">
          {canPreview && showPreview ? (
            <>
              <div className="flex-1 overflow-hidden border-r border-border">
                <MonacoEditor
                  value={snippet.code}
                  onChange={() => {}}
                  language={snippet.language}
                  height="100%"
                  readOnly={true}
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <ReactPreview 
                  code={snippet.code} 
                  language={snippet.language}
                  functionName={snippet.functionName}
                  inputParameters={snippet.inputParameters}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-hidden">
              <MonacoEditor
                value={snippet.code}
                onChange={() => {}}
                language={snippet.language}
                height="100%"
                readOnly={true}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
