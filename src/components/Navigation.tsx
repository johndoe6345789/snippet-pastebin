import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <List className="h-6 w-6" weight="bold" />
      </Button>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-card border-r border-border z-50 shadow-xl"
            >
              <div className="flex flex-col h-full">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
