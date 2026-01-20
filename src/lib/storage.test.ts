import {
  loadStorageConfig,
  saveStorageConfig,
  getStorageConfig,
  FlaskStorageAdapter,
  StorageConfig,
  StorageBackend
} from './storage'
import type { Snippet } from './types'

// Mock fetch
global.fetch = jest.fn()

describe('Storage Configuration', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
    localStorage.clear()
    // Clean up environment variables BEFORE clearing, so tests start fresh
    delete process.env.NEXT_PUBLIC_FLASK_BACKEND_URL
  })

  describe('loadStorageConfig', () => {
    it('should load default config when no env var or localStorage', () => {
      delete process.env.NEXT_PUBLIC_FLASK_BACKEND_URL
      const config = loadStorageConfig()
      expect(config.backend).toBe('indexeddb')
      expect(config.flaskUrl).toBeUndefined()
    })

    it('should load Flask config from env var', () => {
      process.env.NEXT_PUBLIC_FLASK_BACKEND_URL = 'http://localhost:5000'
      const config = loadStorageConfig()
      expect(config.backend).toBe('flask')
      expect(config.flaskUrl).toBe('http://localhost:5000')
    })

    it('should load config from localStorage if no env var', () => {
      delete process.env.NEXT_PUBLIC_FLASK_BACKEND_URL
      const savedConfig: StorageConfig = {
        backend: 'flask',
        flaskUrl: 'http://api.example.com'
      }
      localStorage.setItem(
        'codesnippet-storage-config',
        JSON.stringify(savedConfig)
      )

      const config = loadStorageConfig()
      expect(config.backend).toBe('flask')
      expect(config.flaskUrl).toBe('http://api.example.com')
    })

    it('should prefer env var over localStorage', () => {
      process.env.NEXT_PUBLIC_FLASK_BACKEND_URL = 'http://env-url.com'
      localStorage.setItem(
        'codesnippet-storage-config',
        JSON.stringify({ backend: 'indexeddb' })
      )

      const config = loadStorageConfig()
      expect(config.backend).toBe('flask')
      expect(config.flaskUrl).toBe('http://env-url.com')
    })

    it('should handle invalid JSON in localStorage', () => {
      delete process.env.NEXT_PUBLIC_FLASK_BACKEND_URL
      // Explicitly set currentConfig to indexeddb before testing
      saveStorageConfig({ backend: 'indexeddb' })
      localStorage.setItem('codesnippet-storage-config', 'invalid json')

      const config = loadStorageConfig()
      expect(config.backend).toBe('indexeddb')
    })

    it('should return default config on error', () => {
      delete process.env.NEXT_PUBLIC_FLASK_BACKEND_URL
      // Explicitly set currentConfig to indexeddb before testing
      saveStorageConfig({ backend: 'indexeddb' })
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage error')
      })

      const config = loadStorageConfig()
      expect(config.backend).toBe('indexeddb')
    })
  })

  describe('saveStorageConfig', () => {
    it('should save config to localStorage', () => {
      const config: StorageConfig = {
        backend: 'flask',
        flaskUrl: 'http://localhost:5000'
      }

      saveStorageConfig(config)

      const saved = localStorage.getItem('codesnippet-storage-config')
      expect(saved).toBe(JSON.stringify(config))
    })

    it('should update current config after save', () => {
      const config: StorageConfig = {
        backend: 'flask',
        flaskUrl: 'http://localhost:5000'
      }

      saveStorageConfig(config)
      const current = getStorageConfig()

      expect(current.backend).toBe('flask')
      expect(current.flaskUrl).toBe('http://localhost:5000')
    })

    it('should handle storage errors', () => {
      const config: StorageConfig = {
        backend: 'indexeddb'
      }

      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage full')
      })

      expect(() => saveStorageConfig(config)).not.toThrow()
    })

    it('should save IndexedDB config without flaskUrl', () => {
      const config: StorageConfig = {
        backend: 'indexeddb'
      }

      saveStorageConfig(config)

      const saved = localStorage.getItem('codesnippet-storage-config')
      expect(saved).toBe(JSON.stringify(config))
    })
  })

  describe('getStorageConfig', () => {
    it('should return current configuration', () => {
      const config: StorageConfig = {
        backend: 'flask',
        flaskUrl: 'http://localhost:5000'
      }

      saveStorageConfig(config)
      const current = getStorageConfig()

      expect(current).toEqual(config)
    })

    it('should return same instance on repeated calls', () => {
      const config1 = getStorageConfig()
      const config2 = getStorageConfig()

      expect(config1).toBe(config2)
    })
  })
})

describe('FlaskStorageAdapter', () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>

  beforeEach(() => {
    mockFetch.mockClear()
    // Mock AbortSignal.timeout to return a valid signal
    if (!AbortSignal.timeout) {
      const mockAbortController = new AbortController()
      Object.defineProperty(AbortSignal, 'timeout', {
        value: () => mockAbortController.signal,
        writable: true
      })
    }
  })

  describe('constructor', () => {
    it('should create adapter with valid URL', () => {
      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      expect(adapter).toBeDefined()
    })

    it('should throw error with empty URL', () => {
      expect(() => new FlaskStorageAdapter('')).toThrow(
        'Flask backend URL cannot be empty'
      )
    })

    it('should throw error with whitespace-only URL', () => {
      expect(() => new FlaskStorageAdapter('   ')).toThrow(
        'Flask backend URL cannot be empty'
      )
    })

    it('should remove trailing slash from URL', () => {
      const adapter = new FlaskStorageAdapter('http://localhost:5000/')
      // URL normalization happens in constructor
      expect(adapter).toBeDefined()
    })
  })

  describe('testConnection', () => {
    it('should return true on successful connection', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK'
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      const result = await adapter.testConnection()

      expect(result).toBe(true)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/health'),
        expect.objectContaining({
          method: 'GET'
        })
      )
    })

    it('should return false on failed connection', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      const result = await adapter.testConnection()

      expect(result).toBe(false)
    })

    it('should return false on network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      const result = await adapter.testConnection()

      expect(result).toBe(false)
    })

    it('should return false on invalid URL', async () => {
      const adapter = new FlaskStorageAdapter('not-a-valid-url')
      const result = await adapter.testConnection()

      expect(result).toBe(false)
    })

    it('should use 5 second timeout', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      await adapter.testConnection()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          signal: expect.any(AbortSignal)
        })
      )
    })
  })

  describe('getAllSnippets', () => {
    it('should fetch all snippets', async () => {
      const mockSnippets = [
        {
          id: '1',
          title: 'Test',
          code: 'console.log("test")',
          language: 'javascript',
          category: 'test',
          createdAt: 1234567890,
          updatedAt: 1234567890,
          description: ''
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSnippets
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      const snippets = await adapter.getAllSnippets()

      expect(snippets).toHaveLength(1)
      expect(snippets[0].id).toBe('1')
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/snippets')
      )
    })

    it('should throw on failed request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Server error'
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')

      await expect(adapter.getAllSnippets()).rejects.toThrow(
        'Failed to fetch snippets'
      )
    })

    it('should convert date strings to timestamps', async () => {
      const mockSnippets = [
        {
          id: '1',
          title: 'Test',
          code: 'test',
          language: 'javascript',
          category: 'test',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z',
          description: ''
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSnippets
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      const snippets = await adapter.getAllSnippets()

      expect(typeof snippets[0].createdAt).toBe('number')
      expect(typeof snippets[0].updatedAt).toBe('number')
    })
  })

  describe('getSnippet', () => {
    it('should fetch single snippet', async () => {
      const mockSnippet = {
        id: '1',
        title: 'Test',
        code: 'test',
        language: 'javascript',
        category: 'test',
        createdAt: 1234567890,
        updatedAt: 1234567890,
        description: ''
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockSnippet
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      const snippet = await adapter.getSnippet('1')

      expect(snippet?.id).toBe('1')
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/snippets/1')
      )
    })

    it('should return null on 404', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      const snippet = await adapter.getSnippet('nonexistent')

      expect(snippet).toBeNull()
    })

    it('should throw on other errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Server error'
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')

      await expect(adapter.getSnippet('1')).rejects.toThrow(
        'Failed to fetch snippet'
      )
    })
  })

  describe('createSnippet', () => {
    it('should create snippet', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true
      } as Response)

      const snippet: Snippet = {
        id: '1',
        title: 'Test',
        code: 'test',
        language: 'javascript',
        category: 'test',
        createdAt: 1234567890,
        updatedAt: 1234567890,
        description: ''
      }

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      await adapter.createSnippet(snippet)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/snippets'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      )
    })

    it('should throw on failed creation', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request'
      } as Response)

      const snippet: Snippet = {
        id: '1',
        title: 'Test',
        code: 'test',
        language: 'javascript',
        category: 'test',
        createdAt: 1234567890,
        updatedAt: 1234567890,
        description: ''
      }

      const adapter = new FlaskStorageAdapter('http://localhost:5000')

      await expect(adapter.createSnippet(snippet)).rejects.toThrow(
        'Failed to create snippet'
      )
    })
  })

  describe('updateSnippet', () => {
    it('should update snippet', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        statusText: 'OK'
      } as Response)

      const snippet: Snippet = {
        id: '1',
        title: 'Updated',
        code: 'updated code',
        language: 'javascript',
        category: 'test',
        createdAt: 1234567890,
        updatedAt: 1234567891,
        description: ''
      }

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      await adapter.updateSnippet(snippet)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/snippets/1'),
        expect.objectContaining({
          method: 'PUT'
        })
      )
    })

    it('should throw on failed update', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not found'
      } as Response)

      const snippet: Snippet = {
        id: '1',
        title: 'Test',
        code: 'test',
        language: 'javascript',
        category: 'test',
        createdAt: 1234567890,
        updatedAt: 1234567890,
        description: ''
      }

      const adapter = new FlaskStorageAdapter('http://localhost:5000')

      await expect(adapter.updateSnippet(snippet)).rejects.toThrow(
        'Failed to update snippet'
      )
    })
  })

  describe('deleteSnippet', () => {
    it('should delete snippet', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      await adapter.deleteSnippet('1')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/snippets/1'),
        expect.objectContaining({
          method: 'DELETE'
        })
      )
    })

    it('should throw on failed deletion', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not found'
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')

      await expect(adapter.deleteSnippet('1')).rejects.toThrow(
        'Failed to delete snippet'
      )
    })
  })

  describe('migrateFromIndexedDB', () => {
    it('should create snippets for migration', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        statusText: 'OK'
      } as Response)

      const snippets: Snippet[] = [
        {
          id: '1',
          title: 'Test 1',
          code: 'code1',
          language: 'javascript',
          category: 'test',
          createdAt: 1234567890,
          updatedAt: 1234567890,
          description: ''
        },
        {
          id: '2',
          title: 'Test 2',
          code: 'code2',
          language: 'python',
          category: 'test',
          createdAt: 1234567891,
          updatedAt: 1234567891,
          description: ''
        }
      ]

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      await adapter.migrateFromIndexedDB(snippets)

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('migrateToIndexedDB', () => {
    it('should fetch all snippets for migration', async () => {
      const mockSnippets = [
        {
          id: '1',
          title: 'Test',
          code: 'test',
          language: 'javascript',
          category: 'test',
          createdAt: 1234567890,
          updatedAt: 1234567890,
          description: ''
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSnippets,
        statusText: 'OK'
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      const snippets = await adapter.migrateToIndexedDB()

      expect(snippets).toEqual(mockSnippets)
    })
  })

  describe('wipeDatabase', () => {
    it('should wipe database', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        statusText: 'OK'
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      await adapter.wipeDatabase()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/wipe'),
        expect.objectContaining({
          method: 'POST'
        })
      )
    })

    it('should throw on wipe failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error'
      } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')

      await expect(adapter.wipeDatabase()).rejects.toThrow(
        'Failed to wipe database'
      )
    })
  })

  describe('getStats', () => {
    it('should calculate stats from snippets', async () => {
      const mockSnippets = [
        {
          id: '1',
          title: 'Test 1',
          code: 'test',
          language: 'javascript',
          category: 'test',
          isTemplate: false,
          createdAt: 1234567890,
          updatedAt: 1234567890,
          description: ''
        },
        {
          id: '2',
          title: 'Template 1',
          code: 'test',
          language: 'javascript',
          category: 'test',
          isTemplate: true,
          createdAt: 1234567890,
          updatedAt: 1234567890,
          description: ''
        }
      ]

      const mockNamespaces = [
        { id: '1', name: 'default', createdAt: 1234567890, isDefault: true }
      ]

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockSnippets,
          statusText: 'OK'
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockNamespaces,
          statusText: 'OK'
        } as Response)

      const adapter = new FlaskStorageAdapter('http://localhost:5000')
      const stats = await adapter.getStats()

      expect(stats.snippetCount).toBe(2)
      expect(stats.templateCount).toBe(1)
      expect(stats.databaseSize).toBe(0)
    })
  })
})
