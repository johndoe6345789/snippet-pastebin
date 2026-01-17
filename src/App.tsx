import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import {
  Atom,
  FlowArrow,
  Palette,
  Layout,
  Code,
} from '@phosphor-icons/react'
import { AtomsSection } from '@/components/atoms/AtomsSection'
import { MoleculesSection } from '@/components/molecules/MoleculesSection'
import { OrganismsSection } from '@/components/organisms/OrganismsSection'
import { TemplatesSection } from '@/components/templates/TemplatesSection'
import { SnippetManager } from '@/components/SnippetManager'
import type { AtomicLevel } from '@/lib/types'

type TabValue = AtomicLevel | 'snippets'

function App() {
  const [activeTab, setActiveTab] = useState<TabValue>('atoms')

  return (
    <div className="min-h-screen bg-background">
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 60px,
              oklch(0.30 0.12 310) 60px,
              oklch(0.30 0.12 310) 61px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 60px,
              oklch(0.30 0.12 310) 60px,
              oklch(0.30 0.12 310) 61px
            )
          `,
        }}
      />

      <div className="relative z-10">
        <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Palette className="h-6 w-6 text-primary-foreground" weight="bold" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Atomic Component Library
                  </h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                A comprehensive design system organized by atomic design principles - from fundamental atoms to complete templates
              </p>
            </motion.div>
          </div>
        </header>

        <main className="container mx-auto px-8 py-12">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabValue)}
            className="space-y-8"
          >
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 h-14">
              <TabsTrigger value="atoms" className="gap-2 text-base">
                <Atom weight="bold" />
                <span className="hidden sm:inline">Atoms</span>
              </TabsTrigger>
              <TabsTrigger value="molecules" className="gap-2 text-base">
                <FlowArrow weight="bold" />
                <span className="hidden sm:inline">Molecules</span>
              </TabsTrigger>
              <TabsTrigger value="organisms" className="gap-2 text-base">
                <FlowArrow weight="bold" className="rotate-90" />
                <span className="hidden sm:inline">Organisms</span>
              </TabsTrigger>
              <TabsTrigger value="templates" className="gap-2 text-base">
                <Layout weight="bold" />
                <span className="hidden sm:inline">Templates</span>
              </TabsTrigger>
              <TabsTrigger value="snippets" className="gap-2 text-base">
                <Code weight="bold" />
                <span className="hidden sm:inline">Snippets</span>
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="atoms" className="mt-8">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold mb-3">Atoms</h2>
                  <p className="text-lg text-muted-foreground">
                    The fundamental building blocks - basic HTML elements styled as reusable components
                  </p>
                </div>
                <AtomsSection />
              </TabsContent>

              <TabsContent value="molecules" className="mt-8">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold mb-3">Molecules</h2>
                  <p className="text-lg text-muted-foreground">
                    Simple groups of atoms functioning together as a unit - form fields, search bars, and cards
                  </p>
                </div>
                <MoleculesSection />
              </TabsContent>

              <TabsContent value="organisms" className="mt-8">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold mb-3">Organisms</h2>
                  <p className="text-lg text-muted-foreground">
                    Complex UI components composed of molecules and atoms - headers, forms, and data displays
                  </p>
                </div>
                <OrganismsSection />
              </TabsContent>

              <TabsContent value="templates" className="mt-8">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold mb-3">Templates</h2>
                  <p className="text-lg text-muted-foreground">
                    Page-level layouts that combine organisms into complete user interfaces
                  </p>
                </div>
                <TemplatesSection />
              </TabsContent>

              <TabsContent value="snippets" className="mt-8">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold mb-3">Code Snippets</h2>
                  <p className="text-lg text-muted-foreground">
                    Save and manage reusable code snippets with live preview
                  </p>
                </div>
                <SnippetManager />
              </TabsContent>
            </motion.div>
          </Tabs>
        </main>

        <footer className="border-t border-border mt-24">
          <div className="container mx-auto px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3">Atomic Design</h3>
                <p className="text-sm text-muted-foreground">
                  A methodology for creating design systems by breaking interfaces down into their basic components.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Component Levels</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Atoms: Basic building blocks</li>
                  <li>• Molecules: Simple combinations</li>
                  <li>• Organisms: Complex components</li>
                  <li>• Templates: Complete layouts</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Built With</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• React + TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Shadcn/ui Components</li>
                  <li>• Framer Motion</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
