import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, CircleNotch, Terminal } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { runPythonCode, getPyodide, isPyodideReady } from '@/lib/pyodide-runner'
import { PythonTerminal } from '@/components/features/python-runner/PythonTerminal'
import { toast } from 'sonner'

interface PythonOutputProps {
  code: string
}

export function PythonOutput({ code }: PythonOutputProps) {
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [isInitializing, setIsInitializing] = useState(!isPyodideReady())
  const [hasInput, setHasInput] = useState(false)

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
    const codeToCheck = code.toLowerCase()
    setHasInput(codeToCheck.includes('input('))
  }, [code])

  const handleRun = async () => {
    if (isInitializing) {
      toast.info('Python environment is still loading...')
      return
    }

    setIsRunning(true)
    setOutput('')
    setError('')

    try {
      const result = await runPythonCode(code)
      setOutput(result.output || '')
      if (result.error) {
        setError(result.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsRunning(false)
    }
  }

  if (hasInput) {
    return <PythonTerminal code={code} />
  }

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Python Output</h3>
        <Button
          onClick={handleRun}
          disabled={isRunning || isInitializing}
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

      <div className="flex-1 overflow-auto p-4">
        {!output && !error && (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Click "Run" to execute the Python code
          </div>
        )}

        {output && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-4 bg-background">
              <pre className="text-sm font-mono whitespace-pre-wrap text-foreground">
                {output}
              </pre>
            </Card>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4"
          >
            <Card className="p-4 bg-destructive/10 border-destructive/20">
              <div className="flex items-start gap-2">
                <div className="text-destructive font-semibold text-sm">Error:</div>
                <pre className="text-sm font-mono whitespace-pre-wrap text-destructive flex-1">
                  {error}
                </pre>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
