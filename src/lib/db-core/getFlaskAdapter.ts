import { FlaskStorageAdapter, getStorageConfig, loadStorageConfig } from '../storage'
import { dbState } from './state'

export function getFlaskAdapter(): FlaskStorageAdapter | null {
  if (!dbState.configLoaded) {
    loadStorageConfig()
    dbState.configLoaded = true
  }

  const config = getStorageConfig()
  if (config.backend === 'flask' && config.flaskUrl) {
    try {
      if (!dbState.flaskAdapter || dbState.flaskAdapter['baseUrl'] !== config.flaskUrl) {
        dbState.flaskAdapter = new FlaskStorageAdapter(config.flaskUrl)
      }
      return dbState.flaskAdapter
    } catch (error) {
      console.warn('Failed to create Flask adapter:', error)
      return null
    }
  }
  return null
}
