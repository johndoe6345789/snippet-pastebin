import { useMemo } from 'react'
import * as React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AIErrorHelper } from '@/components/error/AIErrorHelper'
import { WarningCircle } from '@phosphor-icons/react'
import { InputParameter } from '@/lib/types'
import { transformReactCode } from '@/lib/react-transform'
import { parseInputParameters } from '@/lib/parse-parameters'

interface ReactPreviewProps {
  code: string
  language: string
  functionName?: string
  inputParameters?: InputParameter[]
}

export function ReactPreview({ code, language, functionName, inputParameters }: ReactPreviewProps) {
  const { Component, error } = useMemo(() => {
    const isReactCode = ['JSX', 'TSX', 'JavaScript', 'TypeScript'].includes(language)
    if (!isReactCode) {
      return { Component: null, error: null }
    }

    try {
      const transformedComponent = transformReactCode(code, functionName)
      return { Component: transformedComponent, error: null }
    } catch (err) {
      return { Component: null, error: err instanceof Error ? err.message : 'Failed to render preview' }
    }
  }, [code, language, functionName])

  const props = useMemo(() => parseInputParameters(inputParameters), [inputParameters])

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
      <div className="p-6">
        <Component {...props} />
      </div>
    </div>
  )
}
