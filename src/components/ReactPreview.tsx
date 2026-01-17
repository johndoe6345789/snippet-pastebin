import { useEffect, useState, useRef } from 'react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AIErrorHelper } from '@/components/AIErrorHelper'
import { WarningCircle } from '@phosphor-icons/react'

interface ReactPreviewProps {
  code: string
  language: string
}

export function ReactPreview({ code, language }: ReactPreviewProps) {
  const [error, setError] = useState<string | null>(null)
  const [Component, setComponent] = useState<React.ComponentType | null>(null)
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setError(null)
    setComponent(null)

    const isReactCode = ['JSX', 'TSX', 'JavaScript', 'TypeScript'].includes(language)
    
    if (!isReactCode) {
      return
    }

    try {
      const transformedCode = code
        .replace(/^import\s+.*from\s+['"]react['"];?\s*/gm, '')
        .replace(/^import\s+.*from\s+['"].*['"];?\s*/gm, '')
        .replace(/export\s+default\s+/g, '')
        .replace(/export\s+/g, '')

      const wrappedCode = `
        (function() {
          const React = arguments[0];
          const useState = React.useState;
          const useEffect = React.useEffect;
          const useRef = React.useRef;
          const useMemo = React.useMemo;
          const useCallback = React.useCallback;
          
          ${transformedCode}
          
          const lastStatement = (${transformedCode.trim().split('\n').pop()});
          return lastStatement;
        })
      `

      const componentFactory = eval(wrappedCode)
      const CreatedComponent = componentFactory(React)
      
      if (typeof CreatedComponent === 'function') {
        setComponent(() => CreatedComponent)
      } else if (React.isValidElement(CreatedComponent)) {
        setComponent(() => () => CreatedComponent)
      } else {
        setError('Code must export a React component or JSX element')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to render preview')
    }
  }, [code, language])

  if (!['JSX', 'TSX', 'JavaScript', 'TypeScript'].includes(language)) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-muted/30">
        <div className="text-center text-muted-foreground">
          <WarningCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Preview not available for {language}</p>
          <p className="text-xs mt-1">Use JSX, TSX, JavaScript, or TypeScript</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full overflow-auto p-6 bg-destructive/5">
        <Alert variant="destructive" className="mb-4">
          <WarningCircle className="h-4 w-4" />
          <AlertDescription className="font-mono text-xs whitespace-pre-wrap">
            {error}
          </AlertDescription>
        </Alert>
        <AIErrorHelper 
          error={error} 
          context={`React component preview rendering (Language: ${language})`}
        />
      </div>
    )
  }

  if (!Component) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-muted/30">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Loading preview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="p-6" ref={mountRef}>
        <Component />
      </div>
    </div>
  )
}
