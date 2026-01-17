import { strings } from '@/lib/config'

interface SnippetCodePreviewProps {
  displayCode: string
  isTruncated: boolean
}

export function SnippetCodePreview({ displayCode, isTruncated }: SnippetCodePreviewProps) {
  return (
    <div className="rounded-md bg-secondary/30 p-3 border border-border">
      <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap break-words font-mono">
        {displayCode}
      </pre>
      {isTruncated && (
        <p className="text-xs text-accent mt-2">
          {strings.snippetCard.viewFullCode}
        </p>
      )}
    </div>
  )
}
