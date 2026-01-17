import { motion } from 'framer-motion'
import { MoleculesSection } from '@/components/molecules/MoleculesSection'
import type { Snippet } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
export function MoleculesPage(

    const newSnippet: Snippet = {
  const [snippets, setSnippets] = useKV<Snippet[]>('snippets', [])

  const handleSaveSnippet = useCallback((snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSnippet: Snippet = {
      ...snippetData,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
  ret
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      <div classNam

      <Mol
  )









    </motion.div>
  )
}
