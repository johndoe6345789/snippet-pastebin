import { motion } from 'framer-motion'

interface TerminalLine {
  type: 'output' | 'error' | 'input-prompt' | 'input-value'
  content: string
  id: string
}

interface TerminalOutputProps {
  lines: TerminalLine[]
  isRunning: boolean
}

export function TerminalOutput({ lines, isRunning }: TerminalOutputProps) {
  if (lines.length === 0 && !isRunning) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground" data-testid="terminal-empty-state">
        Click "Run" to execute the Python code
      </div>
    )
  }

  return (
    <div className="space-y-1" data-testid="terminal-output-content">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="leading-relaxed"
        >
          {line.type === 'output' && (
            <div className="text-foreground whitespace-pre-wrap">{line.content}</div>
          )}
          {line.type === 'error' && (
            <div className="text-destructive whitespace-pre-wrap">{line.content}</div>
          )}
          {line.type === 'input-prompt' && (
            <div className="text-accent font-medium whitespace-pre-wrap">{line.content}</div>
          )}
          {line.type === 'input-value' && (
            <div className="text-primary whitespace-pre-wrap">{'> ' + line.content}</div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
