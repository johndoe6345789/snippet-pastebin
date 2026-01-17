import { createContext, useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
  List,
  House
  Fl
} from '
  Atom,
  FlowArrow,
  Layout,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { path: '/', label: 'Home', icon: House },

  menuOpen: boolean
}
const NavigationContext = createContext<NavigationContextTy
e

    <NavigationContext.Provider v
    </NavigationCon
}
e

  }

export function Navigation() {


      size
      onClick={() => setMenuOpen(!menuOpen)}
      <List clas
  )

 

    <motion.aside
      animate={{ width: menuOpen ? 320 : 0 }}
      className="
      <div className="flex flex-col h-full w-80">
   
            vari
 

          </Button>


          
           
                <li k
                 
                    classNa
                      isActive
     
                  >
             
   
 

        </nav>
        <div className="p-6 border-t border-border"
            CodeSnippet Library

    </moti
}
























































