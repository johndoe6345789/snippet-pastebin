import initSqlJs, { Database } from 'sql.js'
import type { Snippet, SnippetTemplate } from './types'

let dbInstance: Database | null = null
let sqlInstance: any = null

const DB_KEY = 'codesnippet-db'

export async function initDB(): Promise<Database> {
  if (dbInstance) return dbInstance

  if (!sqlInstance) {
    sqlInstance = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`
    })
  }

  const savedData = localStorage.getItem(DB_KEY)
  
  if (savedData) {
    try {
      const uint8Array = new Uint8Array(JSON.parse(savedData))
      dbInstance = new sqlInstance.Database(uint8Array)
    } catch (error) {
      console.error('Failed to load saved database, creating new one:', error)
      dbInstance = new sqlInstance.Database()
    }
  } else {
    dbInstance = new sqlInstance.Database()
  }
  
  if (!dbInstance) {
    throw new Error('Failed to initialize database')
  }
  
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS snippets (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      code TEXT NOT NULL,
      language TEXT NOT NULL,
      category TEXT NOT NULL,
      hasPreview INTEGER DEFAULT 0,
      functionName TEXT,
      inputParameters TEXT,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL
    )
  `)

  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS snippet_templates (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      code TEXT NOT NULL,
      language TEXT NOT NULL,
      category TEXT NOT NULL,
      hasPreview INTEGER DEFAULT 0,
      functionName TEXT,
      inputParameters TEXT
    )
  `)

  saveDB()

  return dbInstance
}

function saveDB() {
  if (!dbInstance) return
  
  try {
    const data = dbInstance.export()
    const dataArray = Array.from(data)
    localStorage.setItem(DB_KEY, JSON.stringify(dataArray))
  } catch (error) {
    console.error('Failed to save database:', error)
  }
}

export async function getAllSnippets(): Promise<Snippet[]> {
  const db = await initDB()
  
  const results = db.exec('SELECT * FROM snippets ORDER BY updatedAt DESC')
  
  if (results.length === 0) return []
  
  const columns = results[0].columns
  const values = results[0].values
  
  return values.map(row => {
    const snippet: any = {}
    columns.forEach((col, idx) => {
      if (col === 'hasPreview') {
        snippet[col] = row[idx] === 1
      } else if (col === 'inputParameters') {
        snippet[col] = row[idx] ? JSON.parse(row[idx] as string) : undefined
      } else {
        snippet[col] = row[idx]
      }
    })
    return snippet as Snippet
  })
}

export async function getSnippet(id: string): Promise<Snippet | null> {
  const db = await initDB()
  
  const results = db.exec('SELECT * FROM snippets WHERE id = ?', [id])
  
  if (results.length === 0 || results[0].values.length === 0) return null
  
  const columns = results[0].columns
  const row = results[0].values[0]
  
  const snippet: any = {}
  columns.forEach((col, idx) => {
    if (col === 'hasPreview') {
      snippet[col] = row[idx] === 1
    } else if (col === 'inputParameters') {
      snippet[col] = row[idx] ? JSON.parse(row[idx] as string) : undefined
    } else {
      snippet[col] = row[idx]
    }
  })
  
  return snippet as Snippet
}

export async function createSnippet(snippet: Snippet): Promise<void> {
  const db = await initDB()
  
  db.run(
    `INSERT INTO snippets (id, title, description, code, language, category, hasPreview, functionName, inputParameters, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      snippet.id,
      snippet.title,
      snippet.description,
      snippet.code,
      snippet.language,
      snippet.category,
      snippet.hasPreview ? 1 : 0,
      snippet.functionName || null,
      snippet.inputParameters ? JSON.stringify(snippet.inputParameters) : null,
      snippet.createdAt,
      snippet.updatedAt
    ]
  )
  
  saveDB()
}

export async function updateSnippet(snippet: Snippet): Promise<void> {
  const db = await initDB()
  
  db.run(
    `UPDATE snippets 
     SET title = ?, description = ?, code = ?, language = ?, category = ?, hasPreview = ?, functionName = ?, inputParameters = ?, updatedAt = ?
     WHERE id = ?`,
    [
      snippet.title,
      snippet.description,
      snippet.code,
      snippet.language,
      snippet.category,
      snippet.hasPreview ? 1 : 0,
      snippet.functionName || null,
      snippet.inputParameters ? JSON.stringify(snippet.inputParameters) : null,
      snippet.updatedAt,
      snippet.id
    ]
  )
  
  saveDB()
}

export async function deleteSnippet(id: string): Promise<void> {
  const db = await initDB()
  
  db.run('DELETE FROM snippets WHERE id = ?', [id])
  
  saveDB()
}

export async function getAllTemplates(): Promise<SnippetTemplate[]> {
  const db = await initDB()
  
  const results = db.exec('SELECT * FROM snippet_templates')
  
  if (results.length === 0) return []
  
  const columns = results[0].columns
  const values = results[0].values
  
  return values.map(row => {
    const template: any = {}
    columns.forEach((col, idx) => {
      if (col === 'hasPreview') {
        template[col] = row[idx] === 1
      } else if (col === 'inputParameters') {
        template[col] = row[idx] ? JSON.parse(row[idx] as string) : undefined
      } else {
        template[col] = row[idx]
      }
    })
    return template as SnippetTemplate
  })
}

export async function createTemplate(template: SnippetTemplate): Promise<void> {
  const db = await initDB()
  
  db.run(
    `INSERT INTO snippet_templates (id, title, description, code, language, category, hasPreview, functionName, inputParameters)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      template.id,
      template.title,
      template.description,
      template.code,
      template.language,
      template.category,
      template.hasPreview ? 1 : 0,
      template.functionName || null,
      template.inputParameters ? JSON.stringify(template.inputParameters) : null
    ]
  )
  
  saveDB()
}

export async function seedDatabase(): Promise<void> {
  const db = await initDB()
  
  const checkSnippets = db.exec('SELECT COUNT(*) as count FROM snippets')
  const snippetCount = checkSnippets[0]?.values[0]?.[0] as number
  
  if (snippetCount > 0) {
    return
  }

  const now = Date.now()

  const seedSnippets: Snippet[] = [
    {
      id: 'seed-1',
      title: 'React Counter Hook',
      description: 'Basic state management with useState',
      code: `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="p-6 space-y-4">
      <p className="text-2xl font-bold">Count: {count}</p>
      <div className="flex gap-2">
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default Counter`,
      language: 'tsx',
      category: 'React Hooks',
      hasPreview: true,
      functionName: 'Counter',
      inputParameters: [],
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'seed-2',
      title: 'Todo List Component',
      description: 'Complete todo list with add, toggle, and delete',
      code: `import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2 } from '@phosphor-icons/react'

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false }
  ])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Todos</h2>
      <div className="flex gap-2 mb-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <div className="space-y-2">
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center gap-2 p-2 hover:bg-muted rounded">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? 'line-through text-muted-foreground flex-1' : 'flex-1'}>
              {todo.text}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default TodoList`,
      language: 'tsx',
      category: 'Components',
      hasPreview: true,
      functionName: 'TodoList',
      inputParameters: [],
      createdAt: now - 1000,
      updatedAt: now - 1000
    },
    {
      id: 'seed-3',
      title: 'Fetch Data Hook',
      description: 'Custom hook for API data fetching',
      code: `import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        if (!response.ok) throw new Error('Network response was not ok')
        const json = await response.json()
        setData(json)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}`,
      language: 'tsx',
      category: 'React Hooks',
      hasPreview: false,
      createdAt: now - 2000,
      updatedAt: now - 2000
    },
    {
      id: 'seed-4',
      title: 'Animated Card',
      description: 'Card with hover animation using Framer Motion',
      code: `import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

function AnimatedCard({ title = 'Animated Card', description = 'Hover to see the effect' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateZ: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className="cursor-pointer">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has smooth animations on hover and tap!</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AnimatedCard`,
      language: 'tsx',
      category: 'Components',
      hasPreview: true,
      functionName: 'AnimatedCard',
      inputParameters: [
        {
          name: 'title',
          type: 'string',
          defaultValue: 'Animated Card',
          description: 'Card title'
        },
        {
          name: 'description',
          type: 'string',
          defaultValue: 'Hover to see the effect',
          description: 'Card description'
        }
      ],
      createdAt: now - 3000,
      updatedAt: now - 3000
    },
    {
      id: 'seed-5',
      title: 'Form Validation',
      description: 'Form with react-hook-form validation',
      code: `import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log('Form data:', data)
    alert('Form submitted successfully!')
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Card>
  )
}

export default ContactForm`,
      language: 'tsx',
      category: 'Forms',
      hasPreview: true,
      functionName: 'ContactForm',
      inputParameters: [],
      createdAt: now - 4000,
      updatedAt: now - 4000
    }
  ]

  for (const snippet of seedSnippets) {
    await createSnippet(snippet)
  }

  const seedTemplates: SnippetTemplate[] = [
    {
      id: 'template-1',
      title: 'Basic React Component',
      description: 'Simple functional component template',
      code: `function MyComponent() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Hello World</h2>
      <p>This is a basic component.</p>
    </div>
  )
}

export default MyComponent`,
      language: 'tsx',
      category: 'Templates',
      hasPreview: true,
      functionName: 'MyComponent',
      inputParameters: []
    },
    {
      id: 'template-2',
      title: 'Component with Props',
      description: 'Component template with configurable props',
      code: `function Greeting({ name = 'World', message = 'Hello' }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{message}, {name}!</h2>
    </div>
  )
}

export default Greeting`,
      language: 'tsx',
      category: 'Templates',
      hasPreview: true,
      functionName: 'Greeting',
      inputParameters: [
        {
          name: 'name',
          type: 'string',
          defaultValue: 'World',
          description: 'Name to greet'
        },
        {
          name: 'message',
          type: 'string',
          defaultValue: 'Hello',
          description: 'Greeting message'
        }
      ]
    },
    {
      id: 'template-3',
      title: 'useState Hook Template',
      description: 'Component with state management',
      code: `import { useState } from 'react'
import { Button } from '@/components/ui/button'

function StatefulComponent() {
  const [value, setValue] = useState(0)

  return (
    <div className="p-4 space-y-4">
      <p className="text-lg">Value: {value}</p>
      <Button onClick={() => setValue(value + 1)}>
        Increment
      </Button>
    </div>
  )
}

export default StatefulComponent`,
      language: 'tsx',
      category: 'Templates',
      hasPreview: true,
      functionName: 'StatefulComponent',
      inputParameters: []
    }
  ]

  for (const template of seedTemplates) {
    await createTemplate(template)
  }
}
