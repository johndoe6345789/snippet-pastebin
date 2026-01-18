import { List } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useNavigation } from './useNavigation'

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
