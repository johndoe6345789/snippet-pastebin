import { createContext } from 'react'

interface NavigationContextType {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

export const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
)
