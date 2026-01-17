import { LANGUAGES, LANGUAGE_COLORS } from './config'

export interface Snippet {
  id: string
  title: string
  description: string
  language: string
  code: string
  createdAt: number
  updatedAt: number
  hasPreview?: boolean
}

export type Language = typeof LANGUAGES[number]

export { LANGUAGES, LANGUAGE_COLORS }
