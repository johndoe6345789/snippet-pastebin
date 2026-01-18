import type { Database } from 'sql.js'
import type { FlaskStorageAdapter } from '../storage'

export const dbState = {
  dbInstance: null as Database | null,
  sqlInstance: null as any,
  flaskAdapter: null as FlaskStorageAdapter | null,
  configLoaded: false,
}
