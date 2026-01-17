import { createContext, useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  List,
  House,
  Atom,
  FlowArrow,
  Layout,
  X,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { path: '/', label: 'Home', icon: House },
  { path: '/atoms', label: 'Atoms', icon: Atom },
  { path: '/molecules', label: 'Molecules', icon: FlowArrow },
  { path: '/organisms', label: 'Organisms', icon: Layout },
  { path: '/templates', label: 'Templates', icon: Layout },
]

type NavigationContextType = {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <NavigationContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider')
  }
  return context
}

export function Navigation() {
  const { menuOpen, setMenuOpen } = useNavigation()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <List className="h-5 w-5" />
    </Button>
  )
}

export function NavigationSidebar() {
  const { menuOpen, setMenuOpen } = useNavigation()
  const location = useLocation()

  return (
    <motion.aside
      initial={{ width: 0 }}
      animate={{ width: menuOpen ? 320 : 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed left-0 top-0 h-screen bg-card border-r border-border overflow-hidden z-30"
    >
      <div className="flex flex-col h-full w-80">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon

              return (
                <li key={item.path}>
                  <Link to={item.path} onClick={() => setMenuOpen(false)}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className={cn(
                        'w-full justify-start gap-3',
                        isActive && 'bg-accent text-accent-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            CodeSnippet Library
          </p>
        </div>
      </div>
    </motion.aside>
  )
}
