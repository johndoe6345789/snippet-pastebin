'use client';

import { motion } from 'framer-motion';
import { Code } from '@phosphor-icons/react';
import { Navigation } from '@/components/layout/navigation/Navigation';
import { NavigationSidebar } from '@/components/layout/navigation/NavigationSidebar';
import { useNavigation } from '@/components/layout/navigation/useNavigation';
import { BackendIndicator } from '@/components/layout/BackendIndicator';
import { ReactNode } from 'react';

export function PageLayout({ children }: { children: ReactNode }) {
  const { menuOpen } = useNavigation();

  return (
    <div className="min-h-screen bg-background">
      <div className="grid-pattern" />

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
                className="logo-container"
              >
                <Navigation />
                <div className="logo-icon-box">
                  <Code weight="bold" />
                </div>
                <h1 className="logo-text">
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
          {children}
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
  );
}
