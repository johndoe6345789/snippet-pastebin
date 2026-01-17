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

  pyodide.globals.set('__js_input__', customInput)

  pyodide.runPython(`
import builtins
import asyncio

async def custom_input_async(prompt=""):
    sys.stdout.write(prompt)
    sys.stdout.flush()
    
    from js import __js_input__
    result = await __js_input__(prompt)
    return result

def custom_input(prompt=""):
    import asyncio
    loop = asyncio.get_event_loop()
    result = loop.run_until_complete(custom_input_async(prompt))
    return result

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
