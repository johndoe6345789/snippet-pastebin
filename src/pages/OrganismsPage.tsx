import { motion } from 'framer-motion'
import { OrganismsSection } from '@/components/organisms/OrganismsSection'
import type { Snippet } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { useCallback } from 'react'
import { toast } from 'sonner'

export function OrganismsPage() {
  const [snippets, setSnippets] = useKV<Snippet[]>('snippets', [])

  const handleSaveSnippet = useCallback((snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSnippet: Snippet = {
      ...snippetData,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setSnippets((currentSnippets) => [newSnippet, ...(currentSnippets || [])])
    toast.success('Component saved as snippet!')
  }, [setSnippets])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Organisms</h2>
        <p className="text-muted-foreground">Complex UI components composed of molecules and atoms</p>
      </div>
      <OrganismsSection onSaveSnippet={handleSaveSnippet} />
    </motion.div>
  )
}
