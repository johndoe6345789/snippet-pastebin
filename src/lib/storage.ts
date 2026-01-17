import type { Snippet } from './types'

export type StorageBackend = 'indexeddb' | 'flask'

export interface StorageConfig {
  backend: StorageBackend
  flaskUrl?: string
}

const STORAGE_CONFIG_KEY = 'codesnippet-storage-config'

function getDefaultConfig(): StorageConfig {
  const flaskUrl = import.meta.env.VITE_FLASK_BACKEND_URL
  
  if (flaskUrl) {
    return {
      backend: 'flask',
      flaskUrl: flaskUrl
    }
  }
  
  return {
    backend: 'indexeddb'
  }
}

let currentConfig: StorageConfig = getDefaultConfig()

export function loadStorageConfig(): StorageConfig {
  const defaultConfig = getDefaultConfig()
  
  if (defaultConfig.backend === 'flask' && defaultConfig.flaskUrl) {
    currentConfig = defaultConfig
    return currentConfig
  }
  
  try {
    const saved = localStorage.getItem(STORAGE_CONFIG_KEY)
    if (saved) {
      currentConfig = JSON.parse(saved)
    }
  } catch (error) {
    console.warn('Failed to load storage config:', error)
  }
  return currentConfig
}

export function saveStorageConfig(config: StorageConfig): void {
  currentConfig = config
  try {
    localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config))
  } catch (error) {
    console.warn('Failed to save storage config:', error)
  }
}

export function getStorageConfig(): StorageConfig {
  return currentConfig
}

export class FlaskStorageAdapter {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      })
      return response.ok
    } catch (error) {
      console.error('Flask connection test failed:', error)
      return false
    }
  }

  async getAllSnippets(): Promise<Snippet[]> {
    const response = await fetch(`${this.baseUrl}/api/snippets`)
    if (!response.ok) {
      throw new Error(`Failed to fetch snippets: ${response.statusText}`)
    }
    const data = await response.json()
    return data.map((s: any) => ({
      ...s,
      createdAt: typeof s.createdAt === 'string' ? new Date(s.createdAt).getTime() : s.createdAt,
      updatedAt: typeof s.updatedAt === 'string' ? new Date(s.updatedAt).getTime() : s.updatedAt
    }))
  }

  async getSnippet(id: string): Promise<Snippet | null> {
    const response = await fetch(`${this.baseUrl}/api/snippets/${id}`)
    if (response.status === 404) {
      return null
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch snippet: ${response.statusText}`)
    }
    const data = await response.json()
    return {
      ...data,
      createdAt: typeof data.createdAt === 'string' ? new Date(data.createdAt).getTime() : data.createdAt,
      updatedAt: typeof data.updatedAt === 'string' ? new Date(data.updatedAt).getTime() : data.updatedAt
    }
  }

  async createSnippet(snippet: Snippet): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/snippets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...snippet,
        createdAt: new Date(snippet.createdAt).toISOString(),
        updatedAt: new Date(snippet.updatedAt).toISOString()
      })
    })
    if (!response.ok) {
      throw new Error(`Failed to create snippet: ${response.statusText}`)
    }
  }

  async updateSnippet(snippet: Snippet): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/snippets/${snippet.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...snippet,
        createdAt: new Date(snippet.createdAt).toISOString(),
        updatedAt: new Date(snippet.updatedAt).toISOString()
      })
    })
    if (!response.ok) {
      throw new Error(`Failed to update snippet: ${response.statusText}`)
    }
  }

  async deleteSnippet(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/snippets/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error(`Failed to delete snippet: ${response.statusText}`)
    }
  }

  async migrateFromIndexedDB(snippets: Snippet[]): Promise<void> {
    for (const snippet of snippets) {
      await this.createSnippet(snippet)
    }
  }

  async migrateToIndexedDB(): Promise<Snippet[]> {
    return this.getAllSnippets()
  }
}
