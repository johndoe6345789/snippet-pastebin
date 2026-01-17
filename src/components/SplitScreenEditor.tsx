import { useState } from 'react'
import { MonacoEditor } from '@/components/MonacoEditor'
import { ReactPreview } from '@/components/ReactPreview'
import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Code, Eye, SplitHorizontal } from '@phosphor-icons/react'
import { InputParameter } from '@/lib/types'

interface SplitScreenEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  height?: string
  functionName?: string
  inputParameters?: InputParameter[]
}

type ViewMode = 'split' | 'code' | 'preview'

export function SplitScreenEditor({ 
  value, 
  onChange, 
  language, 
  height = '500px',
  functionName,
  inputParameters,
}: SplitScreenEditorProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('split')

  const isPreviewSupported = ['JSX', 'TSX', 'JavaScript', 'TypeScript'].includes(language)

  if (!isPreviewSupported) {
    return (
      <MonacoEditor
        value={value}
        onChange={onChange}
        language={language}
        height={height}
      />
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 justify-end">
        <div className="flex items-center gap-1 p-1 bg-muted rounded-md">
          <Button
            variant={viewMode === 'code' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('code')}
            className="gap-2 h-8"
          >
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Code</span>
          </Button>
          <Button
            variant={viewMode === 'split' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('split')}
            className="gap-2 h-8"
          >
            <SplitHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Split</span>
          </Button>
          <Button
            variant={viewMode === 'preview' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('preview')}
            className="gap-2 h-8"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Preview</span>
          </Button>
        </div>
      </div>

      <div 
        className="rounded-md border border-border overflow-hidden bg-card"
        style={{ height }}
      >
        {viewMode === 'code' && (
          <MonacoEditor
            value={value}
            onChange={onChange}
            language={language}
            height={height}
          />
        )}

        {viewMode === 'preview' && (
          <ReactPreview 
            code={value} 
            language={language}
            functionName={functionName}
            inputParameters={inputParameters}
          />
        )}

        {viewMode === 'split' && (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={50} minSize={30}>
              <MonacoEditor
                value={value}
                onChange={onChange}
                language={language}
                height="100%"
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
              <ReactPreview 
                code={value} 
                language={language}
                functionName={functionName}
                inputParameters={inputParameters}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  )
}
