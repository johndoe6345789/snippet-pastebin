import { Trash } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { InputParameter } from '@/lib/types'

interface InputParameterItemProps {
  param: InputParameter
  index: number
  onUpdate: (index: number, field: keyof InputParameter, value: string) => void
  onRemove: (index: number) => void
}

export function InputParameterItem({ param, index, onUpdate, onRemove }: InputParameterItemProps) {
  const getPlaceholder = (type: string) => {
    switch (type) {
      case 'string':
        return '"Hello World"'
      case 'number':
        return '42'
      case 'boolean':
        return 'true'
      case 'array':
        return '["item1", "item2"]'
      case 'object':
        return '{"key": "value"}'
      default:
        return ''
    }
  }

  return (
    <Card className="bg-background">
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
                onChange={(e) => onUpdate(index, 'name', e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`param-type-${index}`} className="text-xs">
                Type
              </Label>
              <Select
                value={param.type}
                onValueChange={(value) => onUpdate(index, 'type', value)}
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
            onClick={() => onRemove(index)}
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
            placeholder={getPlaceholder(param.type)}
            value={param.defaultValue}
            onChange={(e) => onUpdate(index, 'defaultValue', e.target.value)}
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
            onChange={(e) => onUpdate(index, 'description', e.target.value)}
            className="h-8 text-sm"
          />
        </div>
      </CardContent>
    </Card>
  )
}
