export type AtomicLevel = 'atoms' | 'molecules' | 'organisms' | 'templates'

export interface ComponentExample {
  id: string
  name: string
  description: string
  category: string
  level: AtomicLevel
}
