import { useState } from 'react'
import { MonacoEditor } from '@/components/features/snippet-editor/MonacoEditor'
import { ReactPreview } from '@/components/features/snippet-editor/ReactPreview'
import { PythonOutput } from '@/components/features/python-runner/PythonOutput'
import { Button } from '@/components/ui/button'
import { Code, Eye, SplitHorizontal } from '@phosphor-icons/react'
import { InputParameter } from '@/lib/types'
import styles from './split-screen-editor.module.scss'

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
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.buttonGroup}>
          <Button
            variant={viewMode === 'code' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('code')}
            className={styles.button}
          >
            <Code className={styles.buttonIcon} />
            <span className={styles.buttonLabel}>Code</span>
          </Button>
          <Button
            variant={viewMode === 'split' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('split')}
            className={styles.button}
          >
            <SplitHorizontal className={styles.buttonIcon} />
            <span className={styles.buttonLabel}>Split</span>
          </Button>
          <Button
            variant={viewMode === 'preview' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('preview')}
            className={styles.button}
          >
            <Eye className={styles.buttonIcon} />
            <span className={styles.buttonLabel}>{isPython ? 'Output' : 'Preview'}</span>
          </Button>
        </div>
      </div>

      <div className={styles.viewport} style={{ height }}>
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
          <div className={styles.splitView}>
            <div className={styles.editorPanel}>
              <MonacoEditor
                value={value}
                onChange={onChange}
                language={language}
                height="100%"
              />
            </div>
            <div className={styles.previewPanel}>
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
