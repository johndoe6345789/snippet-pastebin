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

export async function runPythonCode(code: string): Promise<{ output?: string; error?: string }> {
  try {
    const pyodide = await getPyodide()
    
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`)

    const result = pyodide.runPython(code)
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

export interface InteractiveCallbacks {
  onOutput?: (text: string) => void
  onError?: (text: string) => void
  onInputRequest?: (prompt: string) => Promise<string>
}

export async function runPythonCodeInteractive(
  code: string,
  callbacks: InteractiveCallbacks
): Promise<void> {
  const pyodide = await getPyodide()

  pyodide.runPython(`
import sys
from io import StringIO

class InteractiveStdout:
    def __init__(self, callback):
        self.callback = callback
        self.buffer = ""
    
    def write(self, text):
        self.buffer += text
        if "\\n" in text:
            lines = self.buffer.split("\\n")
            for line in lines[:-1]:
                if line:
                    self.callback(line)
            self.buffer = lines[-1]
        return len(text)
    
    def flush(self):
        if self.buffer:
            self.callback(self.buffer)
            self.buffer = ""

class InteractiveStderr:
    def __init__(self, callback):
        self.callback = callback
        self.buffer = ""
    
    def write(self, text):
        self.buffer += text
        if "\\n" in text:
            lines = self.buffer.split("\\n")
            for line in lines[:-1]:
                if line:
                    self.callback(line)
            self.buffer = lines[-1]
        return len(text)
    
    def flush(self):
        if self.buffer:
            self.callback(self.buffer)
            self.buffer = ""
`)

  const outputCallback = (text: string) => {
    if (callbacks.onOutput) {
      callbacks.onOutput(text)
    }
  }

  const errorCallback = (text: string) => {
    if (callbacks.onError) {
      callbacks.onError(text)
    }
  }

  pyodide.globals.set('__output_callback__', outputCallback)
  pyodide.globals.set('__error_callback__', errorCallback)

  pyodide.runPython(`
sys.stdout = InteractiveStdout(__output_callback__)
sys.stderr = InteractiveStderr(__error_callback__)
`)

  const customInput = async (prompt = '') => {
    if (callbacks.onInputRequest) {
      const value = await callbacks.onInputRequest(prompt)
      return value
    }
    return ''
  }

  pyodide.globals.set('js_input_handler', customInput)

  await pyodide.runPythonAsync(`
import builtins
from pyodide.ffi import to_js
import asyncio

def custom_input(prompt=""):
    import sys
    sys.stdout.write(prompt)
    sys.stdout.flush()
    
    async def get_input():
        result = await js_input_handler(prompt)
        return result
    
    loop = asyncio.get_event_loop()
    if loop.is_running():
        import pyodide.webloop
        return pyodide.webloop.WebLoop().run_until_complete(get_input())
    else:
        return loop.run_until_complete(get_input())

builtins.input = custom_input
`)

  try {
    await pyodide.runPythonAsync(code)
    
    pyodide.runPython('sys.stdout.flush()')
    pyodide.runPython('sys.stderr.flush()')
  } catch (err) {
    if (callbacks.onError) {
      callbacks.onError(err instanceof Error ? err.message : String(err))
    }
    throw err
  }
}

export function isPyodideReady(): boolean {
  return pyodideInstance !== null
}
