export type AtomicLevel = 'atoms' | 'molecules' | 'organisms' | 'templates'

export interface ComponentExample {
  id: string
  name: string
  description: string
  category: string
  level: AtomicLevel
}

export interface Snippet {
  id: string
  title: string
  description: string
  language: string
  code: string
  hasPreview?: boolean
  createdAt: number
  updatedAt: number
}

export const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'JSX',
  'TSX',
  'Python',
  'Java',
  'C++',
  'C#',
  'Ruby',
  'Go',
  'Rust',
  'PHP',
  'Swift',
  'Kotlin',
  'HTML',
  'CSS',
  'SQL',
  'Bash',
  'Other',
] as const

export const LANGUAGE_COLORS: Record<string, string> = {
  'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'TypeScript': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'JSX': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'TSX': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  'Python': 'bg-blue-400/20 text-blue-200 border-blue-400/30',
  'Java': 'bg-red-500/20 text-orange-300 border-red-500/30',
  'C++': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'C#': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Ruby': 'bg-red-600/20 text-red-300 border-red-600/30',
  'Go': 'bg-cyan-500/20 text-teal-300 border-cyan-500/30',
  'Rust': 'bg-orange-600/20 text-orange-300 border-orange-600/30',
  'PHP': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  'Swift': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'Kotlin': 'bg-purple-600/20 text-purple-300 border-purple-600/30',
  'HTML': 'bg-orange-400/20 text-orange-300 border-orange-400/30',
  'CSS': 'bg-blue-600/20 text-blue-300 border-blue-600/30',
  'SQL': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'Bash': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Other': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
}
