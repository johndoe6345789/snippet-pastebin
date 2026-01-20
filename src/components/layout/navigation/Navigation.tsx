'use client'

import { List } from '@phosphor-icons/react'
import { useNavigation } from './useNavigation'

export function Navigation() {
  const { menuOpen, setMenuOpen } = useNavigation()
  return (
    <button
      className="nav-burger-btn"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle navigation menu"
    >
      <List weight="bold" />
    </button>
  )
}
