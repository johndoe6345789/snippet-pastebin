import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Plus, Minus, ArrowCounterClockwise, Warning } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

function App() {
  const [count, setCount] = useKV<number>('counter-value', 0)
  const [maxReached, setMaxReached] = useKV<number>('max-reached', 0)

  const currentCount = count ?? 0
  const currentMax = maxReached ?? 0
  const limit = Math.floor(currentMax / 2)
  const isLimited = currentMax > 0
  const isAtLimit = isLimited && currentCount >= limit

  const increment = () => {
    const newCount = currentCount + 1
    
    if (isLimited && newCount > limit) {
      toast.error('Half the app is gone!', {
        description: `You can only count to ${limit} now (half of ${currentMax})`
      })
      return
    }
    
    setCount(newCount)
    
    if (newCount > currentMax) {
      setMaxReached(newCount)
    }
  }

  const decrement = () => {
    setCount((current) => (current ?? 0) - 1)
  }

  const reset = () => {
    setCount(0)
    setMaxReached(0)
    toast.success('Counter reset - full power restored!')
  }

  const formattedCount = currentCount.toLocaleString()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.20 0.04 240) 2px, oklch(0.20 0.04 240) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, oklch(0.20 0.04 240) 2px, oklch(0.20 0.04 240) 4px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <Card className="w-full max-w-md p-6 sm:p-12 shadow-2xl relative z-10 border-2">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Half Counter</h1>
            <p className="text-sm text-muted-foreground">
              {isLimited ? `Once you reach a number, you can only count to half of it` : 'Count up... if you dare'}
            </p>
          </div>

          <Separator />

          <div className="flex items-center justify-center py-8 relative">
            <motion.div
              key={currentCount}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative"
            >
              <div className="text-6xl sm:text-8xl font-bold text-accent tracking-tight" style={{ 
                textShadow: '0 0 40px oklch(0.75 0.15 200 / 0.5)'
              }}>
                {formattedCount}
              </div>
            </motion.div>

            <AnimatePresence>
              {isLimited && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute -right-2 sm:-right-8 top-1/2 -translate-y-1/2"
                >
                  <div className="text-sm text-muted-foreground text-right">
                    <div className="text-xs opacity-60">limit</div>
                    <div className="text-lg font-bold text-destructive">{limit}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isLimited && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-start gap-2"
            >
              <Warning className="text-destructive shrink-0 mt-0.5" weight="bold" size={20} />
              <div className="text-xs text-destructive">
                <strong>Half the app is gone!</strong> Your max was {currentMax}, now you can only reach {limit}.
              </div>
            </motion.div>
          )}

          <Separator />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={decrement}
              size="lg"
              className="flex-1 h-14 text-lg font-medium transition-all hover:scale-105 active:scale-95"
            >
              <Minus className="mr-2" weight="bold" />
              Decrement
            </Button>
            <Button
              onClick={increment}
              size="lg"
              disabled={isAtLimit}
              className="flex-1 h-14 text-lg font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Plus className="mr-2" weight="bold" />
              Increment
            </Button>
          </div>

          <Button
            onClick={reset}
            variant="outline"
            size="lg"
            className="w-full h-12 transition-all hover:scale-105 active:scale-95 hover:border-accent hover:text-accent"
          >
            <ArrowCounterClockwise className="mr-2" weight="bold" />
            Reset
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default App