import { loadPyodide, PyodideInterface } from 'pyodide'

let pyodideInstance: PyodideInterface | null = null
let pyodideLoading: Promise<PyodideInterface> | null = null

  if (pyodideLoading) {
  }
  pyodideLoading = loadPyo
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

        output: stdout 
 

    
    if 
    }

    return {
      erro
  }

  return pyodideInstanc









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
