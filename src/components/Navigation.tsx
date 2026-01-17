import { createContext, useContext, useState } from 'react'
import { motion } from 'framer-motion'
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

      {chi
  )

  const context = useContext(Navi
   
 

  const { menuOpen, setMenuOpen }
  return (
      variant="gh
      onClick={() => setMenuOpen(!menuOpen)}
   
  )



    <motion.aside

      clas
      <div 
          <h2 classNa
            varia
            onClick={() => setMenuOpen(false
     
        </div>
        <nav 
   
 

                  <Link to={item.path
                      variant={isActive ? 'secondar
                        'w-full 

          
                 
                </li>
            })}
        </nav>
        <div className="p-6 border-t border-border">
     
        </div>
    </motion.aside>
}






















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
