import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Snippet, LANGUAGES } from '@/lib/types'
import { MonacoEditor } from '@/components/MonacoEditor'

interface SnippetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void
  editingSnippet?: Snippet | null
}

export function SnippetDialog({ open, onOpenChange, onSave, editingSnippet }: SnippetDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [language, setLanguage] = useState('JavaScript')
  const [code, setCode] = useState('')
  const [hasPreview, setHasPreview] = useState(false)
  const [errors, setErrors] = useState<{ title?: string; code?: string }>({})

  useEffect(() => {
    if (editingSnippet) {
      setTitle(editingSnippet.title)
      setDescription(editingSnippet.description)
      setLanguage(editingSnippet.language)
      setCode(editingSnippet.code)
      setHasPreview(editingSnippet.hasPreview || false)
    } else {
      setTitle('')
      setDescription('')
      setLanguage('JavaScript')
      setCode('')
      setHasPreview(false)
    }
    setErrors({})
  }, [editingSnippet, open])

  const handleSave = () => {
    const newErrors: { title?: string; code?: string } = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!code.trim()) {
      newErrors.code = 'Code is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      language,
      code: code.trim(),
      hasPreview,
    })

    setTitle('')
    setDescription('')
    setLanguage('JavaScript')
    setCode('')
    setHasPreview(false)
    setErrors({})
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editingSnippet ? 'Edit Snippet' : 'Create New Snippet'}
          </DialogTitle>
          <DialogDescription>
            {editingSnippet 
              ? 'Update your code snippet details below.' 
              : 'Save a reusable code snippet for quick access later.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4 overflow-y-auto flex-1">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., React useState Hook"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'border-destructive ring-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {['JSX', 'TSX', 'JavaScript', 'TypeScript'].includes(language) && (
            <div className="flex items-center space-x-2 py-2">
              <Checkbox 
                id="hasPreview" 
                checked={hasPreview}
                onCheckedChange={(checked) => setHasPreview(checked as boolean)}
              />
              <Label 
                htmlFor="hasPreview" 
                className="text-sm font-normal cursor-pointer"
              >
                Enable split-screen preview for this snippet
              </Label>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Optional description or notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Code *</Label>
            <div className={`rounded-md border overflow-hidden ${errors.code ? 'border-destructive ring-2 ring-destructive/20' : 'border-border'}`}>
              <MonacoEditor
                value={code}
                onChange={setCode}
                language={language}
                height="400px"
              />
            </div>
            {errors.code && (
              <p className="text-sm text-destructive">{errors.code}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editingSnippet ? 'Update' : 'Create'} Snippet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
