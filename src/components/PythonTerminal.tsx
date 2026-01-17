import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, CircleNotch, Terminal as TerminalIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { runPythonCodeInteractive, getPyodide, isPyodideReady } from '@/lib/pyodide-runner'
import { toast } from 'sonner'

interface PythonTerminalProps {
  code: string
}

interface TerminalLine {
  type: 'output' | 'error' | 'input-prompt' | 'input-value'
  content: string
  id: string
}

export function PythonTerminal({ code }: PythonTerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isInitializing, setIsInitializing] = useState(!isPyodideReady())
  const [inputValue, setInputValue] = useState('')
  const [waitingForInput, setWaitingForInput] = useState(false)
  const [inputPrompt, setInputPrompt] = useState('')
  const inputResolveRef = useRef<((value: string) => void) | null>(null)
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isPyodideReady()) {
      setIsInitializing(true)
      getPyodide()
        .then(() => {
          setIsInitializing(false)
          toast.success('Python environment ready!')
        })
        .catch((err) => {
          setIsInitializing(false)
          toast.error('Failed to load Python environment')
          console.error(err)
        })
    }
  }, [])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  useEffect(() => {
    if (waitingForInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [waitingForInput])

  const addLine = (type: TerminalLine['type'], content: string) => {
    setLines((prev) => [
      ...prev,
      { type, content, id: `${Date.now()}-${Math.random()}` },
    ])
  }

  const handleInputPrompt = (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
      setInputPrompt(prompt)
      addLine('input-prompt', prompt)
      setWaitingForInput(true)
      inputResolveRef.current = resolve
    })
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!waitingForInput || !inputResolveRef.current) return

    const value = inputValue
    addLine('input-value', value)
    setInputValue('')
    setWaitingForInput(false)
    
    const resolve = inputResolveRef.current
    inputResolveRef.current = null
    resolve(value)
  }

  const handleRun = async () => {
    if (isInitializing) {
      toast.info('Python environment is still loading...')
      return
    }

    setIsRunning(true)
    setLines([])
    setWaitingForInput(false)
    setInputValue('')

    try {
      await runPythonCodeInteractive(code, {
        onOutput: (text) => {
          addLine('output', text)
        },
        onError: (text) => {
          addLine('error', text)
        },
        onInputRequest: handleInputPrompt,
      })
    } catch (err) {
      addLine('error', err instanceof Error ? err.message : String(err))
    } finally {
      setIsRunning(false)
      setWaitingForInput(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <TerminalIcon size={18} weight="bold" className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Python Terminal</h3>
        </div>
        <Button
          onClick={handleRun}
          disabled={isRunning || isInitializing || waitingForInput}
          size="sm"
          className="gap-2"
        >
          {isRunning || isInitializing ? (
            <>
              <CircleNotch className="animate-spin" size={16} />
              {isInitializing ? 'Loading...' : 'Running...'}
            </>
          ) : (
            <>
              <Play size={16} weight="fill" />
              Run
            </>
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 font-mono text-sm bg-background/50">
        {lines.length === 0 && !isRunning && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Click "Run" to execute the Python code
          </div>
        )}

        <div className="space-y-1">
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

          {waitingForInput && (
            <motion.form
              onSubmit={handleInputSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mt-2"
            >
              <span className="text-primary font-bold">{'>'}</span>
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 font-mono bg-background border-accent/50 focus:border-accent"
                placeholder="Enter input..."
                disabled={!waitingForInput}
              />
            </motion.form>
          )}

          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  )
}
