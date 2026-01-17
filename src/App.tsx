import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Plus, Minus, ArrowCounterClockwise } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

function App() {
  const [count, setCount] = useKV<number>('counter-value', 0)

  const increment = () => {
    setCount((current) => (current ?? 0) + 1)
  }

  const decrement = () => {
    setCount((current) => (current ?? 0) - 1)
  }

  const reset = () => {
    setCount(0)
  }

  const formattedCount = (count ?? 0).toLocaleString()

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
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Counter</h1>
            <p className="text-sm text-muted-foreground">Track anything, one click at a time</p>
          </div>

          <Separator />

          <div className="flex items-center justify-center py-8">
            <motion.div
              key={count}
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
          </div>

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
              className="flex-1 h-14 text-lg font-medium transition-all hover:scale-105 active:scale-95"
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