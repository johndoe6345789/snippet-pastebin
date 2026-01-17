/**
 * Database row-to-object mapping utilities
 * Handles conversion of SQL query results to typed objects
 */

/**
 * Maps a SQL query result row to a typed object
 * Handles special conversions for boolean and JSON fields
 */
export function mapRowToObject<T>(row: any[], columns: string[]): T {
  const obj: any = {}
  
  columns.forEach((col, idx) => {
    const value = row[idx]
    
    // Convert integer boolean fields to actual booleans
    if (col === 'hasPreview' || col === 'isDefault') {
      obj[col] = value === 1
    } 
    // Parse JSON string fields with error handling
    else if (col === 'inputParameters') {
      if (value) {
        try {
          obj[col] = JSON.parse(value as string)
        } catch (error) {
          console.warn(`Failed to parse JSON for ${col}:`, error)
          obj[col] = undefined
        }
      } else {
        obj[col] = undefined
      }
    } 
    // All other fields pass through as-is
    else {
      obj[col] = value
    }
  })
  
  return obj as T
}

/**
 * Maps multiple SQL result rows to an array of typed objects
 */
export function mapRowsToObjects<T>(results: any[]): T[] {
  if (results.length === 0) return []
  
  const columns = results[0].columns
  const values = results[0].values
  
  return values.map(row => mapRowToObject<T>(row, columns))
}
