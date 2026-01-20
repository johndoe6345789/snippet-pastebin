import { useState } from 'react'
import { MonacoEditor } from '@/components/features/snippet-editor/MonacoEditor'
import { ReactPreview } from '@/components/features/snippet-editor/ReactPreview'
import { PythonOutput } from '@/components/features/python-runner/PythonOutput'
import { Button } from '@/components/ui/button'
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

  const isPreviewSupported = ['JSX', 'TSX', 'JavaScript', 'TypeScript', 'Python'].includes(language)
  const isPython = language === 'Python'

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
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-1 p-1 rounded-md" style={{ backgroundColor: 'var(--mat-sys-surface-variant)' }}>
          <Button
            variant={viewMode === 'code' ? 'filled' : 'text'}
            size="sm"
            onClick={() => setViewMode('code')}
            className="flex items-center gap-2 h-8"
          >
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Code</span>
          </Button>
          <Button
            variant={viewMode === 'split' ? 'filled' : 'text'}
            size="sm"
            onClick={() => setViewMode('split')}
            className="flex items-center gap-2 h-8"
          >
            <SplitHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Split</span>
          </Button>
          <Button
            variant={viewMode === 'preview' ? 'filled' : 'text'}
            size="sm"
            onClick={() => setViewMode('preview')}
            className="flex items-center gap-2 h-8"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">{isPython ? 'Output' : 'Preview'}</span>
          </Button>
        </div>
      </div>

      <div
        className="rounded-md overflow-hidden border"
        style={{
          height,
          borderColor: 'var(--mat-sys-outline-variant)',
          backgroundColor: 'var(--mat-sys-surface)'
        }}
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
          isPython ? (
            <PythonOutput code={value} />
          ) : (
            <ReactPreview
              code={value}
              language={language}
              functionName={functionName}
              inputParameters={inputParameters}
            />
          )
        )}

        {viewMode === 'split' && (
          <div className="grid grid-cols-2 h-full" style={{ gap: '1px', backgroundColor: 'var(--mat-sys-outline-variant)' }}>
            <div className="overflow-auto" style={{ backgroundColor: 'var(--mat-sys-surface)' }}>
              <MonacoEditor
                value={value}
                onChange={onChange}
                language={language}
                height="100%"
              />
            </div>
            <div className="overflow-auto" style={{ backgroundColor: 'var(--mat-sys-surface)' }}>
              {isPython ? (
                <PythonOutput code={value} />
              ) : (
                <ReactPreview
                  code={value}
                  language={language}
                  functionName={functionName}
                  inputParameters={inputParameters}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
