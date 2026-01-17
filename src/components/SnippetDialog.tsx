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
import { Snippet, InputParameter } from '@/lib/types'
import { MonacoEditor } from '@/components/MonacoEditor'
import { SplitScreenEditor } from '@/components/SplitScreenEditor'
import { strings, appConfig, LANGUAGES } from '@/lib/config'
import { Plus, Trash } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
  const [functionName, setFunctionName] = useState('')
  const [inputParameters, setInputParameters] = useState<InputParameter[]>([])
  const [errors, setErrors] = useState<{ title?: string; code?: string }>({})

  useEffect(() => {
    if (editingSnippet) {
      setTitle(editingSnippet.title)
      setDescription(editingSnippet.description)
      setLanguage(editingSnippet.language)
      setCode(editingSnippet.code)
      setHasPreview(editingSnippet.hasPreview || false)
      setFunctionName(editingSnippet.functionName || '')
      setInputParameters(editingSnippet.inputParameters || [])
    } else {
      setTitle('')
      setDescription('')
      setLanguage(appConfig.defaultLanguage)
      setCode('')
      setHasPreview(false)
      setFunctionName('')
      setInputParameters([])
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
      functionName: functionName.trim() || undefined,
      inputParameters: inputParameters.length > 0 ? inputParameters : undefined,
    })

    setTitle('')
    setDescription('')
    setLanguage(appConfig.defaultLanguage)
    setCode('')
    setHasPreview(false)
    setFunctionName('')
    setInputParameters([])
    setErrors({})
    onOpenChange(false)
  }

  const handleAddParameter = () => {
    setInputParameters((prev) => [
      ...prev,
      { name: '', type: 'string', defaultValue: '', description: '' }
    ])
  }

  const handleRemoveParameter = (index: number) => {
    setInputParameters((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpdateParameter = (index: number, field: keyof InputParameter, value: string) => {
    setInputParameters((prev) =>
      prev.map((param, i) =>
        i === index ? { ...param, [field]: value } : param
      )
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editingSnippet?.id ? strings.snippetDialog.edit.title : strings.snippetDialog.create.title}
          </DialogTitle>
          <DialogDescription>
            {editingSnippet?.id
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

          {hasPreview && appConfig.previewEnabledLanguages.includes(language) && (
            <Card className="bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center justify-between">
                  <span>Preview Configuration</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddParameter}
                    className="gap-2"
                  >
                    <Plus className="h-3 w-3" />
                    Add Parameter
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="functionName" className="text-sm">
                    Function/Component Name (Optional)
                  </Label>
                  <Input
                    id="functionName"
                    placeholder="e.g., MyComponent"
                    value={functionName}
                    onChange={(e) => setFunctionName(e.target.value)}
                    className="bg-background"
                  />
                  <p className="text-xs text-muted-foreground">
                    The name of the function or component to render. Leave empty to use the default export.
                  </p>
                </div>

                {inputParameters.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Input Parameters (Props)</Label>
                    {inputParameters.map((param, index) => (
                      <Card key={index} className="bg-background">
                        <CardContent className="pt-4 space-y-3">
                          <div className="flex items-start gap-2">
                            <div className="flex-1 grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label htmlFor={`param-name-${index}`} className="text-xs">
                                  Name *
                                </Label>
                                <Input
                                  id={`param-name-${index}`}
                                  placeholder="paramName"
                                  value={param.name}
                                  onChange={(e) =>
                                    handleUpdateParameter(index, 'name', e.target.value)
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label htmlFor={`param-type-${index}`} className="text-xs">
                                  Type
                                </Label>
                                <Select
                                  value={param.type}
                                  onValueChange={(value) =>
                                    handleUpdateParameter(index, 'type', value)
                                  }
                                >
                                  <SelectTrigger id={`param-type-${index}`} className="h-8 text-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="string">string</SelectItem>
                                    <SelectItem value="number">number</SelectItem>
                                    <SelectItem value="boolean">boolean</SelectItem>
                                    <SelectItem value="array">array</SelectItem>
                                    <SelectItem value="object">object</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveParameter(index)}
                              className="h-8 w-8 p-0 mt-6 text-destructive hover:text-destructive"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`param-default-${index}`} className="text-xs">
                              Default Value *
                            </Label>
                            <Input
                              id={`param-default-${index}`}
                              placeholder={
                                param.type === 'string'
                                  ? '"Hello World"'
                                  : param.type === 'number'
                                  ? '42'
                                  : param.type === 'boolean'
                                  ? 'true'
                                  : param.type === 'array'
                                  ? '["item1", "item2"]'
                                  : '{"key": "value"}'
                              }
                              value={param.defaultValue}
                              onChange={(e) =>
                                handleUpdateParameter(index, 'defaultValue', e.target.value)
                              }
                              className="h-8 text-sm font-mono"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`param-desc-${index}`} className="text-xs">
                              Description (Optional)
                            </Label>
                            <Input
                              id={`param-desc-${index}`}
                              placeholder="What does this parameter do?"
                              value={param.description || ''}
                              onChange={(e) =>
                                handleUpdateParameter(index, 'description', e.target.value)
                              }
                              className="h-8 text-sm"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
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
                  functionName={functionName}
                  inputParameters={inputParameters}
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
