import { useState } from 'react'
import { motion } from 'framer-motion'
import { SplitScreenEditor } from '@/components/SplitScreenEditor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkle } from '@phosphor-icons/react'

const DEMO_CODE = `function Counter() {
  const [count, setCount] = React.useState(0)
  
  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem'
    }}>
      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: 0
      }}>
        Interactive Counter
      </h2>
      
      <div style={{
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#8b5cf6',
        padding: '2rem',
        background: 'rgba(139, 92, 246, 0.1)',
        borderRadius: '1rem',
        minWidth: '200px',
        textAlign: 'center'
      }}>
        {count}
      </div>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => setCount(count - 1)}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Decrement
        </button>
        
        <button
          onClick={() => setCount(0)}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            background: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Reset
        </button>
        
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Increment
        </button>
      </div>
      
      <p style={{ 
        marginTop: '1rem',
        color: '#9ca3af',
        fontSize: '0.875rem'
      }}>
        Try editing the code on the left to see live changes!
      </p>
    </div>
  )
}

Counter`

export function DemoPage() {
  const [code, setCode] = useState(DEMO_CODE)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <Sparkle className="h-5 w-5 text-primary-foreground" weight="fill" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Split-Screen Demo</h2>
        </div>
        <p className="text-muted-foreground">
          Experience live React component editing with real-time preview. Edit the code on the left and watch it update instantly on the right.
        </p>
      </div>

      <Card className="border-accent/20 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkle className="h-5 w-5 text-accent" weight="fill" />
            Interactive Code Editor
          </CardTitle>
          <CardDescription>
            This editor supports JSX, TSX, JavaScript, and TypeScript with live preview. 
            Try switching between Code, Split, and Preview modes using the buttons above the editor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SplitScreenEditor
            value={code}
            onChange={setCode}
            language="JSX"
            height="600px"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Real-Time Updates</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Watch your React components render instantly as you type. No refresh needed.
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle className="text-lg">Resizable Panels</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Drag the center divider to adjust the editor and preview panel sizes to your preference.
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Multiple View Modes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Switch between code-only, split-screen, or preview-only modes with the toggle buttons.
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
