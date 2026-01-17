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
import { Snippet } from '@/lib/types'
import { MonacoEditor } from '@/components/MonacoEditor'
import { SplitScreenEditor } from '@/components/SplitScreenEditor'
import { strings, appConfig, LANGUAGES } from '@/lib/config'

interface SnippetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void
  editingSnippet?: Snippet | null
}

export function SnippetDialog({ open, onOpenChange, onSave, editingSnippet }: SnippetDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [language, setLanguage] = useState(appConfig.defaultLanguage)
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
      setLanguage(appConfig.defaultLanguage)
      setCode('')
      setHasPreview(false)
    }
    setErrors({})
  }, [editingSnippet, open])

  const handleSave = () => {
    const newErrors: { title?: string; code?: string } = {}
    
    if (!title.trim()) {
      newErrors.title = strings.snippetDialog.fields.title.errorMessage
    }
    if (!code.trim()) {
      newErrors.code = strings.snippetDialog.fields.code.errorMessage
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
      category: editingSnippet?.category || 'general',
      hasPreview,
    })

    setTitle('')
    setDescription('')
    setLanguage(appConfig.defaultLanguage)
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
            {editingSnippet ? strings.snippetDialog.edit.title : strings.snippetDialog.create.title}
          </DialogTitle>
          <DialogDescription>
            {editingSnippet 
              ? strings.snippetDialog.edit.description
              : strings.snippetDialog.create.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4 overflow-y-auto flex-1">
          <div className="space-y-2">
            <Label htmlFor="title">
              {strings.snippetDialog.fields.title.label}{strings.snippetDialog.fields.title.required ? ' *' : ''}
            </Label>
            <Input
              id="title"
              placeholder={strings.snippetDialog.fields.title.placeholder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'border-destructive ring-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">{strings.snippetDialog.fields.language.label}</Label>
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

          {appConfig.previewEnabledLanguages.includes(language) && (
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
                {strings.snippetDialog.fields.preview.label}
              </Label>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">{strings.snippetDialog.fields.description.label}</Label>
            <Textarea
              id="description"
              placeholder={strings.snippetDialog.fields.description.placeholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">
              {strings.snippetDialog.fields.code.label}{strings.snippetDialog.fields.code.required ? ' *' : ''}
            </Label>
            {hasPreview && appConfig.previewEnabledLanguages.includes(language) ? (
              <div className={errors.code ? 'ring-2 ring-destructive/20 rounded-md' : ''}>
                <SplitScreenEditor
                  value={code}
                  onChange={setCode}
                  language={language}
                  height="500px"
                />
              </div>
            ) : (
              <div className={`rounded-md border overflow-hidden ${errors.code ? 'border-destructive ring-2 ring-destructive/20' : 'border-border'}`}>
                <MonacoEditor
                  value={code}
                  onChange={setCode}
                  language={language}
                  height="400px"
                />
              </div>
            )}
            {errors.code && (
              <p className="text-sm text-destructive">{errors.code}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {strings.snippetDialog.buttons.cancel}
          </Button>
          <Button onClick={handleSave}>
            {editingSnippet ? strings.snippetDialog.buttons.update : strings.snippetDialog.buttons.create} Snippet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
