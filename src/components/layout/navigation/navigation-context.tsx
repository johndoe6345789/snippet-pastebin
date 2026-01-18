import { createContext } from 'react'

type NavigationContextType = {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

export const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
)
