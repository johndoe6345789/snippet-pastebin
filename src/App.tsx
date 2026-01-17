import { useState, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import {
  Atom,
  FlowArrow,
  List,
  Layout,
  Code,
} from '@phosphor-icons/react'
import { AtomsSection } from '@/components/atoms/AtomsSection'
import { MoleculesSection } from '@/components/molecules/MoleculesSection'
import { OrganismsSection } from '@/components/organisms/OrganismsSection'
import { TemplatesSection } from '@/components/templates/TemplatesSection'
import { SnippetManager } from '@/components/SnippetManager'
import type { AtomicLevel, Snippet } from '@/lib/types'
import { toast } from 'sonner'

function App() {
  const [activeTab, setActiveTab] = useState<AtomicLevel>('atoms')
  const [snippets, setSnippets] = useKV<Snippet[]>('snippets', [])
  const [menuOpen, setMenuOpen] = useState(false)

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
    <div className="min-h-screen bg-background">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              oklch(0.75 0.18 200) 40px,
              oklch(0.75 0.18 200) 41px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              oklch(0.75 0.18 200) 40px,
              oklch(0.75 0.18 200) 41px
            )
          `,
        }}
      />

      <div className="relative z-10">
        <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-20">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Code className="h-5 w-5 text-primary-foreground" weight="bold" />
                </div>
                <h1 className="text-2xl font-bold font-mono bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  CodeSnippet
                </h1>
              </motion.div>

              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <List className="h-6 w-6" weight="bold" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-2xl overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Component Library</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-6">
                    <Tabs
                      value={activeTab}
                      onValueChange={(value) => setActiveTab(value as AtomicLevel)}
                      className="space-y-6"
                    >
                      <TabsList className="grid w-full grid-cols-4 h-12">
                        <TabsTrigger value="atoms" className="gap-2">
                          <Atom weight="bold" className="h-4 w-4" />
                          <span className="hidden sm:inline">Atoms</span>
                        </TabsTrigger>
                        <TabsTrigger value="molecules" className="gap-2">
                          <FlowArrow weight="bold" className="h-4 w-4" />
                          <span className="hidden sm:inline">Molecules</span>
                        </TabsTrigger>
                        <TabsTrigger value="organisms" className="gap-2">
                          <FlowArrow weight="bold" className="h-4 w-4 rotate-90" />
                          <span className="hidden sm:inline">Organisms</span>
                        </TabsTrigger>
                        <TabsTrigger value="templates" className="gap-2">
                          <Layout weight="bold" className="h-4 w-4" />
                          <span className="hidden sm:inline">Templates</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="atoms" className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">Atoms</h3>
                          <p className="text-sm text-muted-foreground">
                            Fundamental building blocks - basic HTML elements styled as reusable components
                          </p>
                        </div>
                        <AtomsSection onSaveSnippet={handleSaveSnippet} />
                      </TabsContent>

                      <TabsContent value="molecules" className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">Molecules</h3>
                          <p className="text-sm text-muted-foreground">
                            Simple groups of atoms functioning together as a unit
                          </p>
                        </div>
                        <MoleculesSection onSaveSnippet={handleSaveSnippet} />
                      </TabsContent>

                      <TabsContent value="organisms" className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">Organisms</h3>
                          <p className="text-sm text-muted-foreground">
                            Complex UI components composed of molecules and atoms
                          </p>
                        </div>
                        <OrganismsSection onSaveSnippet={handleSaveSnippet} />
                      </TabsContent>

                      <TabsContent value="templates" className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">Templates</h3>
                          <p className="text-sm text-muted-foreground">
                            Page-level layouts that combine organisms into complete interfaces
                          </p>
                        </div>
                        <TemplatesSection onSaveSnippet={handleSaveSnippet} />
                      </TabsContent>
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <SnippetManager />
          </motion.div>
        </main>

        <footer className="border-t border-border mt-24">
          <div className="container mx-auto px-6 py-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>CodeSnippet - Share, organize, and discover code snippets with syntax highlighting</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
