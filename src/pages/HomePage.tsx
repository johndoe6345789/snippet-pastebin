import { motion } from 'framer-motion'
import { SnippetManager } from '@/components/SnippetManager'

export function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">My Snippets</h2>
        <p className="text-muted-foreground">Save, organize, and share your code snippets</p>
      </div>
      <SnippetManager />
    </motion.div>
  )
}
