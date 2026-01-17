export type AtomicLevel = 'atoms' | 'molecules' | 'organisms' | 'templates'

export interface InputParameter {
  name: string
  type: 'string' | 'number' | 'boolean' | 'array' | 'object'
  defaultValue: string
  description?: string
}

export interface Snippet {
  id: string
  title: string
  description: string
  code: string
  language: string
  category: string
  hasPreview?: boolean
  functionName?: string
  inputParameters?: InputParameter[]
  createdAt: number
  updatedAt: number
}
































