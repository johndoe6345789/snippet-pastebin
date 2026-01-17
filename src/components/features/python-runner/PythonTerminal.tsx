import { useRef, useEffect } from 'react'
import { usePythonTerminal } from '@/hooks/usePythonTerminal'
import { TerminalHeader } from '@/components/features/python-runner/TerminalHeader'
import { TerminalOutput } from '@/components/features/python-runner/TerminalOutput'
import { TerminalInput } from '@/components/features/python-runner/TerminalInput'

interface PythonTerminalProps {
  code: string
}

export function PythonTerminal({ code }: PythonTerminalProps) {
  const {
    lines,
    isRunning,
    isInitializing,
    inputValue,
    waitingForInput,
    setInputValue,
    handleInputSubmit,
    handleRun,
  } = usePythonTerminal()

  const terminalEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  return (
    <div className="flex flex-col h-full bg-card">
      <TerminalHeader
        onRun={() => handleRun(code)}
        isRunning={isRunning}
        isInitializing={isInitializing}
        waitingForInput={waitingForInput}
      />

      <div className="flex-1 overflow-auto p-4 font-mono text-sm bg-background/50">
        <TerminalOutput lines={lines} isRunning={isRunning} />
        <TerminalInput
          waitingForInput={waitingForInput}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSubmit={handleInputSubmit}
        />
        <div ref={terminalEndRef} />
      </div>
    </div>
  )
}
