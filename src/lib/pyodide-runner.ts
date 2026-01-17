import { loadPyodide, PyodideInterface } from 'pyodide'

let pyodideInstance: PyodideInterface | null = null
let pyodideLoading: Promise<PyodideInterface> | null = null

export async function getPyodide(): Promise<PyodideInterface> {
  if (pyodideInstance) {
    return pyodideInstance
  }

  if (pyodideLoading) {
    return pyodideLoading
  }

  pyodideLoading = loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.1/full/',
  }).then((pyodide) => {
    pyodideInstance = pyodide
    return pyodide
  })

  return pyodideLoading
}

export async function runPythonCode(code: string): Promise<{ output: string; error?: string }> {
  try {
    const pyodide = await getPyodide()

    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
    `)

    let result: any
    try {
      result = await pyodide.runPythonAsync(code)
    } catch (err) {
      const stderr = pyodide.runPython('sys.stderr.getvalue()')
      const stdout = pyodide.runPython('sys.stdout.getvalue()')
      return {
        output: stdout || '',
        error: stderr || (err instanceof Error ? err.message : String(err))
      }
    }

    const stdout = pyodide.runPython('sys.stdout.getvalue()')
    
    let output = stdout || ''
    if (result !== undefined && result !== null) {
      output += (output ? '\n' : '') + String(result)
    }

    return { output: output || '(no output)' }
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : String(err)
    }
  }
}

export function isPyodideReady(): boolean {
  return pyodideInstance !== null
}
