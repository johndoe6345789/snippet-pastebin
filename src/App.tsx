import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code } from '@phosphor-icons/react'
import { Navigation, NavigationProvider, NavigationSidebar, useNavigation } from '@/components/Navigation'
import { BackendIndicator } from '@/components/BackendIndicator'
import { HomePage } from '@/pages/HomePage'
import { DemoPage } from '@/pages/DemoPage'
import { AtomsPage } from '@/pages/AtomsPage'
import { MoleculesPage } from '@/pages/MoleculesPage'
import { OrganismsPage } from '@/pages/OrganismsPage'
import { TemplatesPage } from '@/pages/TemplatesPage'
import { SettingsPage } from '@/pages/SettingsPage'

function AppContent() {
  const { menuOpen } = useNavigation()

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

      <NavigationSidebar />

      <motion.div
        initial={false}
        animate={{ marginLeft: menuOpen ? 320 : 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative z-10"
      >
        <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-20">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <Navigation />
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Code className="h-5 w-5 text-primary-foreground" weight="bold" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  CodeSnippet
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <BackendIndicator />
              </motion.div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/atoms" element={<AtomsPage />} />
            <Route path="/molecules" element={<MoleculesPage />} />
            <Route path="/organisms" element={<OrganismsPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        <footer className="border-t border-border mt-24">
          <div className="container mx-auto px-6 py-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>Save, organize, and share your code snippets with beautiful syntax highlighting and live execution</p>
              <p className="mt-2 text-xs">Supports React preview and Python execution via Pyodide</p>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </Router>
  )
}

export default App
