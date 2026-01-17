import { createContext, useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  List,
  X,
  House,
  Atom,
  FlowArrow,
  Layout,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { path: '/', label: 'Home', icon: House },
  { path: '/atoms', label: 'Atoms', icon: Atom },
  { path: '/molecules', label: 'Molecules', icon: FlowArrow },
  { path: '/organisms', label: 'Organisms', icon: (props: any) => <FlowArrow {...props} className={cn(props.className, "rotate-90")} /> },
  { path: '/templates', label: 'Templates', icon: Layout },
]

interface NavigationContextType {
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
      className="h-10 w-10"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <List className="h-6 w-6" weight="bold" />
    </Button>
  )
}

export function NavigationSidebar() {
  const { menuOpen, setMenuOpen } = useNavigation()
  const location = useLocation()

  return (
    <motion.aside
      initial={false}
      animate={{ width: menuOpen ? 320 : 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed left-0 top-0 bottom-0 bg-card border-r border-border z-40 shadow-xl overflow-hidden"
    >
      <div className="flex flex-col h-full w-80">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">Navigation</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMenuOpen(false)}
          >
            <X className="h-5 w-5" weight="bold" />
          </Button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" weight={isActive ? "bold" : "regular"} />
                    <span className={cn("text-sm", isActive && "font-semibold")}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            CodeSnippet Library
          </p>
        </div>
      </div>
    </motion.aside>
  )
}
