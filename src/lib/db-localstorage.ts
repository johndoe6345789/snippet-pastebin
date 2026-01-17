/**
 * LocalStorage operations for database persistence
 */

import { DB_KEY } from './db-indexeddb'

export function loadFromLocalStorage(): Uint8Array | null {
  try {
    const savedData = localStorage.getItem(DB_KEY)
    if (savedData) {
      return new Uint8Array(JSON.parse(savedData))
    }
  } catch (error) {
    console.warn('Failed to load from localStorage:', error)
  }
  return null
}

export function saveToLocalStorage(data: Uint8Array): boolean {
  try {
    const dataArray = Array.from(data)
    localStorage.setItem(DB_KEY, JSON.stringify(dataArray))
    return true
  } catch (error) {
    console.warn('Failed to save to localStorage (quota exceeded?):', error)
    return false
  }
}

export function deleteFromLocalStorage(): void {
  try {
    localStorage.removeItem(DB_KEY)
  } catch (error) {
    console.warn('Error clearing localStorage:', error)
  }
}
