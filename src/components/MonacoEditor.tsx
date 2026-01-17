import { lazy, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Editor = lazy(() => import('@monaco-editor/react'))

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  height?: string
  readOnly?: boolean
}

function EditorLoadingSkeleton({ height = '400px' }: { height?: string }) {
  return (
    <div className="space-y-2" style={{ height }}>
      <Skeleton className="h-full w-full rounded-md" />
    </div>
  )
}

export function MonacoEditor({ 
  value, 
  onChange, 
  language, 
  height = '400px',
  readOnly = false 
}: MonacoEditorProps) {
  const monacoLanguage = getMonacoLanguage(language)
  
  return (
    <Suspense fallback={<EditorLoadingSkeleton height={height} />}>
      <Editor
        height={height}
        language={monacoLanguage}
        value={value}
        onChange={(newValue) => onChange(newValue || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          readOnly,
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            useShadows: false,
          },
          padding: {
            top: 12,
            bottom: 12,
          },
          fontFamily: 'JetBrains Mono, monospace',
          fontLigatures: true,
        }}
      />
    </Suspense>
  )
}

function getMonacoLanguage(language: string): string {
  const languageMap: Record<string, string> = {
    'JavaScript': 'javascript',
    'TypeScript': 'typescript',
    'Python': 'python',
    'Java': 'java',
    'C++': 'cpp',
    'C#': 'csharp',
    'Ruby': 'ruby',
    'Go': 'go',
    'Rust': 'rust',
    'PHP': 'php',
    'Swift': 'swift',
    'Kotlin': 'kotlin',
    'HTML': 'html',
    'CSS': 'css',
    'SQL': 'sql',
    'Bash': 'shell',
    'Other': 'plaintext',
  }
  
  return languageMap[language] || 'plaintext'
}
