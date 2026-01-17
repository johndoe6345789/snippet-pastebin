import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Sparkle } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

interface AIErrorHelperProps {
  error: Error | string
  context?: string
  className?: string
}

export function AIErrorHelper({ error, context, className }: AIErrorHelperProps) {
  const [open, setOpen] = useState(false)
  const [analysis, setAnalysis] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState<string>('')

  const errorMessage = typeof error === 'string' ? error : error.message
  const errorStack = typeof error === 'string' ? '' : error.stack

  const analyzeError = async () => {
    setOpen(true)
    setIsAnalyzing(true)
    setAnalysisError('')
    setAnalysis('')

    try {
      const contextInfo = context ? `\n\nContext: ${context}` : ''
      const stackInfo = errorStack ? `\n\nStack trace: ${errorStack}` : ''
      
      const promptText = `You are a helpful debugging assistant for a code snippet manager app. Analyze this error and provide:

1. A clear explanation of what went wrong (in plain language)
2. Why this error likely occurred
3. 2-3 specific actionable steps to fix it

Error message: ${errorMessage}${contextInfo}${stackInfo}

Keep your response concise, friendly, and focused on practical solutions. Format your response with clear sections using markdown.`

      const result = await window.spark.llm(promptText, 'gpt-4o-mini')
      setAnalysis(result)
    } catch (err) {
      setAnalysisError('Unable to analyze error. The AI service may be temporarily unavailable.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        <Button
          onClick={analyzeError}
          variant="outline"
          size="sm"
          className="gap-2 border-accent/50 text-accent hover:bg-accent/10 hover:text-accent hover:border-accent transition-all"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Sparkle className="h-4 w-4" weight="fill" />
          </motion.div>
          Ask AI for Help
        </Button>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkle className="h-5 w-5 text-accent" weight="fill" />
              AI Error Analysis
            </DialogTitle>
            <DialogDescription>
              Let me help you understand and fix this error
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4">
            <Alert className="bg-destructive/10 border-destructive/30">
              <AlertDescription className="text-sm font-mono">
                {errorMessage}
              </AlertDescription>
            </Alert>

            {isAnalyzing && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkle className="h-4 w-4" weight="fill" />
                  </motion.div>
                  <span className="text-sm">Analyzing error...</span>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="h-4 bg-muted rounded"
                    />
                  ))}
                </div>
              </div>
            )}

            {analysisError && (
              <Alert variant="destructive">
                <AlertDescription>{analysisError}</AlertDescription>
              </Alert>
            )}

            <AnimatePresence>
              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="prose prose-invert prose-sm max-w-none"
                >
                  <div className="bg-card/50 rounded-lg p-4 border border-border space-y-3">
                    {analysis.split('\n').map((line, idx) => {
                      if (line.startsWith('###')) {
                        return (
                          <h3 key={idx} className="text-base font-semibold text-foreground mt-4 mb-2">
                            {line.replace('###', '').trim()}
                          </h3>
                        )
                      }
                      if (line.startsWith('##')) {
                        return (
                          <h2 key={idx} className="text-lg font-semibold text-foreground mt-4 mb-2">
                            {line.replace('##', '').trim()}
                          </h2>
                        )
                      }
                      if (line.match(/^\d+\./)) {
                        return (
                          <div key={idx} className="text-foreground/90 ml-2">
                            {line}
                          </div>
                        )
                      }
                      if (line.startsWith('-')) {
                        return (
                          <div key={idx} className="text-foreground/90 ml-4">
                            {line}
                          </div>
                        )
                      }
                      if (line.trim()) {
                        return (
                          <p key={idx} className="text-foreground/80 text-sm leading-relaxed">
                            {line}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

