/**
 * IndexedDB operations for database persistence
 */

import { DB_KEY, IDB_NAME, IDB_STORE, IDB_VERSION } from './db-constants'

export async function openIndexedDB(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return null
  
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(IDB_NAME, IDB_VERSION)
      
      request.onerror = () => {
        console.warn('IndexedDB not available, falling back to localStorage')
        resolve(null)
      }
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE)
        }
      }
      
      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result)
      }
    } catch (error) {
      console.warn('IndexedDB error:', error)
      resolve(null)
    }
  })
}

export async function loadFromIndexedDB(): Promise<Uint8Array | null> {
  const db = await openIndexedDB()
  if (!db) return null
  
  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([IDB_STORE], 'readonly')
      const store = transaction.objectStore(IDB_STORE)
      const request = store.get(DB_KEY)
      
      request.onsuccess = () => {
        const data = request.result
        resolve(data ? new Uint8Array(data) : null)
      }
      
      request.onerror = () => {
        console.warn('Failed to load from IndexedDB')
        resolve(null)
      }
    } catch (error) {
      console.warn('IndexedDB read error:', error)
      resolve(null)
    }
  })
}

export async function saveToIndexedDB(data: Uint8Array): Promise<boolean> {
  const db = await openIndexedDB()
  if (!db) return false
  
  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([IDB_STORE], 'readwrite')
      const store = transaction.objectStore(IDB_STORE)
      const request = store.put(data, DB_KEY)
      
      request.onsuccess = () => resolve(true)
      request.onerror = () => {
        console.warn('Failed to save to IndexedDB')
        resolve(false)
      }
    } catch (error) {
      console.warn('IndexedDB write error:', error)
      resolve(false)
    }
  })
}

export async function deleteFromIndexedDB(): Promise<void> {
  const db = await openIndexedDB()
  if (!db) return
  
  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([IDB_STORE], 'readwrite')
      const store = transaction.objectStore(IDB_STORE)
      const request = store.delete(DB_KEY)
      request.onsuccess = () => resolve()
      request.onerror = () => resolve()
    } catch (error) {
      console.warn('Error clearing IndexedDB:', error)
      resolve()
    }
  })
}
